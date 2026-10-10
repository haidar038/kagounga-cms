import type { Access, Field } from 'payload'

/** Anon hanya baca published. Login bebas. Dipakai Products + Posts. */
export const publishedOrAuth: Access = ({ req }) => {
  if (req.user) return true
  return { status: { equals: 'published' } }
}

/**
 * Pasangan gambar dual-sumber: relasi upload baru ATAU url remote lama.
 * Salah satu wajib — seed M2/M3 pakai url (Cloudinary), admin bisa upload.
 */
export function imagePair(args: {
  relationName: string
  urlName: string
  relationLabel: string
  urlLabel: string
}): Field[] {
  const { relationName, urlName, relationLabel, urlLabel } = args
  return [
    {
      name: relationName,
      type: 'relationship',
      relationTo: 'media',
      admin: { description: relationLabel },
    },
    {
      name: urlName,
      type: 'text',
      admin: { description: urlLabel },
      validate: (val: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if ((typeof val === 'string' && val.length > 0) || siblingData?.[relationName])
          return true
        return `Isi ${urlName} atau pilih relasi ${relationName}.`
      },
    },
  ]
}
