<script>
  import { fly } from "svelte/transition";
  import Router, { location } from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import ParticleBackground from "./components/ParticleBackground.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Research from "./routes/Research.svelte";
  import Publications from "./routes/Publications.svelte";
  import Funding from "./routes/Funding.svelte";
  import Gallery from "./routes/Gallery.svelte";
  import Placeholder from "./routes/Placeholder.svelte";

  const routes = {
    "/": Home,
    "/about": About,
    "/about/gallery": Gallery,
    "/research": Research,
    "/publications": Publications,
    "/funding": Funding,
    "/placeholder": Placeholder,
    "*": Placeholder,
  };

  $: $location, window.scrollTo(0, 0);

  let creditsOpen = false;

  const toggleCredits = () => {
    creditsOpen = !creditsOpen;
  };

  const closeCredits = () => {
    creditsOpen = false;
  };

  const handleWindowKeydown = (event) => {
    if (event.key === "Escape" && creditsOpen) {
      closeCredits();
    }
  };

</script>

<svelte:head>
  <title>Qupacabras | CSU Quantum Computing Lab</title>
  <meta
    name="description"
    content="Qupacabras is Colorado State University's Quantum Computing Lab advancing quantum algorithms, hardware-aware compilation, and quantum education."
  />
</svelte:head>

<svelte:window on:keydown={handleWindowKeydown} />

<div class="antialiased relative min-h-dvh">
  <ParticleBackground />

  <Navbar />

  <main class="relative z-10 isolate">
    <Router {routes} />
  </main>

  {#if $location !== '/'}
    <Footer />
  {/if}

  <div class="fixed bottom-5 right-5 z-30 flex flex-col items-end">
    {#if creditsOpen}
      <div
        class="mb-3 w-[min(92vw,22rem)] rounded-2xl border border-white/15 bg-[rgba(29,32,33,0.94)] p-4 text-sm text-white/85 shadow-[0_18px_36px_rgba(0,0,0,0.45)] backdrop-blur-md"
        transition:fly={{ y: 12, duration: 220, opacity: 0.25 }}
      >
        <p class="text-xs uppercase tracking-[0.2em] text-white/60">Site Info</p>
        <p class="mt-3"><span class="font-semibold text-white">Purpose:</span> Official website for CSU's Quantum Computing Lab (Qupacabras).</p>
        <p class="mt-2"><span class="font-semibold text-white">Frontend stack:</span> Svelte 4 + Tailwind CSS.</p>
        <p class="mt-2"><span class="font-semibold text-white">Libraries & tools:</span> Vite, svelte-spa-router, PostCSS, and Autoprefixer.</p>
        <p class="mt-2"><span class="font-semibold text-white">Design direction:</span> Gruvbox-inspired charcoal, sand, amber, olive, and muted teal.</p>
        <p class="mt-2"><span class="font-semibold text-white">Developer/Designer:</span> Leo Rodolico</p>
        <p class="mt-2"><span class="font-semibold text-white">AI support:</span> GPT-5.3 Codex and Claude Sonnet 4.6 with the <code class="text-white/70">ui.sh</code> skill</p>
      </div>
    {/if}

    <button
      type="button"
      class="credit-button inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-lg font-semibold text-white"
      aria-expanded={creditsOpen}
      aria-label={creditsOpen ? "Hide site credits" : "Show site credits"}
      on:click={toggleCredits}
    >
      ?
    </button>
  </div>
</div>

<style>
  .credit-button {
    background: linear-gradient(145deg, rgba(29, 32, 33, 0.92), rgba(60, 56, 54, 0.88));
    box-shadow: 0 0 0 1px rgba(215, 153, 33, 0.28), 0 10px 24px rgba(29, 32, 33, 0.48);
    transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
  }

  .credit-button:hover,
  .credit-button:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(215, 153, 33, 0.6);
    box-shadow: 0 0 0 1px rgba(215, 153, 33, 0.42), 0 14px 30px rgba(29, 32, 33, 0.56);
  }
</style>
