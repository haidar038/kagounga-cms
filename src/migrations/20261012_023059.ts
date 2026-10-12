import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_wholesale_currency" AS ENUM('USD', 'IDR');
  ALTER TABLE "products" ADD COLUMN "dimensions" varchar;
  ALTER TABLE "products" ADD COLUMN "net_weight" varchar;
  ALTER TABLE "products" ADD COLUMN "gross_weight" varchar;
  ALTER TABLE "products" ADD COLUMN "moq" numeric;
  ALTER TABLE "products" ADD COLUMN "wholesale_price_number" numeric;
  ALTER TABLE "products" ADD COLUMN "wholesale_currency" "enum_products_wholesale_currency" DEFAULT 'USD';
  ALTER TABLE "products_locales" ADD COLUMN "packaging" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "origin" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "shelf_life" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "certification" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "moq_unit" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "wholesale_per" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "shipping" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN "dimensions";
  ALTER TABLE "products" DROP COLUMN "net_weight";
  ALTER TABLE "products" DROP COLUMN "gross_weight";
  ALTER TABLE "products" DROP COLUMN "moq";
  ALTER TABLE "products" DROP COLUMN "wholesale_price_number";
  ALTER TABLE "products" DROP COLUMN "wholesale_currency";
  ALTER TABLE "products_locales" DROP COLUMN "packaging";
  ALTER TABLE "products_locales" DROP COLUMN "origin";
  ALTER TABLE "products_locales" DROP COLUMN "shelf_life";
  ALTER TABLE "products_locales" DROP COLUMN "certification";
  ALTER TABLE "products_locales" DROP COLUMN "moq_unit";
  ALTER TABLE "products_locales" DROP COLUMN "wholesale_per";
  ALTER TABLE "products_locales" DROP COLUMN "shipping";
  DROP TYPE "public"."enum_products_wholesale_currency";`)
}
