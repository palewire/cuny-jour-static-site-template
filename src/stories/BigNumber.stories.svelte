<!--
  BigNumber.stories.svelte

  Stories for the BigNumber component.
  BigNumber displays a large statistic with a label — perfect for data dashboards
  in journalism projects.

  Props:
  - number: The value to display prominently (string or number)
  - label: Short description of the metric (string)
  - footnote: Optional small clarifying text below the label (string)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BigNumber from '$lib/components/BigNumber.svelte';

  const { Story } = defineMeta({
    title: 'Components/BigNumber',
    component: BigNumber,
    tags: ['autodocs'],
    argTypes: {
      number: {
        control: 'text',
        description: 'The prominent value to display (e.g. "42%", "$1.2M", "3,500")',
      },
      label: {
        control: 'text',
        description: 'Short description of the metric displayed below the number',
      },
      footnote: {
        control: 'text',
        description: 'Optional small clarifying text below the label',
      },
    },
  });
</script>

<!-- Default: year founded with a label -->
<Story name="Default" args={{ number: '2006', label: 'Year Founded' }} />

<!-- With Footnote: includes optional clarifying text -->
<Story
  name="With Footnote"
  args={{
    number: '3',
    label: 'Media Centers',
    footnote: 'Research, training, and thought leadership',
  }}
/>

<!-- Large Number: shows large count formatting -->
<Story name="Large Number" args={{ number: '3', label: "Master's Degree Programs" }} />

<!-- Count: whole number example -->
<Story name="Count" args={{ number: '219 W. 40th St.', label: 'Campus Location' }} />

<!-- Year: shows date examples -->
<Story
  name="Year"
  args={{
    number: '2006',
    label: 'Year Founded',
    footnote: 'Born during the digital revolution',
  }}
/>
