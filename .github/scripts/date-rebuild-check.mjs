// Decides whether a scheduled run should redeploy the site.
//
// Events and news are split into upcoming/past at build time, so the live
// site goes stale once an event's date passes. This script looks for any
// event or news entry whose date falls between the last deploy and now, and
// writes `deploy=true|false` to $GITHUB_OUTPUT.
//
// Usage: node .github/scripts/date-rebuild-check.mjs [last-deploy-iso-date]
import { readdirSync, readFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const DIRS = ['src/content/events', 'src/content/news'];

function setOutput(deploy) {
  console.log(`deploy=${deploy}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `deploy=${deploy}\n`);
}

const now = new Date();
const since = process.argv[2] ? new Date(process.argv[2]) : null;

if (!since || Number.isNaN(since.valueOf())) {
  console.log('No previous deploy found.');
  setOutput(true);
  process.exit(0);
}

console.log(`Last deploy: ${since.toISOString()}  Now: ${now.toISOString()}`);

const crossed = [];
for (const dir of DIRS) {
  for (const name of readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
    const frontmatter = readFileSync(join(dir, name), 'utf8').split(/^---\s*$/m)[1] ?? '';
    const match = frontmatter.match(/^date:\s*["']?([^"'\r\n]+?)["']?\s*$/m);
    if (!match) continue;
    // Same parsing as z.coerce.date() in src/content.config.ts.
    const date = new Date(match[1]);
    if (date > since && date <= now) crossed.push(`${dir}/${name} (${match[1]})`);
  }
}

if (crossed.length) {
  console.log('Dates passed since last deploy:\n  ' + crossed.join('\n  '));
} else {
  console.log('No event or news dates passed since last deploy.');
}
setOutput(crossed.length > 0);
