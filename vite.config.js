/**
 * vite.config.js  Vite Configuration
 *
 * Vite is the build tool that powers SvelteKit. It handles:
 * - Running the development server (`npm run dev`)
 * - Bundling your code for production (`npm run build`)
 * - Hot module replacement (instant updates when you save files)
 *
 * For most SvelteKit projects, you don't need to change this file.
 * The sveltekit() plugin handles everything automatically.
 *
 * Learn more: https://vite.dev/config/
 */
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
});