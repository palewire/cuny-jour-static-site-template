<!--
  This is the LAYOUT file.
  It wraps every page on your site.
  Use it for headers, footers, and navigation that appear on all pages.
-->
<script>
  // Import global styles
  import '../app.css';

  // In Svelte 5, we use $props() to receive the page content
  let { children } = $props();
</script>

<main>
  <!-- This renders the current page's content -->
  {@render children()}
</main>

<style>
  /* Styles here only apply to this layout */
</style>