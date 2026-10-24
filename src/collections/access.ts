import type { Access, FieldAccess } from 'payload'

type UserLike = { id?: string | number; role?: unknown } | null | undefined

const getRole = (user: UserLike): string | undefined =>
  typeof user?.role === 'string' ? user.role : undefined

/** Login apa pun (admin maupun editor). Untuk tulis konten. */
export const isAuthenticated: Access = ({ req }) => !!req.user

/** Hanya admin. Untuk kelola user + ubah field `role`. */
export const isAdmin: Access = ({ req }) => getRole(req.user) === 'admin'

/**
 * Varian guard untuk level field (`FieldAccess` beda tanda tangan dari
 * `Access` koleksi - reuse langsung gagal tsc).
 */
export const isAdminField: FieldAccess = ({ req }) => getRole(req.user) === 'admin'

/** Admin bebas; non-admin hanya baris miliknya. Untuk koleksi Users. */
export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (getRole(req.user) === 'admin') return true
  return { id: { equals: req.user.id } }
}
