import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_per" AS ENUM('box', 'pack', 'pouch', 'unit');
  CREATE TYPE "public"."enum_products_moq_unit" AS ENUM('box', 'boxes', 'pack', 'packs', 'pouch', 'pouches', 'unit', 'units');
  CREATE TYPE "public"."enum_products_wholesale_per" AS ENUM('box', 'boxes', 'pack', 'packs', 'pouch', 'pouches', 'unit', 'units');
  CREATE TYPE "public"."enum_products_shipping" AS ENUM('Excluded', 'Included');
  ALTER TABLE "products_locales" ALTER COLUMN "per" SET DATA TYPE "public"."enum_products_per" USING "per"::"public"."enum_products_per";
  ALTER TABLE "products_locales" ALTER COLUMN "moq_unit" SET DATA TYPE "public"."enum_products_moq_unit" USING "moq_unit"::"public"."enum_products_moq_unit";
  ALTER TABLE "products_locales" ALTER COLUMN "wholesale_per" SET DATA TYPE "public"."enum_products_wholesale_per" USING "wholesale_per"::"public"."enum_products_wholesale_per";
  ALTER TABLE "products_locales" ALTER COLUMN "shipping" SET DATA TYPE "public"."enum_products_shipping" USING "shipping"::"public"."enum_products_shipping";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" ALTER COLUMN "per" SET DATA TYPE varchar;
  ALTER TABLE "products_locales" ALTER COLUMN "moq_unit" SET DATA TYPE varchar;
  ALTER TABLE "products_locales" ALTER COLUMN "wholesale_per" SET DATA TYPE varchar;
  ALTER TABLE "products_locales" ALTER COLUMN "shipping" SET DATA TYPE varchar;
  DROP TYPE "public"."enum_products_per";
  DROP TYPE "public"."enum_products_moq_unit";
  DROP TYPE "public"."enum_products_wholesale_per";
  DROP TYPE "public"."enum_products_shipping";`)
}
