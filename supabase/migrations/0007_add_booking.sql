create table "public"."booking" (
    "user_id" uuid not null,
    "guest_metadata" jsonb,
    "organization_id" bigint not null,
    "member_id" uuid not null,
    "date" date not null,
    "time" time with time zone not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."booking" enable row level security;

CREATE INDEX booking_date_idx ON public.booking USING btree (date);

CREATE INDEX booking_member_id_idx ON public.booking USING btree (member_id);

CREATE INDEX booking_organization_id_idx ON public.booking USING btree (organization_id);

CREATE UNIQUE INDEX booking_pkey ON public.booking USING btree (organization_id, member_id, date, "time");

CREATE INDEX booking_user_id_idx ON public.booking USING btree (user_id);

alter table "public"."booking" add constraint "booking_pkey" PRIMARY KEY using index "booking_pkey";

alter table "public"."booking" add constraint "booking_member_id_fkey" FOREIGN KEY (member_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booking" validate constraint "booking_member_id_fkey";

alter table "public"."booking" add constraint "booking_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organization(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booking" validate constraint "booking_organization_id_fkey";

alter table "public"."booking" add constraint "booking_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."booking" validate constraint "booking_user_id_fkey";