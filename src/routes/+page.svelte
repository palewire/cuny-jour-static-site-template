<!--
  This is your HOMEPAGE.
  Edit this file to change what appears at the root URL (/).
-->
<script>
  // You can add JavaScript here
  let projectName = 'My Static Site';
</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{projectName}</title>
</svelte:head>

<!-- Your page content goes here -->
<div class="container">
  <h1>Welcome to {projectName}</h1>

  <p>
    This is a simple static site built with SvelteKit. Edit <code
      >src/routes/+page.svelte</code
    > to change this page.
  </p>

  <p>
    To learn more, check out the <a href="https://svelte.dev/docs/kit"
      >SvelteKit documentation</a
    >.
  </p>
</div>

<style>
  /* Styles here only apply to this page */
  .container {
    padding: var(--spacing-xl) var(--spacing-md);
  }
</style>