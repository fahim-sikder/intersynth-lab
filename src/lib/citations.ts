interface PubLinks {
  pdf?: string;
  doi?: string;
  arxiv?: string;
  code?: string;
}

export interface PubData {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type?: string;
  links?: PubLinks;
}

const TYPE_TO_BIBTEX: Record<string, string> = {
  journal: 'article',
  conference: 'inproceedings',
  workshop: 'inproceedings',
  preprint: 'misc',
  chapter: 'incollection',
  other: 'misc',
};

export function toBibTeX(p: PubData): string {
  const entry = TYPE_TO_BIBTEX[p.type ?? 'other'] ?? 'misc';
  const fields: [string, string | undefined][] = [
    ['title', p.title],
    ['author', p.authors.join(' and ')],
    [entry === 'article' ? 'journal' : 'booktitle', p.venue],
    ['year', String(p.year)],
    ['doi', p.links?.doi],
    ['url', p.links?.arxiv ?? p.links?.pdf],
  ];
  const body = fields
    .filter(([, v]) => v && v.length)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(',\n');
  return `@${entry}{${p.id},\n${body}\n}\n`;
}

export function toAPA(p: PubData): string {
  const authors = p.authors
    .map((a) => {
      const parts = a.trim().split(/\s+/);
      const last = parts.pop() ?? a;
      const initials = parts.map((n) => `${n[0]}.`).join(' ');
      return initials ? `${last}, ${initials}` : last;
    })
    .join(', ');
  const doi = p.links?.doi ? ` https://doi.org/${p.links.doi}` : '';
  return `${authors} (${p.year}). ${p.title}. ${p.venue}.${doi}`.trim();
}
