import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/useAuth";
import { STATUS_FLOW, STATUS_LABELS, formatDateTime, rupees } from "@/lib/format";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Radhe Radhe Cafe" },
      { name: "description", content: "Live orders, status updates and sales for Radhe Radhe Cafe." },
      { property: "og:title", content: "Admin dashboard — Radhe Radhe Cafe" },
      { property: "og:description", content: "Live orders, status updates and sales." },
    ],
  }),
  component: AdminPage,
});

function playChime() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  } catch {
    /* audio unavailable */
  }
}

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const queryClient = useQueryClient();
  const seen = useRef<Set<string>>(new Set());

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!isAdmin) return;
    if ("Notification" in window && Notification.permission === "default") {
      void Notification.requestPermission();
    }
    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          const row = payload.new as { id?: string; order_code?: string; customer_name?: string; total?: number } | null;
          void queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
          if (payload.eventType !== "INSERT" || !row?.id || seen.current.has(row.id)) return;
          seen.current.add(row.id);
          playChime();
          toast.success(`🔔 New order ${row.order_code}`, {
            description: `${row.customer_name} · ${rupees(Number(row.total ?? 0))}`,
            duration: 15000,
          });
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`🔔 New Order ${row.order_code}`, {
              body: `${row.customer_name} · ${rupees(Number(row.total ?? 0))}`,
              tag: row.id,
            });
          }
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isAdmin, queryClient]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: status as "received" })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Marked ${STATUS_LABELS[status]}`);
      void queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="glass rounded-3xl p-10">
          <h1 className="text-2xl">Restaurant staff only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with the restaurant account to manage orders.
          </p>
          <Button className="mt-6 rounded-full" asChild>
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  const list = orders ?? [];
  const today = new Date().toDateString();
  const todays = list.filter((o) => new Date(o.created_at).toDateString() === today);
  const todaySales = todays
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + Number(o.total), 0);
  const revenue = list
    .filter((o) => o.status === "delivered")
    .reduce((s, o) => s + Number(o.total), 0);

  const stats = [
    { label: "New", value: list.filter((o) => o.status === "received").length },
    { label: "Preparing", value: list.filter((o) => o.status === "preparing").length },
    { label: "Ready", value: list.filter((o) => o.status === "ready").length },
    { label: "Out for delivery", value: list.filter((o) => o.status === "out_for_delivery").length },
    { label: "Today's orders", value: todays.length },
    { label: "Today's sales", value: rupees(todaySales) },
    { label: "Total revenue", value: rupees(revenue) },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl">Kitchen dashboard</h1>
        <Button variant="secondary" className="rounded-full" asChild>
          <Link to="/">View site</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      {isLoading && <Skeleton className="h-48 rounded-3xl" />}

      {!isLoading && list.length === 0 && (
        <div className="glass rounded-3xl p-10 text-center text-sm text-muted-foreground">
          No orders yet. New orders appear here instantly with a sound alert.
        </div>
      )}

      <div className="space-y-4">
        {list.map((o) => (
          <div key={o.id} className="glass space-y-3 rounded-3xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-display text-xl">{o.order_code}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(o.created_at)} · {o.payment_method === "cod" ? "Cash on Delivery" : "UPI / Online"}
                </p>
              </div>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
                {STATUS_LABELS[o.status]}
              </span>
            </div>
            <div className="text-sm">
              <p>
                {o.customer_name} · {o.phone}
              </p>
              <p className="text-muted-foreground">
                {o.address}
                {o.landmark ? `, near ${o.landmark}` : ""}
              </p>
              {o.instructions && (
                <p className="text-muted-foreground">Note: {o.instructions}</p>
              )}
            </div>
            <ul className="text-sm text-muted-foreground">
              {o.order_items.map((it) => (
                <li key={it.id}>
                  {it.name} × {it.quantity} — {rupees(Number(it.line_total))}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-display text-lg text-primary">{rupees(Number(o.total))}</span>
              <div className="flex flex-wrap gap-2">
                {STATUS_FLOW.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={o.status === s ? "default" : "secondary"}
                    className="rounded-full"
                    onClick={() => void updateStatus(o.id, s)}
                  >
                    {STATUS_LABELS[s]}
                  </Button>
                ))}
                {o.status !== "cancelled" && o.status !== "delivered" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => void updateStatus(o.id, "cancelled")}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
