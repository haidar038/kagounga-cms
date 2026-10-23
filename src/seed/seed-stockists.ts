import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config.js'
import { STOCKISTS_SEED } from './stockists.seed.js'

/**
 * Seed 5 kota stockist + 19 titik, EN lalu ID. Idempoten: kota yang sudah
 * ada dilewati agar edit admin tidak tertimpa. Jalan:
 * `bun run seed:stockists` (butuh DATABASE_URL + PAYLOAD_SECRET).
 */
async function main(): Promise<void> {
  const payload = await getPayload({ config })
  let created = 0
  let skipped = 0

  for (const seed of STOCKISTS_SEED) {
    const existing = await payload.find({
      collection: 'stockist-cities',
      where: { slug: { equals: seed.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) {
      skipped += 1
      payload.logger.info(`skip ${seed.slug}: sudah ada`)
      continue
    }

    const doc = await payload.create({
      collection: 'stockist-cities',
      locale: 'en',
      data: {
        city: seed.city,
        slug: seed.slug,
        region: seed.region,
        status: 'published',
        sortOrder: seed.sortOrder,
        points: seed.points.map((point) => ({ ...point, active: true })),
        ...seed.copy.en,
      },
      overrideAccess: true,
    })
    await payload.update({
      collection: 'stockist-cities',
      id: doc.id,
      locale: 'id',
      data: seed.copy.id,
      overrideAccess: true,
    })
    created += 1
    payload.logger.info(`created ${seed.slug}`)
  }

  payload.logger.info(
    `selesai: ${created} kota baru, ${skipped} dilewati, ${STOCKISTS_SEED.length - created - skipped} gagal`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
