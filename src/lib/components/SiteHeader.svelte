<!--
  SiteHeader.svelte — NYCity News Service Style Header
-->
<script>
  let {
    navLinks = [],
  } = $props();
</script>

<header class="site-header">
  <!-- Compact masthead with logo left and nav right -->
  <div class="masthead-wrapper">
    <div class="masthead">
    <a href="https://www.nycitynewsservice.com/" class="logo" aria-label="NYCity News Service">
      <!-- Compact HTML/CSS Logo with thin white border -->
      <span class="logo-text">
        <span class="logo-nycity">NYCITY</span><span class="logo-news-service">News Service</span>
      </span>
    </a>

    <!-- Navigation inline with logo -->
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
    </div>
  </div>
</header>

<style>
  .site-header {
    border-bottom: 0px solid var(--color-accent);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Full-width blue background with animated dark-to-light gradient */
  .masthead-wrapper {
    background: linear-gradient(
      90deg,
      #002266 0%,
      #0033A1 50%,
      #0066CC 100%
    );
    background-size: 200% 100%;
    animation: gradient-sweep 6s ease-in-out infinite;
  }

  @keyframes gradient-sweep {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  /* Compact Masthead - Flex layout with logo left, nav right */
  .masthead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    max-width: var(--max-width-wide);
    margin: 0 auto;
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
    align-items: stretch;
    border: 1px solid var(--color-white);
  }

  .logo-nycity {
    background-color: var(--color-white);
    color: var(--color-accent);
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 800;
    padding: 0.2rem 0.4rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  .logo-news-service {
    color: var(--color-white);
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 300;
    padding: 0.2rem 0.4rem;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
  }

  /* Navigation - inline in masthead */
  .main-nav {
    display: flex;
    align-items: center;
  }

  .nav-list {
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  .nav-link:hover {
    color: white;
    opacity: 0.8;
    text-decoration: none;
  }

  /* Mobile: hide nav, center logo - switch at 1200px to prevent wrapping */
  @media (max-width: 1200px) {
    .masthead {
      justify-content: center;
      padding: 0.5rem 1rem;
    }

    .main-nav {
      display: none;
    }

    .logo-nycity {
      font-size: 0.875rem;
      padding: 0.15rem 0.35rem;
    }

    .logo-news-service {
      font-size: 0.875rem;
      padding: 0.15rem 0.35rem;
    }
  }
</style>
