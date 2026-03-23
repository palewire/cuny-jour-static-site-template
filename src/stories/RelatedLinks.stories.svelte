<!--
  RelatedLinks.stories.svelte

  Stories for the RelatedLinks component.
  RelatedLinks renders a "Related Stories" section at the end of an article —
  a list of links with a bold, uppercase, blue-accented heading.

  Props:
  - title: Section heading text (default: "RELATED STORIES")
  - links: Array of { headline, href } objects
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import RelatedLinks from '$lib/components/RelatedLinks.svelte';

  const { Story } = defineMeta({
    title: 'Components/RelatedLinks',
    component: RelatedLinks,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
        description: 'Section heading text displayed above the link list',
      },
      links: {
        control: 'object',
        description: 'Array of link objects, each with a headline and href property',
      },
    },
  });
</script>

<!-- Default: standard "Related Stories" section with several links -->
<Story
  name="Default"
  args={{
    title: 'RELATED STORIES',
    links: [
      {
        headline: 'How America\'s top news organizations escape rigid publishing systems to design beautiful data-driven stories on deadline.',
        href: 'https://palewi.re/docs/coding-the-news/',
      },
      {
        headline: 'How to install, configure and use Visual Studio Code, GitHub and Copilot',
        href: 'https://palewi.re/docs/coding-the-news/scripts/week-1/',
      },
      {
        headline: 'How to publish a website with Node.JS and GitHub Actions',
        href: 'https://palewi.re/docs/coding-the-news/scripts/week-2/',
      },
    ],
  }}
/>

<!-- Custom Title: section with a different heading label -->
<Story
  name="Custom Title"
  args={{
    title: 'MORE ON THIS TOPIC',
    links: [
      { headline: 'How to install, configure and use Visual Studio Code, GitHub and Copilot', href: 'https://palewi.re/docs/coding-the-news/scripts/week-1/' },
      { headline: 'How to publish a website with Node.JS and GitHub Actions', href: 'https://palewi.re/docs/coding-the-news/scripts/week-2/' },
    ],
  }}
/>

<!-- Single Link: the minimum case — just one related story -->
<Story
  name="Single Link"
  args={{
    title: 'RELATED STORIES',
    links: [
      { headline: 'How America\'s top news organizations escape rigid publishing systems to design beautiful data-driven stories on deadline.', href: 'https://palewi.re/docs/coding-the-news/' },
    ],
  }}
/>

<!-- No Links: renders nothing (component hides itself when links array is empty) -->
<Story
  name="No Links (Hidden)"
  args={{
    title: 'RELATED STORIES',
    links: [],
  }}
/>
