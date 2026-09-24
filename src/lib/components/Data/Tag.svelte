<!--
@component
Tag.svelte — A small pill label for skills, categories, or linked resources.
-->
<script>
  let { text = '', href = '' } = $props();
</script>

{#if href}
  <a class="tag" {href} target="_blank" rel="noopener noreferrer"
    >{text}<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true"
      ><path
        d="M2 10L10 2M10 2H4M10 2v6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    ></a
  >
{:else}
  <span class="tag">{text}</span>
{/if}

<style lang="scss">
  .tag {
    display: inline-block;
    padding: var(--spacing-xxs) var(--spacing-xs);
    background: var(--color-light-gray);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    line-height: var(--leading-normal);
    text-decoration: none;
  }

  .arrow {
    width: 0.75em;
    height: 0.75em;
    margin-left: 0.25em;
    vertical-align: baseline;
  }

  a.tag:hover {
    background: var(--color-border);
  }
</style>
