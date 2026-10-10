import type { CollectionConfig } from 'payload'

import { fillSlugFromTitle, slugField } from './slug'
import { isAuthenticated } from './access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'type'],
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'product',
      options: ['product', 'post'],
    },
  ],
  hooks: {
    beforeValidate: [fillSlugFromTitle],
  },
}
