<script>
  import { link } from "svelte-spa-router";

  const galleryPhotos = [
    {
      title: "Night Calibration Run",
      description: "Pulse tests on the superconducting rack during late-shift benchmarking.",
      src: "https://picsum.photos/seed/qupacabra-lab-1/1200/900"
    },
    {
      title: "Cryostat Bay",
      description: "Cooling and wiring checks before a full experiment cycle.",
      src: "https://picsum.photos/seed/qupacabra-lab-2/1200/900"
    },
    {
      title: "Control Room",
      description: "Real-time dashboards tracking error rates and pulse drift.",
      src: "https://picsum.photos/seed/qupacabra-lab-3/1200/900"
    },
    {
      title: "Student Build Session",
      description: "Graduate and undergraduate team pairing on hardware-in-the-loop tooling.",
      src: "https://picsum.photos/seed/qupacabra-lab-4/1200/900"
    },
    {
      title: "Partner Visit",
      description: "Joint testbed walkthrough with collaborators from national labs.",
      src: "https://picsum.photos/seed/qupacabra-lab-5/1200/900"
    },
    {
      title: "Field Workshop",
      description: "Hands-on outreach event introducing practical quantum workflows.",
      src: "https://picsum.photos/seed/qupacabra-lab-6/1200/900"
    }
  ];

  const mosaicPattern = ["md:col-span-2", "", "", "", "md:col-span-2", ""];
  const accentHues = [96, 110, 132, 8];

  const tileClass = (index) => {
    const pattern = galleryPhotos.length > 2 ? mosaicPattern[index % mosaicPattern.length] : "";
    return `gallery-tile glass rounded-3xl p-3 rise-in ${pattern}`;
  };

  const tileStyle = (photo, index) => {
    const hue = accentHues[(photo.title.length + index * 3) % accentHues.length];
    const delay = `${(index % 8) * 70}ms`;
    return `--tile-hue:${hue};animation-delay:${delay};`;
  };
</script>

<section class="fade-in mx-auto w-full max-w-6xl px-6 pb-24 pt-14">
  <div class="glass rounded-3xl p-8">
    <p class="text-xs uppercase tracking-[0.4em] text-white/60">About / Gallery</p>
    <h1 class="mt-4 text-4xl font-semibold text-white">Lab moments and field captures</h1>
    <p class="mt-4 text-lg text-white/75">
      A visual archive of lab experiments, collaborations, workshops, and the people building
      practical quantum systems.
    </p>
    <div class="mt-6">
      <a href="/about" use:link class="beast-cta beast-cta--ghost inline-flex px-6 py-3 text-sm font-semibold">
        Back to About
      </a>
    </div>
  </div>

  {#if galleryPhotos.length > 0}
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      {#each galleryPhotos as photo, index (photo.title + photo.src)}
        <article class={tileClass(index)} style={tileStyle(photo, index)}>
          <img class="gallery-image w-full rounded-2xl object-cover" src={photo.src} alt={photo.title} loading="lazy" />
          <div class="px-2 pb-2 pt-4">
            <h2 class="text-lg font-semibold text-white">{photo.title}</h2>
            <p class="mt-2 text-sm text-white/70">{photo.description}</p>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .gallery-tile {
    border-color: hsla(var(--tile-hue), 74%, 70%, 0.34);
    overflow: hidden;
  }

  .gallery-image {
    height: clamp(180px, 26vw, 280px);
    border: 1px solid hsla(var(--tile-hue), 76%, 72%, 0.3);
    filter: saturate(1.08) contrast(1.04);
  }
</style>
