import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// Pages render to static HTML at build time, so the first paint waits for CSS,
// not JavaScript. Stylesheets stay external so their download is measurable.
export default defineConfig({
  integrations: [react()],
  build: { inlineStylesheets: "never" },
  vite: { plugins: [tailwindcss()] },
})
