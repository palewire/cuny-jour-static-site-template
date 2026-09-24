<!--
  A complete multimedia gallery with all slide types.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SlideGallery from '$lib/components/MultimediaGallery/SlideGallery.svelte';
  import TitleSlide from '$lib/components/MultimediaGallery/TitleSlide.svelte';
  import PhotoSlide from '$lib/components/MultimediaGallery/PhotoSlide.svelte';
  import TextSlide from '$lib/components/MultimediaGallery/TextSlide.svelte';
  import CreditsSlide from '$lib/components/MultimediaGallery/CreditsSlide.svelte';

  const { Story } = defineMeta({
    title: 'Compositions/Multimedia Gallery',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<Story name="Default" asChild>
  <div class="gallery-frame">
    <SlideGallery>
      <TitleSlide
        headline="Lorem Ipsum Dolor"
        intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod."
        byline="By Jane Doe"
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/crusher.jpg',
          title: 'Lorem Ipsum',
          caption:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <TextSlide
        slide={{
          headline: 'Consectetur Adipiscing',
          body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        }}
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/glasses.jpg',
          title: 'Dolor Sit Amet',
          caption:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/glazer.jpg',
          title: 'Tempor Incididunt',
          caption:
            'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <TextSlide
        slide={{
          headline: 'Magna Aliqua',
          body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
        }}
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/lamp.jpg',
          title: 'Quis Nostrud',
          caption:
            'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/steady.jpg',
          title: 'Excepteur Sint',
          caption:
            'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <CreditsSlide>
        <h2>Credits</h2>
        <p>Photography and text by Jane Doe</p>
        <p>
          Published by
          <a href="https://www.nycitynewsservice.com/">NYCity News Service</a>
        </p>
        <p>Craig Newmark Graduate School of Journalism</p>
      </CreditsSlide>
    </SlideGallery>
  </div>
</Story>

<Story
  name="Desktop"
  asChild
  parameters={{ viewport: { defaultViewport: 'responsive' } }}
>
  <div class="desktop-frame">
    <SlideGallery>
      <TitleSlide
        headline="Lorem Ipsum Dolor"
        intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod."
        byline="By Jane Doe"
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/crusher.jpg',
          title: 'Lorem Ipsum',
          caption:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <TextSlide
        slide={{
          headline: 'Consectetur Adipiscing',
          body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        }}
      />
      <PhotoSlide
        photo={{
          filename: 'storybook/glasses.jpg',
          title: 'Dolor Sit Amet',
          caption:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          credit: 'Photo by Jane Doe',
        }}
      />
      <CreditsSlide>
        <h2>Credits</h2>
        <p>Photography and text by Jane Doe</p>
        <p>
          Published by
          <a href="https://www.nycitynewsservice.com/">NYCity News Service</a>
        </p>
      </CreditsSlide>
    </SlideGallery>
  </div>
</Story>

<style>
  /* Remove iframe body margin so fullscreen stories fill the canvas edge-to-edge */
  :global(body) {
    margin: 0 !important;
  }

  .gallery-frame {
    width: 375px;
    height: 667px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  /* Override the component's viewport-based sizing so it fits the frame */
  .gallery-frame :global(.gallery-wrapper) {
    height: 667px;
  }

  .desktop-frame {
    width: 100%;
    aspect-ratio: 16 / 10;
    position: relative;
    overflow: hidden;
    background: black;
  }

  .desktop-frame :global(.gallery-wrapper) {
    height: 100% !important;
  }
</style>
