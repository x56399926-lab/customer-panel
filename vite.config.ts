// Lovable provides the core TanStack Start/Vite plugins.
// Netlify provides the deployment adapter for SSR/server functions.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  // The Lovable wrapper includes Nitro by default for its own runtime.
  // Disable it here so Netlify's official TanStack Start adapter owns the
  // production server output instead of generating Cloudflare output.
  nitro: false,

  tanstackStart: {
    server: { entry: "server" },
  },

  vite: {
    plugins: [netlify()],
  },
});
