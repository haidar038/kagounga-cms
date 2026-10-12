import Link from 'next/link'

export const metadata = {
  title: 'Page not found / Halaman tidak ditemukan',
  robots: { index: false, follow: false },
}

/**
 * 404 khusus grup frontend CMS (root `/` redirect ke `/admin`,
 * jadi route tak dikenal di grup ini butuh halaman sendiri).
 */
export default function FrontendNotFound() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '4rem 1.25rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', opacity: 0.5 }}>404</p>
      <h1 style={{ fontSize: '2rem', margin: '0.75rem 0 0' }}>
        Page not found. / Halaman tidak ditemukan.
      </h1>
      <p style={{ marginTop: '1rem', lineHeight: 1.6, opacity: 0.7 }}>
        The CMS has no public pages — content lives in the admin panel. / CMS ini tidak punya
        halaman publik — konten ada di panel admin.
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
