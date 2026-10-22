/**
 * Bilingual admin copy (M12): satu string `EN. / ID.` per keputusan user.
 * Tanpa infra i18n baru — tahan upgrade Payload, cukup grep bila mau audit.
 */

export const copy = {
  excerptProduct: 'Card blurb. / Blurb kartu katalog.',
  noteProduct: 'Product dialog note. / Catatan dialog produk.',
  introProduct: 'About section paragraphs, one paragraph per row. / Paragraf section About, satu paragraf per baris.',
  usageProduct: 'How to Use section. / Section How to Use.',
  sourcingProduct: 'Sourcing section. / Section Sourcing.',
  seoTitleProduct: 'Unique title tag for this product page. / Judul SEO unik halaman produk.',
  specsProduct: 'Extra rows only (e.g. HS Code). Attributes covered by the Details tab auto-hide here in the frontend when both are filled. / Baris tambahan saja (mis. HS Code). Atribut yang sudah ada di tab Details otomatis disembunyikan di frontend bila keduanya diisi.',
  priceNumber: 'Numeric price. Currency rendered in frontend. / Harga angka. Mata uang dirender di frontend.',
  per: 'Dropdown unit, e.g. "box". Rendered as "/ box" in frontend. / Dropdown satuan, mis. "box". Dirender "/ box" di frontend.',
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
  packaging: 'Box/pouch material, e.g. "350 gsm Ivory Board, Matte Laminated, Tuck-End Box". / Bahan kemasan, mis. "350 gsm Ivory Board, Matte Laminated, Tuck-End Box".',
  dimensions: 'Pack dimensions, e.g. "8.5 x 14 x 3 cm". / Dimensi kemasan, mis. "8.5 x 14 x 3 cm".',
  netWeight: 'Net weight, e.g. "50 g". / Berat bersih, mis. "50 g".',
  grossWeight: 'Gross weight, e.g. "60 g". / Berat kotor, mis. "60 g".',
  origin: 'Country of origin, e.g. "Ternate, North Maluku, Indonesia". / Negara asal, mis. "Ternate, Maluku Utara, Indonesia".',
  shelfLife: 'Shelf life, e.g. "Up to 12 months". / Masa simpan, mis. "Hingga 12 bulan".',
  certification: 'Certifications, e.g. "P-IRT, Halal Indonesia, Nutrition Fact, IPR". / Sertifikasi, mis. "P-IRT, Halal Indonesia, Nutrition Fact, IPR".',
  moq: 'Minimum order quantity for wholesale. Empty = retail only. / Jumlah pesanan minimum grosir. Kosong = ritel saja.',
  moqUnit: 'Dropdown MOQ unit: box/boxes, pack/packs, pouch/pouches, unit/units. / Dropdown satuan MOQ.',
  wholesalePriceNumber: 'Wholesale price number. Empty = no wholesale tier. / Angka harga grosir. Kosong = tanpa tier grosir.',
  wholesaleCurrency: 'Wholesale currency. / Mata uang grosir.',
  wholesalePer: 'Dropdown wholesale unit, same options as MOQ unit. / Dropdown satuan grosir, opsi sama dengan MOQ unit.',
  shipping: 'Dropdown: "Excluded" or "Included". / Dropdown: "Excluded" atau "Included".',
  physicalDetails: 'Physical details / Detail fisik',
  wholesale: 'Wholesale (B2B) / Grosir (B2B)',
} as const

/** Validate message untuk pasangan gambar dual-sumber. */
export function imagePairRequired(urlName: string, relationName: string): string {
  return `Fill ${urlName} or select ${relationName}. / Isi ${urlName} atau pilih relasi ${relationName}.`
}
