-- ============================================================================
-- schema.sql — run once in Supabase dashboard → SQL Editor.
-- Creates the shelves/items tables, locks writes to admins, sets up the image
-- and sets up the image bucket.
--
-- After running: add yourself as admin (email is kept out of the repo):
--   insert into public.admins (email) values ('you@example.com');
-- ============================================================================

-- ---- tables ----------------------------------------------------------------
create table public.shelves (
  id        uuid primary key default gen_random_uuid(),
  title     text not null,
  subtitle  text,
  icon      text,               -- Tabler icon name, e.g. "ti-bulb"
  position  int  not null default 0
);

create table public.items (
  id         uuid primary key default gen_random_uuid(),
  shelf_id   uuid not null references public.shelves (id) on delete cascade,
  title      text not null,
  url        text not null,
  source     text,
  image      text,              -- "/images/x.webp" (bundled) or full storage URL
  badge      text,
  affiliate  boolean not null default true,
  position   int  not null default 0,
  created_at timestamptz not null default now()
);

create index items_shelf_position on public.items (shelf_id, position);

-- who may write. not readable by the public.
create table public.admins (
  email text primary key
);

-- security definer so policies can check admins without exposing the table.
-- lives in a non-API schema so it can't be called via /rest/v1/rpc.
create schema if not exists private;
grant usage on schema private to anon, authenticated;

create function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where email = (select auth.jwt() ->> 'email'));
$$;
revoke execute on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

-- ---- row level security ----------------------------------------------------
alter table public.shelves enable row level security;
alter table public.items   enable row level security;
alter table public.admins  enable row level security;  -- no policies = locked

create policy "public read shelves" on public.shelves for select using (true);
create policy "admin insert shelves" on public.shelves for insert to authenticated with check ((select private.is_admin()));
create policy "admin update shelves" on public.shelves for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admin delete shelves" on public.shelves for delete to authenticated using ((select private.is_admin()));

create policy "public read items" on public.items for select using (true);
create policy "admin insert items" on public.items for insert to authenticated with check ((select private.is_admin()));
create policy "admin update items" on public.items for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "admin delete items" on public.items for delete to authenticated using ((select private.is_admin()));

-- ---- image storage ---------------------------------------------------------
-- 5 MB cap; the admin page uploads ~50KB WebPs, so this only stops abuse
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880,
        array['image/webp', 'image/jpeg', 'image/png']);

create policy "admin upload images" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and (select private.is_admin()));
create policy "admin update images" on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and (select private.is_admin()));
create policy "admin delete images" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and (select private.is_admin()));
