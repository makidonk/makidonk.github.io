type Props = {
  /** Order along the line. Points are connected in ascending order. */
  order: number
  /**
   * Tailwind classes positioning this point, e.g. "absolute left-1/2 top-3/4".
   * Use responsive variants to move it per breakpoint, or `hidden md:block`
   * to only use the point on larger screens.
   */
  className: string
  /**
   * The line is already drawn up to this point when the page loads; scrolling
   * continues drawing from here. Use on at most one point.
   */
  drawnOnLoad?: boolean
}

/**
 * An invisible anchor the continuous wavy line passes through.
 * Drop these anywhere in the layout; <WavyLine /> collects and connects them.
 */
export function WavePoint({ order, className, drawnOnLoad = false }: Props) {
  return (
    <span
      aria-hidden="true"
      data-wave-point={order}
      data-wave-drawn={drawnOnLoad ? '' : undefined}
      className={`pointer-events-none size-0 ${className}`}
    />
  )
}
