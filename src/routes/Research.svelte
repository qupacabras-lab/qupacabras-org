<script>
  import { initiatives, researchThrusts } from "../data/labData.js";

  const thrustGridClass = researchThrusts.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";
  const initiativeVisible = initiatives.length > 0;
</script>

<section class="fade-in pb-24 pt-14">
  <div class="mx-auto w-full max-w-6xl px-6">
    <div class="glass rounded-3xl p-8">
      <p class="text-sm font-medium tracking-wide text-white/60">Research</p>
      <h1 class="mt-4 max-w-[35ch] text-4xl font-semibold tracking-tight text-balance text-white">Key research thrusts</h1>
      <p class="mt-4 text-lg text-pretty text-white/75">
        Our research strategy connects foundational theory to deployable systems. Each thrust is a
        collaborative effort with partners across CSU, national labs, and industry.
      </p>
    </div>

    {#if researchThrusts.length > 0}
      <div class={`mt-10 grid gap-6 ${thrustGridClass}`}>
        {#each researchThrusts as thrust (thrust.title)}
          <article class="glass rounded-3xl p-6">
            <h2 class="text-xl font-semibold text-white">{thrust.title}</h2>
            <p class="mt-3 text-sm text-pretty text-white/70">{thrust.summary}</p>
            {#if thrust.topics?.length > 0}
              <ul role="list" class="mt-4 space-y-2 text-sm text-white/60">
                {#each thrust.topics as topic}
                  <li>{topic}</li>
                {/each}
              </ul>
            {/if}
          </article>
        {/each}
      </div>
    {/if}

    <div class="mt-12 glass rounded-3xl p-8">
      <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight text-white">Collaborative testbeds</h2>
          <p class="mt-4 text-pretty text-white/75">
            Qupacabras maintains experimental pipelines for ion-trap, neutral-atom, and superconducting
            platforms. These testbeds allow students and collaborators to prototype algorithms under
            real hardware constraints.
          </p>
        </div>
        {#if initiativeVisible}
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p class="text-xs font-medium tracking-wide text-white/60">Current Initiatives</p>
            <div class="mt-4 space-y-3 text-sm text-white/70">
              {#each initiatives as initiative (initiative)}
                <p>{initiative}</p>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
