import { readFileSync } from 'node:fs'
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config.js'
import { mdToLexical } from '../utils/lexical-markdown.js'

interface NewsSource {
  slug: string
  title: string
  description: string
  dateISO: string
  cover: string
  coverAlt: string
  excerpt: string
  lede: string
  bodyMarkdown: string
  titleId?: string
  descriptionId?: string
  coverAltId?: string
  excerptId?: string
  ledeId?: string
  bodyMarkdownId?: string
}

/**
 * Seed berita dari `new-kagounga/src/data/news.json` (snapshot M3).
 * EN = create, ID = update locale 'id'. Idempoten via cek slug.
 * Jalan: `bun run seed:posts [path-ke-news.json]`
 * (butuh DATABASE_URL + PAYLOAD_SECRET).
 */
async function main(): Promise<void> {
  const fromArg = process.argv[2]
  const source = fromArg ?? new URL('../../../new-kagounga/src/data/news.json', import.meta.url)
  const posts = JSON.parse(readFileSync(source, 'utf8')) as NewsSource[]
  const payload = await getPayload({ config })
  let created = 0

  for (const p of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.totalDocs > 0) {
      payload.logger.info(`skip ${p.slug}: sudah ada`)
      continue
    }
    const createdDoc = await payload.create({
      collection: 'posts',
      locale: 'en',
      data: {
        title: p.title,
        slug: p.slug,
        metaDescription: p.description,
        excerpt: p.excerpt,
        lede: p.lede,
        content: mdToLexical(p.bodyMarkdown),
        coverAlt: p.coverAlt,
        coverUrl: p.cover,
        status: 'published',
        publishedAt: p.dateISO,
      },
      overrideAccess: true,
    })
    if (p.titleId && p.bodyMarkdownId) {
      await payload.update({
        collection: 'posts',
        id: createdDoc.id,
        locale: 'id',
        data: {
          title: p.titleId,
          metaDescription: p.descriptionId ?? p.description,
          excerpt: p.excerptId ?? p.excerpt,
          lede: p.ledeId ?? p.lede,
          content: mdToLexical(p.bodyMarkdownId),
          coverAlt: p.coverAltId ?? p.coverAlt,
        },
        overrideAccess: true,
      })
    }
    created += 1
    payload.logger.info(`created ${p.slug}`)
  }

  payload.logger.info(`selesai: ${created} baru, ${posts.length - created} skip`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
