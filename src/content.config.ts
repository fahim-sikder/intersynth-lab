import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    type: z.enum(['talk', 'workshop', 'seminar', 'conference', 'other']).default('other'),
    link: z.string().url().optional(),
    excerpt: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    leads: z.array(z.string()).default([]),
    status: z.enum(['active', 'completed', 'planned']).default('active'),
    themes: z.array(z.string()).default([]),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const people = defineCollection({
  loader: file('./src/content/people.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    affiliation: z.string(),
    email: z.string().optional(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    links: z
      .object({
        website: z.string().url().optional(),
        scholar: z.string().url().optional(),
        github: z.string().url().optional(),
        orcid: z.string().optional(),
      })
      .optional(),
    group: z.enum(['pi', 'researcher', 'phd', 'collaborator']).default('researcher'),
    order: z.number().default(0),
  }),
});

const themes = defineCollection({
  loader: file('./src/content/themes.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    icon: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: file('./src/content/publications.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    authorIds: z.array(z.string()).default([]),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['journal', 'conference', 'workshop', 'preprint', 'chapter', 'thesis', 'other']).default('other'),
    abstract: z.string().optional(),
    links: z
      .object({
        pdf: z.string().url().optional(),
        doi: z.string().optional(),
        code: z.string().url().optional(),
        arxiv: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const collections = { news, events, projects, people, themes, publications };
