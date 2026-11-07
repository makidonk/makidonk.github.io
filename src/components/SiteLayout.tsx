import type { ReactNode } from "react";
import { Contact } from "./Contact";
import { SiteNav } from "./SiteNav";

/**
 * Frame for every page except the homepage: the same nav, contact section,
 * footer and paper grain, without the hero or the wavy line.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-clip bg-background font-sans text-text">
      <header id="top">
        <SiteNav />
      </header>
      <main>
        {children}
        <Contact onHome={false} />
      </main>
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-50"
      />
    </div>
  );
}
