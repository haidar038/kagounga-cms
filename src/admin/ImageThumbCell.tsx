'use client'

import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import { useAdminImageSrc } from './useAdminImage'

const thumbStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 12,
  border: '1px solid var(--theme-elevation-150)',
  background: 'var(--theme-elevation-50)',
  display: 'block',
}

const emptyStyle: React.CSSProperties = {
  ...thumbStyle,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--theme-elevation-400)',
  fontSize: 16,
}

function Thumb({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = React.useState(false)
  if (!src || failed) {
    return (
      <span style={emptyStyle} aria-hidden>
        —
      </span>
    )
  }
  return (
    <img src={src} alt="" title={alt} style={thumbStyle} loading="lazy" onError={() => setFailed(true)} />
  )
}

type Row = Record<string, unknown>

function Linked({ cell, linkURL }: { cell: React.ReactNode; linkURL?: string }) {
  if (!linkURL) return <>{cell}</>
  return (
    <a href={linkURL} style={{ display: 'inline-block' }}>
      {cell}
    </a>
  )
}

/** Products: `image` + `imageUrl`. */
export function ProductThumbCell(props: DefaultCellComponentProps) {
  const row = (props.rowData ?? {}) as Row
  const src = useAdminImageSrc(row.image as never, row.imageUrl)
  const title = typeof row.title === 'string' ? row.title : 'product'
  return (
    <Linked linkURL={props.linkURL} cell={<Thumb src={src} alt={title} />} />
  )
}

/** Posts: `featuredImage` + `coverUrl`. */
export function PostThumbCell(props: DefaultCellComponentProps) {
  const row = (props.rowData ?? {}) as Row
  const src = useAdminImageSrc(row.featuredImage as never, row.coverUrl)
  const title = typeof row.title === 'string' ? row.title : 'post'
  return <Linked linkURL={props.linkURL} cell={<Thumb src={src} alt={title} />} />
}
