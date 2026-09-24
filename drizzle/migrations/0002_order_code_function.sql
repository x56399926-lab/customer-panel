create or replace function public.next_order_code()
returns text language sql volatile security definer set search_path = public as $$
  select 'ORD' || nextval('public.order_code_seq')::text
$$;
revoke all on function public.next_order_code() from public, anon, authenticated;
grant execute on function public.next_order_code() to service_role;