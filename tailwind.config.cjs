module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#10141f",
        mist: "#e8edf4",
        glow: "#63d1ff",
        ember: "#f7a35c",
        sea: "#1c4b6e",
      },
      boxShadow: {
        halo: "0 0 0 1px rgba(99, 209, 255, 0.35), 0 30px 60px rgba(12, 29, 48, 0.35)",
      },
    },
  },
  plugins: [],
};
