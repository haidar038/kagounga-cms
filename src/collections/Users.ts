import type { CollectionConfig } from 'payload'

import { copy } from '../admin/copy'
import { isAdmin, isAdminField, isAdminOrSelf } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Editor tak bisa naikkan diri sendiri. Koleksi create sudah admin-only.
        update: isAdminField,
      },
      admin: { description: copy.role },
    },
  ],
}
