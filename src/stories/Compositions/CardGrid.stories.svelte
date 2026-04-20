<!--
  CardGrid.stories.svelte

  Composition story: a standard article layout with search and dropdown
  inputs that filter a responsive grid of Card components using the
  CardGrid component with built-in pagination.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';
  import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';
  import ArticleHeader from '$lib/components/Article/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import SearchInput from '$lib/components/Forms/SearchInput.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import MethodologyBox from '$lib/components/Article/MethodologyBox.svelte';

  const PROGRAMS = [
    {
      title: 'M.A. in Journalism',
      category: 'graduate',
      description:
        'Our flagship program trains reporters, editors, and multimedia journalists for the modern newsroom.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'M.A. in Engagement Journalism',
      category: 'graduate',
      description:
        'A unique program focused on building trust and deepening connections with communities.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'Bilingual Journalism',
      category: 'graduate',
      description:
        'For students fluent in English and Spanish who want to serve multilingual communities.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'Social Journalism',
      category: 'graduate',
      description:
        'Learn to practice journalism that listens to and engages with communities.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'News Innovation & Leadership',
      category: 'professional',
      description:
        'Evening and weekend workshops for mid-career journalists looking to lead.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Investigative Reporting',
      category: 'professional',
      description:
        'Intensive training in watchdog journalism, data analysis, and public records.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Data Journalism',
      category: 'professional',
      description:
        'Workshops on coding, data visualization, and computational reporting.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Audio & Podcasting',
      category: 'professional',
      description:
        'Hands-on production training for radio, podcasts, and audio storytelling.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Entrepreneurial Journalism',
      category: 'professional',
      description: 'Build a sustainable media business from idea to launch.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
  ];

  const CATEGORIES = [
    { value: 'graduate', label: 'Graduate Programs' },
    { value: 'professional', label: 'Professional Education' },
  ];

  const { Story } = defineMeta({
    title: 'Compositions/Card Grid',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<script>
  let searchQuery = $state('');
  let selectedCategory = $state('');

  let filtered = $derived(
    PROGRAMS.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  );
</script>

<Story name="Default" asChild>
  <SiteHeader />

  <div class="container">
    <ArticleHeader
      headline="Explore CUNY Journalism Programs"
      byline="NYCity News Service"
      pubDate="2026-01-31"
    />

    <ArticleBody>
      <p>
        The Craig Newmark Graduate School of Journalism offers graduate degrees,
        professional workshops, and fellowships. Use the filters below to find a
        program that fits your goals.
      </p>
    </ArticleBody>

    <div class="filters">
      <SearchInput
        label="Search Programs"
        placeholder="Search by name or keyword…"
        value={searchQuery}
        oninput={(e) => (searchQuery = e.target.value)}
      />
      <DropdownInput
        label="Category"
        placeholder="All categories…"
        options={CATEGORIES}
        value={selectedCategory}
        onchange={(e) => (selectedCategory = e.target.value)}
      />
    </div>

    <p class="result-count">
      {filtered.length} program{filtered.length !== 1 ? 's' : ''} found
    </p>

    <CardGrid items={filtered} pageSize={6} />

    {#if filtered.length === 0}
      <p class="no-results">
        No programs match your search. Try a different keyword or category.
      </p>
    {/if}

    <MethodologyBox title="About This Directory">
      <p>
        Program information was compiled from public materials published by the
        Craig Newmark Graduate School of Journalism at CUNY.
      </p>
    </MethodologyBox>
  </div>

  <SiteFooter />
</Story>

<style lang="scss">
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg, 2rem) var(--spacing-md);
  }

  .filters {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm, 0.75rem);
    margin: var(--spacing-md, 1rem) 0;
  }

  @media (min-width: 600px) {
    .filters {
      flex-direction: row;
    }
  }

  .result-count {
    font-size: var(--font-size-sm, 0.875rem);
    color: var(--color-medium-gray, #666);
    margin-bottom: var(--spacing-sm, 0.75rem);
  }

  .no-results {
    text-align: center;
    padding: var(--spacing-xl, 3rem) 0;
    color: var(--color-medium-gray, #666);
    font-style: italic;
  }
</style>
