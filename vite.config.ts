import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // TanStack Start also uses Vite's base as the router basepath.
  base: "/biosynex-atlas-viewer-clone/",
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      prerender: { enabled: true, crawlLinks: true },
      pages: [{ path: "/", prerender: { enabled: true } }],
    }),
    react(),
    tailwindcss(),
  ],
  resolve: { tsconfigPaths: true },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".app.github.dev", ".e2b.app"],
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: [".app.github.dev", ".e2b.app"],
  },
});
