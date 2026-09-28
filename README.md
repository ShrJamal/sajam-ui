# Sajam UI

A React component library and its documentation site. Customize components in one place, publish `@sajam/ui` to npm, and reuse it across apps.

| Path                         | Contents                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------- |
| [packages/ui](./packages/ui) | The public `@sajam/ui` package: 90 components, types, and theme styles            |
| [apps/docs](./apps/docs)     | Private docs site with 54 component pages, live examples, and 8 starter templates |

See the [package README](./packages/ui/README.md) for installation, API shape, theming, and the component inventory.

## Development

Requires Bun 1.4.2 and Node.js 26.

```sh
bun install --frozen-lockfile
bun run dev
```

The site runs at [localhost:3012](http://localhost:3012). Development resolves the UI source for live edits; production builds consume the compiled package, so the site exercises the same integration as other apps.

| Command                 | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `bun run dev`           | Build the package and start the docs site                     |
| `bun run build`         | Build the package, docs site, static pages, and starters      |
| `bun run build:ui`      | Build the package only                                        |
| `bun run build:docs`    | Build the site (after `build:ui`)                             |
| `bun run preview`       | Serve the built site                                          |
| `bun run check`         | Lint and check formatting                                     |
| `bun run check:fix`     | Apply lint and formatting fixes                               |
| `bun run typecheck`     | Typecheck both workspaces                                     |
| `bun run check:package` | Run release checks and an npm pack dry run without publishing |

## Documentation site

- `/components/{page}` groups related components into sections, each with its import path, usage notes, and live examples. **View code** shows an example's exact source.
- `/theming` previews color, gray base, font, radius, and density on any page or template. **Export CSS** copies tokens to paste after `@sajam/ui/styles.css`.
- `/templates/{slug}` shows a template's preview, source, and a downloadable React + Vite starter; `/preview/{slug}` renders it alone. Templates use local sample data and do not send or store credentials; connect persistence, billing, and authentication before production use.

Pages are defined in `apps/docs/src/catalog.ts`, and examples live in `apps/docs/src/examples/{component}/{example}.tsx`. The build fails if a component has no section, an example is unlisted or missing, an example imports local files, or a section's import names a missing export.

## Adding components

Components are maintained here on Base UI headless primitives. Add the implementation to `packages/ui/src/components/parts`, its facade to `components/ui`, and its export to `src/index.ts`, then add a catalog section and examples.

## Publishing

The first release has not been published; until then, install a local tarball in a starter as described in the site's installation guide.

1. Add `repository`, `homepage`, and `bugs` to `packages/ui/package.json` once the remote repository and site exist.
2. Confirm npm access to the `@sajam` scope and an unused version.
3. Run `bun run check:package`, then install a tarball from `npm pack --workspace @sajam/ui` in a separate app.
4. Publish:

```sh
npm login
npm publish --workspace @sajam/ui --access public
```

## Deploying the docs

Run `bun run build` and deploy `apps/docs/dist/` to a static host at the domain root. The host must serve directory `index.html` files and return `404.html` with a 404 status for unknown paths.

## Credits

Built on [Base UI](https://base-ui.com/). Inspired by [shadcn/ui](https://ui.shadcn.com/), [HeroUI v2](https://v2.heroui.com/), [PrimeReact](https://github.com/primefaces/primereact), [Nuxt UI](https://ui.nuxt.com/), and [shadcn Studio](https://shadcnstudio.com/).

## License

[MIT](./LICENSE)
