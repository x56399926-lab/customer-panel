import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { useSettings } from "@/lib/data";
import { resolveImage } from "@/lib/images";
import { rupees } from "@/lib/format";

export function CartSheet() {
  const cart = useCart();
  const { data: settings } = useSettings();
  const deliveryCharge = Number(settings?.delivery_charge ?? 0);
  const minOrder = Number(settings?.min_order_amount ?? 0);
  const belowMin = cart.subtotal > 0 && cart.subtotal < minOrder;

  return (
    <Sheet open={cart.isOpen} onOpenChange={cart.setOpen}>
      <SheetContent className="glass-strong flex w-full flex-col gap-0 border-l p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-5 py-4">
          <SheetTitle className="font-display text-xl">Your cart</SheetTitle>
        </SheetHeader>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty. Add something delicious.</p>
            <Button onClick={() => cart.setOpen(false)} asChild>
              <Link to="/menu">Browse menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {cart.lines.map((line) => {
                const unit = line.price + line.addons.reduce((s, a) => s + a.price, 0);
                return (
                  <div key={line.key} className="glass rounded-2xl p-3">
                    <div className="flex gap-3">
                      <img
                        src={resolveImage(line.imageKey, line.imageUrl)}
                        alt={line.name}
                        loading="lazy"
                        width={80}
                        height={80}
                        className="size-16 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-medium">{line.name}</p>
                          <button
                            onClick={() => cart.removeLine(line.key)}
                            aria-label={`Remove ${line.name}`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        {line.addons.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {line.addons.map((a) => a.name).join(", ")}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-border px-1">
                            <button
                              className="grid size-7 place-items-center rounded-full hover:bg-muted"
                              aria-label="Decrease quantity"
                              onClick={() => cart.setQuantity(line.key, line.quantity - 1)}
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm">{line.quantity}</span>
                            <button
                              className="grid size-7 place-items-center rounded-full hover:bg-muted"
                              aria-label="Increase quantity"
                              onClick={() => cart.setQuantity(line.key, line.quantity + 1)}
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-medium text-primary">
                            {rupees(unit * line.quantity)}
                          </span>
                        </div>
                        <Input
                          value={line.notes}
                          maxLength={200}
                          onChange={(e) => cart.setNotes(line.key, e.target.value)}
                          placeholder="Special instructions (optional)"
                          className="mt-2 h-8 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 border-t border-border/60 px-5 py-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{rupees(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>{rupees(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-primary">{rupees(cart.subtotal + deliveryCharge)}</span>
              </div>
              {belowMin && (
                <p className="text-xs text-destructive">
                  Minimum order is {rupees(minOrder)}. Add {rupees(minOrder - cart.subtotal)} more.
                </p>
              )}
              <Button
                className="glow-primary w-full"
                size="lg"
                disabled={belowMin}
                onClick={() => cart.setOpen(false)}
                asChild={!belowMin}
              >
                {belowMin ? <span>Proceed to checkout</span> : <Link to="/checkout">Proceed to checkout</Link>}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
