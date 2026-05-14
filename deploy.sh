#!/usr/bin/env bash
set -e

echo "Building site..."
npm run build

echo "Syncing dist/ to ../intersynth-lab-site/..."
rsync -av --delete \
  --exclude='.git' \
  dist/ ../intersynth-lab-site/

echo "Committing and pushing..."
cd ../intersynth-lab-site
git add -A
git diff --cached --quiet && echo "No changes to deploy." && exit 0
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "Done."
