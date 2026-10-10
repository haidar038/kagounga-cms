import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config.js'

/**
 * Promote user ke admin. M9 roles: user lama tak punya role → migrasi isi
 * default editor + UPDATE existing ke admin; skrip ini jaring pengaman +
 * cara tambah admin baru.
 * Jalan: `bun run seed:admin [email]` (tanpa arg = semua non-admin) atau
 * `bun run seed:admin --all`. Butuh DATABASE_URL + PAYLOAD_SECRET.
 */
async function main(): Promise<void> {
  const arg = process.argv[2]
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'users',
    where: arg && arg !== '--all' ? { email: { equals: arg } } : {},
    limit: 100,
    overrideAccess: true,
  })
  if (found.totalDocs === 0) {
    console.error('tidak ada user cocok')
    process.exit(1)
  }
  let promoted = 0
  for (const u of found.docs) {
    if ((u as { role?: string }).role === 'admin') continue
    await payload.update({
      collection: 'users',
      id: u.id,
      data: { role: 'admin' },
      overrideAccess: true,
    })
    promoted += 1
    payload.logger.info(`promoted admin:${u.email}`)
  }
  payload.logger.info(`selesai: ${promoted} dari ${found.totalDocs} dipromote`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
