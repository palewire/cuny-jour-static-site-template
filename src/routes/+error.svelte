<!--
@component
Custom error page with animated "404" and a friendly message.
Shown when SvelteKit encounters a page that doesn't exist.
-->
<script>
  import { page } from '$app/state';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>{page.status} | Page not found</title>
</svelte:head>

<div class="error-page">
  <div class="error-content">
    <!-- Accessible status announcement for screen readers -->
    <span class="sr-only">Error {page.status}:</span>

    <!-- Animated glitch-style status code (decorative duplicate) -->
    <p class="error-code" aria-hidden="true" data-text={page.status}>
      {page.status}
    </p>

    <h1 class="error-headline">
      {#if page.status === 404}
        The page you're looking for doesn't exist.
      {:else}
        Something went wrong.
      {/if}
    </h1>
  </div>
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: var(--spacing-xl) var(--spacing-md);
    text-align: center;
  }

  .error-content {
    max-width: 600px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Large animated status code with pseudo-element glitch layers */
  .error-code {
    font-family: var(--font-sans);
    font-size: 8rem;
    font-weight: var(--font-weight-extrabold);
    color: var(--color-accent);
    line-height: 1;
    margin-bottom: var(--spacing-md);
    position: relative;
    display: inline-block;
  }

  .error-headline {
    font-family: var(--font-serif);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-normal);
    color: var(--color-dark);
    margin-bottom: var(--spacing-sm);
  }

  @include mobile {
    .error-code {
      font-size: 5rem;
    }

    .error-headline {
      font-size: var(--font-size-xl);
    }
  }
</style>
