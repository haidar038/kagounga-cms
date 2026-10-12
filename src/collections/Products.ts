import type { CollectionConfig } from 'payload'

import { copy } from '../admin/copy'
import { fillSlugFromTitle, slugField } from './slug'
import { imageRelationField, imageUrlField, publishedOrAuth } from './shared'
import { isAuthenticated } from './access'

/**
 * Katalog produk. Cermin field `ProductDetail` frontend
 * (`new-kagounga/src/types/content.ts`) agar adapter M4 tinggal map:
 * detail fisik terpisah (`packaging`, `dimensions`, `netWeight`,
 * `grossWeight`, `origin`, `shelfLife`, `certification`) + B2B
 * (`moq`, `moqUnit`, `wholesalePriceNumber`, `wholesaleCurrency`,
 * `wholesalePer`, `shipping`). Semua opsional, berlaku semua produk.
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
              type: 'select',
              localized: true,
              options: ['box', 'pack', 'pouch', 'unit'],
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
              admin: { description: copy.specsProduct },
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
          label: 'Details / Detail & B2B',
          fields: [
            {
              type: 'collapsible',
              label: copy.physicalDetails,
              fields: [
                {
                  name: 'packaging',
                  type: 'text',
                  localized: true,
                  admin: { description: copy.packaging },
                },
                {
                  name: 'dimensions',
                  type: 'text',
                  admin: { description: copy.dimensions },
                },
                {
                  name: 'netWeight',
                  type: 'text',
                  admin: { description: copy.netWeight },
                },
                {
                  name: 'grossWeight',
                  type: 'text',
                  admin: { description: copy.grossWeight },
                },
                {
                  name: 'origin',
                  type: 'text',
                  localized: true,
                  admin: { description: copy.origin },
                },
                {
                  name: 'shelfLife',
                  type: 'text',
                  localized: true,
                  admin: { description: copy.shelfLife },
                },
                {
                  name: 'certification',
                  type: 'textarea',
                  localized: true,
                  admin: { description: copy.certification },
                },
              ],
            },
            {
              type: 'collapsible',
              label: copy.wholesale,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'moq',
                  type: 'number',
                  min: 0,
                  admin: { description: copy.moq },
                },
                {
                  name: 'moqUnit',
                  type: 'select',
                  localized: true,
                  options: [
                    'box',
                    'boxes',
                    'pack',
                    'packs',
                    'pouch',
                    'pouches',
                    'unit',
                    'units',
                  ],
                  admin: { description: copy.moqUnit },
                },
                {
                  name: 'wholesalePriceNumber',
                  type: 'number',
                  min: 0,
                  admin: { description: copy.wholesalePriceNumber },
                },
                {
                  name: 'wholesaleCurrency',
                  type: 'select',
                  defaultValue: 'USD',
                  options: ['USD', 'IDR'],
                  admin: { description: copy.wholesaleCurrency },
                },
                {
                  name: 'wholesalePer',
                  type: 'select',
                  localized: true,
                  options: [
                    'box',
                    'boxes',
                    'pack',
                    'packs',
                    'pouch',
                    'pouches',
                    'unit',
                    'units',
                  ],
                  admin: { description: copy.wholesalePer },
                },
                {
                  name: 'shipping',
                  type: 'select',
                  localized: true,
                  options: ['Excluded', 'Included'],
                  admin: { description: copy.shipping },
                },
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
