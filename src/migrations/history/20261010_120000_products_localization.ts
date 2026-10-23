import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * M8: lokalisasi field teks Products. Salin nilai EN lama ke tabel locale
 * (`_locale='en'`) SEBELUM kolom lama di-drop — tanpa ini data EN hilang.
 * Disusun manual: `migrate:create` hanya hasilkan full-baseline untuk DB lama.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_locales" (
    "excerpt" varchar NOT NULL,
    "note" varchar NOT NULL,
    "eyebrow" varchar,
    "inside_title" varchar,
    "per" varchar,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" integer NOT NULL
   );
   ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
   CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
   ALTER TABLE "products_specs" ADD COLUMN "_locale" "_locales";
   UPDATE "products_specs" SET "_locale" = 'en';
   ALTER TABLE "products_specs" ALTER COLUMN "_locale" SET NOT NULL;
   CREATE INDEX "products_specs_locale_idx" ON "products_specs" USING btree ("_locale");
   ALTER TABLE "products_texts" ADD COLUMN "locale" "_locales";
   UPDATE "products_texts" SET "locale" = 'en';
   INSERT INTO "products_locales" ("_locale", "_parent_id", "excerpt", "note", "eyebrow", "inside_title", "per")
    SELECT 'en', "id", "excerpt", "note", "eyebrow", "inside_title", "per" FROM "products";
   ALTER TABLE "products" DROP COLUMN "excerpt";
   ALTER TABLE "products" DROP COLUMN "note";
   ALTER TABLE "products" DROP COLUMN "eyebrow";
   ALTER TABLE "products" DROP COLUMN "inside_title";
   ALTER TABLE "products" DROP COLUMN "per";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "excerpt" varchar NOT NULL DEFAULT '';
   ALTER TABLE "products" ADD COLUMN "note" varchar NOT NULL DEFAULT '';
   ALTER TABLE "products" ADD COLUMN "eyebrow" varchar;
   ALTER TABLE "products" ADD COLUMN "inside_title" varchar;
   ALTER TABLE "products" ADD COLUMN "per" varchar;
   UPDATE "products" p SET "excerpt" = l."excerpt", "note" = l."note", "eyebrow" = l."eyebrow", "inside_title" = l."inside_title", "per" = l."per"
    FROM "products_locales" l WHERE l."_parent_id" = p."id" AND l."_locale" = 'en';
   ALTER TABLE "products" ALTER COLUMN "excerpt" DROP DEFAULT;
   ALTER TABLE "products" ALTER COLUMN "note" DROP DEFAULT;
   DROP TABLE "products_locales" CASCADE;
   ALTER TABLE "products_specs" DROP COLUMN "_locale";
   ALTER TABLE "products_texts" DROP COLUMN "locale";`)
}
