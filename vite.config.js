import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { imagetools } from "vite-imagetools";

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
  plugins: [
    svelte(),
    // Generate responsive WebP derivatives for images imported with imagetools
    // query directives (e.g. ?as=srcset). The include regex requires a `?`, so
    // plain imports are left to Vite's normal asset handling and only queried
    // imports are transformed.
    imagetools({ include: /^[^?]+\.(jpe?g|png|webp|avif|gif|tiff)\?.*$/ }),
    cspPlugin,
  ],
});
