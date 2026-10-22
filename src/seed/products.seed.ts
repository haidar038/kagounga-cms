import { readFileSync } from 'node:fs'

/**
 * Seed 8 produk dari `new-kagounga/src/data/products.ts` (EN base).
 * Gambar pakai URL Cloudinary lama (`imageUrl`), tanpa upload.
 * Long-form page copy dibaca dari JSON yang sama dengan frontend.
 * Dijalankan via `seed:products`.
 */
interface ProductPageSource {
  pages: Record<
    string,
    {
      en: { intro: string[]; usage: string; sourcing: string }
      id: { intro: string[]; usage: string; sourcing: string }
    }
  >
  seoTitles: Record<string, { en: string; id: string }>
}

const PAGE_SOURCE = JSON.parse(
  readFileSync(
    new URL('../../../new-kagounga/src/data/productPageCopy.json', import.meta.url),
    'utf8',
  ),
) as ProductPageSource

export const PRODUCT_PAGE_SOURCE = PAGE_SOURCE

export interface ProductSeed {
  slug: string
  title: string
  excerpt: string
  note: string
  intro: string[]
  usage: string
  sourcing: string
  seoTitle: string
  priceNumber: number
  currency: 'USD'
  badges: string[]
  eyebrow: string
  specs: Array<{ label: string; value: string }>
  insideTitle?: string
  inside?: string[]
  per: 'box' | 'pack' | 'pouch' | 'unit'
  alt: string
  imageUrl: string
  packaging?: string
  dimensions?: string
  netWeight?: string
  grossWeight?: string
  origin?: string
  shelfLife?: string
  certification?: string
  moq?: number
  moqUnit?: 'box' | 'boxes' | 'pack' | 'packs' | 'pouch' | 'pouches' | 'unit' | 'units'
  wholesalePriceNumber?: number
  wholesaleCurrency?: 'USD' | 'IDR'
  wholesalePer?: 'box' | 'boxes' | 'pack' | 'packs' | 'pouch' | 'pouches' | 'unit' | 'units'
  shipping?: 'Excluded' | 'Included'
}

const CLOUD = 'https://res.cloudinary.com/fal5otmd/image/upload/f_auto,q_auto,w_800'

type RawProductSeed = Omit<ProductSeed, 'intro' | 'usage' | 'sourcing' | 'seoTitle'>

const RAW_PRODUCTS_SEED: RawProductSeed[] = [
  {
    slug: 'popeda',
    title: 'Popeda Soup',
    excerpt: 'Silky instant sago with savory turmeric fish soup. Ready in 5 minutes.',
    note: '100% natural ingredients, no preservatives, shelf life up to 12 months post-production.',
    priceNumber: 2.53,
    currency: 'USD',
    badges: ['Net 50 g', 'Halal certified', '12-month shelf life'],
    eyebrow: 'Popeda Instant · 50 g per box',
    specs: [{ label: 'HS Code', value: '1901.90.99' }],
    insideTitle: 'Inside the box',
    inside: [
      'Sago starch',
      'Turmeric fish soup seasoning',
      'Dry tuna',
      'Vegetables',
      '1 collectible artwork',
    ],
    per: 'box',
    alt: 'Popeda Soup',
    imageUrl: `${CLOUD}/popeda-soup.webp`,
    packaging: '350 gsm Ivory Board, Matte Laminated, Tuck-End Box',
    dimensions: '8.5 x 14 x 3 cm',
    netWeight: '50 g',
    grossWeight: '60 g',
    origin: 'Ternate, North Maluku, Indonesia',
    shelfLife: 'Up to 12 months',
    certification: 'P-IRT, Halal Indonesia, Nutrition Fact, Intellectual Property Rights (IPR)',
    moq: 200,
    moqUnit: 'units',
    wholesalePriceNumber: 1.9,
    wholesaleCurrency: 'USD',
    wholesalePer: 'unit',
    shipping: 'Excluded',
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
    per: 'pouch',
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
    per: 'pouch',
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
    per: 'pack',
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
    per: 'pouch',
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
    per: 'pouch',
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
    per: 'pouch',
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
    per: 'pouch',
    alt: 'Clove',
    imageUrl: `${CLOUD}/cengkih.webp`,
  },
]

export const PRODUCTS_SEED: ProductSeed[] = RAW_PRODUCTS_SEED.map((seed) => {
  const page = PAGE_SOURCE.pages[seed.slug]?.en
  const seoTitle = PAGE_SOURCE.seoTitles[seed.slug]?.en
  if (!page || !seoTitle) {
    throw new Error(`Missing product page copy for ${seed.slug}`)
  }
  return {
    ...seed,
    intro: page.intro,
    usage: page.usage,
    sourcing: page.sourcing,
    seoTitle,
  }
})
