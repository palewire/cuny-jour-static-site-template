<!--
  SiteHeader.stories.svelte

  Stories for the SiteHeader component.
  SiteHeader displays the NYCity News Service masthead with an animated gradient
  background and optional navigation links.

  Props:
  - navLinks: Array of { href, label } objects for navigation items
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteHeader from '$lib/components/SiteHeader.svelte';

  const { Story } = defineMeta({
    title: 'Components/SiteHeader',
    component: SiteHeader,
    tags: ['autodocs'],
    parameters: {
      // Use fullscreen layout so the header spans the full story width
      layout: 'fullscreen',
    },
    argTypes: {
      navLinks: {
        control: 'object',
        description: 'Array of navigation link objects with href and label properties',
      },
    },
  });
</script>

<!-- Default: header with no navigation links -->
<Story name="Default" args={{ navLinks: [] }} />

<!-- With Navigation: header with a full set of nav links -->
<Story
  name="With Navigation"
  args={{
    navLinks: [
      { href: '/programs', label: 'Programs' },
      { href: '/admissions', label: 'Admissions' },
      { href: '/media-centers', label: 'Media Centers' },
      { href: '/about', label: 'About' },
    ],
  }}
/>

<!-- Single Link: header with just one navigation item -->
<Story
  name="Single Link"
  args={{
    navLinks: [{ href: '/about', label: 'About' }],
  }}
/>
