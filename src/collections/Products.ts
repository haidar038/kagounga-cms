import type { CollectionConfig } from 'payload'

import { copy } from '../admin/copy'
import { fillSlugFromTitle, slugField } from './slug'
import { imageRelationField, imageUrlField, publishedOrAuth } from './shared'
import { isAuthenticated } from './access'

/**
 * Katalog produk. Cermin 1:1 field `ProductDetail` frontend
 * (`new-kagounga/src/types/content.ts`) agar adapter M4 tinggal map.
 * Gambar: relasi `image` (upload baru) atau `imageUrl` (Cloudinary lama).
 * Tabs/collapsible di bawah presentational saja (unnamed) — skema/API tetap.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    group: 'Catalog',
    description: 'Catalog products. / Produk katalog.',
    defaultColumns: ['title', 'coverPreview', 'slug', 'status', 'sortOrder', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
  },
  defaultSort: 'sortOrder',
  access: {
    read: publishedOrAuth,
    // Editor boleh publish (keputusan M9). Tulis wajib login; anon 403.
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General / Umum',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            slugField(),
            {
              name: 'priceNumber',
              type: 'number',
              required: true,
              min: 0,
              admin: { description: copy.priceNumber },
            },
            {
              name: 'currency',
              type: 'select',
              required: true,
              defaultValue: 'USD',
              options: ['USD', 'IDR'],
            },
            {
              name: 'per',
              type: 'text',
              localized: true,
              admin: { description: copy.per },
            },
            {
              name: 'badges',
              type: 'text',
              hasMany: true,
              localized: true,
            },
            {
              name: 'eyebrow',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Content / Konten',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.excerptProduct },
            },
            {
              name: 'note',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.noteProduct },
            },
            {
              name: 'specs',
              type: 'array',
              localized: true,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
            {
              name: 'insideTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'inside',
              type: 'text',
              hasMany: true,
              localized: true,
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            imageRelationField({ name: 'image', label: copy.imageRelation }),
            {
              name: 'coverPreview',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/admin/ImagePreview#ProductImagePreview',
                  Cell: '@/admin/ImageThumbCell#ProductThumbCell',
                },
                disableListColumn: false,
              },
            },
            {
              name: 'alt',
              type: 'text',
              admin: { description: copy.altProduct },
            },
            {
              type: 'collapsible',
              label: copy.legacyUrl,
              admin: { initCollapsed: true },
              fields: [
                imageUrlField({
                  name: 'imageUrl',
                  relationName: 'image',
                  label: copy.imageUrl,
                }),
              ],
            },
          ],
        },
        {
          label: 'Settings / Pengaturan',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
            },
          ],
        },
      ],
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
      min: 0,
      admin: { position: 'sidebar', description: copy.sortOrder },
    },
  ],
  hooks: {
    beforeValidate: [fillSlugFromTitle],
  },
}
