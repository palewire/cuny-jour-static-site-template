<!--
  A styled horizontal rule for separating content sections.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Rule from '$lib/components/Layout/Rule.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Rule',
    component: Rule,
    tags: ['autodocs'],
  });
</script>

<Story name="Default">
  <p>Content above the rule.</p>
  <Rule />
  <p>Content below the rule.</p>
</Story>
