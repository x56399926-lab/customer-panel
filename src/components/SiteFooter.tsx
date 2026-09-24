import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSettings } from "@/lib/data";

export function SiteFooter() {
  const { data: settings } = useSettings();

  return (
    <footer className="mt-20 border-t border-border/60 glass">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl">{settings?.name ?? "Radhe Radhe Cafe"}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {settings?.description ??
              "Home-style Indian comfort food, cooked fresh and delivered hot."}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/menu" className="hover:text-primary">
                Full menu
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-primary">
                Track your order
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-primary">
                My orders
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-primary">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <a href={`tel:${settings?.phone ?? "+918097799506"}`}>
                {settings?.phone ?? "+91 8097799506"}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <a href={`mailto:${settings?.email ?? "dheerajgupta80977@gmail.com"}`}>
                {settings?.email ?? "dheerajgupta80977@gmail.com"}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-primary" />
              <span>{settings?.address ?? "Mumbai"}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Hours
          </h4>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 text-primary" />
            Daily {settings?.opening_time ?? "10:00"} – {settings?.closing_time ?? "23:00"}
          </p>
          <p className="mt-2 text-sm">
            {settings?.is_open === false ? (
              <span className="text-destructive">Currently Closed</span>
            ) : (
              <span className="text-success">Open now · taking orders</span>
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {settings?.name ?? "Radhe Radhe Cafe"}. All rights reserved.
      </div>
    </footer>
  );
}
