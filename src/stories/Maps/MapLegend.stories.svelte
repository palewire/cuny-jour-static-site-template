<!--
  MapLegend.stories.svelte

  Stories for the MapLegend component.
  MapLegend renders a floating threshold-break color legend overlaid on a
  parent Map via MapLibre GL JS addControl(). It must be placed inside a
  Map component.

  Props:
  - title: Optional legend title string
  - breaks: Array of N threshold values defining N+1 color buckets
  - colors: Array of N+1 fill color strings (one per bucket)
  - labels: Optional array of N+1 custom label strings; auto-generated when null
  - position: Control position — 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MapLegend from '$lib/components/Maps/MapLegend.svelte';

  const { Story } = defineMeta({
    title: 'Maps/MapLegend',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'MapLegend renders a floating threshold-break color legend overlaid on a parent Map. It must be placed inside a Map component.',
        },
      },
    },
  });
</script>

<script>
  import Map from '$lib/components/Maps/Map.svelte';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';

  // Five NYC boroughs as simplified polygons — used in the choropleth story
  const boroughPolygons = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Manhattan', density: 2800 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-74.019, 40.699],
              [-73.907, 40.878],
              [-73.934, 40.851],
              [-74.009, 40.706],
              [-74.019, 40.699],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Brooklyn', density: 1450 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-74.041, 40.570],
              [-73.833, 40.592],
              [-73.862, 40.739],
              [-74.041, 40.739],
              [-74.041, 40.570],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Queens', density: 820 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-73.962, 40.542],
              [-73.700, 40.542],
              [-73.700, 40.800],
              [-73.962, 40.800],
              [-73.962, 40.542],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Bronx', density: 1300 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-73.933, 40.785],
              [-73.748, 40.785],
              [-73.748, 40.915],
              [-73.933, 40.915],
              [-73.933, 40.785],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Staten Island', density: 310 },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-74.259, 40.496],
              [-74.034, 40.496],
              [-74.034, 40.649],
              [-74.259, 40.649],
              [-74.259, 40.496],
            ],
          ],
        },
      },
    ],
  };

  const densityBreaks = [500, 1000, 1500, 2500];
  const densityColors = ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#08306b'];
</script>

<!-- Basic: Legend with auto-generated labels -->
<Story name="Basic" asChild>
  <Map longitude={-74.006} latitude={40.7128} zoom={10} caption="NYC population density by borough.">
    <MapLayer
      id="boroughs-fill"
      type="fill"
      data={boroughPolygons}
      paint={{
        'fill-color': [
          'step',
          ['get', 'density'],
          densityColors[0],
          densityBreaks[0], densityColors[1],
          densityBreaks[1], densityColors[2],
          densityBreaks[2], densityColors[3],
          densityBreaks[3], densityColors[4],
        ],
        'fill-opacity': 0.75,
      }}
    />
    <MapLayer
      id="boroughs-outline"
      type="line"
      data={boroughPolygons}
      paint={{ 'line-color': '#0033a1', 'line-width': 1 }}
    />
    <MapLegend
      title="People per sq. km"
      breaks={densityBreaks}
      colors={densityColors}
    />
  </Map>
</Story>

<!-- Custom Labels: Override the auto-generated label strings -->
<Story name="Custom Labels" asChild>
  <Map longitude={-74.006} latitude={40.7128} zoom={10} caption="NYC population density with descriptive labels.">
    <MapLayer
      id="boroughs-fill-custom"
      type="fill"
      data={boroughPolygons}
      paint={{
        'fill-color': [
          'step',
          ['get', 'density'],
          densityColors[0],
          densityBreaks[0], densityColors[1],
          densityBreaks[1], densityColors[2],
          densityBreaks[2], densityColors[3],
          densityBreaks[3], densityColors[4],
        ],
        'fill-opacity': 0.75,
      }}
    />
    <MapLegend
      title="Density"
      breaks={densityBreaks}
      colors={densityColors}
      labels={['Very low', 'Low', 'Moderate', 'High', 'Very high']}
    />
  </Map>
</Story>

<!-- No Title: Legend without a heading -->
<Story name="No Title" asChild>
  <Map longitude={-74.006} latitude={40.7128} zoom={10} caption="NYC boroughs colored by population density.">
    <MapLayer
      id="boroughs-fill-notitle"
      type="fill"
      data={boroughPolygons}
      paint={{
        'fill-color': [
          'step',
          ['get', 'density'],
          densityColors[0],
          densityBreaks[0], densityColors[1],
          densityBreaks[1], densityColors[2],
          densityBreaks[2], densityColors[3],
          densityBreaks[3], densityColors[4],
        ],
        'fill-opacity': 0.75,
      }}
    />
    <MapLegend
      breaks={densityBreaks}
      colors={densityColors}
    />
  </Map>
</Story>

<!-- Top Left: Legend positioned in the top-left corner -->
<Story name="Top Left" asChild>
  <Map longitude={-74.006} latitude={40.7128} zoom={10} caption="Legend positioned in the top-left corner.">
    <MapLayer
      id="boroughs-fill-topleft"
      type="fill"
      data={boroughPolygons}
      paint={{
        'fill-color': [
          'step',
          ['get', 'density'],
          densityColors[0],
          densityBreaks[0], densityColors[1],
          densityBreaks[1], densityColors[2],
          densityBreaks[2], densityColors[3],
          densityBreaks[3], densityColors[4],
        ],
        'fill-opacity': 0.75,
      }}
    />
    <MapLegend
      title="People per sq. km"
      breaks={densityBreaks}
      colors={densityColors}
      position="top-left"
    />
  </Map>
</Story>

<!-- Two Breaks: Simpler three-bucket legend -->
<Story name="Two Breaks" asChild>
  <Map longitude={-74.006} latitude={40.7128} zoom={10} caption="Simple three-bucket legend with two threshold breaks.">
    <MapLayer
      id="boroughs-fill-simple"
      type="fill"
      data={boroughPolygons}
      paint={{
        'fill-color': [
          'step',
          ['get', 'density'],
          '#eff3ff',
          1000, '#6baed6',
          2000, '#2171b5',
        ],
        'fill-opacity': 0.75,
      }}
    />
    <MapLegend
      title="Density"
      breaks={[1000, 2000]}
      colors={['#eff3ff', '#6baed6', '#2171b5']}
    />
  </Map>
</Story>
