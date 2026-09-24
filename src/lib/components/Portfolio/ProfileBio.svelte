<!--
@component
ProfileBio.svelte — Reusable paragraph block for Profile bio text.

Accepts a string and renders paragraphs separated by blank lines.
-->
<script>
  let { text = '' } = $props();

  let paragraphs = $derived(text ? text.trim().split('\n\n') : []);
</script>

{#if paragraphs.length > 0}
  <div class="now-next">
    {#each paragraphs as para, i (i)}
      <p>{para}</p>
    {/each}
  </div>
{/if}

<style lang="scss">
  .now-next {
    margin-top: var(--spacing-sm);
  }

  .now-next p {
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--spacing-sm);
    max-width: 46rem;
    font-size: var(--font-size-lg);
  }
</style>
