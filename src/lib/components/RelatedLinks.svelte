<!--
  RelatedLinks.svelte — NYCity News Service Style Related Stories

  Displays a "Related Stories" or "Recent News" section at the bottom 
  of articles with blue accent heading style.

  USAGE EXAMPLE:
  <RelatedLinks
    title="RELATED STORIES"
    links={[
      { headline: 'Mayor Announces New Transit Plan', href: '/transit-plan' },
      { headline: 'Budget Talks Continue Downtown', href: '/budget-talks' }
    ]}
  />
-->
<script>
  let {
    title = 'RELATED STORIES',
    links = [],
  } = $props();
</script>

{#if links.length > 0}
  <aside class="related-links" aria-labelledby="related-title">
    <h2 id="related-title" class="related-title">
      <span class="title-text">{title}</span>
    </h2>
    <ul class="link-list">
      {#each links as link}
        <li class="link-item">
          <a href={link.href} class="link">
            {link.headline}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
{/if}

<style>
  .related-links {
    margin-top: var(--spacing-xl);
  }

  .related-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-dark);
    margin-bottom: var(--spacing-md);
  }

  .related-title::after {
    content: '';
    flex: 1;
    height: 2px;
    background-color: var(--color-accent);
  }

  .link-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .link-item {
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
  }

  .link-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .link {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--color-dark);
    text-decoration: none;
    line-height: 1.3;
    display: block;
    transition: color 0.2s ease;
  }

  .link:hover {
    color: var(--color-accent);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .link {
      font-size: 1.125rem;
    }
  }
</style>
