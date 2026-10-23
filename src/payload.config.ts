import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Posts } from './collections/Posts'
import { StockistCities } from './collections/StockistCities'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Origin frontend yang boleh akses API (CORS) + terima cookie Payload (CSRF).
// Format: satu/beberapa URL dipisah koma di CORS_ORIGIN. Default = Vite dev.
const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

// Media persisten (M7): disk lokal hilang tiap deploy (Vercel ephemeral).
// Plugin S3 aktif hanya bila S3_BUCKET diset — dev lokal tanpa kredensial
// tetap pakai upload disk. R2/S3-compatible via S3_ENDPOINT (+ path-style).
const s3Bucket = process.env.S3_BUCKET || ''
const s3Plugins =
  s3Bucket === ''
    ? []
    : [
        s3Storage({
          collections: {
            media: {
              prefix: 'media',
              disableLocalStorage: true,
              generateFileURL: ({
                filename,
                prefix,
              }: {
                filename: string
                prefix?: string
              }) => {
                const base = (
                  process.env.S3_PUBLIC_URL || `https://${s3Bucket}.s3.amazonaws.com`
                ).replace(/\/+$/, '')
                return `${base}/${prefix ? `${prefix}/` : ''}${filename}`
              },
            },
          },
          bucket: s3Bucket,
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            },
            region: process.env.S3_REGION || 'auto',
            ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT } : {}),
            ...(process.env.S3_FORCE_PATH_STYLE === 'true' ? { forcePathStyle: true } : {}),
          },
        }),
      ]

// Email transaksional (reset password dsb). Tanpa RESEND_API_KEY = tulis ke
// console (dev). Wajib diset di prod.
const emailAdapter = process.env.RESEND_API_KEY
  ? resendAdapter({
      defaultFromAddress: process.env.RESEND_FROM_ADDRESS || 'noreply@kagounga.com',
      defaultFromName: process.env.RESEND_FROM_NAME || 'Kagounga',
      apiKey: process.env.RESEND_API_KEY,
    })
  : undefined

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: 'default',
    components: {
      graphics: {
        Logo: '@/admin/BrandLogo#BrandLogo',
        Icon: '@/admin/BrandIcon#BrandIcon',
      },
      beforeNavLinks: ['@/admin/ViewSiteLink#ViewSiteLink'],
    },
    dashboard: {
      widgets: [
        {
          slug: 'catalog-summary',
          Component: '@/admin/CatalogSummaryWidget#CatalogSummaryWidget',
          label: { en: 'Catalog summary', id: 'Ringkasan katalog' },
          minWidth: 'small',
          maxWidth: 'full',
        },
        {
          slug: 'wholesale-gaps',
          Component: '@/admin/WholesaleGapsWidget#WholesaleGapsWidget',
          label: { en: 'Wholesale data gaps', id: 'Data grosir belum lengkap' },
          minWidth: 'small',
          maxWidth: 'full',
        },
      ],
      // Susunan awal: koleksi + 2 widget (W-014). Preferensi user tersimpan menang.
      defaultLayout: [
        { widgetSlug: 'collections', width: 'full' },
        { widgetSlug: 'catalog-summary', width: 'medium' },
        { widgetSlug: 'wholesale-gaps', width: 'medium' },
      ],
    },
    dateFormat: 'd MMM yyyy',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Kagounga CMS',
      description: 'Kagounga CMS — manage catalog and news.',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: 'https://kagounga.com/favicon/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          url: 'https://kagounga.com/favicon/favicon-96x96.png',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          url: 'https://kagounga.com/favicon/apple-touch-icon.png',
        },
      ],
    },
  },
  collections: [Users, Media, Categories, Products, Posts, StockistCities],
  localization: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    fallback: true,
  },
  cors: corsOrigins,
  csrf: corsOrigins,
  editor: lexicalEditor(),
  email: emailAdapter,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [...s3Plugins],
})
