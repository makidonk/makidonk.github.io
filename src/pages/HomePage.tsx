import { useState } from "react";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Hero } from "../components/Hero";
import { SelectedWork } from "../components/SelectedWork";
import { WavyLine } from "../components/WavyLine";
import { useDocumentTitle } from "../components/useDocumentTitle";

export function HomePage() {
  // Callback ref (via state) so the line re-measures once the page element exists
  const [page, setPage] = useState<HTMLDivElement | null>(null);
  useDocumentTitle();

  return (
    <div
      ref={setPage}
      className="relative overflow-x-clip bg-background font-sans text-text"
    >
      <WavyLine root={page} />
      <Hero />
      <main>
        <SelectedWork />
        <About />
        <Contact />
      </main>
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-50"
      />
    </div>
  );
}
