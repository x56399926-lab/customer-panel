# Radhe Radhe Cafe — Online Ordering Website

A complete, mobile-first ordering site with a glassmorphism look: customers browse the menu, order, and track status; the owner gets instant new-order alerts and manages everything from an admin dashboard.

Contact details used across the site: Radhe Radhe Cafe, +91 8097799506, dheerajgupta80977@gmail.com. Admin owner account: nankur660@gmail.com.

## What the customer sees

- **Home** — logo, hero with food imagery, "Order Now" and "View Menu" buttons, short intro, popular dishes, category tiles, reviews, opening hours, contact/location, footer. A "Currently Closed" banner appears when the cafe is marked closed, and ordering is disabled.
- **Menu** — 40+ dishes across Starters, Main Course, Rice, Biryani, Chinese, Snacks, Beverages, Desserts and Specials. Each card shows photo, name, description, price, veg/non-veg mark, add-ons, quantity and Add to Cart. Search plus category filter; unavailable dishes show "Currently Unavailable".
- **Cart** — sticky cart button on mobile, quantity changes, remove, per-item notes, subtotal, delivery charge, total. Cart survives page navigation and refresh.
- **Checkout** — name, mobile, address, landmark, instructions, payment method (Cash on Delivery or UPI, with UPI built so a real gateway can be switched on later), full order summary, then Place Order. Minimum order amount enforced.
- **Confirmation** — order ID like ORD1024, items, total, customer details, estimated delivery time, current status.
- **Track order** — enter an order ID (or open from account) to see a visual timeline: Received → Preparing → Ready → Out for Delivery → Delivered, with the current step highlighted. Updates live.
- **Accounts** — customer signup/login/logout, with current and past orders. Guests can still order with just name and phone.

## What the owner sees

- **Secure admin login**, owner-only. Nobody else can reach admin pages.
- **Dashboard** — counts for new, pending, preparing, ready, out for delivery, completed and cancelled orders, plus today's orders, today's sales and total revenue.
- **Live new-order alerts** — new orders appear instantly without refreshing, with a sound, an on-screen alert card and a browser notification when permitted. The alert shows order ID, customer, items, total, address, payment method and time. Duplicate alerts are prevented.
- **Order management** — accept, reject, and move an order through each status; every change is saved and the customer sees it.
- **Order history** — full list with search and filters by date, status, payment method, customer and order ID.
- **Menu management** — add, edit, delete dishes; change price, photo, description, category; mark available/unavailable, popular, recommended; manage add-ons.
- **Settings** — restaurant name, logo, description, phone, WhatsApp, address, opening hours, delivery charge, minimum order, estimated delivery time, and an open/closed switch.

## Design

Glassmorphism throughout: frosted translucent cards over warm, rich food photography, soft blurred glows, rounded shapes, smooth hover and entrance animations, sticky navigation, and clear large tap targets. A warm saffron/amber and deep charcoal palette with a distinctive display typeface for headings. Mobile-first, scaling cleanly to tablet and desktop.

Food photos are AI-generated: a hero image, category images, and an appetizing photo for every dish.

## Technical notes

- Backend on Lovable Cloud: tables for profiles, menu_categories, menu_items, item_options, orders, order_items, order_status_history, restaurant_settings and notifications, each with grants and row-level security so customers only ever see their own orders and only the owner role can manage menu, orders and settings. Roles live in a separate user_roles table with a security-definer check.
- Orders are created through a server function that generates the order ID, re-prices every line from the database (client prices are never trusted), checks availability, minimum order and open/closed status, and writes order plus items in one transaction so concurrent orders can't collide or duplicate.
- Live updates use Cloud realtime subscriptions on orders for both the admin dashboard and the customer tracking page; notification rows are keyed per order so an alert never fires twice.
- Email and password login is enabled; the owner account is granted the admin role. Optional email alerts to the owner and a WhatsApp/SMS hook are stubbed behind a single notification dispatcher so they can be switched on later.
- Note: the brief mentions a single HTML file, but the requested database, logins, admin panel and realtime alerts can't run from one static file. This builds the same product as a proper app on Lovable Cloud.
