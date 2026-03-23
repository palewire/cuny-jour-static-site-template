<!--
  ArticleHeader.stories.svelte

  Stories for the ArticleHeader component.
  ArticleHeader renders a large serif headline with a metadata box showing
  the byline and publication date in NYCity News Service style.

  Props:
  - headline: The main article title (required)
  - byline: Author name(s) (optional)
  - pubDate: Publication date in YYYY-MM-DD format (optional)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';

  const { Story } = defineMeta({
    title: 'Components/ArticleHeader',
    component: ArticleHeader,
    tags: ['autodocs'],
    argTypes: {
      headline: {
        control: 'text',
        description: 'The main article title displayed as a large serif heading',
      },
      byline: {
        control: 'text',
        description: 'Author name(s) shown in the metadata box',
      },
      pubDate: {
        control: 'text',
        description: 'Publication date in YYYY-MM-DD format (e.g. "2024-01-15")',
      },
    },
  });
</script>

<!-- Default: full headline with byline and date -->
<Story
  name="Default"
  args={{
    headline: 'Become a force for good. Join our next class.',
    byline: 'NYCity News Service',
    pubDate: '2026-01-31',
  }}
/>

<!-- Headline Only: no byline or date -->
<Story
  name="Headline Only"
  args={{
    headline: 'At the Craig Newmark Graduate School of Journalism, Change Is in Our DNA',
  }}
/>

<!-- With Byline Only: headline and author, no date -->
<Story
  name="With Byline Only"
  args={{
    headline: 'Our Mission Is to Serve the Public Interest by Training the Next Generation of Journalists',
    byline: 'NYCity News Service',
  }}
/>

<!-- With Date Only: headline and date, no byline -->
<Story
  name="With Date Only"
  args={{
    headline: 'Craig Newmark Graduate School of Journalism Opens Its Doors in Midtown Manhattan',
    pubDate: '2006-08-01',
  }}
/>

<!-- Long Headline: tests wrapping behavior on narrow viewports -->
<Story
  name="Long Headline"
  args={{
    headline:
      'How the Craig Newmark Graduate School of Journalism Is Training Skilled, Ethically Minded, and Diverse Journalists to Serve the Public Interest in an Era of Financial Pressures',
    byline: 'NYCity News Service',
    pubDate: '2026-01-31',
  }}
/>
