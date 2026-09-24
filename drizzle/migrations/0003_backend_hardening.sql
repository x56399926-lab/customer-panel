-- Radhe Radhe backend hardening / repair migration
-- Run this AFTER 0000, 0001 and 0002 on the existing Supabase project.

-- Prevent anonymous callers from probing arbitrary user roles.
revoke all on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

-- Useful indexes for admin order dashboard, customer history and notifications.
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists order_items_order_id_idx on public.order_items (order_id);
create index if not exists order_status_history_order_id_created_at_idx
  on public.order_status_history (order_id, created_at);
create index if not exists notifications_created_at_idx on public.notifications (created_at desc);
create index if not exists notifications_unread_idx on public.notifications (is_read, created_at desc);

-- Keep restaurant_settings.updated_at accurate.
create or replace function public.touch_restaurant_settings()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists restaurant_settings_touch on public.restaurant_settings;
create trigger restaurant_settings_touch
before update on public.restaurant_settings
for each row execute function public.touch_restaurant_settings();

-- Ensure realtime can deliver the fields needed by the admin dashboard.
alter table public.orders replica identity full;
alter table public.notifications replica identity full;

-- Re-assert the intended grants used by the two applications.
grant select on public.menu_categories to anon, authenticated;
grant select on public.menu_items to anon, authenticated;
grant select on public.restaurant_settings to anon, authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
grant select on public.order_status_history to authenticated;
grant select, update on public.notifications to authenticated;
