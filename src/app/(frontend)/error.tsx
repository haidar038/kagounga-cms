'use client'

/** Error boundary grup frontend CMS: tampil pesan bilingual + tombol retry, tanpa leak stack. */
export default function FrontendError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '4rem 1.25rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', margin: 0 }}>Something went wrong. / Terjadi kesalahan.</h1>
      <p style={{ marginTop: '1rem', lineHeight: 1.6, opacity: 0.7 }}>
        Please wait or try again. / Silakan tunggu atau coba lagi.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 999,
            background: '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Try again / Coba lagi
        </button>
        <a
          href="/admin"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: 999,
            border: '1px solid #ccc',
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          Back to admin / Kembali ke admin
        </a>
      </div>
    </main>
  )
}
