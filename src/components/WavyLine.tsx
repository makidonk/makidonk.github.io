import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'

type Point = { x: number; y: number }
/** One cubic Bézier: start, two control points, end. */
type Cubic = [Point, Point, Point, Point]
type Geometry = {
  pieces: string[]
  /** How many leading pieces are drawn on load (the line up to the `drawnOnLoad` point). */
  drawnPieces: number
  width: number
  height: number
}
/** Layout values the scroll mapping needs, cached so scrolling never reads layout. */
type Metrics = { rootTop: number; rootHeight: number; vh: number }

/** Where the leading tip of the line sits, as a fraction of viewport height. */
const TIP_VIEWPORT_RATIO = 0.58
/**
 * Over the first part of the scroll (as a fraction of viewport height) the tip
 * eases from the line's start point to its 58% position, so the line begins
 * at exactly 0% drawn at the top of the page and grows from the first pixel.
 */
const RAMP_VIEWPORTS = 0.4
/**
 * Soft, overdamped spring (damping ratio ≈ 1.5): the line trails the scroll,
 * keeps drawing briefly after you stop and settles without any bounce.
 */
const SPRING = { stiffness: 70, damping: 25, restDelta: 0.00005 }
/** Fade the first few px in, so the round cap never pops in as a dot. */
const FADE_IN_PX = 14
/** Sampling step (px along the path) for the scroll → length lookup table. */
const SAMPLE_STEP = 6
/**
 * Minimum downward progress per sample. Rising or flat stretches of the path
 * then reveal gradually as you scroll, instead of all at once.
 */
const MIN_RISE_PER_SAMPLE = SAMPLE_STEP * 0.35
/**
 * The curve is cut into short pieces (at most this many px across) that are
 * drawn as separate <path>s. Changing the stroke reveal repaints an element's
 * whole bounding box, so with one page-long path every frame repainted most
 * of the page; now only the small piece under the tip repaints.
 */
const MAX_PIECE_SPAN = 110

/** Catmull-Rom spline through the points, expressed as cubic Béziers. */
function smoothCurve(points: Point[]): Cubic[] {
  const curves: Cubic[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2

    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    curves.push([p1, c1, c2, p2])
  }
  return curves
}

const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
})

/** De Casteljau split of a cubic at t. Both halves trace the exact same curve. */
function splitCubic([p0, p1, p2, p3]: Cubic, t: number): [Cubic, Cubic] {
  const a = lerp(p0, p1, t)
  const b = lerp(p1, p2, t)
  const c = lerp(p2, p3, t)
  const ab = lerp(a, b, t)
  const bc = lerp(b, c, t)
  const mid = lerp(ab, bc, t)
  return [
    [p0, a, ab, mid],
    [mid, bc, c, p3],
  ]
}

/**
 * Cut each cubic into equal-parameter pieces no larger than MAX_PIECE_SPAN.
 * `curveEnds[i]` is the number of pieces up to and including curve i.
 */
function toPieces(curves: Cubic[]): { pieces: string[]; curveEnds: number[] } {
  const r = (n: number) => Math.round(n * 10) / 10
  const pieces: string[] = []
  const curveEnds: number[] = []
  for (const curve of curves) {
    // The control polygon bounds the curve, so it's a safe size estimate.
    const xs = curve.map((p) => p.x)
    const ys = curve.map((p) => p.y)
    const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))
    const count = Math.max(1, Math.ceil(span / MAX_PIECE_SPAN))

    let rest = curve
    for (let i = count; i > 1; i--) {
      const [head, tail] = splitCubic(rest, 1 / i)
      pieces.push(cubicToD(head, r))
      rest = tail
    }
    pieces.push(cubicToD(rest, r))
    curveEnds.push(pieces.length)
  }
  return { pieces, curveEnds }
}

function cubicToD([p0, c1, c2, p1]: Cubic, r: (n: number) => number): string {
  return `M${r(p0.x)},${r(p0.y)} C${r(c1.x)},${r(c1.y)} ${r(c2.x)},${r(c2.y)} ${r(p1.x)},${r(p1.y)}`
}

/**
 * Lookup table along the scroll-driven part of the line (from `startLength`
 * to the end): for each sampled length, how far down the page the tip must be
 * for the line to be drawn up to that length. Strictly increasing, so we can
 * binary-search "how much line lies above y". Also records where each piece
 * starts along the line and how long it is.
 */
type Lookup = {
  /** Sampled lengths, from `startLength` to `total`. */
  lengths: Float64Array
  reachY: Float64Array
  total: number
  pieceStart: Float64Array
  pieceLength: Float64Array
  /** Length already drawn on load; scrolling animates the rest. */
  startLength: number
}

function buildLookup(paths: SVGPathElement[], drawnPieces: number): Lookup {
  const pieceLength = Float64Array.from(paths, (p) => p.getTotalLength())
  const pieceStart = new Float64Array(paths.length)
  let total = 0
  pieceLength.forEach((len, i) => {
    pieceStart[i] = total
    total += len
  })
  const startLength = drawnPieces < paths.length ? pieceStart[drawnPieces] : total

  // Sample only the scroll-driven part. The drawnOnLoad part is never mapped
  // to scroll, so its (often flat) stretch must not push the mapping ahead.
  const count = Math.max(2, Math.ceil((total - startLength) / SAMPLE_STEP) + 1)
  const lengths = new Float64Array(count)
  const pointY = new Float64Array(count)
  let piece = Math.min(drawnPieces, paths.length - 1)
  for (let i = 0; i < count; i++) {
    const len = Math.min(total, startLength + i * SAMPLE_STEP)
    while (piece < paths.length - 1 && len > pieceStart[piece] + pieceLength[piece]) piece++
    lengths[i] = len
    pointY[i] = paths[piece].getPointAtLength(len - pieceStart[piece]).y
  }

  // Force a minimum rise per sample so flat or rising stretches still reveal
  // gradually. A forward-only pass would leave the target running ahead of
  // the real tip (until a steep drop absorbs the lead); a backward-only pass
  // would leave it behind. Averaging both keeps it centred on the real curve.
  const reachY = new Float64Array(count)
  let ahead = -Infinity
  for (let i = 0; i < count; i++) {
    ahead = Math.max(ahead + MIN_RISE_PER_SAMPLE, pointY[i])
    reachY[i] = ahead
  }
  let behind = Infinity
  for (let i = count - 1; i >= 0; i--) {
    behind = Math.min(behind - MIN_RISE_PER_SAMPLE, pointY[i])
    reachY[i] = (reachY[i] + behind) / 2
  }
  return { lengths, reachY, total, pieceStart, pieceLength, startLength }
}

/** Length of path revealed when the tip is at page-y `y` (interpolated). */
function lengthAtY({ lengths, reachY, total }: Lookup, y: number): number {
  const last = reachY.length - 1
  if (y <= reachY[0]) return lengths[0]
  if (y >= reachY[last]) return total
  let lo = 0
  let hi = last
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (reachY[mid] <= y) lo = mid
    else hi = mid
  }
  const t = (y - reachY[lo]) / (reachY[hi] - reachY[lo])
  return lengths[lo] + t * (lengths[hi] - lengths[lo])
}

/**
 * Target drawing progress (0–1) for a given window scroll position, measured
 * over the part of the line after `startLength` (which is always drawn).
 */
function progressForScroll(scroll: number, { rootTop, rootHeight, vh }: Metrics, lookup: Lookup): number {
  const { startLength, total } = lookup
  if (startLength >= total) return 1
  const startY = lookup.reachY[0]
  const endY = lookup.reachY[lookup.reachY.length - 1]

  // If the line ends lower than the tip can reach at the bottom of the page,
  // stretch the mapping slightly so the line still completes.
  const reachable = rootHeight - vh * (1 - TIP_VIEWPORT_RATIO)
  const stretch = endY > reachable && reachable > 0 ? endY / reachable : 1
  const tipAt = (s: number) => (s + vh * TIP_VIEWPORT_RATIO - rootTop) * stretch

  // Ease from the end of the drawnOnLoad part to the steady-state tip. No
  // clamp on the span: it must land exactly on tipAt(ramp) to stay seamless.
  const ramp = vh * RAMP_VIEWPORTS
  const tipY =
    scroll < ramp
      ? startY + (Math.max(0, scroll) / ramp) * (tipAt(ramp) - startY)
      : tipAt(scroll)

  return Math.max(0, lengthAtY(lookup, tipY) - startLength) / (total - startLength)
}

/**
 * One continuous pink line that threads through the whole page.
 *
 * It's drawn through every <WavePoint /> inside `root`, and re-measured
 * whenever the page resizes (viewport change, fonts or images loading), so
 * the curve always lines up with the actual layout.
 *
 * Its drawing progress follows the scroll position through a soft spring
 * (Motion's useScroll + useSpring): the tip trails toward a point ~58% down
 * the viewport, lags a little on fast scrolls and eases to a stop. Only the
 * stroke reveal animates; the path itself never moves. Scroll and spring
 * updates write straight to the DOM — React only re-renders on re-measure.
 */
export function WavyLine({ root }: { root: HTMLElement | null }) {
  const [geo, setGeo] = useState<Geometry | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathsRef = useRef<SVGPathElement[]>([])
  const lookupRef = useRef<Lookup | null>(null)
  const metricsRef = useRef<Metrics | null>(null)
  /** Last values written to the DOM, so unchanged pieces are never touched. */
  const writtenRef = useRef<{ drawn: Float64Array; opacity: number }>({
    drawn: new Float64Array(0),
    opacity: -1,
  })

  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const target = useMotionValue(0)
  const progress = useSpring(target, SPRING)

  // Measure the anchor points and build the curve.
  useLayoutEffect(() => {
    if (!root) return

    let active = true
    const measure = () => {
      if (!active) return
      const base = root.getBoundingClientRect()
      metricsRef.current = {
        rootTop: base.top + window.scrollY,
        rootHeight: root.offsetHeight,
        vh: window.innerHeight,
      }
      const anchors = Array.from(root.querySelectorAll<HTMLElement>('[data-wave-point]'))
        // skip points hidden at the current breakpoint
        .filter((el) => getComputedStyle(el).display !== 'none')
        .sort((a, b) => Number(a.dataset.wavePoint) - Number(b.dataset.wavePoint))
      const points = anchors.map((el) => {
        const rect = el.getBoundingClientRect()
        return { x: rect.left - base.left, y: rect.top - base.top }
      })

      const { pieces, curveEnds } = toPieces(smoothCurve(points))
      // Curve i ends at point i + 1, so the line up to point k is curves 0..k-1.
      const drawnPoint = anchors.findIndex((el) => el.hasAttribute('data-wave-drawn'))
      const drawnPieces = drawnPoint > 0 ? curveEnds[drawnPoint - 1] : 0

      setGeo({ pieces, drawnPieces, width: base.width, height: base.height })
    }

    // ResizeObserver fires on first observe and then at most once per frame
    // (viewport changes, fonts or images loading).
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    document.fonts?.ready.then(measure)

    return () => {
      active = false
      observer.disconnect()
    }
  }, [root])

  /** Write the current (sprung) progress to the pieces that changed. */
  const render = useCallback(() => {
    const svg = svgRef.current
    const lookup = lookupRef.current
    if (!svg || !lookup) return
    const { startLength, total } = lookup
    const drawn = reducedMotion ? total : startLength + progress.get() * (total - startLength)
    const written = writtenRef.current

    const opacity = Math.min(1, drawn / FADE_IN_PX)
    if (opacity !== written.opacity) {
      written.opacity = opacity
      svg.style.opacity = String(opacity)
    }

    const paths = pathsRef.current
    for (let i = 0; i < paths.length; i++) {
      const len = lookup.pieceLength[i]
      const shown = Math.min(len, Math.max(0, drawn - lookup.pieceStart[i]))
      if (shown === written.drawn[i]) continue
      written.drawn[i] = shown
      const style = paths[i].style
      // Hide pieces the tip hasn't reached, so no zero-length round cap shows.
      style.visibility = shown > 0 ? 'visible' : 'hidden'
      style.strokeDashoffset = String(len - shown)
    }
  }, [progress, reducedMotion])

  const updateTarget = useCallback(() => {
    const metrics = metricsRef.current
    if (metrics && lookupRef.current) {
      target.set(progressForScroll(scrollY.get(), metrics, lookupRef.current))
    }
  }, [scrollY, target])

  // Rebuild the lookup whenever the curve changes, then sync the target.
  useLayoutEffect(() => {
    const svg = svgRef.current
    if (!svg || !geo?.pieces.length) return
    const paths = Array.from(svg.querySelectorAll('path'))
    pathsRef.current = paths
    const lookup = buildLookup(paths, geo.drawnPieces)
    lookupRef.current = lookup
    paths.forEach((path, i) => {
      const len = lookup.pieceLength[i]
      // Gap longer than the piece so the dash never wraps around to the start.
      path.style.strokeDasharray = `${len} ${len + 1}`
    })
    // NaN never equals a number, so every piece is written on the next render.
    writtenRef.current = { drawn: new Float64Array(paths.length).fill(NaN), opacity: -1 }
    updateTarget()
    render()
  }, [geo, updateTarget, render])

  useMotionValueEvent(scrollY, 'change', updateTarget)
  useMotionValueEvent(progress, 'change', render)

  // Viewport height can change without the page resizing (mobile URL bar).
  useLayoutEffect(() => {
    const onResize = () => {
      if (metricsRef.current) metricsRef.current.vh = window.innerHeight
      updateTarget()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [updateTarget])

  if (!geo) return null

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      width={geo.width}
      height={geo.height}
      viewBox={`0 0 ${geo.width} ${geo.height}`}
      // Starts fully hidden; render() reveals it as progress grows.
      style={{ opacity: 0 }}
    >
      {geo.pieces.map((d, i) => (
        <path key={i} d={d} className="wave-stroke" style={{ visibility: 'hidden' }} />
      ))}
    </svg>
  )
}
