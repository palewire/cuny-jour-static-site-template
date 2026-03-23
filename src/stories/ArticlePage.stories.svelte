<!--
  ArticlePage.stories.svelte

  Full-page composition stories that combine multiple components to demonstrate
  how an article page looks when fully assembled. These stories are great for
  checking overall layout, typography hierarchy, and component interactions.

  This file does NOT map to a single component — it showcases how the
  building blocks fit together in a realistic editorial context.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteHeader   from '$lib/components/SiteHeader.svelte';
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';
  import ArticleBody  from '$lib/components/ArticleBody.svelte';
  import Image        from '$lib/components/Image.svelte';
  import Dashboard    from '$lib/components/Dashboard.svelte';
  import BigNumber    from '$lib/components/BigNumber.svelte';
  import RelatedLinks from '$lib/components/RelatedLinks.svelte';
  import SiteFooter   from '$lib/components/SiteFooter.svelte';

  // Demo image — the animated gif used on the main page
  const LEAD_IMAGE = '/example-photo.gif';

  const { Story } = defineMeta({
    title: 'Compositions/Article Page',
    tags: ['autodocs'],
    parameters: {
      // Use fullscreen so the header and footer span the full canvas width
      layout: 'fullscreen',
    },
  });
</script>

<!--
  Default: a complete article page with all components assembled.
  Resize the canvas (or use the Viewport toolbar) to see how the
  layout responds across mobile, tablet, and desktop breakpoints.
-->
<Story name="Default">
  <SiteHeader
    navLinks={[
      { href: '/programs',       label: 'Programs' },
      { href: '/admissions',     label: 'Admissions' },
      { href: '/media-centers',  label: 'Media Centers' },
      { href: '/about',          label: 'About' },
    ]}
  />

  <div class="container">
    <ArticleHeader
      headline="Become a force for good. Join our next class."
      byline="NYCity News Service"
      pubDate="2026-01-31"
    />

    <Image
      src={LEAD_IMAGE}
      alt="The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan."
      caption="The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan."
      credit="Craig Newmark Graduate School of Journalism"
    />

    <ArticleBody>
      <p>
        At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined.
      </p>
      <p>
        We fashioned a school to teach the latest storytelling, entrepreneurial, and technological skills alongside reporting, writing, and ethics. Beyond that, we've crafted a culture that spurns complacency, that isn't afraid to pivot before the ground under us shifts.
      </p>
      <blockquote>
        <p>
          "Our mission is to serve the public interest – by training new journalists from varied economic, racial, and cultural backgrounds who will bring much-needed diversity to newsrooms."
        </p>
      </blockquote>
      <p>
        Our low tuition rates, along with the added backing of private donors, allow candidates for our master's degrees in journalism and engagement journalism to receive a world-class education at an affordable price. We also offer a unique bilingual master's in journalism for students fluent in English and Spanish.
      </p>

      <h2>By the Numbers</h2>
    </ArticleBody>

    <Dashboard>
      <BigNumber number="2006"  label="Year Founded" />
      <BigNumber number="3"     label="Media Centers"            footnote="Research, training, and thought leadership" />
      <BigNumber number="3"     label="Master's Degree Programs" />
    </Dashboard>

    <ArticleBody>
      <p>
        Our three media centers provide research, training, thought leadership, industry meet-ups, and financial support for quality journalistic work. We also offer a robust professional education program through regular evening and weekend workshops. And we support in-depth reporting projects of professional journalists through fellowship grants.
      </p>
    </ArticleBody>

    <RelatedLinks
      title="RELATED STORIES"
      links={[
        { headline: 'How America\'s top news organizations escape rigid publishing systems to design beautiful data-driven stories on deadline.', href: 'https://palewi.re/docs/coding-the-news/' },
        { headline: 'How to install, configure and use Visual Studio Code, GitHub and Copilot', href: 'https://palewi.re/docs/coding-the-news/scripts/week-1/' },
        { headline: 'How to publish a website with Node.JS and GitHub Actions', href: 'https://palewi.re/docs/coding-the-news/scripts/week-2/' },
      ]}
    />
  </div>

  <SiteFooter />
</Story>

<!-- Text-Only: headline, body, and related links — no images or data -->
<Story name="Text Only">
  <SiteHeader navLinks={[]} />

  <div class="container">
    <ArticleHeader
      headline="At the Craig Newmark Graduate School of Journalism, Change Is in Our DNA"
      byline="NYCity News Service"
      pubDate="2026-01-31"
    />

    <ArticleBody>
      <p>
        At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined.
      </p>
      <h2>Affordable Excellence</h2>
      <p>
        Our low tuition rates, along with the added backing of private donors, allow candidates for our master's degrees in journalism and engagement journalism to receive a world-class education at an affordable price. We also offer a unique bilingual master's in journalism for students fluent in English and Spanish.
      </p>
      <h3>Professional Education</h3>
      <p>
        We also offer a robust professional education program through regular evening and weekend workshops. And we support in-depth reporting projects of professional journalists through fellowship grants.
      </p>
    </ArticleBody>

    <RelatedLinks
      title="RELATED STORIES"
      links={[
        { headline: 'How America\'s top news organizations escape rigid publishing systems to design beautiful data-driven stories on deadline.', href: 'https://palewi.re/docs/coding-the-news/' },
        { headline: 'How to install, configure and use Visual Studio Code, GitHub and Copilot', href: 'https://palewi.re/docs/coding-the-news/scripts/week-1/' },
      ]}
    />
  </div>

  <SiteFooter />
</Story>

<!-- Data-Driven: lede image followed immediately by a stat dashboard -->
<Story name="Data Driven">
  <SiteHeader
    navLinks={[
      { href: '/programs', label: 'Programs' },
      { href: '/admissions', label: 'Admissions' },
    ]}
  />

  <div class="container">
    <ArticleHeader
      headline="Craig Newmark Graduate School of Journalism by the Numbers"
      byline="NYCity News Service"
      pubDate="2026-01-31"
    />

    <Dashboard>
      <BigNumber number="2006"  label="Year Founded"             footnote="Born during the digital revolution" />
      <BigNumber number="3"     label="Master's Degree Programs" footnote="Journalism, engagement journalism, and bilingual" />
      <BigNumber number="3"     label="Media Centers"            footnote="Research, training, and thought leadership" />
    </Dashboard>

    <ArticleBody>
      <p>
        At a time when our profession is reeling from financial pressures and lack of trust, the Newmark Graduate School of Journalism is committed to producing the next generation of skilled, ethically minded, and diverse journalists. We invite you to be part of our world.
      </p>
    </ArticleBody>
  </div>

  <SiteFooter />
</Story>

<style>
  /* Mirror the .container class from app.scss so the page preview looks right */
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }
</style>
