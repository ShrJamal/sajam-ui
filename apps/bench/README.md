# Sajam UI bench

A private Astro app that shows what a browser downloads for a small page built with the package's production build. Astro renders the page to static HTML at build time, so the first paint waits for the stylesheet rather than JavaScript, as on a server-rendered site. The same page is built with two stylesheets:

- `full` imports `@sajam/ui/styles.css`, which includes every component's classes.
- `scoped` imports `theme.css` and the sources of the four components the page uses.

```sh
bun run build:ui                 # from the repo root
bun run --cwd apps/bench build   # writes dist/full and dist/scoped
bun run --cwd apps/bench serve   # http://localhost:4173/full/ and /scoped/
```

The server compresses responses with brotli or gzip like a production host and disables caching. In Chrome DevTools, open Network with "Disable cache" and a throttling profile to compare transferred sizes, and Performance or Lighthouse to compare FCP and LCP.
