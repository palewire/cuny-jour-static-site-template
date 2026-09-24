<!--
@component
Geocoder.svelte — Address search input that returns latitude and longitude.

Uses the Nominatim (OpenStreetMap) geocoding API, a free and open-source
alternative to Google Places. The user types an address, the component
queries Nominatim after a short debounce, and displays matching results
in a dropdown. Selecting a result fires the `onresult` callback with
the place name, latitude, and longitude.

USAGE EXAMPLE:
<Geocoder
  label="Search"
  placeholder="Enter an address…"
  onresult={(result) => {
    console.log(result.lat, result.lng, result.displayName);
  }}
/>
-->
<script>
  import { onMount, onDestroy } from 'svelte';

  let {
    placeholder = 'Enter an address…',
    label = 'Search',
    onresult = () => {},
    debounceMs = 300,
  } = $props();

  let query = $state('');
  let results = $state([]);
  let isOpen = $state(false);
  let isLoading = $state(false);
  let activeIndex = $state(-1);
  // Timer IDs are not reactive (never read in the template), so plain
  // variables are appropriate here rather than $state().
  let debounceTimer = null;
  let blurTimer = null;

  // Generate unique IDs per instance to avoid collisions when multiple
  // Geocoder components are rendered on the same page.
  let instanceId = $state('');
  onMount(() => {
    instanceId =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10);
  });
  const inputId = $derived(`geocoder-field-${instanceId}`);
  const listboxId = $derived(`geocoder-listbox-${instanceId}`);

  /** AbortController for the current in-flight request. */
  let abortController = null;

  /**
   * Queries the Nominatim API for matching addresses.
   * @param {string} searchText
   */
  async function search(searchText) {
    if (!searchText || searchText.trim().length < 3) {
      results = [];
      isOpen = false;
      isLoading = false;
      return;
    }

    // Abort any previous in-flight request to prevent stale results
    if (abortController) abortController.abort();
    abortController = new AbortController();

    isLoading = true;

    try {
      const params = new URLSearchParams({
        q: searchText.trim(),
        format: 'json',
        limit: '5',
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        {
          headers: {
            Accept: 'application/json',
          },
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`Nominatim request failed: ${response.status}`);
      }

      const data = await response.json();

      results = data.map((item) => ({
        displayName: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        type: item.type,
        placeId: item.place_id,
      }));

      isOpen = results.length > 0;
      activeIndex = -1;
    } catch (err) {
      if (err.name === 'AbortError') return; // Request was intentionally cancelled
      console.error('Geocoder: search failed', err);
      results = [];
      isOpen = false;
    } finally {
      isLoading = false;
    }
  }

  /** Debounced input handler. */
  function handleInput() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => search(query), debounceMs);
  }

  /** Selects a result and fires the onresult callback. */
  function selectResult(result) {
    query = result.displayName;
    isOpen = false;
    results = [];
    activeIndex = -1;
    onresult({
      displayName: result.displayName,
      lat: result.lat,
      lng: result.lng,
    });
  }

  /** Keyboard navigation for the results dropdown. */
  function handleKeydown(event) {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        activeIndex = Math.min(activeIndex + 1, results.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        activeIndex =
          activeIndex === -1
            ? results.length - 1
            : Math.max(activeIndex - 1, 0);
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          selectResult(results[activeIndex]);
        }
        break;
      case 'Escape':
        isOpen = false;
        activeIndex = -1;
        break;
    }
  }

  /** Close dropdown when focus leaves the component. */
  function handleBlur(event) {
    // Use a timeout so click events on results can fire first
    if (blurTimer) clearTimeout(blurTimer);
    blurTimer = setTimeout(() => {
      const geocoderEl = event.currentTarget;
      if (geocoderEl && !geocoderEl.contains(document.activeElement)) {
        isOpen = false;
        activeIndex = -1;
      }
    }, 200);
  }

  /** Clean up all timers and in-flight requests on destroy. */
  onDestroy(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (blurTimer) clearTimeout(blurTimer);
    if (abortController) abortController.abort();
  });
</script>

<div class="geocoder" onfocusout={handleBlur}>
  <label class="geocoder-label" for={inputId}>{label}</label>
  <div class="input-wrapper">
    <svg
      class="search-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      id={inputId}
      class="geocoder-field"
      type="search"
      autocomplete="off"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-owns={listboxId}
      {placeholder}
      bind:value={query}
      oninput={handleInput}
      onkeydown={handleKeydown}
      aria-autocomplete="list"
      aria-controls={listboxId}
      aria-activedescendant={activeIndex >= 0
        ? `geocoder-option-${instanceId}-${activeIndex}`
        : undefined}
    />
    {#if isLoading}
      <span class="loading-indicator" aria-hidden="true"></span>
    {/if}
  </div>

  {#if isOpen && results.length > 0}
    <ul id={listboxId} class="results-list" role="listbox">
      {#each results as result, i (result.placeId)}
        <li
          id={`geocoder-option-${instanceId}-${i}`}
          class="result-item"
          class:active={i === activeIndex}
          role="option"
          aria-selected={i === activeIndex}
          onmousedown={() => selectResult(result)}
        >
          <span class="result-name">{result.displayName}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @use '../../styles' as *;

  .geocoder {
    width: 100%;
    position: relative;
  }

  .geocoder-label {
    display: block;
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-dark);
    margin-bottom: var(--spacing-xxs);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: var(--spacing-xs);
    color: var(--color-accent);
    pointer-events: none;
  }

  .geocoder-field {
    width: 100%;
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    line-height: var(--leading-normal);
    color: var(--color-text);
    background-color: var(--color-white);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-xs) var(--spacing-lg) var(--spacing-xs)
      var(--spacing-lg);

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color: var(--color-medium-gray);
    }

    &:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(0, 51, 161, 0.15);
    }
  }

  .loading-indicator {
    position: absolute;
    right: var(--spacing-xs);
    width: 16px;
    height: 16px;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .results-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    list-style: none;
    margin: var(--spacing-xxs) 0 0;
    padding: 0;
    background-color: var(--color-white);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--border-radius-sm);
    box-shadow: 0 4px 12px var(--color-shadow);
    max-height: 280px;
    overflow-y: auto;
  }

  .result-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xxs);
    padding: var(--spacing-xs) var(--spacing-sm);
    cursor: pointer;
    transition: background-color 0.15s ease;
    border-bottom: var(--border-width-thin) solid var(--color-light-gray);

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &.active {
      background-color: var(--color-light-gray);
    }
  }

  .result-name {
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    line-height: var(--leading-snug);
    color: var(--color-dark);
  }

  @include tablet {
    .geocoder-field {
      font-size: var(--font-size-lg);
    }
  }
</style>
