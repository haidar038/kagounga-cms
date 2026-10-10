import type { CollectionConfig } from 'payload'

import { fillSlugFromTitle, slugField } from './slug'
import { imagePair, publishedOrAuth } from './shared'

/**
 * Berita. Cermin field `NewsPost` frontend
 * (`new-kagounga/src/types/content.ts`) + `metaDescription` untuk SEO.
 * Teks terterjemahkan via localization (default EN, fallback aktif).
 * Slug TIDAK dilokalkan — mirror `/id/news/:slug` pakai slug sama.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
  },
  access: {
    read: publishedOrAuth,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField(),
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Meta description SEO per locale.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Ringkasan kartu berita.' },
    },
    {
      name: 'lede',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Paragraf pembuka artikel.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      admin: { description: 'Isi artikel. Ekspor markdown via `src/utils/lexical-markdown.ts`.' },
    },
    {
      name: 'coverAlt',
      type: 'text',
      required: true,
      localized: true,
    },
    ...imagePair({
      relationName: 'featuredImage',
      urlName: 'coverUrl',
      relationLabel: 'Upload cover baru. Kosong bila pakai coverUrl.',
      urlLabel: 'URL cover remote (Cloudinary lama). Wajib bila featuredImage kosong.',
    }),
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: ['draft', 'published'],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { displayFormat: 'd MMM y' } },
    },
  ],
  hooks: {
    beforeValidate: [fillSlugFromTitle],
  },
}
