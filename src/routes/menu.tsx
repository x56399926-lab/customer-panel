import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { PublicLayout } from "@/components/PublicLayout";
import { MenuItemCard } from "@/components/MenuItemCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories, useMenuItems, useSettings } from "@/lib/data";

const searchSchema = z.object({
  category: z.string().optional(),
  veg: z.boolean().optional(),
});

export const Route = createFileRoute("/menu")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Menu — Radhe Radhe Cafe" },
      {
        name: "description",
        content:
          "Browse 45+ dishes at Radhe Radhe Cafe: starters, curries, biryani, Chinese, snacks, beverages and desserts.",
      },
      { property: "og:title", content: "Menu — Radhe Radhe Cafe" },
      {
        property: "og:description",
        content: "Starters, curries, biryani, Chinese, snacks, beverages and desserts.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const { data: categories, isLoading: catLoading } = useCategories();
  const { data: items, isLoading: itemsLoading } = useMenuItems();
  const { data: settings } = useSettings();
  const ordersEnabled = settings?.is_open !== false;

  const activeCategoryId = useMemo(
    () => (categories ?? []).find((c) => c.slug === category)?.id ?? null,
    [categories, category],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? []).filter((i) => {
      if (activeCategoryId && i.category_id !== activeCategoryId) return false;
      if (vegOnly && !i.is_veg) return false;
      if (q && !`${i.name} ${i.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [items, activeCategoryId, vegOnly, query]);

  const grouped = useMemo(() => {
    return (categories ?? [])
      .map((c) => ({ category: c, items: filtered.filter((i) => i.category_id === c.id) }))
      .filter((g) => g.items.length > 0);
  }, [categories, filtered]);

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl">Our menu</h1>
        <p className="mt-2 text-muted-foreground">
          Freshly cooked to order. Tap a dish to add it to your cart.
        </p>

        <div className="sticky top-16 z-30 -mx-4 mt-6 space-y-3 bg-background/70 px-4 py-3 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for biryani, paneer, noodles…"
              className="h-11 rounded-full pl-9"
              maxLength={60}
            />
          </div>

          <div id="categories" className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => navigate({ search: {} })}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                !category ? "bg-primary text-primary-foreground" : "glass"
              }`}
            >
              All
            </button>
            {(categories ?? []).map((c) => (
              <button
                key={c.id}
                onClick={() => navigate({ search: { category: c.slug } })}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                  category === c.slug ? "bg-primary text-primary-foreground" : "glass"
                }`}
              >
                {c.name}
              </button>
            ))}
            <button
              onClick={() => setVegOnly((v) => !v)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                vegOnly ? "bg-success text-success-foreground" : "glass"
              }`}
            >
              Veg only
            </button>
          </div>
        </div>

        {(catLoading || itemsLoading) && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-3xl" />
            ))}
          </div>
        )}

        {!itemsLoading && grouped.length === 0 && (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <p className="text-muted-foreground">
              No dishes match your search. Try a different word or category.
            </p>
          </div>
        )}

        {grouped.map((group) => (
          <section key={group.category.id} className="mt-10">
            <h2 className="text-2xl">{group.category.name}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <MenuItemCard key={item.id} item={item} ordersEnabled={ordersEnabled} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PublicLayout>
  );
}
