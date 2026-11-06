type Props = { className?: string }

/** North-east arrow (↗) drawn as a stroke so it inherits currentColor. */
export function ArrowIcon({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-[0.85em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  )
}
