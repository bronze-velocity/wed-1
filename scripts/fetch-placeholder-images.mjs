// One-off utility: pulls placeholder photos for the image slots described in
// photo-plan.md and drops them into public/images/, replacing the SVG mockups.
//
// Run with: node scripts/fetch-placeholder-images.mjs
//
// Pexels serves full images straight off images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
// with no bot-check, so those are fetched directly (id taken from the pexels.com/photo/..-{id}/
// page url). Unsplash's www.unsplash.com is behind an Anubis proof-of-work challenge that a
// plain script request can't pass, so those two slots are NOT auto-fetchable — they're listed
// in MANUAL below with a search link to grab by hand.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = join(__dirname, '..', 'public', 'images');

const PEXELS_IMAGES = [
  { file: 'cocktail/reaction-1.jpg', id: 9287491 },
  { file: 'cocktail/writing-1.jpg', id: 6669813 },
  { file: 'dinner/bigscreen-1.jpg', id: 8761523 },
  { file: 'post/reading-1.jpg', id: 6975185 },
  { file: 'post/legacy-1.jpg', id: 11385652 },
  { file: 'post/sendoff-1.jpg', id: 15964966 },
  { file: 'pre/planning-1.jpg', id: 6818113 },
  { file: 'cocktail/qr-scan-1.jpg', id: 12935064 },
  { file: 'apps/vibe-laugh.jpg', id: 9287491 },
  { file: 'apps/vibe-cry.jpg', id: 4670675 },
  { file: 'apps/vibe-talk.jpg', id: 6955635 },
  { file: 'apps/vibe-keepsake.jpg', id: 29857196 },
  { file: 'apps/vibe-stop-room.jpg', id: 8761523 },
  { file: 'dancing/hero-bg-1.jpg', id: 15964954 },
  { file: 'pre/form-1.jpg', id: 5207627 },
];

const MANUAL = [];

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function downloadImage(imageUrl, destPath) {
  const res = await fetch(imageUrl, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`image fetch failed: ${res.status} ${imageUrl}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, buffer);
  return buffer.length;
}

async function main() {
  let ok = 0;
  let failed = 0;

  for (const { file, id } of PEXELS_IMAGES) {
    const destPath = join(IMAGES_ROOT, file);
    const cdnUrl = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
    try {
      const bytes = await downloadImage(cdnUrl, destPath);
      console.log(`OK    ${file}  (${(bytes / 1024).toFixed(0)} KB)`);
      ok += 1;
    } catch (err) {
      console.error(`FAIL  ${file}  — ${err.message}`);
      failed += 1;
    }
  }

  console.log(`\n${ok} downloaded, ${failed} failed`);
  if (MANUAL.length > 0) {
    console.log('\nNeeds manual download (Unsplash is bot-gated, no confirmed direct id found):');
    for (const { file, search } of MANUAL) {
      console.log(`  ${file}  <-  ${search}`);
    }
  }
}

main();
