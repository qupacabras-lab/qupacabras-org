<script>
  import { link } from "svelte-spa-router";

  let mobileOpen = false;

  const toggleMobile = () => {
    mobileOpen = !mobileOpen;
  };

  const closeMobile = () => {
    mobileOpen = false;
  };
</script>

<nav class="creature-band relative z-20 border-b backdrop-blur">
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-6">
    <div class="flex items-center justify-between gap-4 md:w-auto">
      <a href="/" use:link class="brand-link flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
        <span class="beast-icon inline-flex h-9 w-9 items-center justify-center rounded-full">
          <img src="/favicon.ico" alt="Qupacabras" class="h-8 w-8 object-contain" />
        </span>
        Qupacabras Lab
      </a>
      <button
        class="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 md:hidden"
        type="button"
        aria-expanded={mobileOpen}
        aria-controls="primary-navigation"
        on:click={toggleMobile}
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>
    </div>
    <div
      id="primary-navigation"
      class={`mobile-nav w-full md:block md:w-auto ${mobileOpen ? "mobile-nav--open" : ""}`}
    >
      <div class="mobile-nav__inner flex flex-col gap-4 pb-2 text-sm uppercase tracking-[0.2em] text-white/70 md:flex-row md:items-center md:justify-end md:pb-0">
        <a href="/" use:link class="nav-link fang-link hover:text-white" on:click={closeMobile}>Home</a>
        <a href="/about" use:link class="nav-link fang-link hover:text-white" on:click={closeMobile}>About</a>
        <a href="/research" use:link class="nav-link fang-link hover:text-white" on:click={closeMobile}>Research</a>
        <a href="/publications" use:link class="nav-link fang-link hover:text-white" on:click={closeMobile}>Publications</a>
        <a href="/funding" use:link class="nav-link fang-link hover:text-white" on:click={closeMobile}>Funding</a>
      </div>
    </div>
   </div>
</nav>

<style>
  .mobile-nav {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mobile-nav--open {
    grid-template-rows: 1fr;
  }

  .mobile-nav__inner {
    overflow: hidden;
    transform-origin: top;
    transform: scaleY(0.94);
    opacity: 0;
    transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease;
    will-change: transform, opacity;
  }

  .mobile-nav--open .mobile-nav__inner {
    transform: scaleY(1);
    opacity: 1;
  }

  @media (min-width: 768px) {
    .mobile-nav {
      display: block;
      grid-template-rows: none;
      transition: none;
    }

    .mobile-nav__inner {
      overflow: visible;
      transform: none;
      opacity: 1;
      transition: none;
    }
  }
</style>
