import { defineConfig } from "vite-plus"

const IGNORE_PATTERNS = [
  "**/dist/**",
  "**/.prerender/**",
  "**/.astro/**",
  "preview-dist/**",
  "**/public/**",
  "bun.lock",
]

// Share lint and formatting rules across the workspaces.
export default defineConfig({
  lint: {
    ignorePatterns: IGNORE_PATTERNS,
    plugins: ["import", "react", "react-perf", "typescript", "promise"],
    rules: { "typescript/no-explicit-any": "error", "set-state-in-effect": "off" },
    categories: {
      // correctness: "error",
    },
    env: {
      browser: true,
    },
    overrides: [
      {
        files: ["**/vite.config.ts", "**/prerender.tsx", "**/build-starters.ts"],
        env: { node: true },
      },
    ],
  },
  fmt: {
    semi: false,
    singleAttributePerLine: true,
    sortImports: {
      newlinesBetween: false,
    },
    sortTailwindcss: {
      functions: ["cn"],
    },
    ignorePatterns: IGNORE_PATTERNS,
  },
  staged: {
    "*.{ts,tsx,html,css}": "vp check --fix",
  },
})
