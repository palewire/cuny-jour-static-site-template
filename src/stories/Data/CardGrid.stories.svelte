<!--
  CardGrid.stories.svelte

  Stories for the CardGrid component.
  CardGrid is a responsive grid container for Card components with optional pagination.

  Slot mode: Pass Card children directly (no pagination).
  Data-driven mode: Pass an `items` array and `pageSize` to enable pagination.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import Card from '$lib/components/Data/Card.svelte';

  const { Story } = defineMeta({
    title: 'Data/CardGrid',
    component: CardGrid,
    tags: ['autodocs'],
  });

  const paginatedItems = [
    {
      title: 'M.A. in Journalism',
      description:
        'Our flagship program trains reporters, editors, and multimedia journalists.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'M.A. in Engagement Journalism',
      description: 'Building trust and deepening connections with communities.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'Bilingual Journalism',
      description: 'For students fluent in English and Spanish.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'Social Journalism',
      description: 'Journalism that listens to and engages with communities.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Graduate',
    },
    {
      title: 'Investigative Reporting',
      description:
        'Intensive training in watchdog journalism and data analysis.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Data Journalism',
      description: 'Coding, data visualization, and computational reporting.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Audio & Podcasting',
      description: 'Production training for radio and audio storytelling.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'Entrepreneurial Journalism',
      description: 'Build a sustainable media business from idea to launch.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
    {
      title: 'News Innovation & Leadership',
      description: 'Workshops for mid-career journalists looking to lead.',
      href: 'https://www.journalism.cuny.edu/',
      footerLabel: 'Professional',
    },
  ];
</script>

<!-- Default: a grid using slot-based children -->
<Story name="Default">
  <CardGrid title="Programs">
    <Card href="https://www.journalism.cuny.edu/">
      <h3>M.A. in Journalism</h3>
      <p>Our flagship program trains reporters and multimedia journalists.</p>
    </Card>
    <Card href="https://www.journalism.cuny.edu/">
      <h3>M.A. in Engagement Journalism</h3>
      <p>Building trust and deepening connections with communities.</p>
    </Card>
    <Card href="https://www.journalism.cuny.edu/">
      <h3>Bilingual Journalism</h3>
      <p>For students fluent in English and Spanish.</p>
    </Card>
  </CardGrid>
</Story>

<!-- With Images: cards with top images -->
<Story name="With Images">
  <CardGrid title="Featured Stories">
    <Card
      href="https://www.nycitynewsservice.com/"
      image="/example-photo.gif"
      imageAlt="News photo"
    >
      <h3>Become a force for good</h3>
      <p>Join our next class at the Craig Newmark Graduate School.</p>
    </Card>
    <Card
      href="https://www.nycitynewsservice.com/"
      image="/example-photo.gif"
      imageAlt="News photo"
    >
      <h3>Affordable tuition rates</h3>
      <p>50% of students attend tuition free.</p>
    </Card>
    <Card
      href="https://www.nycitynewsservice.com/"
      image="/example-photo.gif"
      imageAlt="News photo"
    >
      <h3>Faculty-led classes</h3>
      <p>Faculty tap their networks to help students find jobs.</p>
    </Card>
  </CardGrid>
</Story>

<!-- With Pagination: data-driven grid with Previous / Next controls -->
<Story name="With Pagination">
  <CardGrid title="All Programs" items={paginatedItems} pageSize={3} />
</Story>

<!-- Two Columns: narrower grid using the columns prop -->
<Story name="Two Columns">
  <div style="max-width: 600px;">
    <CardGrid
      title="Highlights"
      items={paginatedItems.slice(0, 4)}
      columns={2}
    />
  </div>
</Story>
