<script>
  import { link } from "svelte-spa-router";
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

  const hero = {
    eyebrow: "CSU Quantum Computing Lab",
    title:
      "Qupacabras explores quantum advantage through practical algorithms, trusted hardware, and open collaboration.",
    description:
      "We are the official Colorado State University quantum computing lab advancing fault-tolerant computation, quantum control, and workforce development. Our lab partners with national labs and industry to translate theory into deployable quantum systems.",
    ctas: [
      { label: "Explore Research", href: "/research", variant: "primary" },
      { label: "Meet the Team", href: "/about", variant: "ghost" },
    ],
  };

  const snapshot = {
    title: "Lab Snapshot",
    items: [
      { label: "Research Themes", value: `${researchCount} thrusts`, href: "/research" },
      { label: "Collaborations", value: `${collaborationsCount} partners`, href: "/funding" },
      { label: "Lab Members", value: `${memberCount} members`, href: "/about" },
      { label: "Publications", value: `${publicationsCount} papers`, href: "/publications" },
    ],
  };

</script>

<section class="fade-in mx-auto w-full max-w-6xl px-6 pb-10 pt-10">
  <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
    <div class="space-y-6">
      <p class="text-xs uppercase tracking-[0.4em] text-white/60">{hero.eyebrow}</p>
      <h1 class="text-4xl font-semibold text-white md:text-5xl">
        {hero.title}
      </h1>
      <p class="text-lg text-white/75">{hero.description}</p>
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
    <div class="glass overflow-hidden rounded-3xl rise-in" style="animation-delay: 120ms;">
      <img
        src="https://picsum.photos/seed/qupacabras-lab-temp/1200/900"
        alt="Temporary lab placeholder"
        class="h-full w-full object-cover"
      />
    </div>
  </div>

  <div class="mt-10">
    <div class="glass rounded-3xl p-5 rise-in" style="animation-delay: 120ms;">
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-white">{snapshot.title}</h2>
        <div class="grid gap-3 md:grid-cols-4">
          {#each snapshot.items as item}
            <a href={item.href} use:link class="snapshot-card block rounded-2xl border border-white/10 bg-white/5 p-3">
              <p class="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
              <p class="mt-1 text-lg font-semibold text-white">{item.value}</p>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
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
