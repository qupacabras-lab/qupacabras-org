import "./app.css";
import App from "./App.svelte";

if (!window.location.hash) {
  window.location.hash = window.location.pathname === "/" ? "#/" : `#${window.location.pathname}`;
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
