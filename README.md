# Static Site Template

A simple SvelteKit template for building static websites. Created for ["JOUR 73361: Coding the News,"](https://github.com/palewire/cuny-jour-73361-coding-the-news) a course taught at the City University of New York's Craig Newmark Graduate School of Journalism course.

## Quick Start

1. Click the green "Use this template" button on GitHub
2. Clone your new repository to your computer
3. Open the project in VS Code
4. Open a terminal and run:

```bash
npm install
npm run dev
```

5. Open http://localhost:5173 in your browser

## Project Structure

- `src/routes/+page.svelte` — Your page (edit this!)
- `src/routes/+layout.svelte` — Layout that wraps all pages
- `src/app.css` — Global styles
- `static/` — Static files (images, etc.)

## Deploy to GitHub Pages

Your site will automatically deploy to GitHub Pages when you create a Release.

### Setup (One Time)

1. Go to your repository **Settings** > **Pages**
2. Under "Source", select **GitHub Actions**

### Deploy Your Site

1. Go to your repository's **Releases** page (in the right sidebar or under "Code")
2. Click **"Create a new release"** (or "Draft a new release")
3. Choose a tag (e.g., `v1.0.0`), add a title/description
4. Click **"Publish release"**

The workflow will build and deploy your site to `https://<your-github-username>.github.io/<your-repository-name>/`

You can also manually trigger a deploy from the Actions tab using "workflow_dispatch".