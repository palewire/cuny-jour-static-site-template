<!--
  SiteFooter.svelte — Site Footer Component (NYCity News Service Style)

  A footer matching the NYCity News Service design.
  Features CUNY logo and key navigation links.

  USAGE EXAMPLE:
  <SiteFooter />
-->
<script>
  let {
    tagline = 'A student-powered service at the Craig Newmark Graduate School of Journalism',
    year = new Date().getFullYear(),
  } = $props();
</script>

<footer class="site-footer">
  <div class="footer-container">
    <!-- Tagline -->
    {#if tagline}
      <p class="tagline">{tagline}</p>
    {/if}
    
    <!-- CUNY Logo -->
    <div class="footer-logo">
      <img 
        src="/cuny-footer-logo.png" 
        alt="Craig Newmark Graduate School of Journalism at CUNY"
        class="cuny-logo"
      />
    </div>
    
    <!-- Footer Navigation -->
    <nav class="footer-nav" aria-label="Footer navigation">
      <a href="https://www.nycitynewsservice.com/about/" class="footer-link">ABOUT US</a>
      <span class="footer-divider">|</span>
      <a href="https://www.nycitynewsservice.com/contact/" class="footer-link">CONTACT US</a>
    </nav>
  </div>
</footer>

<style>
  .site-footer {
    background-color: var(--color-white);
    border-top: 4px solid var(--color-accent);
    padding: var(--spacing-xl) var(--spacing-md);
    margin-top: var(--spacing-xxl);
  }

  .footer-container {
    max-width: var(--max-width);
    margin: 0 auto;
    text-align: center;
  }

  .footer-logo {
    margin-bottom: var(--spacing-md);
  }

  .cuny-logo {
    max-width: 300px;
    height: auto;
    margin: 0 auto;
  }

  .footer-nav {
    margin-bottom: var(--spacing-md);
  }

  .footer-link {
    color: var(--color-dark);
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--color-accent);
  }

  .footer-divider {
    color: var(--color-medium-gray);
    margin: 0 var(--spacing-sm);
  }

  .tagline {
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    color: var(--color-medium-gray);
    margin-bottom: var(--spacing-md);
    letter-spacing: 0.01em;
  }
</style>
