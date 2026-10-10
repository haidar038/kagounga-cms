'use client'

import React from 'react'

import {
  extractRelationId,
  fetchAdminMediaUrl,
  resolveAdminImageSrc,
  type ImageRelationValue,
} from './resolveImage'

/**
 * Sumber gambar admin: URL langsung/relasi populate dulu,
 * fetch `/api/media/:id` (cache) bila relasi ID-only — kasus list view.
 */
export function useAdminImageSrc(relation: ImageRelationValue, url: unknown): string | null {
  const [fetched, setFetched] = React.useState<string | null>(null)
  const immediate = resolveAdminImageSrc({ relation, url })
  const id = immediate ? null : extractRelationId(relation)
  React.useEffect(() => {
    if (!id) return
    let live = true
    fetchAdminMediaUrl(id).then((src) => {
      if (live && src) setFetched(src)
    })
    return () => {
      live = false
    }
  }, [id])
  return immediate ?? fetched
}
