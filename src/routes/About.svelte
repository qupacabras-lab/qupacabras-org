<script>
  import { link } from "svelte-spa-router";
  import { formerPersonnel, personnel } from "../data/labData.js";

  const sectionLayouts = {
    personnel: personnel.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1",
    alumni: formerPersonnel.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1",
  };

  let personnelFlipped = personnel.map(() => false);
  let alumniFlipped = formerPersonnel.map(() => false);

  const accentPalette = [
    "var(--gb-accent-rgb)",
    "var(--gb-emerald-rgb)",
    "var(--gb-blue-rgb)",
    "var(--gb-purple-rgb)",
    "var(--gb-red-rgb)",
  ];

  const personnelStyle = (member, index) => {
    const rgb = accentPalette[(member.role.length + index) % accentPalette.length];
    const stagger = `${(index % 7) * 80}ms`;
    return `--role-rgb:${rgb};animation-delay:${stagger};`;
  };

  const alumniStyle = (member, index) => {
    const rgb = accentPalette[(member.name.length + index * 2) % accentPalette.length];
    return `--alumni-rgb:${rgb};`;
  };

  const togglePersonnel = (index) => {
    personnelFlipped = personnelFlipped.map((value, current) => (current === index ? !value : value));
  };

  const toggleAlumni = (index) => {
    alumniFlipped = alumniFlipped.map((value, current) => (current === index ? !value : value));
  };

  const handleCardKey = (event, toggleFn, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFn(index);
    }
  };
</script>

<section class="fade-in mx-auto w-full max-w-6xl px-6 pb-24 pt-14">
  <div class="glass rounded-3xl p-8">
    <p class="text-xs uppercase tracking-[0.4em] text-white/60">About Qupacabras</p>
    <h1 class="mt-4 text-4xl font-semibold text-white">People behind the lab</h1>
    <p class="mt-4 text-lg text-white/75">
      Qupacabras is a collaborative group of faculty, postdocs, graduate students, and undergraduate
      researchers focused on building practical quantum computing systems. We value mentorship,
      cross-disciplinary projects, and open science.
    </p>
    <div class="mt-6">
      <a href="/about/gallery" use:link class="beast-cta inline-flex px-6 py-3 text-sm font-semibold">
        View Photo Gallery
      </a>
    </div>
  </div>

  {#if personnel.length > 0}
    <div class="mt-12">
      <h2 class="text-2xl font-semibold text-white">Personnel</h2>
      <div class={`mt-6 grid gap-6 ${sectionLayouts.personnel}`}>
        {#each personnel as member, index (member.role + member.name)}
          <article
            class={`about-card card-hover rounded-3xl rise-in ${personnelFlipped[index] ? "is-flipped" : ""}`}
            style={personnelStyle(member, index)}
            role="button"
            tabindex="0"
            aria-pressed={personnelFlipped[index]}
            on:click={() => togglePersonnel(index)}
            on:keydown={(event) => handleCardKey(event, togglePersonnel, index)}
          >
            <div class="about-card__inner">
              <div class="about-card__face about-card__front glass rounded-3xl p-6">
                <p class="text-sm uppercase tracking-[0.3em] text-white/60">{member.role}</p>
                <h3 class="mt-3 text-xl font-semibold text-white">{member.name}</h3>
                <p class="mt-2 text-sm text-white/70">{member.focus}</p>
              </div>
              <div class="about-card__face about-card__back glass rounded-3xl p-6">
                <p class="text-sm uppercase tracking-[0.3em] text-white/60">Profile</p>
                <h3 class="mt-3 text-xl font-semibold text-white">More details soon</h3>
                <p class="mt-2 text-sm text-white/70">
                  This back side is intentionally a placeholder. Replace with real bios or links.
                </p>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>
  {/if}

  {#if formerPersonnel.length > 0}
    <div class="mt-12">
      <h2 class="text-2xl font-semibold text-white">Former Personnel</h2>
      <div class={`mt-6 grid gap-6 ${sectionLayouts.alumni}`}>
        {#each formerPersonnel as member, index (member.name)}
          <article
            class={`about-card card-hover rounded-3xl ${alumniFlipped[index] ? "is-flipped" : ""}`}
            style={alumniStyle(member, index)}
            role="button"
            tabindex="0"
            aria-pressed={alumniFlipped[index]}
            on:click={() => toggleAlumni(index)}
            on:keydown={(event) => handleCardKey(event, toggleAlumni, index)}
          >
            <div class="about-card__inner">
              <div class="about-card__face about-card__front glass rounded-3xl p-6">
                <h3 class="text-lg font-semibold text-white">{member.name}</h3>
                <p class="mt-2 text-sm text-white/70">{member.currentRole}</p>
              </div>
              <div class="about-card__face about-card__back glass rounded-3xl p-6">
                <p class="text-sm uppercase tracking-[0.3em] text-white/60">Alumni</p>
                <h3 class="mt-3 text-xl font-semibold text-white">Updates coming soon</h3>
                <p class="mt-2 text-sm text-white/70">
                  Placeholder back side for alumni highlights and links.
                </p>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .about-card {
    perspective: 1200px;
    transform-style: preserve-3d;
  }

  .about-card__inner {
    position: relative;
    min-height: 160px;
    transform-style: preserve-3d;
    transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .about-card__face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
  }

  .about-card__front {
    transform: rotateY(0deg);
  }

  .about-card__back {
    transform: rotateY(180deg);
  }

  .about-card.is-flipped {
    --card-tilt: 0deg;
  }

  .about-card.is-flipped .about-card__inner {
    transform: rotateY(180deg);
  }
</style>
