'use client'

/** Fallback terakhir bila root layout sendiri gagal render. Wajib html/body sendiri. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '4rem 1.25rem' }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Something went wrong. / Terjadi kesalahan.</h1>
          <p style={{ marginTop: '1rem', lineHeight: 1.6, opacity: 0.7 }}>
            Please wait or try again. / Silakan tunggu atau coba lagi.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: '1.5rem',
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
        </main>
      </body>
    </html>
  )
}
