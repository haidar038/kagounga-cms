import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Stockist city pages: one row per city + nested points array. The five
 * legacy city URLs stay fixed because slug is immutable after create.
 * RLS enabled with no policies = deny by default for anon/authenticated;
 * Payload's owner connection bypasses RLS.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_stockist_cities_status" AS ENUM('draft', 'published');
    CREATE TYPE "public"."enum_stockist_cities_points_kind" AS ENUM('hub', 'retail', 'partner');

    CREATE TABLE "stockist_cities" (
      "id" serial PRIMARY KEY NOT NULL,
      "city" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "region" varchar NOT NULL,
      "status" "enum_stockist_cities_status" DEFAULT 'draft' NOT NULL,
      "sort_order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX "stockist_cities_slug_idx" ON "stockist_cities" USING btree ("slug");
    CREATE INDEX "stockist_cities_updated_at_idx" ON "stockist_cities" USING btree ("updated_at");
    CREATE INDEX "stockist_cities_created_at_idx" ON "stockist_cities" USING btree ("created_at");

    CREATE TABLE "stockist_cities_locales" (
      "title" varchar NOT NULL,
      "lede" varchar NOT NULL,
      "seo_title" varchar NOT NULL,
      "meta_description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
    CREATE UNIQUE INDEX "stockist_cities_locales_locale_parent_id_unique"
      ON "stockist_cities_locales" USING btree ("_locale", "_parent_id");
    ALTER TABLE "stockist_cities_locales" ADD CONSTRAINT "stockist_cities_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."stockist_cities"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE TABLE "stockist_cities_texts" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "text" varchar,
      "locale" "_locales"
    );
    CREATE INDEX "stockist_cities_texts_order_parent"
      ON "stockist_cities_texts" USING btree ("order", "parent_id");
    CREATE INDEX "stockist_cities_texts_locale_parent"
      ON "stockist_cities_texts" USING btree ("locale", "parent_id");
    ALTER TABLE "stockist_cities_texts" ADD CONSTRAINT "stockist_cities_texts_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."stockist_cities"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE TABLE "stockist_cities_points" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "point_id" varchar NOT NULL,
      "name" varchar NOT NULL,
      "area" varchar NOT NULL,
      "kind" "enum_stockist_cities_points_kind" DEFAULT 'retail' NOT NULL,
      "lng" numeric NOT NULL,
      "lat" numeric NOT NULL,
      "active" boolean DEFAULT true
    );
    CREATE INDEX "stockist_cities_points_order_idx" ON "stockist_cities_points" USING btree ("_order");
    CREATE INDEX "stockist_cities_points_parent_id_idx" ON "stockist_cities_points" USING btree ("_parent_id");
    ALTER TABLE "stockist_cities_points" ADD CONSTRAINT "stockist_cities_points_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."stockist_cities"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stockist_cities_id" integer;
    CREATE INDEX "payload_locked_documents_rels_stockist_cities_id_idx"
      ON "payload_locked_documents_rels" USING btree ("stockist_cities_id");
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stockist_cities_fk"
      FOREIGN KEY ("stockist_cities_id") REFERENCES "public"."stockist_cities"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "public"."stockist_cities" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."stockist_cities_locales" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."stockist_cities_texts" ENABLE ROW LEVEL SECURITY;
    ALTER TABLE "public"."stockist_cities_points" ENABLE ROW LEVEL SECURITY;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_stockist_cities_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_stockist_cities_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "stockist_cities_id";

    DROP TABLE IF EXISTS "stockist_cities_points" CASCADE;
    DROP TABLE IF EXISTS "stockist_cities_texts" CASCADE;
    DROP TABLE IF EXISTS "stockist_cities_locales" CASCADE;
    DROP TABLE IF EXISTS "stockist_cities" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_stockist_cities_points_kind";
    DROP TYPE IF EXISTS "public"."enum_stockist_cities_status";`)
}
