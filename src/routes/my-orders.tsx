import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/useAuth";
import { STATUS_LABELS, formatDateTime, rupees } from "@/lib/format";

export const Route = createFileRoute("/my-orders")({
  head: () => ({
    meta: [
      { title: "My orders — Radhe Radhe Cafe" },
      { name: "description", content: "Your current and past orders from Radhe Radhe Cafe." },
      { property: "og:title", content: "My orders — Radhe Radhe Cafe" },
      { property: "og:description", content: "Your current and past orders." },
    ],
  }),
  component: MyOrdersPage,
});

function MyOrdersPage() {
  const { user, loading } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl">My orders</h1>

        {loading && <Skeleton className="mt-6 h-40 rounded-3xl" />}

        {!loading && !user && (
          <div className="glass mt-6 rounded-3xl p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Sign in to see your order history, or track a single order with its ID.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button className="rounded-full" asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button variant="secondary" className="rounded-full" asChild>
                <Link to="/track">Track an order</Link>
              </Button>
            </div>
          </div>
        )}

        {user && isLoading && <Skeleton className="mt-6 h-40 rounded-3xl" />}

        {user && !isLoading && (orders ?? []).length === 0 && (
          <div className="glass mt-6 rounded-3xl p-8 text-center">
            <p className="text-sm text-muted-foreground">You haven't ordered yet.</p>
            <Button className="mt-5 rounded-full" asChild>
              <Link to="/menu">Browse the menu</Link>
            </Button>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {(orders ?? []).map((o) => (
            <Link
              key={o.id}
              to="/order/$code"
              params={{ code: o.order_code }}
              className="glass flex items-center justify-between gap-4 rounded-3xl p-5 transition-transform hover:-translate-y-0.5"
            >
              <div>
                <p className="font-display text-lg">{o.order_code}</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(o.created_at)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary">{STATUS_LABELS[o.status]}</p>
                <p className="text-sm">{rupees(Number(o.total))}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
