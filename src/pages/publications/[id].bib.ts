import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toBibTeX } from '../../lib/citations';

export async function getStaticPaths() {
  const pubs = await getCollection('publications');
  return pubs.map((p) => ({ params: { id: p.data.id }, props: { data: p.data } }));
}

export const GET: APIRoute = ({ props }) => {
  const data = (props as { data: any }).data;
  return new Response(toBibTeX(data), {
    headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' },
  });
};
