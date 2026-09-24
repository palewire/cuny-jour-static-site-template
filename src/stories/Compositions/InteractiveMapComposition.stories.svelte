<!--
  Combine a geocoder search input with an interactive map that flies to the selected location and drops a marker.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Compositions/Interactive Map',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<script>
  import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';
  import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';
  import Geocoder from '$lib/components/Maps/Geocoder.svelte';
  import Map from '$lib/components/Maps/Map.svelte';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';

  // NYC default center
  const NYC_LNG = -74.006;
  const NYC_LAT = 40.7128;
  const NYC_ZOOM = 10;

  // Reactive map state
  let mapLng = $state(NYC_LNG);
  let mapLat = $state(NYC_LAT);
  let mapZoom = $state(NYC_ZOOM);
  let hasResult = $state(false);

  // GeoJSON for the selected-location dot
  let markerData = $state({
    type: 'FeatureCollection',
    features: [],
  });

  function handleResult(result) {
    mapLng = result.lng;
    mapLat = result.lat;
    mapZoom = 15;
    hasResult = true;

    markerData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [result.lng, result.lat],
          },
          properties: { name: result.displayName },
        },
      ],
    };
  }
</script>

<Story name="Default" asChild>
  <SiteHeader />

  <div class="map-page">
    <header class="map-header">
      <h1>Find a location in New York City</h1>
      <p class="map-description">
        Search for an address, landmark, or neighborhood. The map will fly to
        the location and drop a marker.
      </p>
    </header>

    <div class="search-bar">
      <Geocoder
        label="Search NYC"
        placeholder="Enter an address or place name…"
        onresult={handleResult}
      />
    </div>

    <div class="map-wrapper">
      <Map
        longitude={mapLng}
        latitude={mapLat}
        zoom={mapZoom}
        theme="liberty"
        caption={hasResult
          ? `Showing results near ${mapLat.toFixed(4)}, ${mapLng.toFixed(4)}`
          : ''}
        credit="OpenFreeMap / OpenStreetMap contributors"
      >
        <MapLayer
          id="search-result-marker"
          type="circle"
          data={markerData}
          paint={{
            'circle-radius': 10,
            'circle-color': '#0033A1',
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
          }}
        />
      </Map>
    </div>
  </div>

  <SiteFooter />
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  .map-page {
    max-width: var(--max-width-wide);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .map-header {
    margin-bottom: var(--spacing-md);

    h1 {
      font-family: var(--font-serif);
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-dark);
      margin-bottom: var(--spacing-xs);
    }
  }

  .map-description {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    color: var(--color-medium-gray);
    line-height: var(--leading-normal);
    margin-bottom: 0;
  }

  .search-bar {
    margin-bottom: var(--spacing-md);
    max-width: 500px;
  }

  .map-wrapper {
    width: 100%;
  }

  @include mobile {
    .map-header h1 {
      font-size: var(--font-size-3xl);
    }
  }
</style>
