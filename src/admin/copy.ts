/**
 * Bilingual admin copy (M12): satu string `EN. / ID.` per keputusan user.
 * Tanpa infra i18n baru — tahan upgrade Payload, cukup grep bila mau audit.
 */

export const copy = {
  excerptProduct: 'Card blurb. / Blurb kartu katalog.',
  noteProduct: 'Product dialog note. / Catatan dialog produk.',
  priceNumber: 'Numeric price. Currency rendered in frontend. / Harga angka. Mata uang dirender di frontend.',
  per: 'Price unit, e.g. "/ box". / Satuan harga, mis. "/ box".',
  altProduct: 'Image alt text. Empty = use title. / Teks alt gambar. Kosong = pakai title.',
  imageRelation: 'New upload. Empty when using imageUrl. / Upload baru. Kosong bila pakai imageUrl.',
  imageUrl: 'Remote URL (legacy Cloudinary). Required when image empty. / URL remote (Cloudinary lama). Wajib bila image kosong.',
  coverRelation: 'New cover upload. Empty when using coverUrl. / Upload cover baru. Kosong bila pakai coverUrl.',
  coverUrl: 'Remote cover URL (legacy Cloudinary). Required when featuredImage empty. / URL cover remote (Cloudinary lama). Wajib bila featuredImage kosong.',
  sortOrder: 'Catalog display order ascending. / Urut tampil katalog menaik.',
  slug: 'URL key (lowercase + dashes). Auto from title when empty. / URL key (huruf kecil + strip). Otomatis dari title bila kosong.',
  slugRequired: 'Slug is required. / Slug wajib diisi.',
  slugPattern: 'Slug: lowercase, numbers, dashes only. / Slug: huruf kecil, angka, dan strip saja.',
  metaDescription: 'SEO meta description per locale. / Meta description SEO per locale.',
  excerptPost: 'News card summary. / Ringkasan kartu berita.',
  lede: 'Article opening paragraph. / Paragraf pembuka artikel.',
  content: 'Article body. Markdown export via lexical-markdown util. / Isi artikel. Ekspor markdown via util lexical-markdown.',
  role: 'Only admin can change. New users default to editor. / Hanya admin bisa ubah. User baru default editor.',
  altMedia: 'Alt text for image. / Teks alt gambar.',
  previewLabel: 'Preview. / Pratinjau.',
  previewEmpty: 'No image yet — fill the URL or pick an upload. / Belum ada gambar — isi URL atau pilih upload.',
  previewUploadOnly: 'Upload selected — save, then check Media for the file. / Upload terpilih — simpan, lalu cek file di Media.',
  legacyUrl: 'Legacy URL (Cloudinary) / URL lama (Cloudinary)',
} as const

/** Validate message untuk pasangan gambar dual-sumber. */
export function imagePairRequired(urlName: string, relationName: string): string {
  return `Fill ${urlName} or select ${relationName}. / Isi ${urlName} atau pilih relasi ${relationName}.`
}
