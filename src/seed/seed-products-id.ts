import { readFileSync } from 'node:fs'
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config.js'
import { PRODUCTS_SEED, PRODUCT_PAGE_SOURCE } from './products.seed.js'

interface ProductOverlay {
  blurb?: string
  eyebrow?: string
  badges?: string[]
  specs?: Array<{ label: string; value: string }>
  insideTitle?: string | null
  inside?: string[] | null
  note?: string
  per?: 'box' | 'pack' | 'pouch' | 'unit'
  packaging?: string | null
  origin?: string | null
  shelfLife?: string | null
  certification?: string | null
  moqUnit?: 'box' | 'boxes' | 'pack' | 'packs' | 'pouch' | 'pouches' | 'unit' | 'units' | null
  wholesalePrice?: string | null
  wholesalePer?: 'box' | 'boxes' | 'pack' | 'packs' | 'pouch' | 'pouches' | 'unit' | 'units' | null
  shipping?: 'Excluded' | 'Included' | null
}

/**
 * Isi locale ID untuk 8 produk dari overlay `new-kagounga/src/locales/id/catalog.json`.
 * Idempoten (timpa ulang aman). Update locale wajib semua required field (excerpt, note).
 * Jalan: `bun run seed:products:id [path-ke-id-catalog.json]`
 * (butuh DATABASE_URL + PAYLOAD_SECRET).
 */
async function main(): Promise<void> {
  const fromArg = process.argv[2]
  const source =
    fromArg ?? new URL('../../../new-kagounga/src/locales/id/catalog.json', import.meta.url)
  const overlays = (JSON.parse(readFileSync(source, 'utf8')) as { products?: Record<string, ProductOverlay> })
    .products ?? {}
  const payload = await getPayload({ config })
  let updated = 0

  for (const seed of PRODUCTS_SEED) {
    const ov = overlays[seed.slug]
    const page = PRODUCT_PAGE_SOURCE.pages[seed.slug]?.id
    const seoTitle = PRODUCT_PAGE_SOURCE.seoTitles[seed.slug]?.id
    if (!ov?.blurb || !ov.note || !page || !seoTitle) {
      payload.logger.warn(`skip ${seed.slug}: overlay ID tak lengkap`)
      continue
    }
    const found = await payload.find({
      collection: 'products',
      where: { slug: { equals: seed.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (found.totalDocs === 0) {
      payload.logger.warn(`skip ${seed.slug}: produk belum ada (seed:products dulu)`)
      continue
    }
    await payload.update({
      collection: 'products',
      id: found.docs[0].id,
      locale: 'id',
      data: {
        excerpt: ov.blurb,
        note: ov.note,
        intro: page.intro,
        usage: page.usage,
        sourcing: page.sourcing,
        seoTitle,
        ...(ov.eyebrow !== undefined ? { eyebrow: ov.eyebrow } : {}),
        ...(ov.badges !== undefined ? { badges: ov.badges } : {}),
        ...(ov.specs !== undefined ? { specs: ov.specs } : {}),
        ...(ov.insideTitle !== undefined && ov.insideTitle !== null
          ? { insideTitle: ov.insideTitle }
          : {}),
        ...(ov.inside !== undefined && ov.inside !== null ? { inside: ov.inside } : {}),
        ...(ov.per !== undefined ? { per: ov.per } : {}),
        ...(ov.packaging != null ? { packaging: ov.packaging } : {}),
        ...(ov.origin != null ? { origin: ov.origin } : {}),
        ...(ov.shelfLife != null ? { shelfLife: ov.shelfLife } : {}),
        ...(ov.certification != null ? { certification: ov.certification } : {}),
        ...(ov.moqUnit != null ? { moqUnit: ov.moqUnit } : {}),
        ...(ov.wholesalePer != null ? { wholesalePer: ov.wholesalePer } : {}),
        ...(ov.shipping != null ? { shipping: ov.shipping } : {}),
      },
      overrideAccess: true,
    })
    updated += 1
    payload.logger.info(`updated id:${seed.slug}`)
  }

  payload.logger.info(`selesai: ${updated} locale-ID diperbarui`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
