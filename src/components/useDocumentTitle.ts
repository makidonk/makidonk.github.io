import { useEffect } from "react";
import { site } from "../content";

const DEFAULT_TITLE = `${site.name} — ${site.role}`;

/** Sets the browser tab title for the current page. */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : DEFAULT_TITLE;
  }, [title]);
}
