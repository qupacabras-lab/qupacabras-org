<script>
  import { link } from "svelte-spa-router";
  import { publications } from "../data/labData.js";

  const cardClass = () => "glass rounded-3xl p-6 rise-in";
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
        <a href={publication.href} use:link aria-label={`Open publication: ${publication.title}`}>
          <article class={`card-hover ${cardClass(index)}`}>
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
