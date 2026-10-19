import type { PayloadRequest } from 'payload'

type Props = { req: PayloadRequest }

/** Widget W4: ringkasan katalog produk (total/published/draft). Server Component + Local API. */
export async function CatalogSummaryWidget({ req }: Props) {
  const [total, published, draft] = await Promise.all([
    req.payload.count({ collection: 'products', req }),
    req.payload.count({ collection: 'products', where: { status: { equals: 'published' } }, req }),
    req.payload.count({ collection: 'products', where: { status: { equals: 'draft' } }, req }),
  ])

  return (
    <section className="kga-widget card">
      <header className="kga-widget__head">
        <h3 className="kga-widget__title">Ringkasan katalog</h3>
        <p className="kga-widget__subtitle">Produk per status.</p>
      </header>
      <div className="kga-widget__stats">
        <div className="kga-widget__stat">
          <span className="kga-widget__stat-value">{total.totalDocs}</span>
          <span className="kga-widget__stat-label">
            <span aria-hidden className="kga-widget__dot" />
            Total
          </span>
        </div>
        <div className="kga-widget__stat">
          <span className="kga-widget__stat-value">{published.totalDocs}</span>
          <span className="kga-widget__stat-label">
            <span aria-hidden className="kga-widget__dot kga-widget__dot--published" />
            Published
          </span>
        </div>
        <div className="kga-widget__stat">
          <span className="kga-widget__stat-value">{draft.totalDocs}</span>
          <span className="kga-widget__stat-label">
            <span aria-hidden className="kga-widget__dot kga-widget__dot--draft" />
            Draft
          </span>
        </div>
      </div>
      <a className="kga-widget__link" href="/admin/collections/products">
        Buka produk →
      </a>
    </section>
  )
}
