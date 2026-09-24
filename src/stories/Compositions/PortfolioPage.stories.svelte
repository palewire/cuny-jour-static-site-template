<!--
  PortfolioPage.stories.svelte

  A personal portfolio page combining the Profile hero component with a responsive card grid of work samples.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Profile from '$lib/components/Portfolio/Profile.svelte';
  import Card from '$lib/components/Data/Card.svelte';
  import CardGrid from '$lib/components/Data/CardGrid.svelte';
  import Kicker from '$lib/components/Article/Kicker.svelte';
  import Headline from '$lib/components/Article/Headline.svelte';
  import Image from '$lib/components/Media/Image.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import TagList from '$lib/components/Data/TagList.svelte';
  import Rule from '$lib/components/Layout/Rule.svelte';
  import data from './portfolio-data.yaml';

  const detail = data.clips[0];

  const { Story } = defineMeta({
    title: 'Compositions/Personal Portfolio',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<script>
</script>

<Story name="Homepage" asChild>
  <div>
    <div class="container">
      <Profile
        name={data.name}
        tagline={data.tagline}
        photo={data.photo}
        photoAlt={data.photoAlt}
        email={data.email}
        github={data.github}
        linkedin={data.linkedin}
        bio={data.bio}
      />

      <div class="clips-header">
        <h2>Selected Work</h2>
      </div>

      <CardGrid>
        {#each data.clips as clip (clip.title)}
          <Card href={clip.href} image={clip.image} imageAlt={clip.title}>
            <h3>{clip.title}</h3>
            <p>{clip.description}</p>
          </Card>
        {/each}
      </CardGrid>
    </div>
  </div>
</Story>

<!-- Project Detail: what a dedicated page for a single clip looks like -->
<Story name="Project Detail" asChild>
  <div>
    <div class="detail-container">
      <Kicker text="{data.name}'s Portfolio" />
      <Headline text={detail.title} />

      <Image src={detail.image} alt={detail.title} />

      <Rule />
      <TagList label="Skills" tags={detail.skills} />
      <TagList
        label="View Project"
        tags={[{ text: new URL(detail.url).hostname, href: detail.url }]}
      />
      <Rule />

      <ArticleBody>
        {#each detail.body.trim().split('\n\n') as paragraph, i (i)}
          <p class={i === 0 ? 'dropcap' : ''}>{paragraph}</p>
        {/each}
      </ArticleBody>
    </div>
  </div>
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  .container {
    width: 100%;
    max-width: calc(var(--max-width-wide) + 160px);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .clips-header {
    margin-bottom: var(--spacing-md);

    h2 {
      margin: 0;
    }
  }

  .detail-container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .detail-container :global(.image) {
    max-height: 400px;
    object-fit: cover;
    object-position: top;
  }
</style>
