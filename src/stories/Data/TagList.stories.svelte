<!--
  A labeled group of Tag pills.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TagList from '$lib/components/Data/TagList.svelte';

  const { Story } = defineMeta({
    title: 'Data/TagList',
    component: TagList,
    tags: ['autodocs'],
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Skills',
    tags: [
      { text: 'Investigative reporting' },
      { text: 'Court records analysis' },
      { text: 'Long-form writing' },
    ],
  }}
/>

<Story
  name="With Links"
  args={{
    label: 'View Project',
    tags: [
      {
        text: 'marxists.org',
        href: 'https://www.marxists.org/archive/eastman/',
      },
    ],
  }}
/>

<Story
  name="No Label"
  args={{
    tags: [
      { text: 'Investigative reporting' },
      { text: 'Court records analysis' },
      {
        text: 'cuny.edu',
        href: 'https://cuny.edu/',
      },
    ],
  }}
/>
