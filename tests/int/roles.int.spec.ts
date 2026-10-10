import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, afterAll, expect } from 'vitest'

/**
 * M9 roles: admin full, editor konten (boleh publish) tapi tak bisa
 * kelola users / ubah role. Anon tulis = 403.
 * Butuh Postgres jalan. Fixture dibuat + dibersihkan di sini.
 */
let payload: Payload

const ADMIN = { email: 'role-admin-test@kagounga.com', password: 'test-admin-123' }
const EDITOR = { email: 'role-editor-test@kagounga.com', password: 'test-editor-123' }
const PRODUCT_SLUG = 'spec-role-product'

let adminUser: any
let editorUser: any

const statusOf = async (p: Promise<unknown>): Promise<number | string> =>
  p.then(() => 'ok' as const).catch((e: any) => e?.status ?? 'threw')

describe('Roles', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    for (const email of [ADMIN.email, EDITOR.email]) {
      await payload.delete({
        collection: 'users',
        where: { email: { equals: email } },
        overrideAccess: true,
      })
    }
    await payload.delete({
      collection: 'products',
      where: { slug: { equals: PRODUCT_SLUG } },
      overrideAccess: true,
    })

    adminUser = await payload.create({
      collection: 'users',
      data: { ...ADMIN, role: 'admin' },
      overrideAccess: true,
    })
    editorUser = await payload.create({
      collection: 'users',
      data: { ...EDITOR, role: 'editor' },
      overrideAccess: true,
    })
  }, 120000)

  afterAll(async () => {
    if (!payload) return // beforeAll gugur (mis. DB) — jangan samarkan error asli.
    await payload.delete({
      collection: 'products',
      where: { slug: { equals: PRODUCT_SLUG } },
      overrideAccess: true,
    })
    for (const email of [ADMIN.email, EDITOR.email]) {
      await payload.delete({
        collection: 'users',
        where: { email: { equals: email } },
        overrideAccess: true,
      })
    }
  })

  it('anon tulis produk = 403', async () => {
    const s = await statusOf(
      payload.create({
        collection: 'products',
        data: {
          title: 'Spec Role',
          slug: PRODUCT_SLUG,
          excerpt: 'excerpt',
          note: 'note',
          priceNumber: 1,
          currency: 'USD',
          status: 'draft',
          imageUrl: 'https://example.com/r.webp',
        },
        overrideAccess: false,
      }),
    )
    expect(s).toBe(403)
  })

  it('editor bisa buat + publish produk', async () => {
    const doc: any = await payload.create({
      collection: 'products',
      data: {
        title: 'Spec Role',
        slug: PRODUCT_SLUG,
        excerpt: 'excerpt',
        note: 'note',
        priceNumber: 1,
        currency: 'USD',
        status: 'published',
        imageUrl: 'https://example.com/r.webp',
      },
      user: editorUser,
      overrideAccess: false,
    })
    expect(doc.slug).toBe(PRODUCT_SLUG)
  })

  it('editor tak bisa buat/hapus user', async () => {
    const c = await statusOf(
      payload.create({
        collection: 'users',
        data: { email: 'role-nope@kagounga.com', password: 'x', role: 'editor' },
        user: editorUser,
        overrideAccess: false,
      }),
    )
    expect(c).toBe(403)
    const d = await statusOf(
      payload.delete({
        collection: 'users',
        where: { email: { equals: ADMIN.email } },
        user: editorUser,
        overrideAccess: false,
      }),
    )
    expect(d).toBe(403)
  })

  it('editor hanya lihat diri sendiri; admin lihat semua', async () => {
    const asEditor = await payload.find({
      collection: 'users',
      user: editorUser,
      overrideAccess: false,
    })
    expect(asEditor.docs.map((u: any) => u.email)).toEqual([EDITOR.email])
    const asAdmin = await payload.find({
      collection: 'users',
      user: adminUser,
      overrideAccess: false,
    })
    expect(asAdmin.totalDocs).toBeGreaterThanOrEqual(2)
  })

  it('editor tak bisa naikkan role sendiri / ubah user lain', async () => {
    // Field-access Payload = strip diam-diam (bukan 403): resolve OK tapi nilai tetap.
    const self: any = await payload.update({
      collection: 'users',
      id: editorUser.id,
      data: { role: 'admin' },
      user: editorUser,
      overrideAccess: false,
    })
    expect(self.role).toBe('editor')
    const fresh: any = await payload.findByID({
      collection: 'users',
      id: editorUser.id,
      overrideAccess: true,
    })
    expect(fresh.role).toBe('editor')
    const other = await statusOf(
      payload.update({
        collection: 'users',
        id: adminUser.id,
        data: { email: 'role-hack@kagounga.com' },
        user: editorUser,
        overrideAccess: false,
      }),
    )
    expect(other).toBe(403)
  })

  it('admin bisa buat + hapus user', async () => {
    const created: any = await payload.create({
      collection: 'users',
      data: { email: 'role-temp@kagounga.com', password: 'test-temp-123', role: 'editor' },
      user: adminUser,
      overrideAccess: false,
    })
    expect(created.email).toBe('role-temp@kagounga.com')
    await payload.delete({
      collection: 'users',
      where: { email: { equals: 'role-temp@kagounga.com' } },
      user: adminUser,
      overrideAccess: false,
    })
    const gone = await payload.find({
      collection: 'users',
      where: { email: { equals: 'role-temp@kagounga.com' } },
      overrideAccess: true,
    })
    expect(gone.totalDocs).toBe(0)
  })
})
