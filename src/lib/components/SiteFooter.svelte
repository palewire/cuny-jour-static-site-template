<!--
  SiteFooter.svelte — Site Footer Component (NYCity News Service Style)

  A footer matching the NYCity News Service design.
  Features CUNY logo and key navigation links.

  USAGE EXAMPLE:
  <SiteFooter />
-->
<script>
  let {
    year = new Date().getFullYear(),
  } = $props();
</script>

<footer class="site-footer">
  <div class="footer-container">
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
    background-color: #f0f0f0;
    padding: var(--spacing-xl, 3rem) var(--spacing-md, 1.5rem);
    margin-top: var(--spacing-xxl, 4rem);
  }

  .footer-container {
    max-width: var(--max-width, 800px);
    margin: 0 auto;
    text-align: center;
  }

  .footer-logo {
    margin-bottom: var(--spacing-md, 1.5rem);
  }

  .cuny-logo {
    max-width: 300px;
    height: auto;
    margin: 0 auto;
  }

  .footer-nav {
    margin-bottom: var(--spacing-md, 1.5rem);
  }

  .footer-link {
    color: #333;
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--color-cuny-blue, #00356b);
  }

  .footer-divider {
    color: #999;
    margin: 0 var(--spacing-sm, 1rem);
  }
</style>