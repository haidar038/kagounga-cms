import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, afterAll, expect } from 'vitest'

let payload: Payload

const PUBLISHED_SLUG = 'spec-produk-a'
const DRAFT_SLUG = 'spec-produk-draft'
const SLUGS = [PUBLISHED_SLUG, DRAFT_SLUG]
const PAGE_COPY = {
  intro: ['intro paragraph'],
  usage: 'usage',
  sourcing: 'sourcing',
  seoTitle: 'Product SEO title',
}

/** Butuh Postgres jalan. Fixture dibuat + dibersihkan di sini. */
describe('Products', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    await payload.delete({
      collection: 'products',
      where: { slug: { in: SLUGS } },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'products',
      data: {
        title: 'Spec A',
        slug: PUBLISHED_SLUG,
        excerpt: 'excerpt',
        note: 'note',
        ...PAGE_COPY,
        priceNumber: 1,
        currency: 'USD',
        status: 'published',
        imageUrl: 'https://example.com/a.webp',
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'products',
      data: {
        title: 'Spec Draft',
        slug: DRAFT_SLUG,
        excerpt: 'excerpt',
        note: 'note',
        ...PAGE_COPY,
        priceNumber: 1,
        currency: 'USD',
        status: 'draft',
        imageUrl: 'https://example.com/d.webp',
      },
      overrideAccess: true,
    })
  }, 120000)
  // ^ init Payload tarik skema ~25s saat 3 worker paralel.

  afterAll(async () => {
    if (!payload) return // beforeAll gugur (mis. DB) — jangan samarkan error asli.
    await payload.delete({
      collection: 'products',
      where: { slug: { in: SLUGS } },
      overrideAccess: true,
    })
  })

  it('anon hanya baca yang published', async () => {
    const res = await payload.find({
      collection: 'products',
      where: { slug: { in: SLUGS } },
      // Local API default overrideAccess:true — matikan eksplisit agar akses jalan.
      overrideAccess: false,
    })
    expect(res.docs).toHaveLength(1)
    expect(res.docs[0]?.slug).toBe(PUBLISHED_SLUG)
  })
})
