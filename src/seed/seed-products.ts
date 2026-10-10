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

  for (const [index, seed] of PRODUCTS_SEED.entries()) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: seed.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) {
      payload.logger.info(`skip ${seed.slug}: sudah ada`)
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

  payload.logger.info(`selesai: ${created} baru, ${PRODUCTS_SEED.length - created} skip`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
