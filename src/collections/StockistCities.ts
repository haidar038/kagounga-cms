import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { copy } from '../admin/copy'
import { isAdmin, isAuthenticated } from './access'
import { publishedOrAuth } from './shared'
import { slugify } from './slug'

/**
 * Satu dokumen = satu halaman stockist kota. Titik penjualan disimpan
 * sebagai array agar admin mengelola copy + titik dalam satu layar.
 * Slug adalah URL publik: dibuat saat create, tidak bisa diubah setelahnya.
 */
const fillStockistSlug: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation === 'create' && data && !data.slug && typeof data.city === 'string') {
    data.slug = slugify(data.city)
  }
  return data
}

export const StockistCities: CollectionConfig = {
  slug: 'stockist-cities',
  labels: {
    singular: 'Stockist City',
    plural: 'Stockist Cities',
  },
  admin: {
    useAsTitle: 'city',
    group: 'Content',
    description: copy.stockistCityCollection,
    defaultColumns: ['city', 'status', 'sortOrder', 'updatedAt'],
    listSearchableFields: ['city', 'slug'],
  },
  defaultSort: 'sortOrder',
  access: {
    read: publishedOrAuth,
    // Editor boleh ubah copy + titik. Tambah/hapus kota hanya admin.
    create: isAdmin,
    update: isAuthenticated,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'City / Kota',
          fields: [
            {
              name: 'city',
              type: 'text',
              required: true,
              admin: { description: copy.stockistCity },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: copy.stockistSlug,
                readOnly: true,
              },
              access: {
                update: () => false,
              },
              validate: (val: unknown) => {
                if (typeof val !== 'string' || val.length === 0) return copy.slugRequired
                return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val) || copy.slugPattern
              },
            },
            {
              name: 'region',
              type: 'text',
              required: true,
              admin: { description: copy.stockistRegion },
            },
          ],
        },
        {
          label: 'Copy / Konten',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: { description: copy.stockistTitle },
            },
            {
              name: 'lede',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.stockistLede },
            },
            {
              name: 'paragraphs',
              type: 'text',
              hasMany: true,
              required: true,
              localized: true,
              admin: { description: copy.stockistParagraphs },
            },
          ],
        },
        {
          label: 'Points / Titik',
          fields: [
            {
              name: 'points',
              type: 'array',
              required: true,
              minRows: 1,
              admin: { description: copy.stockistPoints },
              fields: [
                {
                  name: 'pointId',
                  type: 'text',
                  required: true,
                  admin: { description: copy.stockistPointId },
                  validate: (val: unknown) => {
                    if (typeof val !== 'string' || val.length === 0)
                      return copy.stockistPointIdRequired
                    return (
                      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val) ||
                      copy.stockistPointIdPattern
                    )
                  },
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'area',
                  type: 'text',
                  required: true,
                  admin: { description: copy.stockistPointArea },
                },
                {
                  name: 'kind',
                  type: 'select',
                  required: true,
                  defaultValue: 'retail',
                  options: ['hub', 'retail', 'partner'],
                },
                {
                  name: 'lng',
                  type: 'number',
                  required: true,
                  min: -180,
                  max: 180,
                },
                {
                  name: 'lat',
                  type: 'number',
                  required: true,
                  min: -90,
                  max: 90,
                },
                {
                  name: 'active',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: copy.stockistPointActive },
                },
              ],
              validate: (
                value: unknown,
                { siblingData }: { siblingData?: Record<string, unknown> },
              ) => {
                const points = Array.isArray(value)
                  ? (value as Array<Record<string, unknown>>)
                  : []
                const pointIds = points
                  .map((point) => point.pointId)
                  .filter((id): id is string => typeof id === 'string' && id.length > 0)
                if (new Set(pointIds).size !== pointIds.length) {
                  return copy.stockistPointIdsUnique
                }
                const active = points.filter((point) => point.active !== false)
                if (siblingData?.status === 'published' && active.length === 0) {
                  return copy.stockistPublishedNeedsPoint
                }
                return true
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              required: true,
              localized: true,
              admin: { description: copy.stockistSeoTitle },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.metaDescription },
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
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: { position: 'sidebar', description: copy.sortOrder },
    },
  ],
  hooks: {
    beforeValidate: [fillStockistSlug],
  },
}
