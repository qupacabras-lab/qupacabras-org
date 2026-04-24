<script>
  import { link } from "svelte-spa-router";

  const currentYear = new Date().getFullYear();
</script>

<footer class="creature-band border-t backdrop-blur">
  <div class="mx-auto w-full max-w-6xl px-6 py-10">
    <div class="grid gap-8 sm:grid-cols-3">
      <div>
        <p class="text-sm font-semibold text-white">Qupacabras Lab</p>
        <p class="mt-2 text-sm text-white/60">Colorado State University<br />Fort Collins, CO</p>
        <a href="mailto:contact@qupacabras-lab.org" class="mt-3 block text-sm text-white/70 hover:text-white transition-colors duration-150">
          contact@qupacabras-lab.org
        </a>
      </div>

      <div>
        <p class="text-xs font-medium tracking-wide text-white/60">Explore</p>
        <ul role="list" class="mt-3 space-y-2 text-sm">
          <li><a href="/" use:link class="text-white/70 hover:text-white transition-colors duration-150">Home</a></li>
          <li><a href="/about" use:link class="text-white/70 hover:text-white transition-colors duration-150">About</a></li>
          <li><a href="/research" use:link class="text-white/70 hover:text-white transition-colors duration-150">Research</a></li>
          <li><a href="/publications" use:link class="text-white/70 hover:text-white transition-colors duration-150">Publications</a></li>
          <li><a href="/funding" use:link class="text-white/70 hover:text-white transition-colors duration-150">Funding</a></li>
          <li><a href="/about/gallery" use:link class="text-white/70 hover:text-white transition-colors duration-150">Gallery</a></li>
        </ul>
      </div>

      <div>
        <p class="text-xs font-medium tracking-wide text-white/60">Affiliation</p>
        <p class="mt-3 text-sm text-white/70">
          CSU Quantum Computing Lab<br />
          Department of Computer Science
        </p>
      </div>
    </div>

    <div class="mt-8 border-t border-white/10 pt-6 text-xs text-white/35">
      © {currentYear} Qupacabras · Colorado State University
    </div>
  </div>
</footer>
