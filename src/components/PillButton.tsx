import type { ReactNode } from "react";
import { ArrowIcon } from "./ArrowIcon";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * text pill CTA. On hover a pink fill rises from the bottom and the
 * arrow swings from ↗ to → — a small, restrained gesture.
 */
export function PillButton({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-text px-7 py-3.5 font-sans text-base font-semibold text-ink transition-transform duration-200 active:scale-[0.97] md:text-lg ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-accent transition-transform duration-500 ease-out-soft group-hover:scale-y-100"
      />
      <span className="relative">{children}</span>
      <ArrowIcon className="relative transition-transform duration-500 ease-spring group-hover:rotate-45" />
    </a>
  );
}
