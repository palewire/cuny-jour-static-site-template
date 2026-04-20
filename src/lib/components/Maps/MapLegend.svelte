<!--
@component
MapLegend.svelte — Threshold-break legend overlay for Map

Renders a floating color legend panel on a parent Map by registering a
custom MapLibre GL JS control via addControl(). Each row in the legend
displays a color swatch and a label for one threshold bucket.

Must be placed as a child of a Map component.

Threshold buckets are defined by a `breaks` array of N values and a
`colors` array of N + 1 colors:
  - colors[0]   → values below breaks[0]
  - colors[1]   → values from breaks[0] up to breaks[1]
  - …
  - colors[N]   → values at or above breaks[N-1]

Labels are auto-generated from the breaks (e.g. "< 10", "10 – 50",
"≥ 50") unless a custom `labels` array is supplied.

USAGE EXAMPLE:
<Map longitude={-74.006} latitude={40.7128} zoom={10}>
  <MapLayer
    id="boroughs"
    type="fill"
    data={boroughsGeoJSON}
    paint={{
      'fill-color': [
        'step', ['get', 'density'],
        '#f7fbff', 500, '#9ecae1', 2000, '#2171b5',
      ],
      'fill-opacity': 0.7,
    }}
  />
  <MapLegend
    title="Population density"
    breaks={[500, 2000]}
    colors={['#f7fbff', '#9ecae1', '#2171b5']}
    position="bottom-right"
  />
</Map>
-->
<script>
  import { getContext, onDestroy } from 'svelte';

  let {
    title = '', // Optional legend title shown above the color swatches
    breaks = [], // Threshold break values (N values → N+1 color buckets)
    colors = [], // Fill colors; must have exactly breaks.length + 1 entries
    labels = null, // Optional custom label strings; auto-generated when null
    position = 'bottom-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  } = $props();

  const ctx = getContext('maplibre-map');
  if (!ctx) {
    throw new Error(
      'MapLegend must be placed inside a Map component. No map context found.'
    );
  }

  /**
   * Build label strings from break values when no custom labels are provided.
   * For breaks [10, 50] and 3 colors the result is ["< 10", "10 – 50", "≥ 50"].
   */
  function buildAutoLabels(breakValues, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      if (breakValues.length === 0) {
        result.push(String(i + 1));
      } else if (i === 0) {
        result.push(`< ${breakValues[0]}`);
      } else if (i === count - 1) {
        result.push(`\u2265 ${breakValues[breakValues.length - 1]}`);
      } else {
        result.push(`${breakValues[i - 1]} \u2013 ${breakValues[i]}`);
      }
    }
    return result;
  }

  /**
   * Populate (or repopulate) a container element with the legend's title and
   * color-swatch rows.  Called once on mount and again whenever props change.
   */
  function renderContent(container, currentTitle, currentBreaks, currentColors, currentLabels) {
    // Clear previous content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const effectiveLabels =
      currentLabels && currentLabels.length === currentColors.length
        ? currentLabels
        : buildAutoLabels(currentBreaks, currentColors.length);

    // Apply container styles
    Object.assign(container.style, {
      background: 'rgba(255,255,255,0.92)',
      borderRadius: '4px',
      padding: '8px 10px',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
      fontSize: '12px',
      lineHeight: '1.4',
      color: '#333333',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      maxWidth: '180px',
      minWidth: '80px',
    });

    if (currentTitle) {
      const titleEl = document.createElement('div');
      Object.assign(titleEl.style, {
        fontWeight: '600',
        marginBottom: '6px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#1a1a1a',
      });
      titleEl.textContent = currentTitle;
      container.appendChild(titleEl);
    }

    currentColors.forEach((color, i) => {
      const row = document.createElement('div');
      Object.assign(row.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: i === 0 && !currentTitle ? '0' : '4px',
      });

      const swatch = document.createElement('span');
      Object.assign(swatch.style, {
        display: 'inline-block',
        width: '14px',
        height: '14px',
        background: color,
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: '2px',
        flexShrink: '0',
      });
      swatch.setAttribute('aria-hidden', 'true');

      const labelEl = document.createElement('span');
      labelEl.textContent = effectiveLabels[i] ?? '';

      row.appendChild(swatch);
      row.appendChild(labelEl);
      container.appendChild(row);
    });
  }

  // Create the DOM container that MapLibre will insert into the map overlay.
  // This runs synchronously because Map only renders children after mapReady,
  // so the map instance is guaranteed to exist.
  const controlContainer = document.createElement('div');
  controlContainer.className = 'map-legend-ctrl';

  const legendControl = {
    onAdd: () => controlContainer,
    onRemove: () => {
      if (controlContainer.parentNode) {
        controlContainer.parentNode.removeChild(controlContainer);
      }
    },
  };

  const map = ctx.getMap();
  if (map) {
    // position is intentionally read once at mount; MapLibre controls cannot
    // be repositioned after addControl is called.
    const initialPosition = position;
    map.addControl(legendControl, initialPosition);
  }

  // Populate the legend immediately and re-render whenever props change.
  $effect(() => {
    renderContent(controlContainer, title, breaks, colors, labels);
  });

  onDestroy(() => {
    const m = ctx.getMap();
    if (m && legendControl) {
      try {
        m.removeControl(legendControl);
      } catch {
        // ignore if already removed
      }
    }
  });
</script>
