// This file configures SvelteKit
// Learn more: https://svelte.dev/docs/kit/configuration
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // The static adapter builds your site as plain HTML/CSS/JS files
    // These can be hosted anywhere (GitHub Pages, Netlify, etc.)
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    // The base path is set via environment variable during build
    // This is configured automatically in .github/workflows/deploy.yml
    paths: {
      base: process.env.BASE_PATH || '',
    },
  },
};

export default config;