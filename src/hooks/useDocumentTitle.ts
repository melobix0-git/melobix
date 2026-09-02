import { useEffect } from "react";
import { site } from "@/data/site";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const base = `${site.name} — ${site.tagline}`;
    document.title = title ? `${title} · ${site.name}` : base;
    return () => {
      document.title = base;
    };
  }, [title]);
}
