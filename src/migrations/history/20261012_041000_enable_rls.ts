import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Kunci PostgREST anon: semua tabel Payload tanpa policy = deny by default.
 * Aman untuk aplikasi karena koneksi memakai role postgres (bypass RLS);
 * yang diblokir hanya akses anon/authenticated langsung via REST.
 * Idempoten — di-`up` ulang tidak error, jadi RLS pulih setiap migrate
 * walau schema sempat di-push ulang dari dev.
 */
const TABLES = [
  'users_sessions',
  'users',
  'media',
  'categories',
  'products_specs',
  'products',
  'products_texts',
  'posts',
  'posts_locales',
  'posts_rels',
  'payload_kv',
  'payload_locked_documents',
  'payload_locked_documents_rels',
  'payload_preferences',
  'payload_preferences_rels',
  'payload_migrations',
  'products_locales',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "public"."users_sessions" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."media" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products_specs" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products_texts" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."posts_locales" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."posts_rels" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_kv" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_locked_documents" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_locked_documents_rels" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_preferences" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_preferences_rels" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_migrations" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products_locales" ENABLE ROW LEVEL SECURITY;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "public"."users_sessions" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."users" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."media" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."categories" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products_specs" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products_texts" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."posts" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."posts_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."posts_rels" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_kv" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_locked_documents" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_locked_documents_rels" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_preferences" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_preferences_rels" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."payload_migrations" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."products_locales" DISABLE ROW LEVEL SECURITY;`)
}

export { TABLES }
