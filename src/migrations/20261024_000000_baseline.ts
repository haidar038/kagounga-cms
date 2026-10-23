import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Baseline squash (T-M15-12/D-035): seluruh schema Payload 3.90.2 dalam satu
 * migrasi, diambil verbatim dari pg_dump --schema-only dev-push 2026-10-24
 * (sumber kebenaran = schema sesuai config saat ini). Migrasi lama (M2–M14)
 * dipertahankan sebagai sejarah tapi tak lagi diregistrasi — mereka asumsikan
 * dev-push awal (tipe enum "_locales" dsb.) sehingga tak replayable dari nol.
 *
 * Idempoten: kalau schema sudah ada (DB dev-push / hasil 8 migrasi lama),
 * DDL di-skip dan hanya RLS yang ditegakkan ulang. DB kosong = dibangun penuh.
 * `down` destruktif: drop schema public.
 */
const DDL = `CREATE TYPE public._locales AS ENUM (
    'en',
    'id'
);

--
-- Name: enum_categories_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_categories_type AS ENUM (
    'product',
    'post'
);

--
-- Name: enum_posts_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_posts_status AS ENUM (
    'draft',
    'published'
);

--
-- Name: enum_products_currency; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_currency AS ENUM (
    'USD',
    'IDR'
);

--
-- Name: enum_products_moq_unit; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_moq_unit AS ENUM (
    'box',
    'boxes',
    'pack',
    'packs',
    'pouch',
    'pouches',
    'unit',
    'units'
);

--
-- Name: enum_products_per; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_per AS ENUM (
    'box',
    'pack',
    'pouch',
    'unit'
);

--
-- Name: enum_products_shipping; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_shipping AS ENUM (
    'Excluded',
    'Included'
);

--
-- Name: enum_products_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_status AS ENUM (
    'draft',
    'published'
);

--
-- Name: enum_products_wholesale_currency; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_wholesale_currency AS ENUM (
    'USD',
    'IDR'
);

--
-- Name: enum_products_wholesale_per; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_wholesale_per AS ENUM (
    'box',
    'boxes',
    'pack',
    'packs',
    'pouch',
    'pouches',
    'unit',
    'units'
);

--
-- Name: enum_stockist_cities_points_kind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_stockist_cities_points_kind AS ENUM (
    'hub',
    'retail',
    'partner'
);

--
-- Name: enum_stockist_cities_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_stockist_cities_status AS ENUM (
    'draft',
    'published'
);

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'editor'
);

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    type public.enum_categories_type DEFAULT 'product'::public.enum_categories_type NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;

--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying,
    sizes_card_url character varying,
    sizes_card_width numeric,
    sizes_card_height numeric,
    sizes_card_mime_type character varying,
    sizes_card_filesize numeric,
    sizes_card_filename character varying,
    sizes_hero_url character varying,
    sizes_hero_width numeric,
    sizes_hero_height numeric,
    sizes_hero_mime_type character varying,
    sizes_hero_filesize numeric,
    sizes_hero_filename character varying
);

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;

--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);

--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;

--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;

--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    categories_id integer,
    products_id integer,
    posts_id integer,
    stockist_cities_id integer
);

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;

--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;

--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    slug character varying NOT NULL,
    featured_image_id integer,
    cover_url character varying,
    author_id integer,
    status public.enum_posts_status DEFAULT 'draft'::public.enum_posts_status NOT NULL,
    published_at timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;

--
-- Name: posts_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts_locales (
    title character varying NOT NULL,
    lede character varying NOT NULL,
    content jsonb NOT NULL,
    excerpt character varying NOT NULL,
    cover_alt character varying NOT NULL,
    meta_description character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);

--
-- Name: posts_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: posts_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_locales_id_seq OWNED BY public.posts_locales.id;

--
-- Name: posts_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    categories_id integer
);

--
-- Name: posts_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: posts_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_rels_id_seq OWNED BY public.posts_rels.id;

--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    price_number numeric NOT NULL,
    currency public.enum_products_currency DEFAULT 'USD'::public.enum_products_currency NOT NULL,
    image_id integer,
    alt character varying,
    image_url character varying,
    dimensions character varying,
    net_weight character varying,
    gross_weight character varying,
    moq numeric,
    wholesale_price_number numeric,
    wholesale_currency public.enum_products_wholesale_currency DEFAULT 'USD'::public.enum_products_wholesale_currency,
    category_id integer,
    status public.enum_products_status DEFAULT 'draft'::public.enum_products_status NOT NULL,
    published_at timestamp(3) with time zone,
    featured boolean DEFAULT false,
    sort_order numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;

--
-- Name: products_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_locales (
    per public.enum_products_per,
    eyebrow character varying,
    excerpt character varying NOT NULL,
    note character varying NOT NULL,
    inside_title character varying,
    usage character varying NOT NULL,
    sourcing character varying NOT NULL,
    seo_title character varying NOT NULL,
    packaging character varying,
    origin character varying,
    shelf_life character varying,
    certification character varying,
    moq_unit public.enum_products_moq_unit,
    wholesale_per public.enum_products_wholesale_per,
    shipping public.enum_products_shipping,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);

--
-- Name: products_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: products_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_locales_id_seq OWNED BY public.products_locales.id;

--
-- Name: products_specs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_specs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _locale public._locales NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    value character varying NOT NULL
);

--
-- Name: products_texts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_texts (
    id integer NOT NULL,
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    text character varying,
    locale public._locales
);

--
-- Name: products_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_texts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: products_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_texts_id_seq OWNED BY public.products_texts.id;

--
-- Name: stockist_cities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stockist_cities (
    id integer NOT NULL,
    city character varying NOT NULL,
    slug character varying NOT NULL,
    region character varying NOT NULL,
    status public.enum_stockist_cities_status DEFAULT 'draft'::public.enum_stockist_cities_status NOT NULL,
    sort_order numeric DEFAULT 0,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: stockist_cities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stockist_cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: stockist_cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stockist_cities_id_seq OWNED BY public.stockist_cities.id;

--
-- Name: stockist_cities_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stockist_cities_locales (
    title character varying NOT NULL,
    lede character varying NOT NULL,
    seo_title character varying NOT NULL,
    meta_description character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);

--
-- Name: stockist_cities_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stockist_cities_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: stockist_cities_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stockist_cities_locales_id_seq OWNED BY public.stockist_cities_locales.id;

--
-- Name: stockist_cities_points; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stockist_cities_points (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    point_id character varying NOT NULL,
    name character varying NOT NULL,
    area character varying NOT NULL,
    kind public.enum_stockist_cities_points_kind DEFAULT 'retail'::public.enum_stockist_cities_points_kind NOT NULL,
    lng numeric NOT NULL,
    lat numeric NOT NULL,
    active boolean DEFAULT true
);

--
-- Name: stockist_cities_texts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stockist_cities_texts (
    id integer NOT NULL,
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    text character varying,
    locale public._locales
);

--
-- Name: stockist_cities_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stockist_cities_texts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: stockist_cities_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stockist_cities_texts_id_seq OWNED BY public.stockist_cities_texts.id;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role public.enum_users_role DEFAULT 'editor'::public.enum_users_role NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    reset_password_requested_at timestamp(3) with time zone,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);

--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);

--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);

--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);

--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);

--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);

--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);

--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);

--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);

--
-- Name: posts_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_locales ALTER COLUMN id SET DEFAULT nextval('public.posts_locales_id_seq'::regclass);

--
-- Name: posts_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels ALTER COLUMN id SET DEFAULT nextval('public.posts_rels_id_seq'::regclass);

--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);

--
-- Name: products_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales ALTER COLUMN id SET DEFAULT nextval('public.products_locales_id_seq'::regclass);

--
-- Name: products_texts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_texts ALTER COLUMN id SET DEFAULT nextval('public.products_texts_id_seq'::regclass);

--
-- Name: stockist_cities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities ALTER COLUMN id SET DEFAULT nextval('public.stockist_cities_id_seq'::regclass);

--
-- Name: stockist_cities_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_locales ALTER COLUMN id SET DEFAULT nextval('public.stockist_cities_locales_id_seq'::regclass);

--
-- Name: stockist_cities_texts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_texts ALTER COLUMN id SET DEFAULT nextval('public.stockist_cities_texts_id_seq'::regclass);

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);

--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);

--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);

--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);

--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);

--
-- Name: posts_locales posts_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_locales
    ADD CONSTRAINT posts_locales_pkey PRIMARY KEY (id);

--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);

--
-- Name: posts_rels posts_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_pkey PRIMARY KEY (id);

--
-- Name: products_locales products_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales
    ADD CONSTRAINT products_locales_pkey PRIMARY KEY (id);

--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

--
-- Name: products_specs products_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_specs
    ADD CONSTRAINT products_specs_pkey PRIMARY KEY (id);

--
-- Name: products_texts products_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_texts
    ADD CONSTRAINT products_texts_pkey PRIMARY KEY (id);

--
-- Name: stockist_cities_locales stockist_cities_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_locales
    ADD CONSTRAINT stockist_cities_locales_pkey PRIMARY KEY (id);

--
-- Name: stockist_cities stockist_cities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities
    ADD CONSTRAINT stockist_cities_pkey PRIMARY KEY (id);

--
-- Name: stockist_cities_points stockist_cities_points_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_points
    ADD CONSTRAINT stockist_cities_points_pkey PRIMARY KEY (id);

--
-- Name: stockist_cities_texts stockist_cities_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_texts
    ADD CONSTRAINT stockist_cities_texts_pkey PRIMARY KEY (id);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);

--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);

--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);

--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);

--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);

--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);

--
-- Name: media_sizes_card_sizes_card_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_card_sizes_card_filename_idx ON public.media USING btree (sizes_card_filename);

--
-- Name: media_sizes_hero_sizes_hero_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_hero_sizes_hero_filename_idx ON public.media USING btree (sizes_hero_filename);

--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);

--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);

--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);

--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);

--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);

--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);

--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);

--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");

--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);

--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);

--
-- Name: payload_locked_documents_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_posts_id_idx ON public.payload_locked_documents_rels USING btree (posts_id);

--
-- Name: payload_locked_documents_rels_products_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_products_id_idx ON public.payload_locked_documents_rels USING btree (products_id);

--
-- Name: payload_locked_documents_rels_stockist_cities_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_stockist_cities_id_idx ON public.payload_locked_documents_rels USING btree (stockist_cities_id);

--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);

--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);

--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);

--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);

--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");

--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);

--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);

--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);

--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);

--
-- Name: posts_author_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_author_idx ON public.posts USING btree (author_id);

--
-- Name: posts_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_created_at_idx ON public.posts USING btree (created_at);

--
-- Name: posts_featured_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_featured_image_idx ON public.posts USING btree (featured_image_id);

--
-- Name: posts_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX posts_locales_locale_parent_id_unique ON public.posts_locales USING btree (_locale, _parent_id);

--
-- Name: posts_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_categories_id_idx ON public.posts_rels USING btree (categories_id);

--
-- Name: posts_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_order_idx ON public.posts_rels USING btree ("order");

--
-- Name: posts_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_parent_idx ON public.posts_rels USING btree (parent_id);

--
-- Name: posts_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_path_idx ON public.posts_rels USING btree (path);

--
-- Name: posts_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX posts_slug_idx ON public.posts USING btree (slug);

--
-- Name: posts_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_updated_at_idx ON public.posts USING btree (updated_at);

--
-- Name: products_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_category_idx ON public.products USING btree (category_id);

--
-- Name: products_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_created_at_idx ON public.products USING btree (created_at);

--
-- Name: products_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_image_idx ON public.products USING btree (image_id);

--
-- Name: products_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_locales_locale_parent_id_unique ON public.products_locales USING btree (_locale, _parent_id);

--
-- Name: products_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_slug_idx ON public.products USING btree (slug);

--
-- Name: products_specs_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_specs_locale_idx ON public.products_specs USING btree (_locale);

--
-- Name: products_specs_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_specs_order_idx ON public.products_specs USING btree (_order);

--
-- Name: products_specs_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_specs_parent_id_idx ON public.products_specs USING btree (_parent_id);

--
-- Name: products_texts_locale_parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_texts_locale_parent ON public.products_texts USING btree (locale, parent_id);

--
-- Name: products_texts_order_parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_texts_order_parent ON public.products_texts USING btree ("order", parent_id);

--
-- Name: products_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_updated_at_idx ON public.products USING btree (updated_at);

--
-- Name: stockist_cities_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stockist_cities_created_at_idx ON public.stockist_cities USING btree (created_at);

--
-- Name: stockist_cities_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX stockist_cities_locales_locale_parent_id_unique ON public.stockist_cities_locales USING btree (_locale, _parent_id);

--
-- Name: stockist_cities_points_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stockist_cities_points_order_idx ON public.stockist_cities_points USING btree (_order);

--
-- Name: stockist_cities_points_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stockist_cities_points_parent_id_idx ON public.stockist_cities_points USING btree (_parent_id);

--
-- Name: stockist_cities_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX stockist_cities_slug_idx ON public.stockist_cities USING btree (slug);

--
-- Name: stockist_cities_texts_locale_parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stockist_cities_texts_locale_parent ON public.stockist_cities_texts USING btree (locale, parent_id);

--
-- Name: stockist_cities_texts_order_parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stockist_cities_texts_order_parent ON public.stockist_cities_texts USING btree ("order", parent_id);

--
-- Name: stockist_cities_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stockist_cities_updated_at_idx ON public.stockist_cities USING btree (updated_at);

--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);

--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);

--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);

--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);

--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_stockist_cities_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_stockist_cities_fk FOREIGN KEY (stockist_cities_id) REFERENCES public.stockist_cities(id) ON DELETE CASCADE;

--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;

--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;

--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;

--
-- Name: posts posts_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;

--
-- Name: posts posts_featured_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_featured_image_id_media_id_fk FOREIGN KEY (featured_image_id) REFERENCES public.media(id) ON DELETE SET NULL;

--
-- Name: posts_locales posts_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_locales
    ADD CONSTRAINT posts_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.posts(id) ON DELETE CASCADE;

--
-- Name: posts_rels posts_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;

--
-- Name: posts_rels posts_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.posts(id) ON DELETE CASCADE;

--
-- Name: products products_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;

--
-- Name: products products_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;

--
-- Name: products_locales products_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales
    ADD CONSTRAINT products_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;

--
-- Name: products_specs products_specs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_specs
    ADD CONSTRAINT products_specs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;

--
-- Name: products_texts products_texts_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_texts
    ADD CONSTRAINT products_texts_parent_fk FOREIGN KEY (parent_id) REFERENCES public.products(id) ON DELETE CASCADE;

--
-- Name: stockist_cities_locales stockist_cities_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_locales
    ADD CONSTRAINT stockist_cities_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.stockist_cities(id) ON DELETE CASCADE;

--
-- Name: stockist_cities_points stockist_cities_points_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_points
    ADD CONSTRAINT stockist_cities_points_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.stockist_cities(id) ON DELETE CASCADE;

--
-- Name: stockist_cities_texts stockist_cities_texts_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stockist_cities_texts
    ADD CONSTRAINT stockist_cities_texts_parent_fk FOREIGN KEY (parent_id) REFERENCES public.stockist_cities(id) ON DELETE CASCADE;

--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;

--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;

--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);

--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);

--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);

--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);
` 

const RLS = `
ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."media" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."payload_kv" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."payload_locked_documents" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."payload_locked_documents_rels" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."payload_migrations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."payload_preferences" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."payload_preferences_rels" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."posts_locales" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."posts_rels" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products_locales" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products_specs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products_texts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."stockist_cities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."stockist_cities_locales" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."stockist_cities_points" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."stockist_cities_texts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."users_sessions" ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  EXECUTE 'REVOKE EXECUTE ON FUNCTION "public"."rls_auto_enable" FROM PUBLIC';
EXCEPTION WHEN undefined_function OR undefined_table THEN NULL;
END $$;
`

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const existing = await db.execute(sql`SELECT to_regclass('public.products') IS NOT NULL AS present`)
  const present = Boolean((existing.rows[0] as { present?: boolean } | undefined)?.present)
  if (present) {
    payload.logger.info({ msg: 'baseline: schema sudah ada — skip DDL, tegakkan RLS' })
  } else {
    payload.logger.info({ msg: 'baseline: membangun schema penuh dari DB kosong' })
    await db.execute(sql.raw(DDL))
  }
  await db.execute(sql.raw(RLS))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw('DROP SCHEMA "public" CASCADE;\nCREATE SCHEMA "public";'))
}
