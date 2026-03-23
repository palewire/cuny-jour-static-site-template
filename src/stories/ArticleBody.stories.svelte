<!--
  ArticleBody.stories.svelte

  Stories for the ArticleBody component.
  ArticleBody is a wrapper that applies NYCity News Service typography to
  any HTML content — paragraphs, headings, links, blockquotes, and lists.

  Props:
  - children: Content passed between opening and closing tags (Svelte snippet)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ArticleBody from '$lib/components/ArticleBody.svelte';

  const { Story } = defineMeta({
    title: 'Components/ArticleBody',
    component: ArticleBody,
    tags: ['autodocs'],
    parameters: {
      // fullscreen so we can apply our own max-width container below,
      // which gives a more realistic reading-column preview.
      layout: 'fullscreen',
    },
  });
</script>

<!-- Default: typical article with multiple paragraphs -->
<Story name="Default">
  <div class="story-container">
    <ArticleBody>
      <p>
        At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined.
      </p>
      <p>
        We fashioned a school to teach the latest storytelling, entrepreneurial, and technological skills alongside reporting, writing, and ethics. Beyond that, we've crafted a culture that spurns complacency, that isn't afraid to pivot before the ground under us shifts.
      </p>
      <p>
        Our mission is to serve the public interest – by training new journalists from varied economic, racial, and cultural backgrounds who will bring much-needed diversity to newsrooms, by helping mid-career journalists retool their skills, and by partnering with other media organizations to find new paths to excellence.
      </p>
    </ArticleBody>
  </div>
</Story>

<!-- With Subheadings: shows h2/h3 typography inside article body -->
<Story name="With Subheadings">
  <div class="story-container">
    <ArticleBody>
      <p>
        At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined.
      </p>
      <h2>Affordable Excellence</h2>
      <p>
        Our low tuition rates, along with the added backing of private donors, allow candidates for our master's degrees in journalism and engagement journalism to receive a world-class education at an affordable price. We also offer a unique bilingual master's in journalism for students fluent in English and Spanish.
      </p>
      <h3>Media Centers and Professional Education</h3>
      <p>
        Our three media centers provide research, training, thought leadership, industry meet-ups, and financial support for quality journalistic work. We also offer a robust professional education program through regular evening and weekend workshops.
      </p>
    </ArticleBody>
  </div>
</Story>

<!-- With Blockquote: shows the NYCity-style blue-bordered pull quote -->
<Story name="With Blockquote">
  <div class="story-container">
    <ArticleBody>
      <p>
        At a time when our profession is reeling from financial pressures and lack of trust, the Newmark Graduate School of Journalism is committed to producing the next generation of skilled, ethically minded, and diverse journalists.
      </p>
      <blockquote>
        <p>
          "Our mission is to serve the public interest – by training new journalists from varied economic, racial, and cultural backgrounds who will bring much-needed diversity to newsrooms."
        </p>
      </blockquote>
      <p>
        We invite you to be part of our world.
      </p>
    </ArticleBody>
  </div>
</Story>

<!-- With Links and Lists: shows inline link and list typography -->
<Story name="With Links and Lists">
  <div class="story-container">
    <ArticleBody>
      <p>
        The Craig Newmark Graduate School of Journalism offers several paths to a career in journalism. Learn more at the <a href="https://www.journalism.cuny.edu/">school's website</a>.
      </p>
      <ul>
        <li>Master's degree in journalism</li>
        <li>Master's degree in engagement journalism</li>
        <li>Bilingual master's in journalism (English and Spanish)</li>
        <li>Professional education through evening and weekend workshops</li>
      </ul>
      <p>
        Classes are led by accomplished full-time faculty and adjuncts, who tap their networks to help students and graduates find internships, freelance opportunities and — the ultimate prize — jobs.
      </p>
    </ArticleBody>
  </div>
</Story>

<style>
  /* Mirror the page's .container class so the reading column has a realistic max-width */
  .story-container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }
</style>
