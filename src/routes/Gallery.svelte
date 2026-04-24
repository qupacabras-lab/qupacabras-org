<script>
  import { link } from "svelte-spa-router";
  import { fly } from "svelte/transition";

  const galleryFileMap = import.meta.glob("../assets/gallery/**/*.{png,jpg,jpeg,webp,avif,gif}", {
    eager: true,
    import: "default",
  });

  const galleryEntries = Object.entries(galleryFileMap)
    .map(([path, src]) => ({ path, src }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const galleryFallback = (index) => `https://picsum.photos/seed/qupacabra-lab-${index + 1}/1200/900`;

  const fileNameFromPath = (path) => path.split("/").pop() || "lab-capture.jpg";

  const baseNameFromPath = (path) => fileNameFromPath(path).replace(/\.[a-z0-9]+$/i, "");

  const labelFromSlug = (slug) =>
    slug
      .split(/[-_]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const albumKeyFromPath = (path) => {
    const parts = path.split("/");
    const galleryIndex = parts.indexOf("gallery");
    const afterGallery = galleryIndex >= 0 ? parts.slice(galleryIndex + 1) : [];

    if (afterGallery.length <= 1) {
      return baseNameFromPath(path);
    }

    return afterGallery.slice(0, -1).join("/");
  };

  const galleryMetadata = {
    ASPLOS_2026_Conference: {
      title: "ASPLOS 2026 Conference",
      shortDescription: "Qupacabras team at ASPLOS 2026.",
      longDescription:
        "The Qupacabras team's first conference, attending Jim Furches' tutorial. Taken outside of the Mattress Factory museum in Pittsburgh, PA, after the conference. From left to right: Jim Furches, Marco Rodriguez, Leo Rodolico, and Carlos Ortiz Marrero.",
    },
  };

  const fallbackShortDescription = "Lab photo set from the Qupacabras gallery archive.";
  const fallbackLongDescription = "Open this set to browse all photos in this folder.";

  const groupedAlbums = galleryEntries.reduce((albums, entry) => {
    const key = albumKeyFromPath(entry.path);

    if (!albums[key]) {
      albums[key] = [];
    }

    albums[key].push(entry);
    return albums;
  }, {});

  const galleryAlbums =
    Object.keys(groupedAlbums).length > 0
      ? Object.entries(groupedAlbums)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, entries]) => {
            const sortedEntries = [...entries].sort((a, b) => a.path.localeCompare(b.path));
            const metadata = galleryMetadata[key] || null;
            const shortDescription = metadata?.shortDescription || metadata?.description || fallbackShortDescription;
            const longDescription = metadata?.longDescription || shortDescription || fallbackLongDescription;

            return {
              key,
              title: metadata?.title || labelFromSlug(key.split("/").pop() || key),
              shortDescription,
              longDescription,
              images: sortedEntries.map((entry) => entry.src),
            };
          })
      : Array.from({ length: 4 }, (_, index) => ({
          key: `placeholder-${index + 1}`,
          title: `Lab Set ${index + 1}`,
          shortDescription: "Generated placeholder album while gallery folders are empty.",
          longDescription: "Generated placeholder album while gallery folders are empty.",
          images: [galleryFallback(index)],
        }));

  const resolvedAlbumCover = (album, albumIndex) => album.images[0] || galleryFallback(albumIndex);

  const handleAlbumCoverError = (event, albumIndex) => {
    const fallback = galleryFallback(albumIndex);
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
  };

  const mosaicPattern = ["md:col-span-2", "", "", "", "md:col-span-2", ""];

  const tileClass = (index) => {
    const pattern = galleryAlbums.length > 2 ? mosaicPattern[index % mosaicPattern.length] : "";
    return `gallery-tile card-hover glass rounded-3xl p-3 rise-in ${pattern}`;
  };

  const tileStyle = (index) => {
    const delay = `${(index % 8) * 70}ms`;
    return `animation-delay:${delay};`;
  };

  let focusedAlbum = null;
  let focusedImageIndex = 0;
  let imageScrollDirection = 0;

  const openAlbum = (album) => {
    focusedAlbum = album;
    focusedImageIndex = 0;
    imageScrollDirection = 0;
  };

  const closeAlbum = () => {
    focusedAlbum = null;
    focusedImageIndex = 0;
  };

  const nextImage = () => {
    if (!focusedAlbum || focusedAlbum.images.length < 2) {
      return;
    }

    imageScrollDirection = 1;
    focusedImageIndex = (focusedImageIndex + 1) % focusedAlbum.images.length;
  };

  const previousImage = () => {
    if (!focusedAlbum || focusedAlbum.images.length < 2) {
      return;
    }

    imageScrollDirection = -1;
    focusedImageIndex = (focusedImageIndex - 1 + focusedAlbum.images.length) % focusedAlbum.images.length;
  };

  const incomingImageTransition = () => ({
    x: imageScrollDirection * 90,
    duration: 240,
    opacity: 0.2,
  });

  const outgoingImageTransition = () => ({
    x: -imageScrollDirection * 90,
    duration: 240,
    opacity: 0.2,
  });

  const resolvedFocusedImage = () => {
    if (!focusedAlbum) {
      return galleryFallback(0);
    }

    return focusedAlbum.images[focusedImageIndex] || galleryFallback(focusedImageIndex);
  };

  const handleFocusedImageError = (event) => {
    const fallback = galleryFallback(focusedImageIndex);
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
  };

  const handleWindowKeydown = (event) => {
    if (!focusedAlbum) {
      return;
    }

    if (event.key === "Escape") {
      closeAlbum();
    }

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      previousImage();
    }
  };
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<section class="fade-in mx-auto w-full max-w-6xl px-6 pb-24 pt-14">
  <div class="glass rounded-3xl p-8">
    <p class="text-xs uppercase tracking-[0.4em] text-white/60">About / Gallery</p>
    <h1 class="mt-4 text-4xl font-semibold text-white">Lab moments and field captures</h1>
    <p class="mt-4 text-lg text-white/75">
      A visual archive of lab experiments, collaborations, workshops, and the people building
      practical quantum systems.
    </p>
    <div class="mt-6">
      <a href="/about" use:link class="beast-cta beast-cta--ghost inline-flex px-6 py-3 text-sm font-semibold">
        Back to About
      </a>
    </div>
  </div>

  {#if galleryAlbums.length > 0}
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      {#each galleryAlbums as album, albumIndex (album.key)}
        <article class={tileClass(albumIndex)} style={tileStyle(albumIndex)}>
          <button type="button" class="gallery-focus-trigger w-full text-left" on:click={() => openAlbum(album)}>
            <img
              class="gallery-image w-full rounded-2xl object-cover"
              src={resolvedAlbumCover(album, albumIndex)}
              alt={`Cover image for ${album.title}`}
              loading="lazy"
              on:error={(event) => handleAlbumCoverError(event, albumIndex)}
            />
          </button>
          <div class="px-2 pb-2 pt-4">
            <h2 class="text-lg font-semibold text-white">{album.title}</h2>
            {#if album.images.length > 1}
              <p class="mt-1 text-xs uppercase tracking-[0.22em] text-white/55">{album.images.length} photos</p>
            {/if}
            <p class="mt-2 text-sm text-white/70">{album.shortDescription}</p>
          </div>
        </article>
      {/each}
    </div>
  {/if}

  {#if focusedAlbum}
    <div class="gallery-lightbox" role="dialog" aria-modal="true" aria-label={focusedAlbum.title}>
      <button type="button" class="gallery-lightbox__backdrop" aria-label="Close focused album" on:click={closeAlbum}></button>
      <div class="gallery-lightbox__panel">
        <button type="button" class="gallery-lightbox__close" aria-label="Close focused album" on:click={closeAlbum}>×</button>
        <div class="gallery-lightbox__image-wrap">
          {#key `${focusedAlbum.key}-${focusedImageIndex}`}
            <img
              class="gallery-lightbox__image"
              src={resolvedFocusedImage()}
              alt={`${focusedAlbum.title} photo ${focusedImageIndex + 1}`}
              on:error={handleFocusedImageError}
              in:fly={incomingImageTransition()}
              out:fly={outgoingImageTransition()}
            />
          {/key}
          {#if focusedAlbum.images.length > 1}
            <button
              type="button"
              class="gallery-lightbox__edge gallery-lightbox__edge--left"
              aria-label="Previous photo"
              on:click={previousImage}
            >
              <span class="gallery-lightbox__arrow">&lt;</span>
            </button>
            <button
              type="button"
              class="gallery-lightbox__edge gallery-lightbox__edge--right"
              aria-label="Next photo"
              on:click={nextImage}
            >
              <span class="gallery-lightbox__arrow">&gt;</span>
            </button>
          {/if}
        </div>
        <p class="mt-4 text-center text-sm tracking-[0.18em] text-white/70">{focusedImageIndex + 1} / {focusedAlbum.images.length}</p>
        <h2 class="mt-4 text-2xl font-semibold text-white">{focusedAlbum.title}</h2>
        <p class="mt-2 text-sm text-white/80">{focusedAlbum.longDescription}</p>
      </div>
    </div>
  {/if}
</section>

<style>
  .gallery-tile {
    border-color: var(--panel-border);
    overflow: hidden;
  }

  .gallery-image {
    height: clamp(180px, 26vw, 280px);
    border: 1px solid var(--panel-border);
    filter: saturate(1.05) contrast(1.03);
  }

  .gallery-focus-trigger {
    border: 0;
    background: transparent;
    padding: 0;
    cursor: zoom-in;
  }

  .gallery-lightbox {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(5px);
  }

  .gallery-lightbox__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: transparent;
    cursor: zoom-out;
  }

  .gallery-lightbox__panel {
    position: relative;
    z-index: 1;
    width: min(92vw, 980px);
    max-height: 90vh;
    overflow: auto;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(29, 32, 33, 0.94);
    padding: 1rem 1rem 1.25rem;
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5);
  }

  .gallery-lightbox__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .gallery-lightbox__image-wrap {
    position: relative;
    height: min(65vh, 72vw);
    overflow: hidden;
    border-radius: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .gallery-lightbox__edge {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 16.6667%;
    border: 0;
    background: rgba(255, 255, 255, 0);
    color: rgba(255, 255, 255, 0.66);
    transition: background 160ms ease, color 160ms ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .gallery-lightbox__edge--left {
    left: 0;
    border-top-left-radius: 0.9rem;
    border-bottom-left-radius: 0.9rem;
  }

  .gallery-lightbox__edge--right {
    right: 0;
    border-top-right-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
  }

  .gallery-lightbox__edge:hover,
  .gallery-lightbox__edge:focus-visible {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.95);
  }

  .gallery-lightbox__arrow {
    font-size: clamp(1.4rem, 2.2vw, 2rem);
    font-weight: 400;
    line-height: 1;
  }

  .gallery-lightbox__close {
    position: absolute;
    top: 0.55rem;
    right: 0.7rem;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(29, 32, 33, 0.8);
    color: #fff;
    font-size: 1.3rem;
    line-height: 1;
    cursor: pointer;
    z-index: 2;
  }
</style>
