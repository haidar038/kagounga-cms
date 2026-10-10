/**
 * Seed 8 produk dari `new-kagounga/src/data/products.ts` (EN base).
 * Gambar pakai URL Cloudinary lama (`imageUrl`), tanpa upload.
 * Overlay ID + lokalisasi field menyusul M3. Dijalankan via `seed:products`.
 */
export interface ProductSeed {
  slug: string
  title: string
  excerpt: string
  note: string
  priceNumber: number
  currency: 'USD'
  badges: string[]
  eyebrow: string
  specs: Array<{ label: string; value: string }>
  insideTitle?: string
  inside?: string[]
  per: string
  alt: string
  imageUrl: string
}

const CLOUD = 'https://res.cloudinary.com/fal5otmd/image/upload/f_auto,q_auto,w_800'

export const PRODUCTS_SEED: ProductSeed[] = [
  {
    slug: 'popeda',
    title: 'Popeda Soup',
    excerpt: 'Silky instant sago with savory turmeric fish soup. Ready in 5 minutes.',
    note: '100% natural ingredients, no preservatives, shelf life up to 12 months post-production.',
    priceNumber: 2.53,
    currency: 'USD',
    badges: ['Net 50 g', 'Halal certified', '12-month shelf life'],
    eyebrow: 'Popeda Instant · 50 g per box',
    specs: [
      { label: 'Dimensions', value: '10 × 4 × 6.5 cm' },
      { label: 'Packaging', value: 'Ivory 350 g, matte laminated, tuck-top' },
      { label: 'Net weight', value: '50 g' },
      { label: 'Gross weight', value: '60 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
      { label: 'HS Code', value: '1901.90.99' },
      { label: 'Certification', value: 'Halal Indonesia (ID82410021232450325)' },
    ],
    insideTitle: 'Inside the box',
    inside: [
      'Sago starch',
      'Turmeric fish soup pasta',
      'Dry fish',
      'Dry vegetables',
      'Serving suggestions',
      '1 pcs collectible artwork',
    ],
    per: '/ box',
    alt: 'Popeda Soup',
    imageUrl: `${CLOUD}/popeda-soup.webp`,
  },
  {
    slug: 'sago',
    title: 'Sago Starch',
    excerpt: 'Pure sago starch from North Moluccan palms. The base of every popeda.',
    note: '100% natural ingredients, no preservatives, shelf life up to 24 months post-production.',
    priceNumber: 0.84,
    currency: 'USD',
    badges: ['Net 1 kg', 'Halal certified', '24-month shelf life'],
    eyebrow: 'Sago Starch · 1 kg per pouch',
    specs: [
      { label: 'Dimensions', value: '16 × 24 cm' },
      { label: 'Packaging', value: 'PE pouch, food grade' },
      { label: 'Net weight', value: '1.000 g (1 kg)' },
      { label: 'Gross weight', value: '1.010 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
      { label: 'HS Code', value: '1108.19.10' },
      { label: 'Certification', value: 'Halal Indonesia (ID82410021232450325)' },
    ],
    per: '/ pouch',
    alt: 'Sago Starch',
    imageUrl: `${CLOUD}/sagu-starch.webp`,
  },
  {
    slug: 'tuna',
    title: 'Dried Tuna',
    excerpt: 'Premium dried tuna with intense flavor for cooking and beverages.',
    note: 'Wild-caught tuna, cleaned and sun-dried. No preservatives. Ready for soups and sambal.',
    priceNumber: 15,
    currency: 'USD',
    badges: ['Net 100 g', 'Wild-caught', '12-month shelf life'],
    eyebrow: 'Dried Tuna · 100 g per pouch',
    specs: [
      { label: 'Dimensions', value: '14 × 20 cm' },
      { label: 'Packaging', value: 'Resealable pouch, food grade' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Gross weight', value: '110 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
    ],
    per: '/ pouch',
    alt: 'Dried Tuna',
    imageUrl: `${CLOUD}/driedtuna.webp`,
  },
  {
    slug: 'seasoning',
    title: 'Turmeric Fish Seasoning',
    excerpt:
      'A vibrant blend of turmeric and other spices, perfect for adding a burst of flavor to your fish dishes.',
    note: 'Stir into hot water or broth for an instant turmeric fish soup base.',
    priceNumber: 20,
    currency: 'USD',
    badges: ['Net 50 g', 'Small-batch', '12-month shelf life'],
    eyebrow: 'Turmeric Fish Seasoning · 50 g per pack',
    specs: [
      { label: 'Packaging', value: 'Sealed pack, food grade' },
      { label: 'Net weight', value: '50 g' },
      { label: 'Gross weight', value: '60 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
    ],
    insideTitle: 'Blended with',
    inside: ['Turmeric', 'Dried fish powder', 'Sea salt', 'Mixed spices'],
    per: '/ pack',
    alt: 'Turmeric Fish Seasoning',
    imageUrl: `${CLOUD}/kunyit.webp`,
  },
  {
    slug: 'kenari',
    title: 'Kenari Nut',
    excerpt: 'Buttery native kenari nuts, rich in flavor and harvested locally.',
    note: 'Buttery native nuts, roasted and lightly salted. Ready to snack.',
    priceNumber: 10,
    currency: 'USD',
    badges: ['Net 200 g', 'Roasted', '12-month shelf life'],
    eyebrow: 'Kenari Nut · 200 g per pouch',
    specs: [
      { label: 'Packaging', value: 'Resealable pouch, food grade' },
      { label: 'Net weight', value: '200 g' },
      { label: 'Gross weight', value: '210 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
    ],
    insideTitle: 'Roasted with',
    inside: ['Roasted kenari nuts', 'Sea salt'],
    per: '/ pouch',
    alt: 'Kenari Nut',
    imageUrl: `${CLOUD}/kenari-nut.webp`,
  },
  {
    slug: 'telang',
    title: 'Butterfly Pea Flower',
    excerpt: 'Dried butterfly pea flowers for vibrant blue teas and natural coloring.',
    note: 'Steep for natural blue tea. Turns purple with a splash of calamansi.',
    priceNumber: 10,
    currency: 'USD',
    badges: ['Net 50 g', 'Sun-dried', '12-month shelf life'],
    eyebrow: 'Butterfly Pea Flower · 50 g per pouch',
    specs: [
      { label: 'Packaging', value: 'Resealable pouch, food grade' },
      { label: 'Net weight', value: '50 g' },
      { label: 'Gross weight', value: '60 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
    ],
    insideTitle: 'Contents',
    inside: ['Dried butterfly pea flowers'],
    per: '/ pouch',
    alt: 'Butterfly Pea Flower',
    imageUrl: `${CLOUD}/bungatelang.webp`,
  },
  {
    slug: 'pala',
    title: 'Nutmeg / Mace',
    excerpt: 'Aromatic nutmeg and mace, the legendary spice of the Moluccas.',
    note: 'Sun-dried whole spices from Moluccan groves. The legendary Spice Islands pair.',
    priceNumber: 10,
    currency: 'USD',
    badges: ['Net 100 g', 'Single-origin', '24-month shelf life'],
    eyebrow: 'Nutmeg / Mace · 100 g per pouch',
    specs: [
      { label: 'Packaging', value: 'Resealable pouch, food grade' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Gross weight', value: '110 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
    ],
    insideTitle: 'Contents',
    inside: ['Whole nutmeg', 'Mace (fuli)'],
    per: '/ pouch',
    alt: 'Nutmeg / Mace',
    imageUrl: `${CLOUD}/palafuli.webp`,
  },
  {
    slug: 'cengkeh',
    title: 'Clove',
    excerpt: 'Premium dried cloves with intense aroma for cooking and beverages.',
    note: 'Hand-picked buds, sun-dried for intense aroma. For cooking and beverages.',
    priceNumber: 10,
    currency: 'USD',
    badges: ['Net 100 g', 'Sun-dried', '12-month shelf life'],
    eyebrow: 'Clove · 100 g per pouch',
    specs: [
      { label: 'Packaging', value: 'Resealable pouch, food grade' },
      { label: 'Net weight', value: '100 g' },
      { label: 'Gross weight', value: '110 g' },
      { label: 'Origin', value: 'Ternate, North Maluku, Indonesia' },
    ],
    insideTitle: 'Contents',
    inside: ['Whole dried cloves'],
    per: '/ pouch',
    alt: 'Clove',
    imageUrl: `${CLOUD}/cengkih.webp`,
  },
]
