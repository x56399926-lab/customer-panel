import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Star, Truck, Soup } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { MenuItemCard } from "@/components/MenuItemCard";
import { Button } from "@/components/ui/button";
import { useCategories, useMenuItems, useSettings } from "@/lib/data";
import { heroImage, resolveImage } from "@/lib/images";
import { rupees } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radhe Radhe Cafe — Biryani, curries & Chinese delivered hot" },
      {
        name: "description",
        content:
          "Order from Radhe Radhe Cafe: 45+ freshly cooked Indian and Chinese dishes, live order tracking and fast home delivery.",
      },
      { property: "og:title", content: "Radhe Radhe Cafe — Order food online" },
      {
        property: "og:description",
        content: "45+ freshly cooked dishes, live order tracking and fast home delivery.",
      },
    ],
  }),
  component: Index,
});

const reviews = [
  {
    name: "Priya S.",
    text: "The chicken dum biryani is the best in the neighbourhood. Always hot and on time.",
  },
  { name: "Aman K.", text: "Ordered pav bhaji and chilli paneer at midnight. Absolutely delicious." },
  { name: "Neha R.", text: "Fresh, homely and generous portions. My weekly Sunday order now." },
];

function Index() {
  const { data: items } = useMenuItems();
  const { data: categories } = useCategories();
  const { data: settings } = useSettings();

  const popular = (items ?? []).filter((i) => i.is_popular && i.is_available).slice(0, 6);
  const ordersEnabled = settings?.is_open !== false;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Indian feast with biryani, paneer tikka and naan"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:py-32">
          <span className="glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em]">
            Fresh · Homely · Delivered hot
          </span>
          <h1 className="max-w-2xl text-4xl leading-tight sm:text-6xl">
            <span className="text-gradient-warm">{settings?.name ?? "Radhe Radhe Cafe"}</span>
            <br />
            comfort food, cooked to order.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            {settings?.description ??
              "Home-style Indian comfort food, cooked fresh and delivered hot."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="glow-primary rounded-full px-8" asChild>
              <Link to="/menu">Order Now</Link>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
              <Link to="/menu" hash="categories">
                View Menu
              </Link>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <Truck className="size-4 text-primary" />
              {settings?.estimated_delivery_minutes ?? 40} min delivery
            </span>
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <Soup className="size-4 text-primary" />
              45+ dishes
            </span>
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <Clock className="size-4 text-primary" />
              {settings?.opening_time ?? "10:00"} – {settings?.closing_time ?? "23:00"}
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl">Browse by category</h2>
        <p className="mt-2 text-muted-foreground">From tandoor starters to midnight desserts.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(categories ?? []).map((c) => (
            <Link
              key={c.id}
              to="/menu"
              search={{ category: c.slug }}
              className="glass group relative overflow-hidden rounded-3xl"
            >
              <img
                src={resolveImage(c.image_key)}
                alt={c.name}
                loading="lazy"
                width={816}
                height={816}
                className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <span className="absolute bottom-3 left-3 font-display text-lg">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl">Most loved dishes</h2>
            <p className="mt-2 text-muted-foreground">What our regulars order again and again.</p>
          </div>
          <Button variant="ghost" className="rounded-full" asChild>
            <Link to="/menu">See all</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => (
            <MenuItemCard key={item.id} item={item} ordersEnabled={ordersEnabled} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl">What our customers say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="glass rounded-3xl p-6">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{r.text}"</p>
              <p className="mt-4 text-sm font-medium">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="glass grid gap-6 rounded-3xl p-8 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 text-primary" />
            <div>
              <h3 className="text-lg">Visit us</h3>
              <p className="text-sm text-muted-foreground">{settings?.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 size-5 text-primary" />
            <div>
              <h3 className="text-lg">Call to order</h3>
              <a href={`tel:${settings?.phone}`} className="text-sm text-muted-foreground">
                {settings?.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-1 size-5 text-primary" />
            <div>
              <h3 className="text-lg">Opening hours</h3>
              <p className="text-sm text-muted-foreground">
                Every day {settings?.opening_time} – {settings?.closing_time}
              </p>
              <p className="text-sm text-muted-foreground">
                Delivery {rupees(Number(settings?.delivery_charge ?? 0))} · Min order{" "}
                {rupees(Number(settings?.min_order_amount ?? 0))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
