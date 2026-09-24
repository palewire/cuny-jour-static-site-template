<!--
  A small pill label for skills, categories, or linked resources.

-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Tag from '$lib/components/Data/Tag.svelte';

  const { Story } = defineMeta({
    title: 'Data/Tag',
    component: Tag,
    tags: ['autodocs'],
    argTypes: {
      text: {
        control: 'text',
        description: 'The display label for the tag.',
      },
      href: {
        control: 'text',
        description: 'Optional URL. If set, the tag renders as a link.',
      },
    },
  });
</script>

<Story name="Default" args={{ text: 'Investigative reporting' }} />

<Story
  name="With Link"
  args={{
    text: 'cuny.edu',
    href: 'https://cuny.edu/',
  }}
/>
