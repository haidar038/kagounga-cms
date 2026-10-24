import Link from 'next/link'

/**
 * Global 404 (bilingual EN/ID). Tanpa sentuh generated
 * `(payload)/admin/[[...segments]]/not-found.tsx` - file itu milik Payload.
 */
export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '4rem 1.25rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', opacity: 0.5 } as const}>
        404
      </p>
      <h1 style={{ fontSize: '2rem', margin: '0.75rem 0 0' }}>
        Page not found. / Halaman tidak ditemukan.
      </h1>
      <p style={{ marginTop: '1rem', lineHeight: 1.6, opacity: 0.7 }}>
        The page you are looking for does not exist or was moved. / Halaman yang kamu cari tidak
        ada atau sudah dipindah.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <Link
          href="/admin"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 999,
            background: '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          Back to admin / Kembali ke admin
        </Link>
        <a
          href="https://kagounga.com"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 999,
            border: '1px solid #ccc',
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          Public site / Situs publik
        </a>
      </div>
    </main>
  )
}
