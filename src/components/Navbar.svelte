<script>
  import { link } from "svelte-spa-router";

  let aboutHovered = false;
  let aboutFocused = false;
  let aboutDismissed = false;
  let mobileOpen = false;

  $: aboutMenuVisible = (aboutHovered || aboutFocused) && !aboutDismissed;

  const openAboutMenu = () => {
    aboutDismissed = false;
  };

  const closeAboutMenu = () => {
    aboutHovered = false;
    aboutFocused = false;
    aboutDismissed = false;
  };

  const handleAboutFocusOut = (event) => {
    const nextTarget = event.relatedTarget;
    if (event.currentTarget && nextTarget && event.currentTarget.contains(nextTarget)) {
      return;
    }
    aboutFocused = false;
  };

  const dismissAboutMenu = () => {
    aboutDismissed = true;
    aboutFocused = false;
  };

  const toggleMobile = () => {
    mobileOpen = !mobileOpen;
    if (!mobileOpen) {
      closeAboutMenu();
    }
  };

  const closeMobile = () => {
    mobileOpen = false;
    closeAboutMenu();
  };
</script>

<nav class="creature-band relative z-20 border-b backdrop-blur">
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-6">
    <div class="flex items-center justify-between gap-4 md:w-auto">
      <a href="/" use:link class="flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
        <span class="beast-icon inline-flex h-10 w-10 items-center justify-center rounded-full text-xl">⚛︎</span>
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
      <a href="/" use:link class="fang-link hover:text-white">Home</a>
      <div
        class="relative"
        role="presentation"
        on:mouseenter={() => {
          aboutHovered = true;
          openAboutMenu();
        }}
        on:mouseleave={closeAboutMenu}
        on:focusin={() => {
          aboutFocused = true;
          openAboutMenu();
        }}
        on:focusout={handleAboutFocusOut}
      >
        <a
          href="/about"
          use:link
          class="fang-link hover:text-white"
          aria-haspopup="menu"
          aria-expanded={aboutMenuVisible}
          on:click={dismissAboutMenu}
        >
          About
        </a>
        <div
          class="pointer-events-none absolute left-0 top-full z-30 pt-2 opacity-0 transition duration-150"
          role="menu"
          class:pointer-events-auto={aboutMenuVisible}
          class:opacity-100={aboutMenuVisible}
        >
          <div class="min-w-[11rem] rounded-2xl border border-[#98f05a]/25 bg-[#0a1510]/95 p-2 shadow-[0_16px_28px_rgba(0,0,0,0.4)]">
            <a
              href="/about"
              use:link
              class="block rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 hover:bg-white/10 hover:text-white"
              on:click={() => {
                dismissAboutMenu();
                closeMobile();
              }}
            >
              Personnel
            </a>
            <a
              href="/about/gallery"
              use:link
              class="mt-1 block rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 hover:bg-white/10 hover:text-white"
              on:click={() => {
                dismissAboutMenu();
                closeMobile();
              }}
            >
              Gallery
            </a>
          </div>
        </div>
      </div>
      <a href="/research" use:link class="fang-link hover:text-white" on:click={closeMobile}>Research</a>
      <a href="/publications" use:link class="fang-link hover:text-white" on:click={closeMobile}>Publications</a>
      <a href="/funding" use:link class="fang-link hover:text-white" on:click={closeMobile}>Funding</a>
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
