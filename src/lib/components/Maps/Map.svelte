<!--
@component
Map.svelte — Interactive map using MapLibre GL JS

Renders a pannable, zoomable map using OpenFreeMap basemap tiles.
Provides a Svelte context so child MapLayer components can register
their own GeoJSON sources and layers on the shared map instance.

USAGE EXAMPLE:
<Map
  longitude={-74.006}
  latitude={40.7128}
  zoom={10}
  theme="liberty"
>
  <MapLayer
    id="my-points"
    type="circle"
    data={geojsonData}
    paint={{ 'circle-radius': 6, 'circle-color': '#0033A1' }}
  />
</Map>
-->
<script>
  import { onMount, setContext } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';

  /** Maps theme names to OpenFreeMap style URLs */
  const THEME_URLS = {
    liberty: 'https://tiles.openfreemap.org/styles/liberty',
    bright: 'https://tiles.openfreemap.org/styles/bright',
    positron: 'https://tiles.openfreemap.org/styles/positron',
    fiord: 'https://tiles.openfreemap.org/styles/fiord',
    dark: 'https://tiles.openfreemap.org/styles/dark',
  };

  let {
    longitude = -74.006, // Map center longitude (default: NYC)
    latitude = 40.7128, // Map center latitude
    zoom = 10, // Initial zoom level (0–22)
    theme = 'liberty', // Basemap theme: 'liberty' | 'bright' | 'positron' | 'fiord' | 'dark'
    interactive = true, // Allow panning and zooming
    border = false, // Show an accent border around the map
    width = null, // Optional explicit width in pixels
    height = null, // Optional explicit height in pixels
    aspectRatio = '4 / 3', // Aspect ratio when no explicit height is given
    caption = '', // Optional caption below the map
    credit = 'OpenFreeMap / OpenStreetMap contributors',
    children, // Snippet for nested MapLayer components
  } = $props();

  const styleUrl = $derived(THEME_URLS[theme] ?? THEME_URLS.liberty);

  let mapContainer;
  let map = $state(null);
  let mapReady = $state(false);

  // Tracks the style URL currently applied, to avoid redundant setStyle calls
  let appliedStyleUrl = $state(null);

  // Build a descriptive label for screen readers
  const ariaLabel = $derived(
    caption
      ? `Interactive map: ${caption}`
      : `Interactive map centered at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
  );

  // Provide the map instance via context so child MapLayer components can use it
  const mapContext = {
    getMap: () => map,
    isReady: () => mapReady,
    /** Subscribe to style.load events for layer (re-)registration */
    onStyleLoad: (fn) => {
      if (!map) return;
      map.on('style.load', fn);
    },
    offStyleLoad: (fn) => {
      if (!map) return;
      map.off('style.load', fn);
    },
  };
  setContext('maplibre-map', mapContext);

  onMount(() => {
    let mounted = true;

    import('maplibre-gl')
      .then(({ Map: MaplibreMap }) => {
        if (!mounted) return;

        const instance = new MaplibreMap({
          container: mapContainer,
          style: styleUrl,
          center: [longitude, latitude],
          zoom,
          interactive,
          attributionControl: credit ? false : { compact: true },
        });

        instance.on('style.load', () => {
          if (!mounted) return;
          mapReady = true;
        });

        map = instance;
        appliedStyleUrl = styleUrl;
      })
      .catch((err) => {
        console.error('Map: failed to load maplibre-gl', err);
      });

    return () => {
      mounted = false;
      if (map) map.remove();
      map = null;
      mapReady = false;
    };
  });

  // Reactively update center and zoom when props change
  $effect(() => {
    if (!map) return;

    const center = map.getCenter();
    const centerChanged =
      Math.abs(center.lng - longitude) > 0.0001 ||
      Math.abs(center.lat - latitude) > 0.0001;
    const zoomChanged = Math.abs(map.getZoom() - zoom) > 0.01;

    if (!centerChanged && !zoomChanged) return;

    map.flyTo({
      center: [longitude, latitude],
      zoom,
      essential: true,
    });
  });

  // Reactively update the basemap style when theme changes
  $effect(() => {
    const url = styleUrl;
    if (!map || url === appliedStyleUrl) return;
    appliedStyleUrl = url;
    mapReady = false;
    map.setStyle(url);
  });
</script>

<figure class="map-figure" style:width={width ? `${width}px` : undefined}>
  <div
    class="map-container"
    class:has-border={border}
    bind:this={mapContainer}
    role="application"
    aria-label={ariaLabel}
    style:width={width ? `${width}px` : undefined}
    style:height={height ? `${height}px` : undefined}
    style:aspect-ratio={!height ? aspectRatio : undefined}
  ></div>
  {#if caption || credit}
    <figcaption class="caption-container">
      {#if caption}
        <span class="caption">{caption}</span>
      {/if}
      {#if credit}
        <span class="credit">{credit}</span>
      {/if}
    </figcaption>
  {/if}
</figure>

{#if mapReady && children}
  {@render children()}
{/if}

<style lang="scss">
  @use '../../styles' as *;

  .map-figure {
    margin: var(--spacing-sm) 0;
    padding: 0;
    width: 100%;

    @include tablet {
      margin: var(--spacing-sm) 0;
    }
  }

  .map-container {
    width: 100%;
    display: block;

    &.has-border {
      border: var(--border-width-accent) solid var(--color-accent);
      border-radius: var(--border-radius-sm);
    }
  }

  .caption-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding-top: var(--spacing-xxs);
    margin-top: var(--spacing-xxs);
  }

  .caption {
    font-size: var(--font-size-sm);
    line-height: var(--leading-caption);
    color: var(--color-text);
  }

  .credit {
    font-size: var(--font-size-xs);
    color: var(--color-medium-gray);
  }
</style>
