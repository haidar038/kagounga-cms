import type { PayloadRequest } from 'payload'

type Props = { req: PayloadRequest }

/** Field data grosir yang dicek kelengkapannya (W-014). */
const MISSING_FIELDS = [
  { key: 'moqUnit', label: 'MOQ' },
  { key: 'wholesalePer', label: 'Per' },
  { key: 'shipping', label: 'Shipping' },
] as const

/**
 * Widget W4: produk dengan data grosir (MOQ/per/shipping) belum lengkap
 * di locale aktif admin. Server Component + Local API.
 */
export async function WholesaleGapsWidget({ req }: Props) {
  const { docs, totalDocs } = await req.payload.find({
    collection: 'products',
    where: { or: MISSING_FIELDS.map((f) => ({ [f.key]: { exists: false } })) },
    select: { title: true, moqUnit: true, wholesalePer: true, shipping: true },
    sort: 'title',
    limit: 5,
    req,
  })

  return (
    <section className="kga-widget card">
      <header className="kga-widget__head">
        <h3 className="kga-widget__title">Data grosir belum lengkap</h3>
        <p className="kga-widget__subtitle">
          {totalDocs} produk (locale: {req.locale ?? 'en'})
        </p>
      </header>
      {docs.length === 0 ? (
        <p className="kga-widget__empty">Semua produk lengkap ✓</p>
      ) : (
        <ul className="kga-widget__list">
          {docs.map((doc) => {
            const missing = MISSING_FIELDS.filter((f) => !doc[f.key]).map((f) => f.label)
            return (
              <li className="kga-widget__row" key={doc.id}>
                <a href={`/admin/collections/products/${doc.id}`}>{doc.title}</a>
                <span className="kga-widget__missing">Belum: {missing.join(', ')}</span>
              </li>
            )
          })}
        </ul>
      )}
      {totalDocs > docs.length && (
        <p className="kga-widget__more">+{totalDocs - docs.length} lainnya</p>
      )}
      <a className="kga-widget__link" href="/admin/collections/products">
        Buka produk →
      </a>
    </section>
  )
}
