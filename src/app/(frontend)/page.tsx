import { redirect } from 'next/navigation'

/**
 * CMS root (M12): langsung ke login/admin.
 * Frontend publik tetap di repo `new-kagounga` - route `/` di sini
 * hanya template Payload, jadi redirect permanen ke panel.
 */
export default function HomePage() {
  redirect('/admin')
}
