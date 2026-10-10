'use client'

import { useFormFields } from '@payloadcms/ui'
import React from 'react'

import { copy } from './copy'
import { useAdminImageSrc } from './useAdminImage'

const frameStyle: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 16,
  background: 'var(--theme-elevation-50)',
  padding: 12,
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  maxWidth: 420,
}

const imgStyle: React.CSSProperties = {
  width: 80,
  height: 80,
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: 12,
  border: '1px solid var(--theme-elevation-150)',
  background: '#fff',
  flexShrink: 0,
}

const hintStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--theme-elevation-500)',
  lineHeight: 1.5,
}

function PreviewShell({ src, note }: { src: string | null; note: string }) {
  const [failed, setFailed] = React.useState(false)
  const show = src && !failed
  return (
    <div style={frameStyle}>
      {show ? (
        <img src={src} alt="" style={imgStyle} onError={() => setFailed(true)} />
      ) : (
        <span
          style={{
            ...imgStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--theme-elevation-400)',
            fontSize: 20,
          }}
          aria-hidden
        >
          —
        </span>
      )}
      <span style={hintStyle}>{note}</span>
    </div>
  )
}

function ShellFor({ relation, url }: { relation: never; url: never }) {
  const src = useAdminImageSrc(relation, url)
  if (!src && !relation) return <PreviewShell src={null} note={copy.previewEmpty} />
  if (!src) return <PreviewShell src={null} note={copy.previewUploadOnly} />
  return <PreviewShell src={src} note={copy.previewLabel} />
}

/** Products edit view: pantau `image` + `imageUrl` live. */
export function ProductImagePreview() {
  const relation = useFormFields(([fields]) => fields?.image?.value as never)
  const url = useFormFields(([fields]) => fields?.imageUrl?.value as never)
  return <ShellFor relation={relation} url={url} />
}

/** Posts edit view: pantau `featuredImage` + `coverUrl` live. */
export function PostCoverPreview() {
  const relation = useFormFields(([fields]) => fields?.featuredImage?.value as never)
  const url = useFormFields(([fields]) => fields?.coverUrl?.value as never)
  return <ShellFor relation={relation} url={url} />
}
