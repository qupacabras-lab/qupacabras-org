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

<section class="fade-in pb-24 pt-14">
  <div class="mx-auto w-full max-w-6xl px-6">
    <div class="glass rounded-3xl p-8">
      <p class="text-sm font-medium tracking-wide text-white/60">About Qupacabras</p>
      <h1 class="mt-4 max-w-[35ch] text-4xl font-semibold tracking-tight text-balance text-white">People behind the lab</h1>
      <p class="mt-4 text-lg text-pretty text-white/75">
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
        <h2 class="text-2xl font-semibold tracking-tight text-white">Personnel</h2>
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
                      class="headshot h-56 w-44 rounded-2xl md:h-60 md:w-48"
                      loading="lazy"
                      on:error={(event) => handleHeadshotError(event, member, "personnel")}
                    />
                    <div class="about-card__copy">
                      <p class="text-xs font-medium tracking-wide text-white/60">{member.role}</p>
                      <h3 class="mt-2 text-xl font-semibold text-white">{member.name}</h3>
                      <p class="mt-1 text-sm text-white/70">{member.summary}</p>
                    </div>
                  </div>
                  <p class="absolute bottom-3 right-4 select-none text-sm text-white/30">↻</p>
                </div>
                <div class="about-card__face about-card__back glass rounded-3xl px-5 py-6">
                  <p class="text-xs font-medium tracking-wide text-white/60">Profile</p>
                  <h3 class="mt-3 text-xl font-semibold text-white">{member.name}</h3>
                  <p class="mt-1 text-xs font-medium tracking-wide text-white/55">{member.role}</p>
                  <p class="mt-4 text-sm text-pretty text-white/75">{member.focus}</p>
                  {#if member.contact?.length}
                    <div class="mt-4 border-t border-white/10 pt-4">
                      <div class="flex w-full justify-evenly">
                        {#each member.contact as item}
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            class="text-white/50 hover:text-white transition-colors duration-150"
                          >
                            {#if item.type === 'email'}
                              <svg viewBox="0 0 20 20" class="size-6 shrink-0 fill-current" aria-hidden="true">
                                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"/>
                                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"/>
                              </svg>
                            {:else if item.type === 'scholar'}
                              <svg viewBox="0 0 20 20" class="size-6 shrink-0 fill-current" aria-hidden="true">
                                <path d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a.999.999 0 0 1 .356-.257l4-1.714a1 1 0 1 1 .788 1.838l-2.727 1.17 1.94.831a1 1 0 0 0 .787 0l7-3a1 1 0 0 0 0-1.838l-7-3ZM3.31 9.397 5 10.12v4.102a8.969 8.969 0 0 0-1.05-.174 1 1 0 0 1-.89-.89 11.115 11.115 0 0 1 .25-3.762Zm5.99 7.176A9.026 9.026 0 0 0 7 14.935v-3.957l1.818.78a3 3 0 0 0 2.364 0l5.508-2.361a11.026 11.026 0 0 1 .25 3.762 1 1 0 0 1-.89.89 8.968 8.968 0 0 0-5.35 2.524 1 1 0 0 1-1.4 0ZM6 18a1 1 0 0 0 1-1v-2.065a8.935 8.935 0 0 0-2-.712V17a1 1 0 0 0 1 1Z"/>
                              </svg>
                            {:else if item.type === 'github'}
                              <svg viewBox="0 0 24 24" class="size-6 shrink-0 fill-current" aria-hidden="true">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z"/>
                              </svg>
                            {/if}
                          </a>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/if}

    {#if formerPersonnel.length > 0}
      <div class="mt-12">
        <h2 class="text-2xl font-semibold tracking-tight text-white">Former Personnel</h2>
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
                      class="headshot h-56 w-44 rounded-2xl md:h-60 md:w-48"
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
                  <p class="text-xs font-medium tracking-wide text-white/60">Alumni</p>
                  <h3 class="mt-3 text-xl font-semibold text-white">{member.name}</h3>
                  <div class="mt-4 space-y-3 text-sm text-white/75">
                    <p><span class="font-semibold text-white">Current role:</span> Add title, org, and location.</p>
                    <p><span class="font-semibold text-white">Lab work:</span> Add project area and contributions.</p>
                    <p><span class="font-semibold text-white">Now focused on:</span> Add current interests or specialization.</p>
                    <p><span class="font-semibold text-white">Links:</span> LinkedIn · Google Scholar · portfolio.</p>
                  </div>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .about-card {
    perspective: 1200px;
    transform-style: preserve-3d;
  }

  .about-card__inner {
    position: relative;
    min-height: 400px;
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
      min-height: 380px;
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
