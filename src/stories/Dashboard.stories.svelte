<!--
  Dashboard.stories.svelte

  Stories for the Dashboard component.
  Dashboard is a flex-row layout container designed to hold BigNumber stat cards
  side by side. It wraps on small screens so cards stack vertically on mobile.

  Props:
  - children: BigNumber (or other) components passed between opening/closing tags
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dashboard from '$lib/components/Dashboard.svelte';
  import BigNumber from '$lib/components/BigNumber.svelte';

  const { Story } = defineMeta({
    title: 'Components/Dashboard',
    component: Dashboard,
    tags: ['autodocs'],
    parameters: {
      layout: 'padded',
    },
  });
</script>

<!-- Default: three BigNumber cards in a row -->
<Story name="Default">
  <Dashboard>
    <BigNumber number="2006" label="Year Founded" />
    <BigNumber number="3" label="Media Centers" />
    <BigNumber number="3" label="Master's Degree Programs" />
  </Dashboard>
</Story>

<!-- Two Stats: two-card layout -->
<Story name="Two Stats">
  <Dashboard>
    <BigNumber number="2006" label="Year Founded" />
    <BigNumber number="3" label="Media Centers" footnote="Research, training, and thought leadership" />
  </Dashboard>
</Story>

<!-- Three Stats: three-card layout -->
<Story name="Three Stats">
  <Dashboard>
    <BigNumber number="3" label="Master's Degree Programs" />
    <BigNumber number="3" label="Media Centers" />
    <BigNumber number="2006" label="Year Founded" />
  </Dashboard>
</Story>

<!-- With Footnotes: stat cards with source attribution -->
<Story name="With Footnotes">
  <Dashboard>
    <BigNumber
      number="2006"
      label="Year Founded"
      footnote="Born during the digital revolution"
    />
    <BigNumber
      number="3"
      label="Media Centers"
      footnote="Research, training, and thought leadership"
    />
    <BigNumber
      number="3"
      label="Master's Degree Programs"
      footnote="Journalism, engagement journalism, and bilingual"
    />
  </Dashboard>
</Story>
