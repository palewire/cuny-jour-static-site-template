<!--
@component
Kicker.svelte — A small uppercase eyebrow label rendered above a headline.

Displays the provided text in the site accent color (CUNY Blue), all-caps,
bold, and with wider letter spacing. Used by DatabaseHeader and ArticleHeader
when an optional kicker string is supplied.

USAGE EXAMPLE:
<Kicker text="Housing Coverage" />
-->
<script>
  let { text = '', href = '' } = $props();
</script>

{#if text}
  <p class="kicker">
    {#if href}
      <a {href}>{text}</a>
    {:else}
      {text}
    {/if}
  </p>
{/if}

<style lang="scss">
  .kicker {
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    margin: 0 0 var(--spacing-xxs);

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
