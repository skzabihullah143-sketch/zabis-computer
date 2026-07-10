# ZABIS COMPUTER

A production-ready website for **ZABIS COMPUTER**, an Indian Government & Online Service Center — Aadhaar, PAN, Passport, Voter ID, Ration Card, Trade License, UDYAM, Annapurna Bhandar, Yubasakti and more.

Built with React 18 + Vite + TypeScript + Tailwind CSS + shadcn-style UI + React Router, backed by Supabase (PostgreSQL + Auth + RLS).

## 1. Install

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy your **Project URL** and **anon public key**.
3. Copy `.env.example` to `.env` and fill in the values:

   ```bash
   cp .env.example .env
   ```

4. In the Supabase Dashboard, go to **Authentication → Providers → Email** and **turn off "Confirm email"** (the admin sign-in below relies on there being no email-confirmation / OTP step).
5. Open the **SQL Editor** and run the migration in `supabase/migrations/0001_init.sql`. This creates:
   - `applications` table (with `id`, `name`, `mobile`, `address`, `service`, `sub_service`, `notes`, `status`, `created_at`, `updated_at`)
   - `admin_users` table
   - Row Level Security policies (anonymous users can only INSERT; only authenticated admins can SELECT all / UPDATE / DELETE)
   - A `track_application_by_mobile(p_mobile text)` RPC so customers can look up their own application by mobile number without any broad SELECT access being granted to anonymous users

## 3. Create the admin account

The site's Admin Login screen only ever shows **Username** and **Password** — no email, no OTP. Under the hood it signs in to Supabase Auth using a synthetic email (`<username>@zabiscomputer.local`), so real security (Supabase Auth + RLS) is preserved without exposing an email field to the user.

1. In Supabase Dashboard → **Authentication → Users → Add user**, create a user with:
   - Email: `6290454940@zabiscomputer.local`
   - Password: `Admin@123`
   - Auto Confirm User: **on**
2. Copy the new user's UUID.
3. Run this in the SQL editor:

   ```sql
   insert into public.admin_users (id, username)
   values ('<paste-user-uuid-here>', '6290454940');
   ```

You can now log in on `/admin-login` with:
- Username: `6290454940`
- Password: `Admin@123`

(Change this password from the Supabase dashboard whenever you like — the app doesn't hardcode it anywhere.)

## 4. Run locally

```bash
npm run dev
```

## 5. Deploy

**GitHub:** push this repo to GitHub as-is.

**Vercel:**
1. Import the GitHub repo into Vercel.
2. Framework preset: **Vite**.
3. Add the two environment variables from your `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings.
4. Deploy.

## Notes on the UI kit

The `src/components/ui/*` files are hand-written, Tailwind-based components styled in the shadcn/ui convention (same file layout and API shape: `Button`, `Card`, `Input`, `Textarea`, `Select`, `Label`, `Badge`, `Dialog`). If you'd like the official shadcn/ui generator output instead, run the shadcn CLI (`npx shadcn@latest init`) locally and swap these files — the rest of the app only depends on the exported component names, not the implementation.

## Security summary

- Anonymous visitors can **only INSERT** new applications (no SELECT, UPDATE, or DELETE access to the `applications` table).
- The **Track Application** page never queries the table directly — it calls the `track_application_by_mobile` RPC, a `security definer` function that returns only rows matching the mobile number provided.
- Full read/update/delete access is restricted to signed-in users listed in `admin_users`, enforced via RLS policies backed by a `public.is_admin()` helper function — not by anything client-side.
