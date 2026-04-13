<script>
  import { link } from "svelte-spa-router";
  import { formerPersonnel, personnel } from "../data/labData.js";

  const sectionLayouts = {
    personnel:
      personnel.length > 2 ? "md:grid-cols-2 lg:grid-cols-3" : personnel.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1",
    alumni:
      formerPersonnel.length > 2
        ? "md:grid-cols-2 lg:grid-cols-3"
        : formerPersonnel.length > 1
          ? "md:grid-cols-2"
          : "md:grid-cols-1",
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

  const memberSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const headshotFor = (name, group) => `https://picsum.photos/seed/qupacabras-${group}-${memberSlug(name)}/320/320`;

  const resolvedHeadshot = (member, group) => member.image || headshotFor(member.name, group);

  const handleHeadshotError = (event, member, group) => {
    const fallback = headshotFor(member.name, group);
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
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
              <div class="about-card__face about-card__front about-card__front--spacious glass rounded-3xl pt-5">
                <div class="about-card__profile gap-3">
                  <img
                    src={resolvedHeadshot(member, "personnel")}
                    alt={`Headshot of ${member.name}`}
                    class="headshot h-52 w-40 rounded-2xl md:h-56 md:w-44"
                    loading="lazy"
                    on:error={(event) => handleHeadshotError(event, member, "personnel")}
                  />
                  <div class="about-card__copy">
                    <p class="text-sm uppercase tracking-[0.3em] text-white/60">{member.role}</p>
                    <h3 class="mt-2 text-xl font-semibold text-white">{member.name}</h3>
                    <p class="mt-1 text-sm text-white/70">{member.focus}</p>
                  </div>
                </div>
              </div>
              <div class="about-card__face about-card__back glass rounded-3xl px-5 py-6">
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
              <div class="about-card__face about-card__front about-card__front--spacious glass rounded-3xl pt-5">
                <div class="about-card__profile gap-3">
                  <img
                    src={resolvedHeadshot(member, "alumni")}
                    alt={`Headshot of ${member.name}`}
                    class="headshot h-52 w-40 rounded-2xl md:h-56 md:w-44"
                    loading="lazy"
                    on:error={(event) => handleHeadshotError(event, member, "alumni")}
                  />
                  <div class="about-card__copy">
                    <h3 class="text-lg font-semibold text-white">{member.name}</h3>
                    <p class="mt-1 text-sm text-white/70">{member.currentRole}</p>
                  </div>
                </div>
              </div>
              <div class="about-card__face about-card__back glass rounded-3xl px-5 py-6">
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
    min-height: 402px;
    transform-style: preserve-3d;
    transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .about-card__profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    padding-bottom: 1.5rem;
  }

  .about-card__copy {
    width: 100%;
    padding-inline: 0.875rem;
  }

  .headshot {
    border: 1px solid rgba(255, 255, 255, 0.2);
    object-fit: cover;
    box-shadow: 0 10px 22px rgba(29, 32, 33, 0.45);
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    .about-card__inner {
      min-height: 382px;
    }
  }

  .about-card__face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
  }

  .about-card__front {
    transform: rotateY(0deg);
  }

  .about-card__front--spacious {
    padding-bottom: 3.5rem;
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
