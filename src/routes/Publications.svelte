<script>
  import { link } from "svelte-spa-router";
  import { publications } from "../data/labData.js";

  const cardShape = ["md:col-span-2", "", "", ""];
  const accentHues = [96, 110, 132, 8];

  const hash = (value) => {
    let result = 0;
    for (const char of value) {
      result = (result << 5) - result + char.charCodeAt(0);
      result |= 0;
    }
    return Math.abs(result);
  };

  const cardStyle = (publication, index) => {
    const basis = hash(`${publication.venue}${publication.year}${index}`);
    const hue = accentHues[basis % accentHues.length];
    const tilt = ((basis % 7) - 3) * 0.2;
    return `--accent-hue:${hue};--tilt:${tilt}deg;`;
  };

  const cardClass = (index) => {
    const featured = publications.length > 2 ? cardShape[index % cardShape.length] : "";
    return `publication-card glass rounded-3xl p-6 rise-in ${featured}`;
  };
</script>

<section class="fade-in mx-auto w-full max-w-6xl px-6 pb-24 pt-14">
  <div class="glass rounded-3xl p-8">
    <p class="text-xs uppercase tracking-[0.4em] text-white/60">Publications</p>
    <h1 class="mt-4 text-4xl font-semibold text-white">Recent papers and reports</h1>
    <p class="mt-4 text-lg text-white/75">
      These are intentionally marked placeholder entries for upcoming quantum research outputs.
      Click any card to view the current under-construction status page.
    </p>
  </div>

  {#if publications.length > 0}
    <div class="mt-10 grid gap-6">
      {#each publications as publication, index (publication.title)}
        <a href={publication.href} use:link class="publication-link" aria-label={`Open publication: ${publication.title}`}>
          <article class={cardClass(index)} style={cardStyle(publication, index)}>
            <p class="text-xs uppercase tracking-[0.3em] text-white/60">{publication.year} - {publication.venue}</p>
            <h2 class="mt-3 text-2xl font-semibold text-white">{publication.title}</h2>
            <p class="mt-3 text-sm text-white/70">{publication.summary}</p>
            {#if publication.funders?.length}
              <div class="mt-4 flex flex-wrap gap-2">
                {#each publication.funders as funder}
                  <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
                    {funder}
                  </span>
                {/each}
              </div>
            {/if}
          </article>
        </a>
      {/each}
    </div>
  {/if}
</section>

<style>
  .publication-link {
    display: block;
  }

  .publication-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-color: hsla(var(--accent-hue), 80%, 72%, 0.32);
    transform: perspective(1200px) rotateX(var(--tilt));
    transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
  }

  .publication-card::after {
    content: "";
    position: absolute;
    inset: -80px;
    background: radial-gradient(circle at top right, hsla(var(--accent-hue), 90%, 62%, 0.22), transparent 56%);
    pointer-events: none;
  }

  .publication-link:hover .publication-card,
  .publication-link:focus-visible .publication-card {
    border-color: hsla(var(--accent-hue), 84%, 74%, 0.55);
    transform: perspective(1200px) rotateX(var(--tilt)) translateY(-3px);
    box-shadow: 0 14px 30px rgba(4, 9, 8, 0.5);
  }
</style>
