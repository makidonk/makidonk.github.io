import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * On route changes: jump to the top of the new page, or to `#section` when the
 * link has a hash (e.g. "/#about" from a project page). Back/forward (POP) and
 * plain in-page anchor clicks are left to the browser.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}
