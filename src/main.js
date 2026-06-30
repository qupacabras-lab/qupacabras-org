import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./app.css";
import { mount } from "svelte";
import App from "./App.svelte";

if (!window.location.hash) {
  window.location.hash = window.location.pathname === "/" ? "#/" : `#${window.location.pathname}`;
}

const app = mount(App, {
  target: document.getElementById("app"),
});

export default app;
