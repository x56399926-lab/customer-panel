export function rupees(value: number | string): string {
  const n = typeof value === "string" ? Number(value) : value;
  return `₹${(Number.isFinite(n) ? n : 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export const STATUS_FLOW = [
  "received",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
] as const;

export type OrderStatus = (typeof STATUS_FLOW)[number] | "cancelled";

export const STATUS_LABELS: Record<string, string> = {
  received: "Order Received",
  preparing: "Preparing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
