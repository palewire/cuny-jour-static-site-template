/**
 * svelte.config.js  SvelteKit Configuration
 *
 * This file tells SvelteKit how to build your site.
 * The most important setting here is the "adapter" which determines
 * what kind of output is created when you run `npm run build`.
 *
 * We use @sveltejs/adapter-static which creates plain HTML/CSS/JS files
 * that can be hosted on any static file server (like GitHub Pages).
 *
 * Learn more: https://svelte.dev/docs/kit/configuration
 */
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // The static adapter builds your site as plain HTML/CSS/JS files
    // These can be hosted anywhere (GitHub Pages, Netlify, etc.)
    adapter: adapter({
      pages: 'build', // Output directory for HTML pages
      assets: 'build', // Output directory for static assets
      fallback: undefined, // No fallback page (we're fully static)
      precompress: false, // Don't pre-compress files
      strict: true, // Fail if any routes can't be prerendered
    }),
    // The base path is set via environment variable during build
    // This is configured automatically in .github/workflows/deploy.yml
    // It's needed because GitHub Pages serves from a subdirectory
    paths: {
      base: process.env.BASE_PATH || '',
      relative: false,
    },
  },
};

export default config;