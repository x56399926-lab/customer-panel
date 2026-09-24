import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartSheet } from "@/components/CartSheet";
import { useCart } from "@/lib/cart";
import { useSettings } from "@/lib/data";
import { rupees } from "@/lib/format";

export function PublicLayout({ children }: { children: ReactNode }) {
  const cart = useCart();
  const { data: settings } = useSettings();

  return (
    <div className="flex min-h-screen flex-col">
      {settings?.is_open === false && (
        <div className="bg-destructive px-4 py-2 text-center text-sm font-medium text-destructive-foreground">
          Currently Closed — we reopen at {settings.opening_time}. You can still browse the menu.
        </div>
      )}
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartSheet />

      {cart.count > 0 && (
        <button
          onClick={() => cart.setOpen(true)}
          className="glass-strong glow-primary fixed bottom-5 left-1/2 z-40 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-between rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-xl md:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingBag className="size-4" />
            {cart.count} item{cart.count > 1 ? "s" : ""}
          </span>
          <span className="text-sm font-semibold">{rupees(cart.subtotal)} · View cart</span>
        </button>
      )}
    </div>
  );
}
