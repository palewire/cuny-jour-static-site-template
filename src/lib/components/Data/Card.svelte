<!--
@component
Card.svelte — A card container with optional image, link, and footer actions.
-->
<script>
  import { asset } from '$app/paths';

  let { href = '', image = '', imageAlt = '', children, footer } = $props();

  // Resolve local images (those starting with /) using asset()
  // but not external URLs (http://, https://, //, data:)
  const resolvedImage = $derived(
    image && image.startsWith('/') && !image.startsWith('//')
      ? asset(image)
      : image
  );
</script>

{#snippet cardContent()}
  {#if image}
    <div class="card-image">
      <img src={resolvedImage} alt={imageAlt} />
    </div>
  {/if}
  <div class="card-body">
    {@render children()}
  </div>
  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
{/snippet}

{#if href}
  <a {href} class="card card-link">
    {@render cardContent()}
  </a>
{:else}
  <div class="card">
    {@render cardContent()}
  </div>
{/if}

<style lang="scss">
  .card {
    border: 1px solid var(--color-border, #ddd);
    border-radius: 4px;
    background: var(--color-white, #fff);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
    text-decoration: none;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 2px 8px var(--color-shadow, rgba(0, 0, 0, 0.12));
    }
  }

  .card-image {
    aspect-ratio: 16 / 9;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  .card-body {
    padding: var(--spacing-md, 1rem);
    flex: 1;

    :global(h3) {
      font-size: 1.1rem;
      margin: 0 0 0.5rem;
      line-height: 1.3;
    }

    :global(p) {
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.5;
      color: var(--color-text-secondary, #555);
    }
  }

  .card-footer {
    border-top: 1px solid var(--color-border, #ddd);
    padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
    background: var(--color-light-gray, #f5f5f5);
    margin-top: auto;
  }
</style>
