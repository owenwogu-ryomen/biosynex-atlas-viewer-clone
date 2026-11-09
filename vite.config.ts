// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    // Static-site generation for GitHub Pages: prerender every route to plain HTML.
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages: [{ path: "/", prerender: { enabled: true } }],
  },
  // Base path for this repository's GitHub Pages deployment. TanStack Start
  // derives its router basepath from this value, so app links share the prefix.
  vite: {
    base: "/biosynex-atlas-viewer-clone/",
  },
  // No server runtime on GitHub Pages — Start's prerendered output is the deployable site.
  nitro: false,
});
