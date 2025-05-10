-- insert_user.sql
insert into public.users (id, email)
select
  new.id,
  new.email_addresses[0]::json->>'email'
from
  auth.users as new
on conflict (id) do nothing;
