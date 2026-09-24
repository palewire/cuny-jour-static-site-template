<!--
  Profile.stories.svelte

  Stories for the Profile component.
  Profile is a personal portfolio hero section displaying a headshot, name,
  tagline, contact links, and an optional "now / next" bio.

  Props:
  - name: Full name displayed as the page heading
  - tagline: One-line description beneath the name
  - photo: Optional photo URL (local paths are resolved with asset())
  - photoAlt: Alt text for the photo; falls back to name
  - email: Optional email address (renders a mailto: link)
  - github: Optional GitHub username (renders a link to github.com/{username})
  - linkedin: Optional LinkedIn username (renders a link to linkedin.com/in/{username})
  - bio: Optional multi-paragraph bio text (blank lines separate paragraphs)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Profile from '$lib/components/Portfolio/Profile.svelte';

  const { Story } = defineMeta({
    title: 'Portfolio/Profile',
    component: Profile,
    tags: ['autodocs'],
    args: {
      name: 'Max Eastman',
      tagline: 'Editor, poet, and political journalist',
      photo: '/photos/max-eastman.jpg',
      photoAlt:
        'Max Eastman, circa 1913. Bain News Service, Library of Congress.',
      email: 'max.eastman@example.com',
      github: 'maxeastman',
      linkedin: 'maxeastman',
      bio: '',
    },
    argTypes: {
      name: {
        control: 'text',
        description: 'Full name displayed as the page heading.',
      },
      tagline: {
        control: 'text',
        description: 'One-line description displayed beneath the name.',
      },
      photo: {
        control: 'text',
        description:
          'Optional photo URL. Local paths (starting with /) are resolved with asset().',
      },
      photoAlt: {
        control: 'text',
        description: 'Alt text for the photo. Defaults to name if omitted.',
      },
      email: {
        control: 'text',
        description: 'Optional email address. Renders as a mailto: link.',
      },
      github: {
        control: 'text',
        description:
          'Optional GitHub username. Renders as a link to github.com/{username}.',
      },
      linkedin: {
        control: 'text',
        description:
          'Optional LinkedIn username. Renders as a link to linkedin.com/in/{username}.',
      },
      bio: {
        control: 'text',
        description:
          'Optional bio text. Separate paragraphs with a blank line.',
      },
    },
  });
</script>

<!-- Default: name, tagline, and contact links — controls-driven -->
<Story name="Default">
  {#snippet children(args)}
    <div style="max-width: 800px; padding: 2rem;">
      <Profile {...args} />
    </div>
  {/snippet}
</Story>

<!-- Name Only: minimal card with no optional props -->
<Story
  name="Name Only"
  args={{
    tagline: '',
    photo: '',
    email: '',
    github: '',
    linkedin: '',
    bio: '',
  }}
>
  {#snippet children(args)}
    <div style="max-width: 800px; padding: 2rem;">
      <Profile {...args} />
    </div>
  {/snippet}
</Story>

<!-- With Bio: includes the now/next multi-paragraph bio -->
<Story
  name="With Bio"
  args={{
    bio: "I am the editor of The Masses, a monthly socialist magazine covering politics, art, and culture from New York City.\n\nNext, I am reporting on labor conditions in the garment district and translating Trotsky's writings for American readers.",
  }}
>
  {#snippet children(args)}
    <div style="max-width: 800px; padding: 2rem;">
      <Profile {...args} />
    </div>
  {/snippet}
</Story>

<!-- Contact Links Only: all three link types, no photo or bio -->
<Story
  name="Contact Links"
  args={{
    tagline: 'Editor, poet, and political journalist',
    photo: '',
    bio: '',
  }}
>
  {#snippet children(args)}
    <div style="max-width: 800px; padding: 2rem;">
      <Profile {...args} />
    </div>
  {/snippet}
</Story>
