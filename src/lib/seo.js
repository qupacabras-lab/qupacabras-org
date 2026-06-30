// Per-route page metadata for the hash-routed SPA.
//
// We update the document title and the EXISTING <meta name="description"> in
// place rather than emitting tags via <svelte:head>, which would append a
// second description meta alongside the static one in index.html. The static
// tags in index.html remain the canonical homepage metadata seen by social
// scrapers and no-JS crawlers; this helper refines title/description per route
// for browsers and JS-rendering crawlers.

export function setMeta(title, description) {
  if (typeof document === "undefined") return;

  if (title) {
    document.title = title;
  }

  if (description) {
    let tag = document.head.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }
}
