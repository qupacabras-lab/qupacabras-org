<script>
  import { publications } from "../data/labData.js";
</script>

<section class="fade-in pb-24 pt-14">
  <div class="mx-auto w-full max-w-6xl px-6">
    <div class="glass rounded-3xl p-8">
      <p class="text-sm font-medium tracking-wide text-white/60">Publications</p>
      <h1 class="mt-4 max-w-[35ch] text-4xl font-semibold tracking-tight text-balance text-white">Recent papers and reports</h1>
      <p class="mt-4 text-lg text-pretty text-white/75">
        Selected publications from the Qupacabras lab. Click any card to read the full paper.
      </p>
    </div>

    {#if publications.length > 0}
      <div class="mt-10 grid gap-6">
        {#each publications as publication (publication.title)}
          <a href={publication.href} target="_blank" rel="noopener noreferrer" aria-label={`Open publication: ${publication.title}`}>
            <article class="card-hover glass rounded-3xl p-6 rise-in">
              <p class="text-xs font-medium tracking-wide text-white/60">{publication.year} — {publication.venue}</p>
              <h2 class="mt-3 text-2xl font-semibold tracking-tight text-white">{publication.title}</h2>
              <p class="mt-3 text-sm text-pretty text-white/70">{publication.summary}</p>
              {#if publication.funders?.length}
                <div class="mt-4 flex flex-wrap gap-2">
                  {#each publication.funders as funder}
                    <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70">
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
  </div>
</section>
