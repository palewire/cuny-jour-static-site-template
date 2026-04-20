import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Geocoder from '$lib/components/Maps/Geocoder.svelte';
import Map from '$lib/components/Maps/Map.svelte';
import MapLegend from '$lib/components/Maps/MapLegend.svelte';

// Mock maplibre-gl so it doesn't try to use WebGL in jsdom
vi.mock('maplibre-gl', () => {
  class MockMap {
    constructor() {
      this._listeners = {};
      this.on = vi.fn((event, fn) => {
        this._listeners[event] = this._listeners[event] || [];
        this._listeners[event].push(fn);
      });
      this.off = vi.fn((event, fn) => {
        if (this._listeners[event]) {
          this._listeners[event] = this._listeners[event].filter(
            (f) => f !== fn
          );
        }
      });
      this.once = vi.fn((event, fn) => {
        const wrapped = () => {
          this.off(event, wrapped);
          fn();
        };
        this.on(event, wrapped);
      });
      this.remove = vi.fn(() => {
        Object.keys(this._listeners).forEach((event) => {
          this._listeners[event] = [];
        });
      });
      this.getCenter = vi.fn(() => ({ lng: -74.006, lat: 40.7128 }));
      this.getZoom = vi.fn(() => 10);
      this.flyTo = vi.fn();
      this.setStyle = vi.fn();
      this.isStyleLoaded = vi.fn(() => true);
      this.getSource = vi.fn(() => null);
      this.getLayer = vi.fn(() => null);
      this.addSource = vi.fn();
      this.addLayer = vi.fn();
      this.removeSource = vi.fn();
      this.removeLayer = vi.fn();
      this.setPaintProperty = vi.fn();
      this.addControl = vi.fn();
      this.removeControl = vi.fn();
      this._fireStyleLoad = () => {
        if (this._listeners['style.load']) {
          this._listeners['style.load'].forEach((fn) => fn());
        }
      };

      // Fire style.load asynchronously to mimic real behavior
      setTimeout(() => this._fireStyleLoad(), 0);
    }
  }

  return {
    Map: MockMap,
    default: { Map: MockMap },
  };
});

// Mock the CSS import
vi.mock('maplibre-gl/dist/maplibre-gl.css', () => ({}));

/** Standard Nominatim-shaped mock response used by several tests. */
const mockResults = [
  {
    place_id: 123,
    display_name: 'New York, NY, USA',
    lat: '40.7128',
    lon: '-74.0060',
    type: 'city',
  },
  {
    place_id: 456,
    display_name: 'New York Mills, MN, USA',
    lat: '46.5180',
    lon: '-95.3764',
    type: 'city',
  },
];

/** Stubs globalThis.fetch with a successful Nominatim response. */
function stubFetchSuccess(data = mockResults) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      })
    )
  );
}

/** Types into the input and advances fake timers past the debounce + fetch. */
async function typeAndSearch(input, text) {
  await fireEvent.input(input, { target: { value: text } });
  await vi.advanceTimersByTimeAsync(0); // debounce fires (debounceMs=0)
  await vi.advanceTimersByTimeAsync(0); // flush fetch microtasks
}

describe('Geocoder', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders with default label and placeholder', () => {
    render(Geocoder);
    expect(screen.getByLabelText('Search')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter an address…')).toBeTruthy();
  });

  it('accepts a custom label and placeholder', () => {
    render(Geocoder, {
      props: { label: 'Find a place', placeholder: 'Type here…' },
    });
    expect(screen.getByLabelText('Find a place')).toBeTruthy();
    expect(screen.getByPlaceholderText('Type here…')).toBeTruthy();
  });

  it('has proper combobox ARIA attributes on the input', () => {
    render(Geocoder);
    const input = screen.getByPlaceholderText('Enter an address…');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
  });

  it('does not show results list initially', () => {
    const { container } = render(Geocoder);
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('shows loading indicator during fetch', async () => {
    let resolveFetch;
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve;
          })
      )
    );

    const { container } = render(Geocoder, {
      props: { debounceMs: 0 },
    });

    const input = screen.getByPlaceholderText('Enter an address…');
    await fireEvent.input(input, { target: { value: 'New York' } });
    await vi.advanceTimersByTimeAsync(0);

    expect(container.querySelector('.loading-indicator')).toBeTruthy();

    // Resolve so the component finishes cleanly
    resolveFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });
    await vi.advanceTimersByTimeAsync(0);
  });

  it('displays results from Nominatim response', async () => {
    stubFetchSuccess();
    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    expect(screen.getByText('New York, NY, USA')).toBeTruthy();
    expect(screen.getByText('New York Mills, MN, USA')).toBeTruthy();
  });

  it('fires onresult when a result is selected', async () => {
    stubFetchSuccess(mockResults.slice(0, 1));

    const onresult = vi.fn();
    render(Geocoder, { props: { debounceMs: 0, onresult } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    const option = screen.getByText('New York, NY, USA');
    await fireEvent.mouseDown(option);

    expect(onresult).toHaveBeenCalledWith({
      displayName: 'New York, NY, USA',
      lat: 40.7128,
      lng: -74.006,
    });
  });

  it('does not search for queries shorter than 3 characters', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await fireEvent.input(input, { target: { value: 'NY' } });
    await vi.advanceTimersByTimeAsync(0);

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('handles API errors gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )
    );

    const { container } = render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    // Should not show results and should not crash
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  // --- Keyboard navigation tests ---

  it('ArrowDown moves activeIndex through results', async () => {
    stubFetchSuccess();
    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    // First ArrowDown → index 0
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    let options = screen.getAllByRole('option');
    expect(options[0].getAttribute('aria-selected')).toBe('true');
    expect(options[1].getAttribute('aria-selected')).toBe('false');

    // Second ArrowDown → index 1
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    options = screen.getAllByRole('option');
    expect(options[0].getAttribute('aria-selected')).toBe('false');
    expect(options[1].getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowUp from -1 jumps to the last result', async () => {
    stubFetchSuccess();
    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    // ArrowUp when no item is active → last item
    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    const options = screen.getAllByRole('option');
    expect(options[options.length - 1].getAttribute('aria-selected')).toBe(
      'true'
    );
  });

  it('Enter selects the active result', async () => {
    stubFetchSuccess(mockResults.slice(0, 1));
    const onresult = vi.fn();
    render(Geocoder, { props: { debounceMs: 0, onresult } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await fireEvent.keyDown(input, { key: 'Enter' });

    expect(onresult).toHaveBeenCalledWith({
      displayName: 'New York, NY, USA',
      lat: 40.7128,
      lng: -74.006,
    });
  });

  it('Escape closes the dropdown', async () => {
    stubFetchSuccess();
    const { container } = render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Enter an address…');
    await typeAndSearch(input, 'New York');

    // Listbox should be open
    expect(container.querySelector('[role="listbox"]')).toBeTruthy();

    await fireEvent.keyDown(input, { key: 'Escape' });

    // Listbox should be closed
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });
});

describe('Map', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a map container with role="application"', async () => {
    const { container } = render(Map);
    await vi.advanceTimersByTimeAsync(0);
    expect(container.querySelector('[role="application"]')).toBeTruthy();
  });

  it('generates an aria-label from coordinates when no caption is given', async () => {
    render(Map, {
      props: { longitude: -74.006, latitude: 40.7128 },
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(
      screen.getByLabelText('Interactive map centered at 40.7128, -74.0060')
    ).toBeTruthy();
  });

  it('uses caption in aria-label when provided', async () => {
    render(Map, {
      props: { caption: 'New York City' },
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(
      screen.getByLabelText('Interactive map: New York City')
    ).toBeTruthy();
  });

  it('renders caption and credit in figcaption', async () => {
    render(Map, {
      props: {
        caption: 'A test caption',
        credit: 'Test Credit',
      },
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(screen.getByText('A test caption')).toBeTruthy();
    expect(screen.getByText('Test Credit')).toBeTruthy();
  });

  it('applies explicit width and height as inline styles', async () => {
    const { container } = render(Map, {
      props: { width: 400, height: 300 },
    });
    await vi.advanceTimersByTimeAsync(0);
    const mapEl = container.querySelector('[role="application"]');
    expect(mapEl.style.width).toBe('400px');
    expect(mapEl.style.height).toBe('300px');
  });

  it('does not render figcaption when no caption or credit', async () => {
    const { container } = render(Map, {
      props: { caption: '', credit: '' },
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(container.querySelector('figcaption')).toBeNull();
  });
});

describe('MapLegend', () => {
  /** Build a mock map context with spies for addControl / removeControl. */
  function makeMockContext() {
    const mockMap = {
      addControl: vi.fn(),
      removeControl: vi.fn(),
    };
    const ctx = {
      getMap: () => mockMap,
      isReady: () => true,
      onStyleLoad: vi.fn(),
      offStyleLoad: vi.fn(),
    };
    return { mockMap, ctx };
  }

  // Alias the native Map constructor because the `Map` identifier in this
  // file is shadowed by the Svelte Map component import.
  const NativeMap = globalThis.Map;

  it('calls addControl on the map when mounted', () => {
    const { mockMap, ctx } = makeMockContext();
    render(MapLegend, {
      props: { breaks: [10, 50], colors: ['#fff', '#aaa', '#000'] },
      context: new NativeMap([['maplibre-map', ctx]]),
    });
    expect(mockMap.addControl).toHaveBeenCalledOnce();
  });

  it('passes the requested position to addControl', () => {
    const { mockMap, ctx } = makeMockContext();
    render(MapLegend, {
      props: {
        breaks: [10],
        colors: ['#eee', '#333'],
        position: 'top-left',
      },
      context: new NativeMap([['maplibre-map', ctx]]),
    });
    expect(mockMap.addControl).toHaveBeenCalledWith(
      expect.any(Object),
      'top-left'
    );
  });

  it('throws when rendered outside a Map component', () => {
    expect(() =>
      render(MapLegend, {
        props: { breaks: [], colors: [] },
      })
    ).toThrow('MapLegend must be placed inside a Map component');
  });

  it('auto-generates labels from break values', () => {
    const { mockMap, ctx } = makeMockContext();
    render(MapLegend, {
      props: {
        breaks: [25, 75],
        colors: ['#f7fbff', '#9ecae1', '#2171b5'],
      },
      context: new NativeMap([['maplibre-map', ctx]]),
    });

    const control = mockMap.addControl.mock.calls[0][0];
    const container = control.onAdd();

    const labelTexts = Array.from(container.querySelectorAll('span:last-child')).map(
      (el) => el.textContent
    );
    expect(labelTexts).toContain('< 25');
    expect(labelTexts).toContain('25 \u2013 75');
    expect(labelTexts).toContain('\u2265 75');
  });

  it('uses custom labels when provided', () => {
    const { mockMap, ctx } = makeMockContext();
    render(MapLegend, {
      props: {
        breaks: [50],
        colors: ['#eee', '#333'],
        labels: ['Low', 'High'],
      },
      context: new NativeMap([['maplibre-map', ctx]]),
    });

    const control = mockMap.addControl.mock.calls[0][0];
    const container = control.onAdd();

    const labelTexts = Array.from(container.querySelectorAll('span:last-child')).map(
      (el) => el.textContent
    );
    expect(labelTexts).toEqual(['Low', 'High']);
  });

  it('renders a title element when title prop is provided', () => {
    const { mockMap, ctx } = makeMockContext();
    render(MapLegend, {
      props: {
        title: 'Population density',
        breaks: [100],
        colors: ['#eee', '#333'],
      },
      context: new NativeMap([['maplibre-map', ctx]]),
    });

    const control = mockMap.addControl.mock.calls[0][0];
    const container = control.onAdd();

    expect(container.firstChild.textContent).toBe('Population density');
  });

  it('renders one swatch row per color', () => {
    const { mockMap, ctx } = makeMockContext();
    const colors = ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#08306b'];
    render(MapLegend, {
      props: { breaks: [10, 25, 50, 100], colors },
      context: new NativeMap([['maplibre-map', ctx]]),
    });

    const control = mockMap.addControl.mock.calls[0][0];
    const container = control.onAdd();
    const swatches = container.querySelectorAll('span[aria-hidden="true"]');
    expect(swatches).toHaveLength(colors.length);
  });

  it('calls removeControl on the map when destroyed', () => {
    const { mockMap, ctx } = makeMockContext();
    const { unmount } = render(MapLegend, {
      props: { breaks: [50], colors: ['#eee', '#333'] },
      context: new NativeMap([['maplibre-map', ctx]]),
    });

    unmount();
    expect(mockMap.removeControl).toHaveBeenCalledOnce();
  });
});
