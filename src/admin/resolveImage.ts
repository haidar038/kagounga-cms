/**
 * Resolver sumber gambar dual-source (M12): relasi upload baru ATAU url remote.
 * Dipakai Cell (list) + Field (edit preview). Pure - tanpa JSX, gampang dites.
 */

export type ImageRelationValue = {
  filename?: unknown
  thumbnailURL?: unknown
  url?: unknown
  sizes?: { thumbnail?: { url?: unknown } }
  value?: unknown
} | number | string | null | undefined

export function resolveAdminImageSrc(args: {
  relation: ImageRelationValue
  url: unknown
}): string | null {
  const { relation, url } = args
  if (typeof url === 'string' && url.length > 0) return url
  const rel = unwrapRelation(relation)
  if (!rel || typeof rel !== 'object') return null
  const record = rel as Record<string, unknown>
  const direct = pickUrl(record.url ?? record.thumbnailURL)
  if (direct) return direct
  const thumb = record.sizes as { thumbnail?: { url?: unknown } } | undefined
  const sized = pickUrl(thumb?.thumbnail?.url)
  if (sized) return sized
  if (typeof record.filename === 'string' && record.filename.length > 0) {
    return `/api/media/file/${record.filename}`
  }
  return null
}

/** Ambil ID media bila relasi belum ter-populate (angka/string/`{value}`/`{id}`). */
export function extractRelationId(relation: ImageRelationValue): string | number | null {
  if (typeof relation === 'string' || typeof relation === 'number') return relation
  if (relation && typeof relation === 'object') {
    const record = relation as Record<string, unknown>
    if (typeof record.value === 'string' || typeof record.value === 'number')
      return record.value
    if (typeof record.id === 'string' || typeof record.id === 'number') {
      const hasUrl =
        typeof record.url === 'string' ||
        typeof record.thumbnailURL === 'string' ||
        typeof record.filename === 'string'
      if (!hasUrl) return record.id
    }
  }
  return null
}

const mediaUrlCache = new Map<string, string | null>()

/** Resolve URL cover media by ID (fallback bila list tak populate relasi). */
export async function fetchAdminMediaUrl(id: string | number): Promise<string | null> {
  const key = String(id)
  if (mediaUrlCache.has(key)) return mediaUrlCache.get(key) ?? null
  try {
    const res = await fetch(`/api/media/${encodeURIComponent(key)}?depth=0`)
    if (!res.ok) {
      mediaUrlCache.set(key, null)
      return null
    }
    const doc = (await res.json()) as Record<string, unknown>
    const src = resolveAdminImageSrc({ relation: doc as never, url: null })
    mediaUrlCache.set(key, src)
    return src
  } catch {
    mediaUrlCache.set(key, null)
    return null
  }
}

function unwrapRelation(relation: ImageRelationValue): unknown {
  if (relation && typeof relation === 'object' && 'value' in relation) {
    const inner = (relation as { value?: unknown }).value
    if (inner && typeof inner === 'object') return inner
    return null
  }
  return relation
}

function pickUrl(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null
}
