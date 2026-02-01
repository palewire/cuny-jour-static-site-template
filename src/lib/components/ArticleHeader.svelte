<!--
  ArticleHeader.svelte — NYCity News Service Style Article Header

  Displays the headline and metadata line with icons in the NYCity style:
  - Large serif headline
  - Orange bordered metadata box with date, authors, and optional source

  USAGE EXAMPLE:
  <ArticleHeader
    headline="City Council Approves New Budget"
    byline="Jane Smith, John Doe"
    pubDate="2024-01-15"
  />
-->
<script>
  let {
    headline,           // Required: The main title of the article
    byline = '',        // Optional: The author's name(s)
    pubDate = '',       // Optional: Publication date in YYYY-MM-DD format
  } = $props();

  // Format date to "JANUARY 15, 2024" style
  function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date).toUpperCase();
  }
</script>

<header class="article-header">
  <h1 class="headline">{headline}</h1>

  {#if byline || pubDate}
    <div class="meta">
      {#if byline}
        <span class="meta-item byline">
          <svg class="meta-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
          {byline}
        </span>
      {/if}

      {#if pubDate}
        <span class="meta-item date">
          <svg class="meta-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6v6l4 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <time datetime={pubDate}>{formatDate(pubDate)}</time>
        </span>
      {/if}
    </div>
  {/if}
</header>

<style>
  .article-header {
    margin-bottom: var(--spacing-md);
  }

  .headline {
    font-family: var(--font-serif);
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: var(--spacing-sm);
    color: var(--color-dark);
  }

  .meta {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.75rem 1rem;
    border-left: 4px solid var(--color-accent);
    background-color: var(--color-light-gray);
  }

  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    color: var(--color-medium-gray);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .meta-icon {
    color: var(--color-accent);
    flex-shrink: 0;
  }

  .byline {
    font-weight: 500;
    color: var(--color-dark);
  }

  @media (max-width: 768px) {
    .headline {
      font-size: 2rem;
    }

    .meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .meta-item {
      font-size: 0.8125rem;
    }
  }
</style>
