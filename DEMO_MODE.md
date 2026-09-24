# Frontend-only demo mode

This build intentionally does not connect to Supabase. Menu, settings, auth and orders use browser localStorage with seeded demo data. No secret key or backend environment variable is required.

Customer demo login accepts any email/password. Admin demo login accepts any email containing `admin` (for example `admin@demo.local`) with any password.
