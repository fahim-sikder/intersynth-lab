import type { APIRoute } from 'astro';
import { renderOgSvg } from '../../lib/og';

export const GET: APIRoute = () => {
  const svg = renderOgSvg({
    eyebrow: 'InterSynth Lab',
    title: 'Synthetic Data: Facts, Representations, and Transparency',
    subtitle: 'An interdisciplinary WASP-HS research lab.',
  });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
