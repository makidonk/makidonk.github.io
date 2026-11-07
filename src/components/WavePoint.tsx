/**
 * TEMPORARY DEBUG: set to true to show a numbered marker at every WavePoint.
 * Delete this flag and the marker below when you're done tuning positions.
 */
const DEBUG_WAVE_POINTS = false;

type Props = {
  /** Order along the line. Points are connected in ascending order. */
  order: number;
  /**
   * Tailwind classes positioning this point, e.g. "absolute left-1/2 top-3/4".
   * Use responsive variants to move it per breakpoint, or `hidden md:block`
   * to only use the point on larger screens.
   */
  className: string;
  /**
   * The line is already drawn up to this point when the page loads; scrolling
   * continues drawing from here. Use on at most one point.
   */
  drawnOnLoad?: boolean;
};

/**
 * An invisible anchor the continuous wavy line passes through.
 * Drop these anywhere in the layout; <WavyLine /> collects and connects them.
 */
export function WavePoint({ order, className, drawnOnLoad = false }: Props) {
  return (
    <span
      aria-hidden="true"
      data-wave-point={order}
      data-wave-drawn={drawnOnLoad ? "" : undefined}
      className={`pointer-events-none size-0 ${className}`}
    >
      {DEBUG_WAVE_POINTS && (
        // Absolutely positioned and centred on the anchor's (0, 0), so it never
        // changes the anchor's size or position that WavyLine measures.
        <span className="absolute left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <span className="block size-3 rounded-full bg-[#00e5ff] ring-2 ring-black" />
          <span className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-black px-1.5 py-0.5 font-mono text-xs font-bold leading-none text-white">
            {order}
            {drawnOnLoad && " (drawn)"}
          </span>
        </span>
      )}
    </span>
  );
}
