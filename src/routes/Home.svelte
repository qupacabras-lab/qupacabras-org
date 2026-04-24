<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { link } from "svelte-spa-router";

  const currentYear = new Date().getFullYear();
  import {
    fundingPrograms,
    formerPersonnel,
    personnel,
    publications,
    researchThrusts,
  } from "../data/labData.js";

  const memberCount = personnel.length + formerPersonnel.length;
  const collaborationsCount = fundingPrograms.length;
  const researchCount = researchThrusts.length;
  const publicationsCount = publications.length;

  const galleryImages = Object.values(
    import.meta.glob("../assets/gallery/**/*.{png,jpg,jpeg,webp,avif,gif}", {
      eager: true,
      import: "default",
    })
  ).sort((a, b) => a.localeCompare(b));

  const heroImages = galleryImages.length > 0 ? galleryImages : ["https://picsum.photos/seed/qupacabras-lab-temp/1200/900"];
  let heroImageIndex = 0;

  onMount(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const syncPageScrollLock = () => {
      if (desktopQuery.matches) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return;
      }

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };

    syncPageScrollLock();
    desktopQuery.addEventListener("change", syncPageScrollLock);

    let intervalId;

    if (heroImages.length > 1) {
      intervalId = window.setInterval(() => {
        heroImageIndex = (heroImageIndex + 1) % heroImages.length;
      }, 4200);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }

      desktopQuery.removeEventListener("change", syncPageScrollLock);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  });

  const hero = {
    eyebrow: "CSU Quantum Computing Lab",
    title:
      "Bridging quantum theory and hardware through benchmarking, algorithms, and machine learning.",
    description:
      "Qupacabras is the quantum computing lab of Dr. Carlos M. Ortiz Marrero at Colorado State University. We develop application-level benchmarks, study trainability in variational algorithms, and build quantum machine learning methods — in close collaboration with Pacific Northwest National Laboratory and the DOE Co-design Center for Quantum Advantage (C2QA).",
    ctas: [
      { label: "Explore Research", href: "/research", variant: "primary" },
      { label: "Meet the Team", href: "/about", variant: "ghost" },
    ],
  };

  const snapshot = {
    title: "Lab Snapshot",
    items: [
      { label: "Research Thrusts", value: `${researchCount} areas`, href: "/research" },
      { label: "Funding Partners", value: `${collaborationsCount} sources`, href: "/funding" },
      { label: "Lab Members", value: `${memberCount} members`, href: "/about" },
      { label: "Publications", value: `${publicationsCount} papers`, href: "/publications" },
    ],
  };

</script>

<section class="fade-in py-10">
  <div class="mx-auto w-full max-w-6xl px-6">
    <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="space-y-6">
        <p class="text-sm font-medium tracking-wide text-white/60">{hero.eyebrow}</p>
        <h1 class="max-w-[35ch] text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl md:max-w-[30ch]">
          {hero.title}
        </h1>
        <p class="text-lg text-pretty text-white/75">{hero.description}</p>
        <div class="flex flex-wrap gap-4">
          {#each hero.ctas as cta}
            <a
              href={cta.href}
              class={`beast-cta px-6 py-3 text-sm font-semibold ${cta.variant === "ghost" ? "beast-cta--ghost" : ""}`}
            >
              {cta.label}
            </a>
          {/each}
        </div>
      </div>
      <a href="/about/gallery" use:link class="hero-preview glass overflow-hidden rounded-3xl rise-in lg:self-start [animation-delay:120ms] group relative block">
        {#key heroImageIndex}
          <img
            src={heroImages[heroImageIndex]}
            alt=""
            class="h-full w-full object-cover"
            in:fade={{ duration: 420 }}
            out:fade={{ duration: 420 }}
          />
        {/key}
        <div class="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span class="text-sm font-semibold text-white">View Gallery →</span>
        </div>
      </a>
    </div>

    <div>
      <div class="glass rounded-3xl p-5 rise-in [animation-delay:120ms]">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-white">{snapshot.title}</h2>
          <div class="grid gap-3 md:grid-cols-4">
            {#each snapshot.items as item}
              <a href={item.href} use:link class="snapshot-card block rounded-2xl border border-white/10 bg-white/5 p-3">
                <p class="text-xs font-medium tracking-wide text-white/60">{item.label}</p>
                <p class="mt-1 text-lg font-semibold tabular-nums text-white">{item.value}</p>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-xs text-white/35">
      <span>© {currentYear} Qupacabras · Colorado State University · Fort Collins, CO</span>
      <a href="mailto:contact@qupacabras-lab.org" class="hover:text-white/60 transition-colors duration-150">
        contact@qupacabras-lab.org
      </a>
    </div>
  </div>
</section>

<style>
  .hero-preview {
    min-height: clamp(280px, 34vw, 420px);
  }

  @media (min-width: 1024px) {
    .hero-preview {
      height: 93%;
      min-height: 0;
    }
  }

  .snapshot-card {
    transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  }

  .snapshot-card:hover,
  .snapshot-card:focus-visible {
    transform: translateY(-2px) scale(1.02);
    border-color: rgba(215, 153, 33, 0.45);
    box-shadow: 0 16px 30px rgba(29, 32, 33, 0.45);
  }
</style>
