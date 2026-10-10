import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, afterAll, expect } from 'vitest'

let payload: Payload

const PUBLISHED_SLUG = 'spec-post-a'
const DRAFT_SLUG = 'spec-post-draft'
const SLUGS = [PUBLISHED_SLUG, DRAFT_SLUG]

/** Butuh Postgres jalan. Fixture dibuat + dibersihkan di sini. */
describe('Posts', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    await payload.delete({
      collection: 'posts',
      where: { slug: { in: SLUGS } },
      overrideAccess: true,
    })
    const doc = await payload.create({
      collection: 'posts',
      locale: 'en',
      data: {
        title: 'Spec EN',
        slug: PUBLISHED_SLUG,
        metaDescription: 'desc',
        excerpt: 'excerpt',
        lede: 'lede',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: 'hello', format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        coverAlt: 'alt',
        coverUrl: 'https://example.com/a.webp',
        status: 'published',
      },
      overrideAccess: true,
    })
    await payload.update({
      collection: 'posts',
      id: doc.id,
      locale: 'id',
      data: {
        title: 'Spec ID',
        metaDescription: 'desc id',
        excerpt: 'excerpt id',
        lede: 'lede id',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'konten id',
                    format: 0,
                    detail: 0,
                    mode: 'normal',
                    style: '',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        coverAlt: 'alt id',
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'posts',
      locale: 'en',
      data: {
        title: 'Spec Draft',
        slug: DRAFT_SLUG,
        metaDescription: 'desc',
        excerpt: 'excerpt',
        lede: 'lede',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'draft',
                    format: 0,
                    detail: 0,
                    mode: 'normal',
                    style: '',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        coverAlt: 'alt',
        coverUrl: 'https://example.com/d.webp',
        status: 'draft',
      },
      overrideAccess: true,
    })
  }, 120000)
  // ^ init Payload tarik skema ~25s saat 3 worker paralel.

  afterAll(async () => {
    if (!payload) return // beforeAll gugur (mis. DB) — jangan samarkan error asli.
    await payload.delete({
      collection: 'posts',
      where: { slug: { in: SLUGS } },
      overrideAccess: true,
    })
  })

  it('anon hanya baca yang published', async () => {
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { in: SLUGS } },
      // Local API default overrideAccess:true — matikan eksplisit agar akses jalan.
      overrideAccess: false,
    })
    expect(res.docs).toHaveLength(1)
    expect(res.docs[0]?.slug).toBe(PUBLISHED_SLUG)
  })

  it('locale id baca judul ID', async () => {
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: PUBLISHED_SLUG } },
      locale: 'id',
    })
    expect(res.docs[0]?.title).toBe('Spec ID')
  })
})
