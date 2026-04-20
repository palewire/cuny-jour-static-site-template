<!--
@component
RankingList.svelte — A container for RankingCard items with an optional title and pagination.

Supports two modes:
- **Slot mode** (backward-compatible): Pass `children` content directly. No pagination.
- **Data-driven mode**: Pass an `items` array and optional `pageSize` to enable pagination.
  Each item object is spread as props onto a RankingCard.
-->
<script>
  import RankingCard from '$lib/components/Data/RankingCard.svelte';

  let { title = '', items = [], pageSize = 0, children } = $props();

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

<div class="ranking-list">
  {#if title}
    <h2 class="ranking-list-title">{title}</h2>
  {/if}
  <div class="ranking-list-items">
    {#if items.length > 0}
      {#each pageItems as item (item.rank ?? item.title)}
        <RankingCard {...item} />
      {/each}
    {:else if children}
      {@render children()}
    {/if}
  </div>
  {#if paginated && totalPages > 1}
    <div class="ranking-list-pagination">
      <span class="ranking-list-count">
        Showing {startIndex}–{endIndex} of {items.length}
      </span>
      <div class="ranking-list-buttons">
        <button
          class="ranking-list-btn"
          disabled={currentPage <= 1}
          onclick={() => (currentPage = currentPage - 1)}
        >
          ← Previous
        </button>
        <button
          class="ranking-list-btn"
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
  .ranking-list {
    border: 1px solid var(--color-border, #ddd);
    border-radius: 4px;
    overflow: hidden;
    background: var(--color-white, #fff);
  }

  .ranking-list-title {
    margin: 0;
    padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--color-light-gray, #f5f5f5);
    border-bottom: 1px solid var(--color-border, #ddd);
  }

  .ranking-list-items {
    :global(> :last-child) {
      border-bottom: none;
    }
  }

  .ranking-list-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm, 0.75rem) var(--spacing-md, 1rem);
    border-top: 1px solid var(--color-border, #ddd);
    background: var(--color-light-gray, #f5f5f5);
  }

  .ranking-list-count {
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #555);
  }

  .ranking-list-buttons {
    display: flex;
    gap: var(--spacing-xs, 0.5rem);
  }

  .ranking-list-btn {
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
