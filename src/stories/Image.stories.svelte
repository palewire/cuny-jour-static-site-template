<!--
  Image.stories.svelte

  Stories for the Image component.
  Image renders a responsive figure with an optional caption and photo credit.
  It handles both local asset paths (resolved via SvelteKit's asset()) and
  external URLs.

  Props:
  - src: Image source URL or local path starting with "/" (required)
  - alt: Descriptive alt text for accessibility (required)
  - caption: Optional caption text below the image
  - credit: Optional photo credit line
  - size: Layout size — "full" | "large" | "medium" | "small" (default: "full")
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Image from '$lib/components/Image.svelte';

  // Demo image — the animated gif used on the main page
  const DEMO_IMAGE = '/example-photo.gif';

  const { Story } = defineMeta({
    title: 'Components/Image',
    component: Image,
    tags: ['autodocs'],
    argTypes: {
      src: {
        control: 'text',
        description: 'Image URL or local path (local paths starting with "/" are resolved via asset())',
      },
      alt: {
        control: 'text',
        description: 'Descriptive alt text for screen readers and accessibility',
      },
      caption: {
        control: 'text',
        description: 'Optional caption displayed below the image',
      },
      credit: {
        control: 'text',
        description: 'Optional photo credit attribution',
      },
      size: {
        control: { type: 'select' },
        options: ['full', 'large', 'medium', 'small'],
        description: 'Controls the maximum width of the image',
      },
    },
    args: {
      src: DEMO_IMAGE,
      alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    },
  });
</script>

<!-- Default: full-width image with caption and credit -->
<Story
  name="Default"
  args={{
    src: DEMO_IMAGE,
    alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    caption:
      'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    credit: 'Craig Newmark Graduate School of Journalism',
    size: 'full',
  }}
/>

<!-- No Caption: image displayed without any caption or credit -->
<Story
  name="No Caption"
  args={{
    src: DEMO_IMAGE,
    alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    size: 'full',
  }}
/>

<!-- Caption Only: image with caption text but no photo credit -->
<Story
  name="Caption Only"
  args={{
    src: DEMO_IMAGE,
    alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    caption:
      'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    size: 'full',
  }}
/>

<!-- Large Size: constrained to max-width-image-large (720px) -->
<Story
  name="Large Size"
  args={{
    src: DEMO_IMAGE,
    alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    caption:
      'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    credit: 'Craig Newmark Graduate School of Journalism',
    size: 'large',
  }}
/>

<!-- Medium Size: constrained to max-width-image-medium (480px) -->
<Story
  name="Medium Size"
  args={{
    src: DEMO_IMAGE,
    alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    caption:
      'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    credit: 'Craig Newmark Graduate School of Journalism',
    size: 'medium',
  }}
/>

<!-- Small Size: constrained to max-width-image-small (320px) -->
<Story
  name="Small Size"
  args={{
    src: DEMO_IMAGE,
    alt: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    caption:
      'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    credit: 'Craig Newmark Graduate School of Journalism',
    size: 'small',
  }}
/>
