import { Link } from "react-router";
import { site } from "../content";
import { Logo } from "./Logo";

/**
 * Top navigation. On the homepage the links are in-page anchors (smooth
 * scroll, as before); on other pages they route back to the right place.
 */
export function SiteNav({ onHome = false }: { onHome?: boolean }) {
  const nav = onHome
    ? [
        { label: "projects", to: "#work" },
        { label: "about", to: "/about" },
        { label: "contact", to: "#contact" },
      ]
    : [
        { label: "projects", to: "/projects" },
        { label: "about", to: "/about" },
        { label: "contact", to: "#contact" },
      ];

  return (
    <nav className="shell relative z-20 flex items-center justify-between pt-4 md:pt-4">
      {onHome ? (
        <a href="#top" aria-label={`${site.name} — home`} className="text-text">
          <Logo className="h-8 w-auto transition-transform duration-500 ease-spring md:h-10" />
        </a>
      ) : (
        <Link to="/" aria-label={`${site.name} — home`} className="text-text">
          <Logo className="h-8 w-auto transition-transform duration-500 ease-spring md:h-10" />
        </Link>
      )}
      <ul className="flex gap-5 text-base font-medium sm:gap-10 md:gap-14 md:text-xl">
        {nav.map((item) => (
          <li key={item.label}>
            {item.to.startsWith("#") ? (
              <a href={item.to} className="squiggle-link">
                {item.label}
              </a>
            ) : (
              <Link to={item.to} className="squiggle-link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
