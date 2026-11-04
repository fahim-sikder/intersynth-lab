# InterSynth Lab — Website

Astro + Tailwind v4 site for the InterSynth Lab (WASP-HS Synthetic Data:
Facts, Representations, and Transparency).

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # output to ./dist
npm run preview
```

## Project layout

```
src/
├── content/                # all editable content
│   ├── people.yaml         # team roster
│   ├── themes.yaml         # research themes
│   ├── publications.yaml   # publication list
│   ├── news/*.mdx          # news posts (one file per post)
│   ├── events/*.mdx        # events (one file per event)
│   └── projects/*.mdx      # projects (one file per project)
├── components/             # reusable UI
├── layouts/                # BaseLayout, PostLayout
├── pages/                  # routes
└── styles/global.css       # design tokens + utility layers
```

## Editing content

### Add a news post

Create `src/content/news/my-post.mdx`:

```mdx
---
title: My Post
date: 2026-05-01
excerpt: One-line teaser.
tags: [research]
---

Markdown body here.
```

### Add a publication

Append to `src/content/publications.yaml`:

```yaml
- id: smith2026synthetic
  title: A Paper on Synthetic Data
  authors: [Jane Smith, John Doe]
  venue: NeurIPS 2026
  year: 2026
  type: conference
  links:
    pdf: https://example.org/paper.pdf
    doi: 10.1234/example
    arxiv: https://arxiv.org/abs/2601.00001
```

### Add a person

Append to `src/content/people.yaml` with fields: `id`, `name`, `role`,
`affiliation`, optional `email`, `bio`, `photo`, `links`,
`group` (`pi` | `researcher` | `phd` | `collaborator`), `order`.

### Add an event

Create `src/content/events/my-event.mdx` with frontmatter `title`, `date`,
`location`, `type`, optional `link`, `excerpt`. Whether an event or news post
is listed as upcoming or past is worked out from its `date`: it stays upcoming
for the whole of that day.

### Add a project

Create `src/content/projects/my-project.mdx` with frontmatter `title`,
`summary`, `leads`, `status`, `themes`, `order`.

## Design tokens

Colors, fonts, and radii are defined as CSS custom properties in
`src/styles/global.css` under the `@theme` block. Edit there to adjust the
palette globally.

## Deploy

Push to `main`. That is the whole deploy.

1. **Build** — `.github/workflows/deploy.yml` runs on every push to `main`
   (and can be started by hand under Actions → *Build and publish to deploy
   branch* → *Run workflow*). It runs `npm ci` and `npm run build` (Astro
   static build into `dist/`, then Pagefind search indexing).
2. **Publish** — it replaces the `deploy` branch of this repository with the
   contents of `dist/`, as a single commit by `github-actions[bot]`.
3. **Serve** — the server behind <https://intersynth.ai> (proxied through
   Cloudflare) serves the `deploy` branch. *How that server picks up the
   branch is not in this repository — document it here.*

Events and news are sorted into upcoming and past at build time, so the
workflow also runs daily at 00:15 UTC. It rebuilds only if some entry's day
ended since the last deploy (`.github/scripts/date-rebuild-check.mjs`).

Pushing to any other branch, or opening a pull request, deploys nothing until
it is merged into `main`.

The old `npm run deploy` script and the `intersynth-lab-site` repository are
no longer used.
