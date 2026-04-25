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
`location`, `type`, `status` (`upcoming` | `past`), optional `link`, `excerpt`.

### Add a project

Create `src/content/projects/my-project.mdx` with frontmatter `title`,
`summary`, `leads`, `status`, `themes`, `order`.

## Design tokens

Colors, fonts, and radii are defined as CSS custom properties in
`src/styles/global.css` under the `@theme` block. Edit there to adjust the
palette globally.

## Deploy

`npm run build` produces a fully static `dist/` folder. Upload its contents to
any static host (Apache, Nginx, Netlify, S3, GitHub Pages, university web
server). No server-side runtime is required.

Update `site` in `astro.config.mjs` to your final domain so canonical URLs and
sitemap are correct.
