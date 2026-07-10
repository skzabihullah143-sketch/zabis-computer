-- ==========================================================
-- ZABIS COMPUTER — Initial schema
-- Run this in the Supabase SQL editor, or via `supabase db push`
-- ==========================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------
-- applications table
-- ----------------------------------------------------------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  address text not null,
  service text not null,
  sub_service text,
  notes text,
  status text not null default 'Pending' check (status in ('Pending', 'Processing', 'Completed', 'Delivered')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_mobile_idx on public.applications (mobile);
create index if not exists applications_status_idx on public.applications (status);
create index if not exists applications_created_at_idx on public.applications (created_at desc);

-- keep updated_at current on every row change
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

-- ----------------------------------------------------------
-- admin_users table — links a Supabase Auth user to admin status
-- ----------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  created_at timestamptz not null default now()
);

-- helper used inside RLS policies
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$;

-- ----------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------
alter table public.applications enable row level security;
alter table public.admin_users enable row level security;

-- Anyone (including anonymous visitors) can submit a new application.
drop policy if exists "public can insert applications" on public.applications;
create policy "public can insert applications"
on public.applications
for insert
to anon, authenticated
with check (true);

-- Only signed-in admins can read the full applications table directly.
-- Anonymous "Track Application" lookups go through the security-definer
-- RPC below instead, so anon never gets a blanket SELECT policy.
drop policy if exists "admins can select all applications" on public.applications;
create policy "admins can select all applications"
on public.applications
for select
to authenticated
using (public.is_admin());

-- Only signed-in admins can update applications (e.g. change status).
drop policy if exists "admins can update applications" on public.applications;
create policy "admins can update applications"
on public.applications
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Only signed-in admins can delete applications.
drop policy if exists "admins can delete applications" on public.applications;
create policy "admins can delete applications"
on public.applications
for delete
to authenticated
using (public.is_admin());

-- admin_users is only readable/manageable by admins themselves.
drop policy if exists "admins can view admin_users" on public.admin_users;
create policy "admins can view admin_users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

-- ----------------------------------------------------------
-- RPC: track_application_by_mobile
-- Lets anonymous visitors look up applications by mobile number
-- WITHOUT granting a blanket SELECT policy on the table.
-- ----------------------------------------------------------
create or replace function public.track_application_by_mobile(p_mobile text)
returns setof public.applications
language sql
stable
security definer
set search_path = public
as $$
  select *
  from public.applications
  where mobile = p_mobile
  order by created_at desc;
$$;

revoke all on function public.track_application_by_mobile(text) from public;
grant execute on function public.track_application_by_mobile(text) to anon, authenticated;

-- ==========================================================
-- Creating the first admin account
-- ==========================================================
-- 1. In the Supabase Dashboard, go to Authentication > Users > Add user.
--    Email:    6290454940@zabiscomputer.local   (synthetic — never shown to end users)
--    Password: Admin@123
-- 2. Copy the new user's UUID, then run:
--
--    insert into public.admin_users (id, username)
--    values ('<paste-user-uuid-here>', '6290454940');
--
-- The app's Admin Login screen only ever shows "Username" and
-- "Password" fields — it converts the username to the synthetic
-- email above internally before calling Supabase Auth.
-- ==========================================================
