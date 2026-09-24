-- ============ ROLES ============
create type public.app_role as enum ('admin','customer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "own profile write" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;
  if lower(new.email) = 'nankur660@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'customer') on conflict do nothing;
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- ============ MENU ============
create table public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  image_key text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.menu_categories to anon, authenticated;
grant all on public.menu_categories to service_role;
alter table public.menu_categories enable row level security;
create policy "categories public read" on public.menu_categories for select to anon, authenticated using (true);
create policy "categories admin write" on public.menu_categories for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
grant insert, update, delete on public.menu_categories to authenticated;

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  is_veg boolean not null default true,
  image_key text,
  image_url text,
  is_available boolean not null default true,
  is_popular boolean not null default false,
  is_recommended boolean not null default false,
  addons jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.menu_items to authenticated;
grant select on public.menu_items to anon;
grant all on public.menu_items to service_role;
alter table public.menu_items enable row level security;
create policy "items public read" on public.menu_items for select to anon, authenticated using (true);
create policy "items admin write" on public.menu_items for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- ============ SETTINGS ============
create table public.restaurant_settings (
  id int primary key default 1 check (id = 1),
  name text not null default 'Radhe Radhe Cafe',
  description text not null default 'Home-style Indian comfort food, cooked fresh and delivered hot.',
  logo_url text,
  phone text not null default '+91 8097799506',
  whatsapp text not null default '+91 8097799506',
  email text not null default 'dheerajgupta80977@gmail.com',
  address text not null default 'Shop 4, Main Market Road, Mumbai',
  opening_time text not null default '10:00',
  closing_time text not null default '23:00',
  delivery_charge numeric(10,2) not null default 30,
  min_order_amount numeric(10,2) not null default 149,
  estimated_delivery_minutes int not null default 40,
  is_open boolean not null default true,
  updated_at timestamptz not null default now()
);
grant select on public.restaurant_settings to anon, authenticated;
grant insert, update on public.restaurant_settings to authenticated;
grant all on public.restaurant_settings to service_role;
alter table public.restaurant_settings enable row level security;
create policy "settings public read" on public.restaurant_settings for select to anon, authenticated using (true);
create policy "settings admin write" on public.restaurant_settings for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.restaurant_settings (id) values (1);

-- ============ ORDERS ============
create type public.order_status as enum ('received','preparing','ready','out_for_delivery','delivered','cancelled');
create type public.payment_method as enum ('cod','upi');

create sequence public.order_code_seq start 1024;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  address text not null,
  landmark text,
  instructions text,
  payment_method payment_method not null default 'cod',
  status order_status not null default 'received',
  subtotal numeric(10,2) not null,
  delivery_charge numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  estimated_delivery_minutes int not null default 40,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "own orders read" on public.orders for select to authenticated using (auth.uid() = user_id);
create policy "admin orders read" on public.orders for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin orders update" on public.orders for update to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  name text not null,
  unit_price numeric(10,2) not null,
  quantity int not null check (quantity > 0),
  addons jsonb not null default '[]'::jsonb,
  notes text,
  line_total numeric(10,2) not null
);
grant select on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "own order items read" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "admin order items read" on public.order_items for select to authenticated
  using (public.has_role(auth.uid(),'admin'));

create table public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status order_status not null,
  created_at timestamptz not null default now()
);
grant select on public.order_status_history to authenticated;
grant all on public.order_status_history to service_role;
alter table public.order_status_history enable row level security;
create policy "own history read" on public.order_status_history for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "admin history read" on public.order_status_history for select to authenticated
  using (public.has_role(auth.uid(),'admin'));

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, update on public.notifications to authenticated;
grant all on public.notifications to service_role;
alter table public.notifications enable row level security;
create policy "admin notifications read" on public.notifications for select to authenticated
  using (public.has_role(auth.uid(),'admin'));
create policy "admin notifications update" on public.notifications for update to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create or replace function public.log_order_status()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.order_status_history (order_id, status) values (new.id, new.status);
    new.updated_at := now();
  end if;
  return new;
end;
$$;
create trigger orders_status_history after insert on public.orders
for each row execute function public.log_order_status();
create trigger orders_status_history_upd before update on public.orders
for each row execute function public.log_order_status();

alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.notifications;
