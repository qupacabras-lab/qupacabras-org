import { readable } from "svelte/store";

// Reactive `prefers-reduced-motion` flag shared across components. Stays false
// during SSR / when matchMedia is unavailable, and updates live if the user
// changes their OS setting.
export const reducedMotion = readable(false, (set) => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return;
  }

  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  set(query.matches);

  const onChange = (event) => set(event.matches);
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
});
