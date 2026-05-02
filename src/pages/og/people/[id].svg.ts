import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgSvg } from '../../../lib/og';

export async function getStaticPaths() {
  const people = await getCollection('people');
  return people.map((p) => ({ params: { id: p.data.id }, props: { person: p.data } }));
}

export const GET: APIRoute = ({ props }) => {
  const person = (props as { person: any }).person;
  const svg = renderOgSvg({
    eyebrow: person.role,
    title: person.name,
    subtitle: person.affiliation,
  });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
