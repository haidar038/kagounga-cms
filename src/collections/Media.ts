import type { CollectionConfig } from 'payload'

import { copy } from '../admin/copy'
import { isAuthenticated } from './access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
    description: 'Image library. / Pustaka gambar.',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: copy.altMedia },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 800, height: 600 },
      { name: 'hero', width: 1600, height: 900 },
    ],
  },
}
