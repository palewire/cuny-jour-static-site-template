<!--
  Map.stories.svelte

  Stories for the Map component.
  Map renders an interactive, pannable, zoomable MapLibre GL JS map
  using OpenFreeMap basemaps. It provides a Svelte context for child
  MapLayer components.

  Props:
  - longitude: Map center longitude (default: -74.006)
  - latitude: Map center latitude (default: 40.7128)
  - zoom: Initial zoom level 0–22 (default: 10)
  - theme: Basemap theme — 'liberty' | 'bright' | 'positron' | 'fiord' | 'dark' (default: 'liberty')
  - interactive: Allow panning/zooming (default: true)
  - border: Show an accent border around the map (default: false)
  - width: Optional explicit width in pixels
  - height: Optional explicit height in pixels
  - aspectRatio: CSS aspect ratio when no height is set (default: '4 / 3')
  - caption: Optional caption text below the map
  - credit: Optional credit line
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Map from '$lib/components/Maps/Map.svelte';

  const { Story } = defineMeta({
    title: 'Maps/Map',
    component: Map,
    tags: ['autodocs'],
    argTypes: {
      longitude: {
        control: { type: 'number', step: 0.001 },
        description: 'Map center longitude',
      },
      latitude: {
        control: { type: 'number', step: 0.001 },
        description: 'Map center latitude',
      },
      zoom: {
        control: { type: 'range', min: 0, max: 22, step: 0.5 },
        description: 'Initial zoom level (0 = world, 22 = building)',
      },
      theme: {
        control: { type: 'select' },
        options: ['liberty', 'bright', 'positron', 'fiord', 'dark'],
        description:
          "OpenFreeMap basemap theme ('liberty', 'bright', 'positron', 'fiord', or 'dark')",
      },
      interactive: {
        control: 'boolean',
        description: 'Allow pan and zoom interactions',
      },
      border: {
        control: 'boolean',
        description: 'Show an accent border around the map',
      },
      width: {
        control: { type: 'number', step: 50 },
        description: 'Explicit width in pixels',
      },
      height: {
        control: { type: 'number', step: 50 },
        description: 'Explicit height in pixels',
      },
      aspectRatio: {
        control: 'text',
        description: 'CSS aspect-ratio when no height is set',
      },
      caption: {
        control: 'text',
        description: 'Optional caption displayed below the map',
      },
      credit: {
        control: 'text',
        description: 'Optional credit attribution line',
      },
    },
  });
</script>

<!-- Default: Interactive map of New York City -->
<Story
  name="Default"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    caption: 'New York City — pan and zoom to explore.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- Neighborhood View: Zoomed into Midtown Manhattan -->
<Story
  name="Neighborhood View"
  args={{
    longitude: -73.9914662,
    latitude: 40.7555711,
    zoom: 14,
    caption:
      'Midtown Manhattan, home of the Craig Newmark Graduate School of Journalism.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- Bright Theme -->
<Story
  name="Bright Theme"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    theme: 'bright',
    caption: 'New York City with the bright basemap theme.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- Positron Theme -->
<Story
  name="Positron Theme"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    theme: 'positron',
    caption: 'New York City with the positron basemap theme.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- Fiord Theme -->
<Story
  name="Fiord Theme"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    theme: 'fiord',
    caption: 'New York City with the fiord basemap theme.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- Dark Theme -->
<Story
  name="Dark Theme"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    theme: 'dark',
    caption: 'New York City with the dark basemap theme.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- Fixed Size: Explicit width and height -->
<Story
  name="Fixed Size"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    width: 400,
    height: 300,
    caption: 'A 400×300 pixel interactive map.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>

<!-- With Border: Accent border around the map -->
<Story
  name="With Border"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 10,
    border: true,
    caption: 'Map with an accent border.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
/>
