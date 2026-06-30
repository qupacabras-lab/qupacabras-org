import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// Inject a Content-Security-Policy meta tag into the built HTML only. It is
// kept out of the dev server (apply: "build") so it does not block Vite HMR's
// inline scripts / websocket.
const cspPlugin = {
  name: "inject-csp",
  apply: "build",
  transformIndexHtml(html) {
    const csp = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
    return {
      html,
      tags: [
        {
          tag: "meta",
          attrs: { "http-equiv": "Content-Security-Policy", content: csp },
          injectTo: "head-prepend",
        },
      ],
    };
  },
};

export default defineConfig({
  plugins: [svelte(), cspPlugin],
});
