import { defineConfig } from "vite-plus"

// Preserve module boundaries for component imports and React Server Components.
export default defineConfig({
  pack: {
    entry: [
      "src/components/parts/*.tsx",
      "src/components/primitives/**/*.ts",
      "src/components/primitives/**/*.tsx",
      "src/hooks/*.ts",
      "src/lib/*.ts",
    ],
    root: "src",
    outDir: "dist",
    format: "esm",
    platform: "neutral",
    target: "es2022",
    unbundle: true,
    // TypeScript emits declarations separately to preserve public namespaces.
    dts: false,
    clean: true,
    report: false,
    checks: { moduleLevelDirective: false },
    copy: [
      { from: "src/styles.css", to: "dist" },
      { from: "src/theme.css", to: "dist" },
      { from: "src/styles/utilities.css", to: "dist/styles" },
    ],
  },
})
