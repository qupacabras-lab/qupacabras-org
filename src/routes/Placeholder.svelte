<script>
  import { link } from "svelte-spa-router";
</script>

<section class="fade-in mx-auto w-full max-w-4xl px-6 pb-24 pt-16">
  <div class="glass construction-card rounded-3xl p-8 md:p-10">
    <p class="text-xs uppercase tracking-[0.4em] text-white/60">Under Construction</p>
    <h1 class="mt-4 text-4xl font-semibold text-white md:text-5xl">Chupacabra Ate This Page</h1>
    <p class="mt-4 text-lg text-white/75">
      The research team left this page unattended for six minutes and returned to find claw marks,
      missing cables, and one very satisfied cryptid. We are rebuilding it now.
    </p>

    <div class="hazard-strip mt-8 rounded-2xl px-4 py-3 text-center text-base font-extrabold uppercase tracking-[0.2em]">
      Beware of experimental creature activity
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs uppercase tracking-[0.22em] text-white/60">Status</p>
        <p class="mt-2 text-white/80">Scaffolding assembled, claw-proofing in progress.</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs uppercase tracking-[0.22em] text-white/60">ETA</p>
        <p class="mt-2 text-white/80">Soon. Assuming no additional livestock incidents.</p>
      </div>
    </div>

    <div class="mt-10 flex flex-wrap gap-4">
      <a href="/publications" use:link class="beast-cta px-6 py-3 text-sm font-semibold">Back to Publications</a>
      <a href="/" use:link class="beast-cta beast-cta--ghost px-6 py-3 text-sm font-semibold">Return Home</a>
    </div>
  </div>
</section>

<style>
  .construction-card {
    position: relative;
    overflow: hidden;
  }

  .construction-card::before,
  .construction-card::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(176, 43, 43, 0.9), transparent);
    transform: rotate(-26deg);
    pointer-events: none;
  }

  .construction-card::before {
    top: 18%;
    right: -48px;
  }

  .construction-card::after {
    top: 24%;
    right: -42px;
  }

  .hazard-strip {
    color: #f8f4e8;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 18px rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(rgba(6, 10, 7, 0.55), rgba(6, 10, 7, 0.55)),
      repeating-linear-gradient(
        -45deg,
        #a9f45e 0 14px,
        #8bd84d 14px 28px,
        #18210f 28px 42px,
        #141b0f 42px 56px
      );
  }
</style>
