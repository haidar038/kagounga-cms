import type { CollectionConfig } from 'payload'

import { fillSlugFromTitle, slugField } from './slug'
import { imagePair, publishedOrAuth } from './shared'

/**
 * Katalog produk. Cermin 1:1 field `ProductDetail` frontend
 * (`new-kagounga/src/types/content.ts`) agar adapter M4 tinggal map.
 * Gambar: relasi `image` (upload baru) atau `imageUrl` (Cloudinary lama).
 * Lokalisasi ID/EN menyusul M3 — seed kini EN base.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: publishedOrAuth,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Blurb kartu katalog.' },
    },
    {
      name: 'note',
      type: 'textarea',
      required: true,
      admin: { description: 'Catatan dialog produk.' },
    },
    {
      name: 'priceNumber',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Harga angka. Render mata uang di frontend.' },
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      defaultValue: 'USD',
      options: ['USD', 'IDR'],
    },
    {
      name: 'badges',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'specs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'insideTitle',
      type: 'text',
    },
    {
      name: 'inside',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'per',
      type: 'text',
      admin: { description: 'Satuan harga, mis. "/ box".' },
    },
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Alt teks gambar. Kosong = pakai title.' },
    },
    ...imagePair({
      relationName: 'image',
      urlName: 'imageUrl',
      relationLabel: 'Upload baru. Kosong bila pakai imageUrl.',
      urlLabel: 'URL remote (Cloudinary lama). Wajib bila image kosong.',
    }),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
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
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Urut tampil katalog menaik.' },
    },
  ],
  hooks: {
    beforeValidate: [fillSlugFromTitle],
  },
}
