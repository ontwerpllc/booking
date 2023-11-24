create table "public"."profile" (
    "id" uuid not null,
    "first_name" character varying not null,
    "last_name" character varying not null,
    "avatar_url" character varying,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."profile" enable row level security;

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

create policy "rls_profile_select_public"
  on "profile" for select
  using ( true );

create policy "rls_profile_insert_own"
  on "profile" for insert
  with check ( auth.uid() = id );

create policy "rls_profile_update_own"
  on "profile" for update
  using ( auth.uid() = id );