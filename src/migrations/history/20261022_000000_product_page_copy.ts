import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Product detail page copy. `intro` is a localized hasMany text field, stored
 * in the existing products_texts table; the scalar fields live in locales.
 * Columns stay nullable for the additive rollout; the seed fills all 8 rows.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" ADD COLUMN "usage" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "sourcing" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "seo_title" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DELETE FROM "products_texts" WHERE "path" = 'intro';
  ALTER TABLE "products_locales" DROP COLUMN "usage";
  ALTER TABLE "products_locales" DROP COLUMN "sourcing";
  ALTER TABLE "products_locales" DROP COLUMN "seo_title";`)
}
