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

  const differentiators = {
    title: "What sets Qupacabras apart",
    description:
      "We operate at the boundary of theory and deployment, building systems that are resilient, reproducible, and ready for field use. Our mission is to make quantum advantage tangible for scientists, students, and industry partners.",
    highlights: [
      {
        title: "Open Quantum Stack",
        description: "Reusable libraries for error mitigation and calibration.",
      },
      {
        title: "Resilient Testbeds",
        description: "Digital twins that accelerate device validation.",
      },
    ],
  };
</script>

<section class="fade-in mx-auto w-full max-w-6xl px-6 pb-24 pt-16">
  <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
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
    <div class="glass rounded-3xl p-6 rise-in" style="animation-delay: 120ms;">
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-white">{snapshot.title}</h2>
        <div class="grid gap-4">
          {#each snapshot.items as item}
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
              <p class="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="mt-16 grid gap-6 md:grid-cols-3">
    {#each focusAreas as area, index}
      <div
        class="glass rounded-3xl p-6 rise-in"
        style={`animation-delay: ${180 + index * 60}ms;`}
      >
        <h3 class="text-lg font-semibold text-white">{area.title}</h3>
        <p class="mt-3 text-sm text-white/70">{area.description}</p>
      </div>
    {/each}
  </div>

  <div class="mt-16 glass rounded-3xl p-8">
    <div class="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <h2 class="text-2xl font-semibold text-white">{differentiators.title}</h2>
        <p class="mt-4 text-white/75">{differentiators.description}</p>
      </div>
      <div class="grid gap-4">
        {#each differentiators.highlights as highlight}
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p class="text-sm font-semibold text-white">{highlight.title}</p>
            <p class="mt-2 text-sm text-white/70">{highlight.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
