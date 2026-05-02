import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgSvg } from '../../../lib/og';

export async function getStaticPaths() {
  const news = await getCollection('news');
  return news.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = ({ props }) => {
  const entry = (props as { entry: any }).entry;
  const svg = renderOgSvg({
    eyebrow: 'News',
    title: entry.data.title,
    subtitle: entry.data.excerpt,
  });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
