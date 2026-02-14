<script>
  import {
    fundingPrograms,
    formerPersonnel,
    personnel,
    publications,
    researchThrusts,
  } from "../data/labData.js";

  const studentTrainingCount = [...personnel, ...formerPersonnel].filter((member) =>
    /undergraduate|graduate/i.test(member.role)
  ).length;
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
      { label: "Research Themes", value: `${researchCount} active thrusts` },
      { label: "Collaborations", value: `${collaborationsCount} funding partners` },
      { label: "Student Training", value: `${studentTrainingCount} students trained` },
      { label: "Publications", value: `${publicationsCount} papers published` },
    ],
  };

  const focusAreas = [
    {
      title: "Algorithmic Frontiers",
      description: "Hybrid quantum-classical workflows for chemistry, logistics, and secure communications.",
    },
    {
      title: "Hardware-Aware Design",
      description: "Compilation pipelines tuned for ion traps, neutral atoms, and superconducting devices.",
    },
    {
      title: "Quantum Workforce",
      description: "Training a diverse team through immersive labs, open-source tools, and national workshops.",
    },
  ];

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
    <div class="glass rounded-3xl p-5 rise-in" style="animation-delay: 120ms;">
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-white">{snapshot.title}</h2>
        <div class="grid gap-4">
          {#each snapshot.items as item}
            <div class="snapshot-card rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
              <p class="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="mt-10 grid gap-6 md:grid-cols-3">
    {#each focusAreas as area, index}
      <div
        class="glass rounded-3xl p-6 rise-in"
        style={`animation-delay: ${180 + index * 60}ms;`}
      >
        <h3 class="text-base font-semibold text-white">{area.title}</h3>
        <p class="mt-3 text-sm text-white/70">{area.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .snapshot-card {
    transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  }

  .snapshot-card:hover,
  .snapshot-card:focus-within {
    transform: translateY(-2px) scale(1.02);
    border-color: rgba(215, 153, 33, 0.45);
    box-shadow: 0 16px 30px rgba(29, 32, 33, 0.45);
  }
</style>
