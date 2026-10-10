import type { Access, Field } from 'payload'

import { imagePairRequired } from '../admin/copy'

/** Anon hanya baca published. Login bebas. Dipakai Products + Posts. */
export const publishedOrAuth: Access = ({ req }) => {
  if (req.user) return true
  return { status: { equals: 'published' } }
}

/** Relasi upload baru (setengah pasangan dual-sumber). */
export function imageRelationField(args: { name: string; label: string }): Field {
  return {
    name: args.name,
    type: 'relationship',
    relationTo: 'media',
    admin: { description: args.label },
  }
}

/** URL remote lama (setengah pasangan dual-sumber). Salah satu wajib. */
export function imageUrlField(args: {
  name: string
  relationName: string
  label: string
}): Field {
  const { name, relationName, label } = args
  return {
    name,
    type: 'text',
    admin: { description: label, placeholder: 'https://…' },
    validate: (val: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
      if ((typeof val === 'string' && val.length > 0) || siblingData?.[relationName])
        return true
      return imagePairRequired(name, relationName)
    },
  }
}
