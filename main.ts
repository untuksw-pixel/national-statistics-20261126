// Nusantara in Numbers — the hand-in program for make.fun's best national
// statistics site bounty. The site itself is the static app/ folder (open
// app/index.html in a browser; it runs from its own files with no network).
// This program copies app/ and the screenshots into the output directory
// and writes the dossier with the kit's own library, so the bytes match
// what the scorer rebuilds.
//
// Run it the way the grader does:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// Node 22 standard library only; two runs write the same bytes.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

// Screenshots reach the output as real JPEG files. The repository carries
// each one as a base64 text companion named <file>.jpg.b64, because the
// channel that pushes this repository transports text only; a genuine .jpg
// or .png sitting in screenshots/ is copied across untouched.
const shotsIn = join(repoRoot, 'screenshots');
const shotsOut = join(outputDir, 'screenshots');
mkdirSync(shotsOut, { recursive: true });
if (existsSync(shotsIn)) {
  for (const name of readdirSync(shotsIn).sort()) {
    if (name.startsWith('.')) continue;
    const from = join(shotsIn, name);
    if (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')) {
      cpSync(from, join(shotsOut, name));
    } else if (name.endsWith('.b64')) {
      const bytes = Buffer.from(readFileSync(from, 'utf8').trim(), 'base64');
      writeFileSync(join(shotsOut, name.slice(0, -'.b64'.length)), bytes);
    }
  }
}

// The caps are the scorer's own: dossier text capped at 160 KiB, at most 4
// screenshots of 256 KiB, app/ at most 993 entries and 16 MiB.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
