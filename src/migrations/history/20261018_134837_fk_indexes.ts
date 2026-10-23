import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Index FK advisor Supabase: 3 kolom parent yang tak punya index leading.
 * Idempoten (IF NOT EXISTS) — aman di-`up` ulang walau schema di-push dari dev.
 * Nama mengikuti konvensi prod: `<table>_parent_id_idx`.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "posts_locales_parent_id_idx" ON "posts_locales" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "products_locales_parent_id_idx" ON "products_locales" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "products_texts_parent_id_idx" ON "products_texts" USING btree ("parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "posts_locales_parent_id_idx";
    DROP INDEX IF EXISTS "products_locales_parent_id_idx";
    DROP INDEX IF EXISTS "products_texts_parent_id_idx";`)
}
