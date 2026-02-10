<script>
  import Router from "svelte-spa-router";
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

</script>

<svelte:head>
  <title>Qupacabras | CSU Quantum Computing Lab</title>
  <meta
    name="description"
    content="Qupacabras is Colorado State University's Quantum Computing Lab advancing quantum algorithms, hardware-aware compilation, and quantum education."
  />
</svelte:head>

<div class="relative min-h-screen">
  <ParticleBackground />

  <Navbar />

  <main class="relative z-10">
    <Router {routes} />
  </main>

  <Footer />
</div>
