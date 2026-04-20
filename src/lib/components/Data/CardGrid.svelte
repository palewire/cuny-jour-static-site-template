<!--
@component
CardGrid.svelte — A responsive grid of Card components with optional pagination.

Supports two modes:
- **Slot mode** (backward-compatible): Pass `children` content directly. No pagination.
- **Data-driven mode**: Pass an `items` array and optional `pageSize` to enable pagination.
  Each item should have `title` and `description`; optional `href`, `image`, `imageAlt`,
  and `footerLabel` fields are also supported.
-->
<script>
  import Card from '$lib/components/Data/Card.svelte';

  let {
    title = '',
    items = [],
    pageSize = 0,
    columns = 3,
    children,
  } = $props();

  let currentPage = $state(1);

  const paginated = $derived(pageSize > 0 && items.length > 0);
  const totalPages = $derived(
    paginated ? Math.ceil(items.length / pageSize) : 1
  );
  const pageItems = $derived(
    paginated
      ? items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : items
  );
  const startIndex = $derived((currentPage - 1) * pageSize + 1);
  const endIndex = $derived(Math.min(currentPage * pageSize, items.length));
</script>

<div class="card-grid-wrapper">
  {#if title}
    <h2 class="card-grid-title">{title}</h2>
  {/if}
  <div class="card-grid" style="--grid-columns: {columns};">
    {#if items.length > 0}
      {#each pageItems as item, i (item.title ?? `${currentPage}-${i}`)}
        {#if item.footerLabel}
          <Card href={item.href} image={item.image} imageAlt={item.imageAlt}>
            <h3>{item.title}</h3>
            {#if item.description}
              <p>{item.description}</p>
            {/if}
            {#snippet footer()}
              <span class="card-grid-footer-label">{item.footerLabel}</span>
            {/snippet}
          </Card>
        {:else}
          <Card href={item.href} image={item.image} imageAlt={item.imageAlt}>
            <h3>{item.title}</h3>
            {#if item.description}
              <p>{item.description}</p>
            {/if}
          </Card>
        {/if}
      {/each}
    {:else if children}
      {@render children()}
    {/if}
  </div>
  {#if paginated && totalPages > 1}
    <div class="card-grid-pagination">
      <span class="card-grid-count">
        Showing {startIndex}–{endIndex} of {items.length}
      </span>
      <div class="card-grid-buttons">
        <button
          class="card-grid-btn"
          disabled={currentPage <= 1}
          onclick={() => (currentPage = currentPage - 1)}
        >
          ← Previous
        </button>
        <button
          class="card-grid-btn"
          disabled={currentPage >= totalPages}
          onclick={() => (currentPage = currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .card-grid-wrapper {
    width: 100%;
  }

  .card-grid-title {
    margin: 0 0 var(--spacing-sm, 0.75rem);
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md, 1rem);
  }

  @include tablet {
    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include desktop {
    .card-grid {
      grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
    }
  }

  .card-grid-footer-label {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--color-accent, #003da5);
  }

  .card-grid-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm, 0.75rem) 0;
    margin-top: var(--spacing-sm, 0.75rem);
  }

  .card-grid-count {
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #555);
  }

  .card-grid-buttons {
    display: flex;
    gap: var(--spacing-xs, 0.5rem);
  }

  .card-grid-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 600;
    border: 1px solid var(--color-border, #ddd);
    border-radius: 4px;
    background: var(--color-white, #fff);
    color: var(--color-accent, #003da5);
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:hover:not(:disabled) {
      background: var(--color-accent, #003da5);
      color: var(--color-white, #fff);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
</style>
