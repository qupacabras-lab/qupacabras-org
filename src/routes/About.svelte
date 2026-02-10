<script>
  import { link } from "svelte-spa-router";
  import { formerPersonnel, personnel } from "../data/labData.js";

  const sectionLayouts = {
    personnel: personnel.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1",
    alumni: formerPersonnel.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
  };
  const accentHues = [96, 110, 132, 8];

  const roleHue = (role, index) => {
    const seed = role.length * 31 + index * 17;
    return accentHues[seed % accentHues.length];
  };

  const personnelStyle = (member, index) => {
    const hue = roleHue(member.role, index);
    const stagger = `${(index % 7) * 80}ms`;
    return `--role-hue:${hue};animation-delay:${stagger};`;
  };

  const alumniStyle = (member, index) => {
    const hue = accentHues[(member.name.length + index * 2) % accentHues.length];
    return `--alumni-hue:${hue};`;
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
          <article class="person-card glass rounded-3xl p-6 rise-in" style={personnelStyle(member, index)}>
            <p class="text-sm uppercase tracking-[0.3em] text-white/60">{member.role}</p>
            <h3 class="mt-3 text-xl font-semibold text-white">{member.name}</h3>
            <p class="mt-2 text-sm text-white/70">{member.focus}</p>
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
          <article class="alumni-card rounded-3xl border border-white/10 bg-white/5 p-6" style={alumniStyle(member, index)}>
            <h3 class="text-lg font-semibold text-white">{member.name}</h3>
            <p class="mt-2 text-sm text-white/70">{member.currentRole}</p>
          </article>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .person-card {
    position: relative;
    overflow: hidden;
    border-color: hsla(var(--role-hue), 74%, 74%, 0.3);
  }

  .person-card::after {
    content: "";
    position: absolute;
    inset: auto auto -48% -10%;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, hsla(var(--role-hue), 90%, 64%, 0.18), transparent 64%);
    pointer-events: none;
  }

  .alumni-card {
    border-color: hsla(var(--alumni-hue), 70%, 70%, 0.22);
  }
</style>
