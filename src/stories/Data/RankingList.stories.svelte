<!--
  RankingList.stories.svelte

  Stories for RankingList and RankingCard.
  RankingList is a container with an optional title and optional pagination.

  Slot mode: Pass RankingCard children directly (no pagination).
  Data-driven mode: Pass an `items` array and `pageSize` to enable pagination.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import RankingList from '$lib/components/Data/RankingList.svelte';
  import RankingCard from '$lib/components/Data/RankingCard.svelte';

  const { Story } = defineMeta({
    title: 'Data/RankingList',
    component: RankingList,
    tags: ['autodocs'],
  });

  const paginatedItems = [
    {
      rank: 1,
      title: 'Politics',
      description: 'City and state government coverage.',
      value: '312',
      valueLabel: 'alumni',
    },
    {
      rank: 2,
      title: 'Education',
      description: 'Reporting on schools and higher ed.',
      value: '289',
      valueLabel: 'alumni',
    },
    {
      rank: 3,
      title: 'Health',
      description: 'Public health and healthcare access.',
      value: '245',
      valueLabel: 'alumni',
    },
    {
      rank: 4,
      title: 'Housing',
      description: "Investigating the city's housing crisis.",
      value: '198',
      valueLabel: 'alumni',
    },
    {
      rank: 5,
      title: 'Arts & Culture',
      description: "Coverage of NYC's cultural scene.",
      value: '156',
      valueLabel: 'alumni',
    },
    {
      rank: 6,
      title: 'Immigration',
      description: 'Stories from immigrant communities.',
      value: '134',
      valueLabel: 'alumni',
    },
    {
      rank: 7,
      title: 'Criminal Justice',
      description: 'Courts, policing, and incarceration.',
      value: '121',
      valueLabel: 'alumni',
    },
    {
      rank: 8,
      title: 'Environment',
      description: 'Climate change and environmental justice.',
      value: '98',
      valueLabel: 'alumni',
    },
    {
      rank: 9,
      title: 'Technology',
      description: 'AI, social media, and digital rights.',
      value: '87',
      valueLabel: 'alumni',
    },
    {
      rank: 10,
      title: 'Business',
      description: 'Economy and workforce reporting.',
      value: '72',
      valueLabel: 'alumni',
    },
  ];
</script>

<!-- Default: a ranked list of CUNY journalism programs -->
<Story name="Default">
  <div style="max-width: 600px;">
    <RankingList title="Top Programs">
      <RankingCard
        rank={1}
        title="M.A. in Journalism"
        description="Our flagship program trains reporters, editors, and multimedia journalists."
      />
      <RankingCard
        rank={2}
        title="M.A. in Engagement Journalism"
        description="A unique program focused on building trust and deepening connections with communities."
      />
      <RankingCard
        rank={3}
        title="Bilingual Journalism"
        description="For students fluent in English and Spanish who want to serve multilingual communities."
      />
    </RankingList>
  </div>
</Story>

<!-- With Images: ranking cards with thumbnail images -->
<Story name="With Images">
  <div style="max-width: 600px;">
    <RankingList title="Most Popular Stories">
      <RankingCard
        rank={1}
        href="https://www.nycitynewsservice.com/"
        image="/example-photo.gif"
        imageAlt="News photo"
        title="Become a force for good. Join our next class."
        description="At the Craig Newmark Graduate School of Journalism, change is in our DNA."
      />
      <RankingCard
        rank={2}
        href="https://www.nycitynewsservice.com/"
        image="/example-photo.gif"
        imageAlt="News photo"
        title="Our low tuition rates make a world-class education affordable"
        description="50% of students attend tuition free."
      />
      <RankingCard
        rank={3}
        href="https://www.nycitynewsservice.com/"
        image="/example-photo.gif"
        imageAlt="News photo"
        title="Classes led by accomplished full-time faculty and adjuncts"
        description="Faculty tap their networks to help students find jobs."
      />
    </RankingList>
  </div>
</Story>

<!-- With Values: ranking cards showing a sort value on the right -->
<Story name="With Values">
  <div style="max-width: 600px;">
    <RankingList title="Most Alumni by Beat">
      <RankingCard
        rank={1}
        title="Politics"
        description="City and state government coverage."
        value="312"
        valueLabel="alumni"
      />
      <RankingCard
        rank={2}
        title="Education"
        description="Reporting on schools and higher ed."
        value="289"
        valueLabel="alumni"
      />
      <RankingCard
        rank={3}
        title="Health"
        description="Public health and healthcare access."
        value="245"
        valueLabel="alumni"
      />
      <RankingCard
        rank={4}
        title="Housing"
        description="Investigating the city's housing crisis."
        value="198"
        valueLabel="alumni"
      />
      <RankingCard
        rank={5}
        title="Arts & Culture"
        description="Coverage of NYC's cultural scene."
        value="156"
        valueLabel="alumni"
      />
    </RankingList>
  </div>
</Story>

<!-- No Title: ranking list without a header -->
<Story name="No Title">
  <div style="max-width: 600px;">
    <RankingList>
      <RankingCard
        rank={1}
        title="Arts & Culture"
        description="Coverage of NYC's cultural scene."
      />
      <RankingCard
        rank={2}
        title="Education"
        description="Reporting on schools and higher ed."
      />
      <RankingCard
        rank={3}
        title="Housing"
        description="Investigating the city's housing crisis."
      />
      <RankingCard
        rank={4}
        title="Health"
        description="Public health and healthcare access."
      />
      <RankingCard
        rank={5}
        title="Politics"
        description="City and state government coverage."
      />
    </RankingList>
  </div>
</Story>

<!-- With Pagination: data-driven list with Previous / Next controls -->
<Story name="With Pagination">
  <div style="max-width: 600px;">
    <RankingList
      title="Most Alumni by Beat"
      items={paginatedItems}
      pageSize={3}
    />
  </div>
</Story>
