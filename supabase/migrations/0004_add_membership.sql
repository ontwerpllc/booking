create table "public"."membership" (
    "user_id" uuid not null,
    "organization_id" bigint not null,
    "role" membership_role_enum not null default 'basic_member'::membership_role_enum,
    "joined_at" timestamp with time zone not null default now()
);


alter table "public"."membership" enable row level security;

CREATE UNIQUE INDEX membership_pkey ON public.membership USING btree (user_id, organization_id);

alter table "public"."membership" add constraint "membership_pkey" PRIMARY KEY using index "membership_pkey";

alter table "public"."membership" add constraint "membership_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organization(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;      

alter table "public"."membership" validate constraint "membership_organization_id_fkey";

alter table "public"."membership" add constraint "membership_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."membership" validate constraint "membership_user_id_fkey";