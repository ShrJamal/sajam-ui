# AGENTS.md

Bun monorepo: public `@sajam/ui` package in `packages/ui`, private docs site in `apps/docs`. React 19, Base UI, Tailwind CSS 4, Vite Plus (`vp`).

## Package (`packages/ui/src`)

- `components/parts/` holds implementations and keeps their `"use client"` directives. Parts import `cn` from `"cn"` and sibling parts directly, never `../ui/` facades.
- `components/ui/` holds public facades without `"use client"`: `export * as Card from "../parts/card.js"` for compound components, `export * from "../parts/button.js"` for singletons. Use `.js` specifiers.
- `"use client"` is required on interactive modules, hooks, and modules calling `useRender`. Utilities stay server-safe.
- `vp pack` alone is an incomplete build; use `bun run build:ui`. `scripts/preserve-exports.ts` keeps namespace facades from being hoisted into client modules.
- New components need a facade, a root export in `index.ts`, a package README inventory entry, a docs catalog section, and examples.
- Do not add component libraries as runtime dependencies; HeroUI, PrimeReact, and others are design references only.

## Component API

- Compound components are namespaces only (`Card.Root`, `Card.Header`, `Card.Body`); never flat aliases like `CardHeader`. Special members: `Chart.Config`, `Carousel.Api`, `Toast.Toaster`, `Toast.toast`.
- Singletons stay flat with flat helpers and types: `Button`/`buttonVariants`, `Input`, `Badge`, `Snippet`, `CircularProgress`, `DatePicker`, `DataTable`/`DataTableColumn`, `Rating`, `DirectionProvider`/`useDirection`.
- Props: `value`/`defaultValue`/`onValueChange`, `open`/`defaultOpen`/`onOpenChange`. Status `variant`s are `info`, `success`, `warning`, `destructive` (Toast uses `type`). Sizes are `sm`, `default`, `lg`. Name prop types `Props`. No PrimeReact-style names or alias pairs.
- Compose consumer handlers and refs; never let spread props replace internal ones.
- Semantic tokens only, no palette colors or `bg-white`. Form controls use `bg-transparent dark:bg-input/30`; overlays and panels use `bg-popover`, `bg-card`, or `bg-background`.
- Upload, lazy loading, and persistence go through consumer callbacks.

## Docs site (`apps/docs/src`)

- `catalog.ts` defines pages; every package component belongs to exactly one section. `prerender.tsx` enforces this.
- Examples (`examples/{component}/{id}.tsx`) are shown as runnable source: default export, public package imports only, `useId()` for IDs. Keep a few per component, combining variants and states instead of one file per prop.
- Templates are self-contained, use public imports, and must not claim a backend or authentication. Add new template dependencies to `build-starters.ts`.
- `theme-state.ts` must stay compatible with the early color-scheme script in `index.html`. Site appearance must not change package or starter defaults.
- Client navigation (`main.tsx`) must keep sidebar scroll and filter state and preserve Back/Forward, modified clicks, and fragment links.

## Validation

- Run `bun run check`, `bun run typecheck`, and `bun run build` as relevant.
- Packaging changes: `bun run check:package`. For export, dependency, or CSS delivery changes, also install a packed tarball in an isolated consumer.
- UI changes: check the docs site in light and dark mode.
