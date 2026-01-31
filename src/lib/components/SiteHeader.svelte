<!--
  SiteHeader.svelte — NYCity News Service Style Header

  Header with HTML/CSS logo and navigation matching the real site.

  USAGE EXAMPLE:
  <SiteHeader
    navLinks={[
      { label: 'Arts & Culture', href: '#' },
      { label: 'Business', href: '#' }
    ]}
  />
-->
<script>
  let {
    tagline = 'A student-powered service at the Craig Newmark Graduate School of Journalism',
    navLinks = [],
  } = $props();
</script>

<header class="site-header">
  <!-- Logo section with HTML/CSS -->
  <div class="logo-section">
    <a href="/" class="logo" aria-label="NYCity News Service">
      <!-- HTML/CSS Logo replicating the official header -->
      <span class="logo-text">
        <span class="logo-nycity">NYCITY</span><span class="logo-news">News</span><span class="logo-service">Service</span>
      </span>
    </a>
    {#if tagline}
      <p class="tagline">{tagline}</p>
    {/if}
  </div>

  <!-- Navigation -->
  {#if navLinks.length > 0}
    <nav class="main-nav" aria-label="Main navigation">
      <ul class="nav-list">
        {#each navLinks as link}
          <li>
            <a href={link.href} class="nav-link">{link.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>

<style>
  .site-header {
    border-bottom: 3px solid var(--color-accent, #f47920);
  }

  /* Logo section */
  .logo-section {
    text-align: center;
    padding: var(--spacing-md, 1.5rem) var(--spacing-md, 1.5rem);
  }

  .logo {
    display: inline-block;
    text-decoration: none;
  }

  .logo:hover {
    text-decoration: none;
  }

  .logo-text {
    display: inline-flex;
    align-items: center;
    font-size: 0;
    line-height: 1;
  }

  .logo-nycity {
    background-color: #00356b;
    color: white;
    font-family: var(--font-sans, 'Droid Sans', Arial, sans-serif);
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0.5rem 0.6rem;
    letter-spacing: -0.02em;
  }

  .logo-news {
    color: #1a1a1a;
    font-family: var(--font-sans, 'Droid Sans', Arial, sans-serif);
    font-size: 2rem;
    font-weight: 400;
    margin-left: 0.35rem;
  }

  .logo-service {
    color: #1a1a1a;
    font-family: var(--font-sans, 'Droid Sans', Arial, sans-serif);
    font-size: 2rem;
    font-weight: 400;
  }

  .tagline {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--color-medium-gray, #666666);
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  /* Navigation */
  .main-nav {
    border-top: 1px solid var(--color-border, #e0e0e0);
    padding: var(--spacing-sm, 1rem) var(--spacing-md, 1.5rem);
  }

  .nav-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
    gap: var(--spacing-md, 1.5rem);
    margin: 0;
    padding: 0;
    max-width: var(--max-width-wide, 1200px);
    margin: 0 auto;
  }

  .nav-link {
    color: var(--color-dark, #1a1a1a);
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: var(--color-accent, #f47920);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .logo-nycity {
      font-size: 1.1rem;
      padding: 0.35rem 0.45rem;
    }

    .logo-news,
    .logo-service {
      font-size: 1.5rem;
    }

    .tagline {
      font-size: 0.75rem;
      padding: 0 var(--spacing-sm);
    }

    .nav-list {
      gap: var(--spacing-sm, 1rem);
    }

    .nav-link {
      font-size: 0.6875rem;
    }
  }
</style>