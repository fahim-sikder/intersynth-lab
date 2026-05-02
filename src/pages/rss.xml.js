import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const news = await getCollection('news');
  const items = news
    .map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.excerpt ?? '',
      link: `/news/${entry.id}/`,
    }))
    .sort((a, b) => +b.pubDate - +a.pubDate);

  return rss({
    title: 'InterSynth Lab — News',
    description:
      'Updates from InterSynth Lab — synthetic data: facts, representations, and transparency.',
    site: context.site,
    items,
  });
}
