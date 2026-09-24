import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartAddon = { name: string; price: number };

export type CartLine = {
  key: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  imageKey: string | null;
  imageUrl: string | null;
  isVeg: boolean;
  addons: CartAddon[];
  notes: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addLine: (line: Omit<CartLine, "key">) => void;
  setQuantity: (key: string, quantity: number) => void;
  setNotes: (key: string, notes: string) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "rrc-cart-v1";

function lineKey(menuItemId: string, addons: CartAddon[]) {
  return `${menuItemId}::${addons
    .map((a) => a.name)
    .sort()
    .join("|")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce(
      (sum, l) => sum + (l.price + l.addons.reduce((a, x) => a + x.price, 0)) * l.quantity,
      0,
    );
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      isOpen,
      setOpen,
      addLine: (line) =>
        setLines((prev) => {
          const key = lineKey(line.menuItemId, line.addons);
          const existing = prev.find((l) => l.key === key);
          if (existing) {
            return prev.map((l) =>
              l.key === key ? { ...l, quantity: l.quantity + line.quantity } : l,
            );
          }
          return [...prev, { ...line, key }];
        }),
      setQuantity: (key, quantity) =>
        setLines((prev) =>
          quantity <= 0
            ? prev.filter((l) => l.key !== key)
            : prev.map((l) => (l.key === key ? { ...l, quantity } : l)),
        ),
      setNotes: (key, notes) =>
        setLines((prev) => prev.map((l) => (l.key === key ? { ...l, notes } : l))),
      removeLine: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      clear: () => setLines([]),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
