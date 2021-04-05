alter table "public"."users" add constraint "valid_email" check (CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text));
