<script>
  import { fundingPrograms, publications } from "../data/labData.js";

  const fundingStyle = (entry, index) => {
    const delay = (index % 6) * 70;
    return `--stagger: ${delay}ms;`;
  };

  const publicationsByFunder = (source) =>
    publications.filter((publication) => publication.funders?.includes(source));

  let openStates = fundingPrograms.map(() => false);

  const toggleOpen = (index) => {
    openStates = openStates.map((state, current) => (current === index ? !state : state));
  };

  const handleKey = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleOpen(index);
    }
  };
</script>

<section class="fade-in pb-24 pt-14">
  <div class="mx-auto w-full max-w-6xl px-6">
    <div class="glass rounded-3xl p-8">
      <p class="text-sm font-medium tracking-wide text-white/60">Funding</p>
      <h1 class="mt-4 max-w-[35ch] text-4xl font-semibold tracking-tight text-balance text-white">Grants and partnerships</h1>
      <p class="mt-4 text-lg text-pretty text-white/75">
        Our research is supported by federal agencies, state initiatives, and industry partners
        committed to expanding quantum computing capabilities.
      </p>
    </div>

    {#if fundingPrograms.length > 0}
      <div class="mt-10 grid gap-6">
        {#each fundingPrograms as entry, index (entry.source + entry.program)}
          <article
            class={`card-hover glass rounded-3xl p-6 rise-in [animation-delay:var(--stagger)] ${openStates[index] ? "funding-card--open" : ""}`}
            style={fundingStyle(entry, index)}
            role="button"
            tabindex="0"
            aria-expanded={openStates[index]}
            on:click={() => toggleOpen(index)}
            on:keydown={(event) => handleKey(event, index)}
          >
            <div class="funding-summary">
              <p class="text-xs font-medium tracking-wide text-white/60">{entry.source}</p>
              <h2 class="mt-3 text-xl font-semibold text-white">{entry.program}</h2>
              <p class="mt-3 text-sm text-pretty text-white/70">{entry.details}</p>
            </div>
            {#if publicationsByFunder(entry.source).length}
              <div class="funding-details mt-4 text-sm text-white/70">
                <div class="funding-details-inner">
                  <p class="text-sm font-semibold text-white">Associated publications</p>
                  <ul role="list" class="mt-3 space-y-2 text-sm text-white/70">
                    {#each publicationsByFunder(entry.source) as publication}
                      <li>{publication.title} ({publication.venue}, {publication.year})</li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    {/if}

    <div class="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 class="text-2xl font-semibold tracking-tight text-white">Interested in partnering?</h2>
      <p class="mt-4 text-pretty text-white/75">
        We welcome new collaborations that align with our mission to build accessible quantum
        technologies. Reach out to discuss joint proposals, internships, or shared infrastructure.
      </p>
      <p class="mt-6 text-sm text-white/70">
        Email:
        <a class="text-white/80 hover:text-white" href="mailto:partnerships@qupacabras-lab.org">
          partnerships@qupacabras-lab.org
        </a>
      </p>
    </div>
  </div>
</section>

<style>
  .funding-summary {
    cursor: pointer;
  }

  .funding-summary::after {
    content: "▾";
    float: right;
    color: rgba(255, 255, 255, 0.6);
    transition: transform 160ms ease;
  }

  .funding-card--open .funding-summary::after {
    transform: rotate(-180deg);
  }

  .funding-details {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 640ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .funding-card--open .funding-details {
    grid-template-rows: 1fr;
  }

  .funding-details-inner {
    overflow: hidden;
    transform-origin: top;
    transform: scaleY(0.92);
    opacity: 0;
    transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms ease;
    will-change: transform, opacity;
  }

  .funding-card--open .funding-details-inner {
    transform: scaleY(1);
    opacity: 1;
  }

</style>
