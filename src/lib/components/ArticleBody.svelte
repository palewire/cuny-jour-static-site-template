<!--
  ArticleBody.svelte — NYCity News Service Style Article Content

  A wrapper component that provides proper typography for article body text.
  Uses sans-serif font for body, serif for subheadings.

  USAGE EXAMPLE:
  <ArticleBody>
    <p>Your article paragraphs go here...</p>
    <p>Each paragraph will be properly styled.</p>
  </ArticleBody>
-->
<script>
  let {
    children,         // The content passed between opening/closing tags
  } = $props();
</script>

<article class="article-body">
  {@render children()}
</article>

<style>
  .article-body {
    font-family: var(--font-sans);
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text, #333333);
  }

  /* Paragraph styling */
  .article-body :global(p) {
    margin-bottom: var(--spacing-md, 1.5rem);
  }

  .article-body :global(p:last-child) {
    margin-bottom: 0;
  }

  /* Links within article body */
  .article-body :global(a) {
    color: var(--color-dark, #1a1a1a);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .article-body :global(a:hover) {
    color: var(--color-accent, #e89e25);
  }

  /* Subheadings within article */
  .article-body :global(h2) {
    font-family: var(--font-serif, Georgia, serif);
    font-size: 1.75rem;
    font-weight: 400;
    margin-top: var(--spacing-xl, 3rem);
    margin-bottom: var(--spacing-sm, 1rem);
    color: var(--color-dark, #1a1a1a);
  }

  .article-body :global(h3) {
    font-family: var(--font-serif, Georgia, serif);
    font-size: 1.375rem;
    font-weight: 400;
    margin-top: var(--spacing-lg, 2rem);
    margin-bottom: var(--spacing-sm, 1rem);
    color: var(--color-dark, #1a1a1a);
  }

  /* Block quotes - NYCity style with orange left border */
  .article-body :global(blockquote) {
    border-left: 4px solid var(--color-accent, #e89e25);
    margin: var(--spacing-lg, 2rem) 0;
    padding: var(--spacing-sm, 1rem) var(--spacing-md, 1.5rem);
    font-style: italic;
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--color-dark, #1a1a1a);
  }

  .article-body :global(blockquote p) {
    margin-bottom: 0;
  }

  /* Lists */
  .article-body :global(ul),
  .article-body :global(ol) {
    margin-bottom: var(--spacing-md, 1.5rem);
    padding-left: var(--spacing-md, 1.5rem);
  }

  .article-body :global(li) {
    margin-bottom: var(--spacing-xs, 0.5rem);
  }

  /* Strong/Bold text */
  .article-body :global(strong) {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .article-body {
      font-size: 1rem;
      line-height: 1.75;
    }

    .article-body :global(blockquote) {
      font-size: 1.125rem;
      padding-left: var(--spacing-sm, 1rem);
    }
  }
</style>