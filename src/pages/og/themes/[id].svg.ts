import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgSvg } from '../../../lib/og';

export async function getStaticPaths() {
  const themes = await getCollection('themes');
  return themes.map((t) => ({ params: { id: t.data.id }, props: { theme: t.data } }));
}

export const GET: APIRoute = ({ props }) => {
  const theme = (props as { theme: any }).theme;
  const svg = renderOgSvg({
    eyebrow: 'Research theme',
    title: theme.title,
    subtitle: theme.summary,
  });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
