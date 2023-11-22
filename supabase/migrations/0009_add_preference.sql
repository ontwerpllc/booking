create table "public"."preference" (
    "id" uuid not null,
    "active_organization_id" bigint,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."preference" enable row level security;

CREATE UNIQUE INDEX preference_pkey ON public.preference USING btree (id);

alter table "public"."preference" add constraint "preference_pkey" PRIMARY KEY using index "preference_pkey";

alter table "public"."preference" add constraint "preference_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."preference" validate constraint "preference_id_fkey";

alter table "public"."preference" add constraint "preference_organization_id_fkey" FOREIGN KEY (active_organization_id) REFERENCES organization(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;      

alter table "public"."preference" validate constraint "preference_organization_id_fkey";

create policy "rls_preference_select_own"
  on "preference" for select
  using ( auth.uid() = id );

create policy "rls_preference_insert_own"
  on "preference" for insert
  with check ( auth.uid() = id );

create policy "rls_preference_update_own"
  on "preference" for update
  using ( auth.uid() = id );