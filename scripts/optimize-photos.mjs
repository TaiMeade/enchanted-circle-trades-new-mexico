/**
 * Turns the original before/after photos into the files the site ships.
 *
 *   npm run photos
 *
 * Reads   photos/originals/{before,after}{1..N}.{jpg,png}   (gitignored)
 * Writes  src/assets/work/{n}-{before,after}-{sm,lg}.webp
 *         src/assets/work/{n}-thumb.webp
 *         src/assets/work/manifest.json
 *
 * ── Why this exists rather than dropping the photos in public/ ──
 *
 * The originals are straight off a phone: 2–6 MB each, 24 of them, about 80 MB
 * in all. Everything in public/ is copied to the deploy verbatim, so that is
 * what every visitor on a rural connection would have been downloading.
 *
 * They also carry EXIF, and at least one has GPS coordinates in it — the
 * location of a client's house. sharp drops all metadata unless asked to keep
 * it, which is the whole reason it is used here rather than copying files.
 *
 * Rotation is applied from the EXIF orientation *before* the metadata goes,
 * otherwise half the photos would come out sideways.
 *
 * Two photos are phone screenshots of photos, with black bars above and below;
 * one has a sliver of black along its top edge. Those crops are listed below,
 * measured in the upright image. Add to CROPS if a new photo needs one.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import sharp from 'sharp'

const at = (path) => fileURLToPath(new URL(path, import.meta.url))
const SRC = at('../photos/originals/')
const OUT = at('../src/assets/work/')

/** Short-side lengths. `lg` covers a ~37rem frame at 2x; `sm` a phone at 1.5x. */
const SIZES = { sm: 600, lg: 1200 }
const THUMB = 176
const QUALITY = 72

/** { left, top, width, height } in the upright image. */
const CROPS = {
  after1: { left: 0, top: 470, width: 1125, height: 1496 },
  before2: { left: 0, top: 470, width: 1125, height: 1496 },
  before8: { left: 0, top: 12, width: 1076, height: 1482 },
}

const files = await readdir(SRC).catch(() => {
  console.error(`\n✗ No originals found at ${SRC}\n`)
  process.exit(1)
})

const photos = files
  .map((name) => name.match(/^(before|after)(\d+)\.(jpe?g|png|heic|webp)$/i))
  .filter(Boolean)
  .map(([name, kind, n]) => ({ name, kind: kind.toLowerCase(), n: Number(n) }))
  .sort((a, b) => a.n - b.n || a.kind.localeCompare(b.kind))

await mkdir(OUT, { recursive: true })

/** Upright, cropped, metadata-free pipeline for one original. */
function load({ name, kind, n }) {
  let img = sharp(`${SRC}${name}`).rotate()
  const crop = CROPS[`${kind}${n}`]
  if (crop) img = img.extract(crop)
  return img
}

const manifest = {}

for (const photo of photos) {
  const { kind, n } = photo
  const { data, info } = await load(photo).toBuffer({ resolveWithObject: true })
  const portrait = info.height >= info.width
  const entry = { width: info.width, height: info.height }

  for (const [size, short] of Object.entries(SIZES)) {
    const resize = portrait ? { width: short } : { height: short }
    const out = await sharp(data)
      .resize({ ...resize, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(`${OUT}${n}-${kind}-${size}.webp`)
    entry[size] = out.width
  }

  // Thumbnails are for the picker, which shows the finished job.
  if (kind === 'after') {
    await sharp(data)
      .resize(THUMB, THUMB, { fit: 'cover' })
      .webp({ quality: 68 })
      .toFile(`${OUT}${n}-thumb.webp`)
  }

  manifest[`${n}-${kind}`] = entry
  console.log(`  ${n}-${kind}  ${info.width}×${info.height}`)
}

await writeFile(`${OUT}manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\n✓ ${photos.length} photos written to src/assets/work/`)
