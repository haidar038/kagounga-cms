export type StockistPointKind = 'hub' | 'retail' | 'partner'

export interface StockistCopySeed {
  seoTitle: string
  metaDescription: string
  title: string
  lede: string
  paragraphs: string[]
}

export interface StockistPointSeed {
  pointId: string
  name: string
  area: string
  kind: StockistPointKind
  lng: number
  lat: number
}

export interface StockistCitySeed {
  slug: string
  city: string
  region: string
  sortOrder: number
  copy: { en: StockistCopySeed; id: StockistCopySeed }
  points: StockistPointSeed[]
}

/**
 * Snapshot seed dari `new-kagounga/src/data/stockistContent.ts` +
 * `locations.ts`. Disalin literal supaya CMS tidak bergantung pada repo
 * frontend saat deploy. Jangan ubah `pointId`; ID lama dipakai anchor JSON-LD.
 */
export const STOCKISTS_SEED: StockistCitySeed[] = [
  {
    slug: 'ternate',
    city: 'Ternate',
    region: 'North Maluku',
    sortOrder: 0,
    copy: {
      en: {
        seoTitle: 'Kagōunga Stockists in Ternate | Kagōunga',
        metaDescription:
          'Find Kagōunga popeda, sago, and North Moluccan spices at our Ternate hub, airport outlets, hotels, and local stores.',
        title: 'Find Kagōunga in Ternate.',
        lede: 'Our home base, with the widest choice of retail points and the fastest access to the Kagōunga team.',
        paragraphs: [
          'Ternate is where Kagōunga began, and it remains the best place to see the full range in person. The city has our North and South hubs, airport counters, hotel partners, and a network of local stores that carry popeda and our pantry staples.',
          'If you are visiting, start with the airport departure outlets for a last-minute gift, or visit the hubs and partner stores for a broader selection. Availability can vary by store; contact us if you need a specific product.',
          'For wholesale, hotel, or retail partnerships in Ternate and the surrounding islands, contact the team to discuss supply and the right pack size for your shelf.',
        ],
      },
      id: {
        seoTitle: 'Toko Kagōunga di Ternate | Kagōunga',
        metaDescription:
          'Temukan popeda, sagu, dan rempah Maluku Utara Kagōunga di hub Ternate, outlet bandara, hotel, dan toko lokal.',
        title: 'Temukan Kagōunga di Ternate.',
        lede: 'Basis kami, dengan pilihan titik ritel paling lengkap dan akses tercepat ke tim Kagōunga.',
        paragraphs: [
          'Ternate adalah tempat Kagōunga dimulai, dan tetap menjadi tempat terbaik untuk melihat rangkaian produk secara langsung. Di kota ini ada North dan South Hub, counter bandara, hotel partner, serta jaringan toko lokal yang menjual popeda dan bahan pokok kami.',
          'Jika sedang berkunjung, mulai dari outlet keberangkatan bandara untuk oleh-oleh terakhir, atau datang ke hub dan toko partner untuk pilihan lebih luas. Ketersediaan dapat berbeda di tiap toko; hubungi kami jika mencari produk tertentu.',
          'Untuk kemitraan grosir, hotel, atau ritel di Ternate dan pulau sekitarnya, hubungi tim kami untuk membahas pasokan dan ukuran kemasan yang sesuai untuk rak Anda.',
        ],
      },
    },
    points: [
      {
        pointId: 'kagounga-north-hub',
        name: 'Kagōunga North Hub',
        area: 'Makassar Barat',
        kind: 'hub',
        lng: 127.3815,
        lat: 0.7845,
      },
      {
        pointId: 'kagounga-south-hub',
        name: 'Kagōunga South Hub',
        area: 'Tanah Tinggi',
        kind: 'hub',
        lng: 127.382,
        lat: 0.784,
      },
      {
        pointId: 'hypermart-ternate',
        name: 'Hypermart',
        area: 'Salero',
        kind: 'hub',
        lng: 127.3825,
        lat: 0.7855,
      },
      {
        pointId: 'sultan-baabullah-airport',
        name: 'Sultan Baabullah Airport',
        area: 'Departure: Outlet Gate 2, Food Stall Gate 4',
        kind: 'retail',
        lng: 127.3803,
        lat: 0.8311,
      },
      {
        pointId: 'bela-hotel',
        name: 'Bela Hotel & Convention Center',
        area: 'Local Corner',
        kind: 'partner',
        lng: 127.3789,
        lat: 0.7712,
      },
      {
        pointId: 'pakesang-kalumpang',
        name: 'Pakesang - Pusat Oleh-oleh',
        area: 'Kalumpang (Samping BI)',
        kind: 'retail',
        lng: 127.3846,
        lat: 0.7876,
      },
      {
        pointId: 'pakesang-soasio',
        name: 'Pakesang - Pusat Oleh-oleh',
        area: 'Soasio',
        kind: 'retail',
        lng: 127.3862,
        lat: 0.7965,
      },
      {
        pointId: 'tara-no-ate',
        name: 'Tara No Ate - Pusat Oleh-oleh',
        area: 'Gamalama',
        kind: 'retail',
        lng: 127.3825,
        lat: 0.7892,
      },
      {
        pointId: 'muhajirin-oleh-oleh',
        name: 'Muhajirin - Pusat Oleh-oleh',
        area: 'Muhajirin',
        kind: 'retail',
        lng: 127.381,
        lat: 0.785,
      },
      {
        pointId: 'muara-supermarket-ternate',
        name: 'Muara Supermarket',
        area: 'Gamalama',
        kind: 'hub',
        lng: 127.383,
        lat: 0.786,
      },
      {
        pointId: 'muhajirin-oleh-oleh-2',
        name: 'Muhajirin - Pusat Oleh-oleh',
        area: 'Muhajirin',
        kind: 'retail',
        lng: 127.3805,
        lat: 0.7835,
      },
      {
        pointId: 'nukila-dive',
        name: 'Nukila Dive Center (Special Edition)',
        area: 'Gamalama',
        kind: 'partner',
        lng: 127.3838,
        lat: 0.7901,
      },
      {
        pointId: 'okky-bakery',
        name: 'Okky Bakery',
        area: 'Muhajirin',
        kind: 'retail',
        lng: 127.3821,
        lat: 0.7839,
      },
      {
        pointId: 'ternate-post-office',
        name: 'Ternate Post Office',
        area: 'Gamalama',
        kind: 'retail',
        lng: 127.3872,
        lat: 0.7891,
      },
    ],
  },
  {
    slug: 'tidore',
    city: 'Tidore',
    region: 'North Maluku',
    sortOrder: 1,
    copy: {
      en: {
        seoTitle: 'Kagōunga Stockists in Tidore | Kagōunga',
        metaDescription:
          'Find Kagōunga products in Tidore at our partner gallery, alongside local woven textiles and island crafts.',
        title: 'Find Kagōunga in Tidore.',
        lede: 'A partner point in Soasio for visitors exploring Tidore and the wider North Maluku islands.',
        paragraphs: [
          'Tidore is a short boat ride from Ternate and a natural stop for anyone tracing the history of the Spice Islands. Our partner point in Soasio sits alongside local woven textiles, making it a convenient place to pick up Kagōunga products and a piece of island craft in one visit.',
          'The range in Tidore is focused on pantry staples and gifts. Availability can vary by store, so it is worth contacting the partner or our team before making a special trip for a specific item.',
          'Retailers and hospitality businesses in Tidore can contact Kagōunga to discuss supply and how to present the products alongside local food and craft.',
        ],
      },
      id: {
        seoTitle: 'Toko Kagōunga di Tidore | Kagōunga',
        metaDescription:
          'Temukan produk Kagōunga di Tidore melalui galeri partner kami, bersama tenun dan kerajinan lokal.',
        title: 'Temukan Kagōunga di Tidore.',
        lede: 'Titik partner di Soasio untuk pengunjung yang menjelajahi Tidore dan kepulauan Maluku Utara.',
        paragraphs: [
          'Tidore hanya beberapa menit naik perahu dari Ternate dan menjadi persinggahan alami bagi siapa pun yang menelusuri sejarah Kepulauan Rempah. Titik partner kami di Soasio berada dekat tenun lokal, sehingga mudah membeli produk Kagōunga sekaligus kerajinan pulau dalam satu kunjungan.',
          'Pilihan produk di Tidore berfokus pada bahan pokok dan hadiah. Ketersediaan dapat berbeda di tiap toko, jadi sebaiknya hubungi partner atau tim kami sebelum melakukan perjalanan khusus untuk produk tertentu.',
          'Ritel dan bisnis perhotelan di Tidore dapat menghubungi Kagōunga untuk membahas pasokan dan cara menampilkan produk bersama makanan serta kerajinan lokal.',
        ],
      },
    },
    points: [
      {
        pointId: 'galeri-tenun-tidore',
        name: 'Galeri Tenun Puta Dino Kayangan',
        area: 'Soasio',
        kind: 'retail',
        lng: 127.4431,
        lat: 0.6814,
      },
    ],
  },
  {
    slug: 'denpasar',
    city: 'Denpasar',
    region: 'Bali',
    sortOrder: 2,
    copy: {
      en: {
        seoTitle: 'Kagōunga Stockists in Denpasar & Sanur | Kagōunga',
        metaDescription:
          'Shop Kagōunga in Bali at our Renon hub and JAVARA House Sanur.',
        title: 'Find Kagōunga in Denpasar.',
        lede: 'Our Bali hub in Renon and a partner point in Sanur connect North Moluccan pantry staples to the island.',
        paragraphs: [
          'Bali is a key market for Kagōunga outside North Maluku. The Renon hub supports local retail and hospitality, while JAVARA House Sanur gives visitors a chance to browse the range in a curated setting.',
          'The Bali assortment is built around popeda, sago, and the spice pantry, with pack sizes suited to home kitchens, cafes, and gift retail. If you are staying in the south, Sanur is the easiest place to start; for larger or repeat orders, contact the Renon hub.',
          'Cafes, hotels, and retailers across Bali can contact the team to discuss product selection and supply for a menu or retail shelf.',
        ],
      },
      id: {
        seoTitle: 'Toko Kagōunga di Denpasar & Sanur | Kagōunga',
        metaDescription:
          'Beli produk Kagōunga di Bali melalui hub Renon dan JAVARA House Sanur.',
        title: 'Temukan Kagōunga di Denpasar.',
        lede: 'Hub Bali kami di Renon dan titik partner di Sanur menghubungkan bahan pokok Maluku Utara ke pulau ini.',
        paragraphs: [
          'Bali adalah pasar utama Kagōunga di luar Maluku Utara. Hub Renon melayani ritel dan perhotelan lokal, sementara JAVARA House Sanur memberi kesempatan bagi pengunjung untuk melihat rangkaian produk dalam suasana kurasi.',
          'Pilihan produk di Bali berfokus pada popeda, sagu, dan rempah dapur, dengan ukuran kemasan yang cocok untuk dapur rumah, kafe, dan ritel hadiah. Jika menginap di area selatan, Sanur adalah titik paling mudah; untuk pesanan besar atau berulang, hubungi hub Renon.',
          'Kafe, hotel, dan ritel di seluruh Bali dapat menghubungi tim kami untuk membahas pemilihan produk dan pasokan untuk menu atau rak toko.',
        ],
      },
    },
    points: [
      {
        pointId: 'hub-bali',
        name: 'Kagōunga Hub Bali',
        area: 'Renon',
        kind: 'hub',
        lng: 115.2341,
        lat: -8.6732,
      },
      {
        pointId: 'javara-house-sanur',
        name: 'JAVARA House Sanur',
        area: 'Sanur',
        kind: 'partner',
        lng: 115.2572,
        lat: -8.6835,
      },
    ],
  },
  {
    slug: 'bandung',
    city: 'Bandung',
    region: 'West Java',
    sortOrder: 3,
    copy: {
      en: {
        seoTitle: 'Kagōunga Stockists in Bandung | Kagōunga',
        metaDescription:
          'Find Kagōunga products in Bandung at Rasta Timur Asli in Bandung Wetan.',
        title: 'Find Kagōunga in Bandung.',
        lede: 'A partner point in Bandung Wetan for pantry staples and North Moluccan flavours.',
        paragraphs: [
          "Bandung's food and design scene makes it a natural home for Kagōunga's pantry range. Our partner, Rasta Timur Asli in Bandung Wetan, carries the products for customers who want to cook with sago, turmeric fish seasoning, and Moluccan spices.",
          'The selection is compact and changes with demand. If you are looking for a specific product or a larger quantity, contact us and we can check availability with the partner.',
          'Cafes, restaurants, and retailers in Bandung can also contact us to discuss supply, menu applications, and pack formats.',
        ],
      },
      id: {
        seoTitle: 'Toko Kagōunga di Bandung | Kagōunga',
        metaDescription:
          'Temukan produk Kagōunga di Bandung melalui Rasta Timur Asli di Bandung Wetan.',
        title: 'Temukan Kagōunga di Bandung.',
        lede: 'Titik partner di Bandung Wetan untuk bahan pokok dan cita rasa Maluku Utara.',
        paragraphs: [
          'Scene kuliner dan desain Bandung membuat kota ini menjadi tempat alami bagi rangkaian produk dapur Kagōunga. Partner kami, Rasta Timur Asli di Bandung Wetan, menyediakan produk untuk pelanggan yang ingin memasak dengan sagu, bumbu kunyit ikan, dan rempah Maluku.',
          'Pilihannya ringkas dan berubah mengikuti permintaan. Jika mencari produk tertentu atau jumlah lebih besar, hubungi kami agar kami dapat mengecek ketersediaan di partner.',
          'Kafe, restoran, dan ritel di Bandung dapat menghubungi kami untuk membahas pasokan, aplikasi menu, dan format kemasan.',
        ],
      },
    },
    points: [
      {
        pointId: 'rasta-bandung',
        name: 'Rasta Timur Asli',
        area: 'Bandung Wetan',
        kind: 'partner',
        lng: 107.6184,
        lat: -6.9035,
      },
    ],
  },
  {
    slug: 'jakarta',
    city: 'Jakarta',
    region: 'Jakarta',
    sortOrder: 4,
    copy: {
      en: {
        seoTitle: 'Kagōunga Stockists in Jakarta | Kagōunga',
        metaDescription: 'Find Kagōunga products in Jakarta at JAVARA Culture Kemang.',
        title: 'Find Kagōunga in Jakarta.',
        lede: 'A curated partner point in Kemang for Jakarta shoppers and gift buyers.',
        paragraphs: [
          'Jakarta is a key market for Indonesian pantry brands, and Kagōunga is available through JAVARA Culture in Kemang. The partner point is a good place to see the range in a curated retail setting, especially if you are shopping for gifts or building a pantry around Indonesian ingredients.',
          'For offices, restaurants, hotels, and retailers, contact the team to discuss supply and the right pack sizes for your needs.',
          'If you need a product urgently, contact us first and we will confirm availability or the nearest stock.',
        ],
      },
      id: {
        seoTitle: 'Toko Kagōunga di Jakarta | Kagōunga',
        metaDescription: 'Temukan produk Kagōunga di Jakarta melalui JAVARA Culture Kemang.',
        title: 'Temukan Kagōunga di Jakarta.',
        lede: 'Titik partner terkurasi di Kemang untuk pembeli dan pencari hadiah di Jakarta.',
        paragraphs: [
          'Jakarta adalah pasar penting bagi brand bahan makanan Indonesia, dan Kagōunga tersedia melalui JAVARA Culture di Kemang. Titik partner ini cocok untuk melihat rangkaian produk dalam suasana ritel terkurasi, terutama untuk belanja hadiah atau melengkapi dapur dengan bahan Indonesia.',
          'Untuk kantor, restoran, hotel, dan ritel, hubungi tim kami untuk membahas pasokan dan ukuran kemasan yang sesuai.',
          'Jika membutuhkan produk mendesak, hubungi kami lebih dahulu dan kami akan memastikan ketersediaan atau stok terdekat.',
        ],
      },
    },
    points: [
      {
        pointId: 'javara-jakarta',
        name: 'JAVARA Culture',
        area: 'Kemang',
        kind: 'partner',
        lng: 106.8163,
        lat: -6.2621,
      },
    ],
  },
]
