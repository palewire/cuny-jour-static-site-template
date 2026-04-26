<!--
  DatabaseExplorerComposition.stories.svelte

  Composition stories that combine DatabaseHeader with a large Lottie graphic,
  search input, and dropdown — in the style of how ProPublica tops their
  database search applications.

  The hero section is rendered by DatabaseHeader, which handles the two-column
  layout (text + controls on the left, animated graphic on the right).
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DatabaseHeader from '$lib/components/Data/DatabaseHeader.svelte';
  import SearchInput from '$lib/components/Forms/SearchInput.svelte';
  import LottieGraphic from '$lib/components/Media/LottieGraphic.svelte';
  import MethodologyBox from '$lib/components/Article/MethodologyBox.svelte';
  import RankingList from '$lib/components/Data/RankingList.svelte';
  import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';
  import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';

  import DATA_ANIMATION from '../DatabaseHeaderGraphic.json';

  const { Story } = defineMeta({
    title: 'Compositions/Database Explorer',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });

  const explorerItems = [
    {
      rank: 1,
      href: 'https://www.journalism.cuny.edu/',
      title: 'M.A. in Journalism',
      description:
        'Our flagship program trains reporters, editors, and multimedia journalists.',
      value: '420',
      valueLabel: 'enrolled',
    },
    {
      rank: 2,
      href: 'https://www.journalism.cuny.edu/',
      title: 'M.A. in Engagement Journalism',
      description: 'Building trust and deepening connections with communities.',
      value: '285',
      valueLabel: 'enrolled',
    },
    {
      rank: 3,
      href: 'https://www.journalism.cuny.edu/',
      title: 'Bilingual Journalism',
      description: 'For students fluent in English and Spanish.',
      value: '140',
      valueLabel: 'enrolled',
    },
    {
      rank: 4,
      href: 'https://www.journalism.cuny.edu/',
      title: 'Professional Education',
      description: 'Evening and weekend workshops for mid-career journalists.',
      value: '95',
      valueLabel: 'enrolled',
    },
    {
      rank: 5,
      href: 'https://www.journalism.cuny.edu/',
      title: 'Fellowship Programs',
      description: 'Supporting in-depth reporting projects.',
      value: '45',
      valueLabel: 'fellows',
    },
    {
      rank: 6,
      href: 'https://www.journalism.cuny.edu/',
      title: 'Social Journalism',
      description: 'Community-centered approaches to news and information.',
      value: '38',
      valueLabel: 'enrolled',
    },
    {
      rank: 7,
      href: 'https://www.journalism.cuny.edu/',
      title: 'Entrepreneurial Journalism',
      description: 'Building sustainable news ventures.',
      value: '32',
      valueLabel: 'enrolled',
    },
    {
      rank: 8,
      href: 'https://www.journalism.cuny.edu/',
      title: 'Data Journalism',
      description: 'Reporting with data, code, and visualization.',
      value: '28',
      valueLabel: 'enrolled',
    },
  ];
</script>

<!--
  Default: ProPublica-style hero with headline + byline on the left
  and a large animated Lottie data graphic on the right, rendered
  by DatabaseHeader.
-->
<Story name="Default" asChild>
  <SiteHeader />

  <DatabaseHeader
    headline="CUNY Journalism Courses Explorer"
    date="Updated January 2026"
    description="Find the program that fits your goals"
  >
    <div class="hero-controls">
      <SearchInput placeholder="Enter a program, topic, or keyword…" />
    </div>
    {#snippet graphic()}
      <LottieGraphic
        animationData={DATA_ANIMATION}
        ariaLabel="Animated data visualization with bar chart and pulsing elements"
        trimTop={0.25}
        trimBottom={0.06}
      />
    {/snippet}
  </DatabaseHeader>

  <div class="results-container">
    <RankingList
      title="Top Programs by Enrollment"
      items={explorerItems}
      pageSize={5}
    />
  </div>

  <div class="methodology-container">
    <MethodologyBox title="About This Database">
      <p>
        This database was compiled by student journalists at the Craig Newmark
        Graduate School of Journalism from public records and university
        publications. Data is updated as new programs and opportunities become
        available.
      </p>
      <p>
        Have a tip or found an error? Contact us at
        <a href="mailto:data@nycitynewsservice.com"
          >data@nycitynewsservice.com</a
        >.
      </p>
    </MethodologyBox>
  </div>

  <SiteFooter />
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  /* Controls inside the DatabaseHeader children slot */
  .hero-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    @include tablet {
      flex-direction: row;
    }
  }

  /* Results section below the header */
  .results-container {
    max-width: var(--max-width-wide);
    margin: var(--spacing-lg) auto;
    padding: 0 var(--spacing-md);
  }

  /* Methodology section */
  .methodology-container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }
</style>
