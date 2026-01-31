<!--
  ImageWithCaption.svelte — Photo/Graphic Display Component

  Displays images with captions and photo credits, essential for journalism.
  Supports different sizes and optional credit attribution.

  USAGE EXAMPLE:
  <ImageWithCaption
    src="/images/city-hall.jpg"
    alt="City Hall building at sunset"
    caption="City Hall, where the budget vote took place Tuesday evening."
    credit="Jane Smith / The Daily News"
    size="large"
  />
-->
<script>
  import { base } from '$app/paths';
  
  let {
    src,                    // Required: Image source URL
    alt,                    // Required: Alt text for accessibility
    caption = '',           // Optional: Caption text below image
    credit = '',            // Optional: Photo credit
    size = 'full',          // 'full', 'large', 'medium', 'small'
  } = $props();

  // Prepend base path to local images (those starting with /)
  // but not to external URLs (http://, https://, //, data:)
  const resolvedSrc = $derived(
    src.startsWith('/') && !src.startsWith('//') 
      ? `${base}${src}` 
      : src
  );
</script>

<figure class="image-figure" class:size-full={size === 'full'} class:size-large={size === 'large'} class:size-medium={size === 'medium'} class:size-small={size === 'small'}>
  <img 
    src={resolvedSrc} 
    {alt} 
    class="image"
    loading="lazy"
  />
  
  {#if caption || credit}
    <figcaption class="caption-container">
      {#if caption}
        <span class="caption">{caption}</span>
      {/if}
      {#if credit}
        <span class="credit">{credit}</span>
      {/if}
    </figcaption>
  {/if}
</figure>

<style>
  .image-figure {
    margin: var(--spacing-lg) 0;
    padding: 0;
  }

  /* Size variants */
  .size-full {
    width: 100%;
  }

  .size-large {
    width: 100%;
    max-width: 720px;
  }

  .size-medium {
    width: 100%;
    max-width: 480px;
  }

  .size-small {
    width: 100%;
    max-width: 320px;
  }

  .image {
    width: 100%;
    height: auto;
    display: block;
  }

  .caption-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-top: var(--spacing-xs);
    margin-top: var(--spacing-xs);
  }

  .caption {
    font-size: 0.875rem;
    line-height: 1.4;
    color: var(--color-text);
  }

  .credit {
    font-size: 0.75rem;
    color: var(--color-medium-gray);
    font-style: italic;
  }

  @media (max-width: 768px) {
    .image-figure {
      margin: var(--spacing-md) 0;
    }

    .caption {
      font-size: 0.8125rem;
    }

    .credit {
      font-size: 0.6875rem;
    }
  }
</style>
