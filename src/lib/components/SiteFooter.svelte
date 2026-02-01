<!--
  SiteFooter.svelte — Site Footer Component (NYCity News Service Style)

  A footer matching the NYCity News Service design.
  Features CUNY logo and key navigation links.

  USAGE EXAMPLE:
  <SiteFooter />
-->
<script>
  import { base } from '$app/paths';
</script>

<footer class="site-footer">
  <div class="footer-container">
    <!-- CUNY Logo -->
    <div class="footer-logo">
      <a href="https://www.journalism.cuny.edu/">
        <img 
          src="{base}/cuny-footer-logo.svg" 
          alt="Craig Newmark Graduate School of Journalism at CUNY"
          class="cuny-logo"
        />
      </a>
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
    background-color: var(--color-light-gray);
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
    max-width: 400px;
    height: auto;
    margin: 0 auto;
    transition: opacity 0.2s ease;
  }

  .footer-logo a:hover .cuny-logo {
    opacity: 0.7;
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
</style>
