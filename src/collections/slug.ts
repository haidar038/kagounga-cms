import type { CollectionBeforeValidateHook, Field } from 'payload'

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Slug URL-key: unik, pola ketat, validasi di admin + API. */
export function slugField(): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      description: 'URL key (huruf kecil + strip). Otomatis dari title bila kosong.',
    },
    validate: (val: unknown) => {
      if (typeof val !== 'string' || val.length === 0) return 'Slug wajib diisi.'
      return (
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val) || 'Slug: huruf kecil, angka, dan strip saja.'
      )
    },
  }
}

/** Isi slug dari title saat create bila kosong. Dipakai Products + Categories. */
export const fillSlugFromTitle: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation === 'create' && data && !data.slug && typeof data.title === 'string') {
    data.slug = slugify(data.title)
  }
  return data
}
