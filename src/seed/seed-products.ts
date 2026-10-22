import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config.js'
import { PRODUCTS_SEED } from './products.seed.js'

/**
 * Seed 8 produk sebagai published. Idempoten via cek slug.
 * Jalan: `bun run seed:products` (butuh DATABASE_URL + PAYLOAD_SECRET).
 */
async function main(): Promise<void> {
  const payload = await getPayload({ config })
  let created = 0
  let updated = 0

  for (const [index, seed] of PRODUCTS_SEED.entries()) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: seed.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) {
      // Backfill only the new page-copy fields; don't overwrite catalog edits.
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data: {
          intro: seed.intro,
          usage: seed.usage,
          sourcing: seed.sourcing,
          seoTitle: seed.seoTitle,
        },
        overrideAccess: true,
      })
      updated += 1
      payload.logger.info(`updated page copy: ${seed.slug}`)
      continue
    }
    await payload.create({
      collection: 'products',
      data: {
        ...seed,
        status: 'published',
        publishedAt: new Date().toISOString(),
        sortOrder: index,
      },
      overrideAccess: true,
    })
    created += 1
    payload.logger.info(`created ${seed.slug}`)
  }

  payload.logger.info(
    `selesai: ${created} baru, ${updated} page copy diperbarui, ${PRODUCTS_SEED.length - created - updated} skip`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
