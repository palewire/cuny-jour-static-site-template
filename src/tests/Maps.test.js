import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Geocoder from '$lib/components/Maps/Geocoder.svelte';
import Legend from '$lib/components/Maps/Legend.svelte';
import Map from '$lib/components/Maps/Map.svelte';

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

  it('uses the fiord theme URL when theme="fiord"', async () => {
    const maplibreModule = await import('maplibre-gl');
    const constructorSpy = vi.spyOn(maplibreModule, 'Map');
    render(Map, { props: { theme: 'fiord' } });
    await vi.advanceTimersByTimeAsync(0);
    expect(constructorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        style: 'https://tiles.openfreemap.org/styles/fiord',
      })
    );
  });

  it('uses the dark theme URL when theme="dark"', async () => {
    const maplibreModule = await import('maplibre-gl');
    const constructorSpy = vi.spyOn(maplibreModule, 'Map');
    render(Map, { props: { theme: 'dark' } });
    await vi.advanceTimersByTimeAsync(0);
    expect(constructorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        style: 'https://tiles.openfreemap.org/styles/dark',
      })
    );
  });
});

describe('Legend', () => {
  it('renders threshold bins with generated labels', () => {
    render(Legend, {
      props: {
        title: 'Rent Burden',
        mode: 'threshold',
        items: [
          { to: 10, color: '#f4d35e' },
          { from: 10, to: 25, color: '#ee964b' },
          { from: 25, color: '#f95738' },
        ],
      },
    });

    expect(screen.getByText('Rent Burden')).toBeTruthy();
    expect(screen.getByText('0')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('25')).toBeTruthy();
    expect(screen.queryByText('Under 10')).toBeNull();
  });

  it('renders a continuous gradient with explicit tick labels', () => {
    render(Legend, {
      props: {
        title: 'Graduation Rate',
        mode: 'continuous',
        stops: [
          { value: 0, color: '#edf8fb' },
          { value: 50, color: '#66c2a4' },
          { value: 100, color: '#238b45' },
        ],
        ticks: [
          { value: 0, label: '0%' },
          { value: 50, label: '50%' },
          { value: 100, label: '100%' },
        ],
      },
    });

    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.getByText('50%')).toBeTruthy();
    expect(screen.getByText('100%')).toBeTruthy();
  });

  it('renders a diverging legend with midpoint label', () => {
    render(Legend, {
      props: {
        title: 'Change Since 2020',
        mode: 'diverging',
        items: [
          { to: -15, color: '#b2182b' },
          { from: -15, to: 0, color: '#ef8a62' },
          { from: 0, to: 15, color: '#67a9cf' },
          { from: 15, color: '#2166ac' },
        ],
        midpoint: { value: 0, label: 'No change' },
      },
    });

    expect(screen.getByText('No change')).toBeTruthy();
    expect(screen.getByText('-15')).toBeTruthy();
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('renders a categorical legend as swatches with labels in a row', () => {
    render(Legend, {
      props: {
        title: 'Site Type',
        mode: 'categorical',
        items: [
          { label: 'Hospital', color: '#0033a1' },
          { label: 'School', color: '#ee964b' },
          { label: 'Shelter', color: '#f95738' },
        ],
      },
    });

    expect(screen.getByText('Site Type')).toBeTruthy();
    expect(screen.getByText('Hospital')).toBeTruthy();
    expect(screen.getByText('School')).toBeTruthy();
    expect(screen.getByText('Shelter')).toBeTruthy();
  });

  it('renders proportional symbols with a subtitle and value labels', () => {
    render(Legend, {
      props: {
        title: 'Population',
        subtitle: 'in million inh.',
        mode: 'proportional-symbols',
        items: [
          { value: 1400, label: '1,400' },
          { value: 600, label: '600' },
          { value: 150, label: '150' },
          { value: 0, label: '0' },
        ],
      },
    });

    expect(screen.getByText('Population')).toBeTruthy();
    expect(screen.getByText('in million inh.')).toBeTruthy();
    expect(screen.getByText('1,400')).toBeTruthy();
    expect(screen.getByText('600')).toBeTruthy();
    expect(screen.getByText('150')).toBeTruthy();
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('renders noData as a swatch item for non-categorical legends', () => {
    render(Legend, {
      props: {
        title: 'Rent Burden',
        mode: 'threshold',
        items: [
          { to: 10, color: '#f4d35e' },
          { from: 10, to: 25, color: '#ee964b' },
          { from: 25, color: '#f95738' },
        ],
        noData: { label: 'Data not available' },
      },
    });

    expect(screen.getByText('Data not available')).toBeTruthy();
  });

  it('renders noData as a swatch item for categorical legends', () => {
    render(Legend, {
      props: {
        title: 'Site Type',
        mode: 'categorical',
        items: [
          { label: 'Hospital', color: '#0033a1' },
          { label: 'School', color: '#ee964b' },
        ],
        noData: { label: 'Data not available' },
      },
    });

    expect(screen.getByText('Data not available')).toBeTruthy();
  });

  it('throws when diverging mode midpoint is outside the legend domain', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'diverging',
          items: [
            { to: -10, color: '#b2182b' },
            { from: -10, to: 0, color: '#ef8a62' },
            { from: 0, to: 10, color: '#67a9cf' },
          ],
          midpoint: { value: 25 },
        },
      })
    ).toThrow(/midpoint/i);
  });

  it('throws when diverging mode midpoint is not an object', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'diverging',
          items: [
            { to: -10, color: '#b2182b' },
            { from: -10, to: 0, color: '#ef8a62' },
            { from: 0, to: 10, color: '#67a9cf' },
          ],
          midpoint: 0,
        },
      })
    ).toThrow(/midpoint/i);
  });

  it('throws when continuous stops are not in ascending order', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'continuous',
          stops: [
            { value: 50, color: '#66c2a4' },
            { value: 0, color: '#edf8fb' },
          ],
        },
      })
    ).toThrow(/ascending value/i);
  });

  it('throws when categorical items are missing labels', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'categorical',
          items: [{ color: '#0033a1' }],
        },
      })
    ).toThrow(/label/i);
  });

  it('throws when proportional symbol items have negative values', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'proportional-symbols',
          items: [{ value: -1, label: 'Invalid' }],
        },
      })
    ).toThrow(/non-negative/i);
  });

  it('throws when noData objects are missing labels', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'categorical',
          items: [{ label: 'Hospital', color: '#0033a1' }],
          noData: { color: '#d9d9d9' },
        },
      })
    ).toThrow(/noData.*label/i);
  });

  it('throws when noData is a string', () => {
    expect(() =>
      render(Legend, {
        props: {
          mode: 'categorical',
          items: [{ label: 'Hospital', color: '#0033a1' }],
          noData: 'Data not available',
        },
      })
    ).toThrow(/noData/i);
  });
});
