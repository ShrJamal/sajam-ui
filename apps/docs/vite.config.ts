import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite-plus"

// Build the public documentation and its static HTML renderer.
export default defineConfig(function ({ command }) {
  const source = fileURLToPath(new URL("../../packages/ui/src", import.meta.url))
  return {
    // Use source during editing and the published exports for production builds.
    resolve:
      command === "serve"
        ? {
            alias: [
              { find: "@sajam/ui/styles.css", replacement: `${source}/styles.css` },
              { find: "@sajam/ui/utils", replacement: `${source}/lib/utils.ts` },
              { find: "@sajam/ui/hooks/use-mobile", replacement: `${source}/hooks/use-mobile.ts` },
              { find: /^@sajam\/ui\/(.+)$/, replacement: `${source}/components/ui/$1.tsx` },
              { find: "@sajam/ui", replacement: `${source}/index.ts` },
            ],
          }
        : undefined,
    // The React plugin adds Fast Refresh, so edits keep component state in development.
    plugins: [react(), tailwindcss()],
    server: { port: 3012 },
    build: { rolldownOptions: { checks: { moduleLevelDirective: false } } },
  }
})
