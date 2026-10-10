import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Kagounga CMS — manage catalog and news. / Kelola katalog dan berita.',
  title: 'Kagounga CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
