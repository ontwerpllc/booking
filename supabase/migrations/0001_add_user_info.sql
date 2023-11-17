create table "public"."user_info" (
    "id" uuid not null,
    "first_name" character varying not null,
    "last_name" character varying not null,
    "created_at" timestamp with time zone not null default now()
);

alter table "public"."user_info" enable row level security;

CREATE UNIQUE INDEX user_info_pkey ON public.user_info USING btree (id);

alter table "public"."user_info" add constraint "user_info_pkey" PRIMARY KEY using index "user_info_pkey";

alter table "public"."user_info" add constraint "user_info_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_info" validate constraint "user_info_id_fkey";