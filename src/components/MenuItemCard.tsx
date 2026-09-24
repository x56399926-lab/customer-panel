import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart, type CartAddon } from "@/lib/cart";
import { parseAddons, type MenuItem } from "@/lib/data";
import { resolveImage } from "@/lib/images";
import { rupees } from "@/lib/format";

export function VegMark({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      title={isVeg ? "Veg" : "Non-veg"}
      className={`grid size-4 place-items-center rounded-[3px] border ${
        isVeg ? "border-success" : "border-destructive"
      }`}
    >
      <span
        className={`size-2 rounded-full ${isVeg ? "bg-success" : "bg-destructive"}`}
        aria-hidden
      />
      <span className="sr-only">{isVeg ? "Vegetarian" : "Non-vegetarian"}</span>
    </span>
  );
}

export function MenuItemCard({ item, ordersEnabled }: { item: MenuItem; ordersEnabled: boolean }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<CartAddon[]>([]);
  const addons = parseAddons(item.addons);

  const toggleAddon = (addon: CartAddon, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, addon] : prev.filter((a) => a.name !== addon.name),
    );
  };

  const add = () => {
    cart.addLine({
      menuItemId: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: qty,
      imageKey: item.image_key,
      imageUrl: item.image_url,
      isVeg: item.is_veg,
      addons: selected,
      notes: "",
    });
    toast.success(`${item.name} added to cart`);
    setQty(1);
    setSelected([]);
  };

  return (
    <article className="glass animate-float-up flex flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={resolveImage(item.image_key, item.image_url)}
          alt={item.name}
          loading="lazy"
          width={816}
          height={816}
          className="h-44 w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {item.is_popular && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              Popular
            </span>
          )}
          {item.is_recommended && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
              Chef's pick
            </span>
          )}
        </div>
        {!item.is_available && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
            <span className="rounded-full border border-border px-3 py-1 text-sm font-medium">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight">{item.name}</h3>
          <VegMark isVeg={item.is_veg} />
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

        {addons.length > 0 && item.is_available && (
          <div className="space-y-1.5 pt-1">
            {addons.map((addon) => (
              <label key={addon.name} className="flex items-center gap-2 text-xs">
                <Checkbox
                  checked={selected.some((a) => a.name === addon.name)}
                  onCheckedChange={(v) => toggleAddon(addon, Boolean(v))}
                />
                <span>
                  {addon.name} (+{rupees(addon.price)})
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="font-display text-xl text-primary">{rupees(Number(item.price))}</span>
          {item.is_available && ordersEnabled ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full border border-border">
                <button
                  className="grid size-8 place-items-center rounded-full hover:bg-muted"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-5 text-center text-sm">{qty}</span>
                <button
                  className="grid size-8 place-items-center rounded-full hover:bg-muted"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(30, q + 1))}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <Button size="sm" className="rounded-full" onClick={add}>
                Add
              </Button>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">
              {item.is_available ? "Kitchen closed" : "Unavailable"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
