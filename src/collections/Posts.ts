import type { CollectionConfig } from 'payload'

import { copy } from '../admin/copy'
import { fillSlugFromTitle, slugField } from './slug'
import { imageRelationField, imageUrlField, publishedOrAuth } from './shared'
import { isAuthenticated } from './access'

/**
 * Berita. Cermin field `NewsPost` frontend
 * (`new-kagounga/src/types/content.ts`) + `metaDescription` untuk SEO.
 * Teks terterjemahkan via localization (default EN, fallback aktif).
 * Slug TIDAK dilokalkan - mirror `/id/news/:slug` pakai slug sama.
 * Tabs/collapsible di bawah presentational saja (unnamed) - skema/API tetap.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'News articles. / Artikel berita.',
    defaultColumns: ['title', 'coverPreview', 'slug', 'status', 'publishedAt'],
    listSearchableFields: ['title', 'slug'],
  },
  defaultSort: '-publishedAt',
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
          label: 'Article / Artikel',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            slugField(),
            {
              name: 'lede',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.lede },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
              admin: { description: copy.content },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.excerptPost },
            },
          ],
        },
        {
          label: 'Cover / Sampul',
          fields: [
            imageRelationField({ name: 'featuredImage', label: copy.coverRelation }),
            {
              name: 'coverPreview',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/admin/ImagePreview#PostCoverPreview',
                  Cell: '@/admin/ImageThumbCell#PostThumbCell',
                },
                disableListColumn: false,
              },
            },
            {
              name: 'coverAlt',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              type: 'collapsible',
              label: copy.legacyUrl,
              admin: { initCollapsed: true },
              fields: [
                imageUrlField({
                  name: 'coverUrl',
                  relationName: 'featuredImage',
                  label: copy.coverUrl,
                }),
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: copy.metaDescription },
            },
          ],
        },
        {
          label: 'Settings / Pengaturan',
          fields: [
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
  ],
  hooks: {
    beforeValidate: [fillSlugFromTitle],
  },
}
