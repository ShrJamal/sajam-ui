import path from "node:path"
import { __unstable__loadDesignSystem as loadDesignSystem } from "tailwindcss"
import { extractCandidates, loadStylesheet } from "./tailwind.js"

const DIST_DIR = path.join(import.meta.dir, "../dist")
const SOURCES_DIR = path.join(DIST_DIR, "sources")
const RELATIVE_IMPORT = /(?:from|import)\s*\(?\s*"(\.{1,2}\/[^"]+)"/g

// Validates candidates against Tailwind plus the package theme, so custom
// variants and theme colors count as utilities.
const designSystem = await loadDesignSystem(
  `@import "tailwindcss";\n@import "${path.join(DIST_DIR, "theme.css")}";`,
  { base: DIST_DIR, loadStylesheet },
)

// Writes dist/sources/<component>.css listing the classes of every package
// module the component loads. Listing them inline, instead of pointing @source
// at node_modules, keeps Tailwind from scanning the whole package.
for await (const facade of new Bun.Glob("components/ui/*.js").scan({
  absolute: true,
  cwd: DIST_DIR,
})) {
  const name = path.basename(facade, ".js")
  const candidates = new Set<string>()

  for (const file of await collectModules(facade)) {
    extractCandidates(await Bun.file(file).text(), candidates)
  }

  // Keep only tokens that generate CSS. Anything else could break inline()
  // parsing, which is stricter than Tailwind's file scanner.
  const list = [...candidates].sort()
  const css = designSystem.candidatesToCss(list)
  const classes = list.filter((_, index) => css[index] !== null)

  await Bun.write(
    path.join(SOURCES_DIR, `${name}.css`),
    `/* Classes used by ${name} and the package components it renders. */\n@source inline("${classes.join(" ")}");\n`,
  )
}

// Follows relative imports from a built module through the package.
async function collectModules(entry: string, found = new Set<string>()) {
  if (found.has(entry)) {
    return found
  }

  found.add(entry)

  const source = await Bun.file(entry).text()

  for (const [, specifier] of source.matchAll(RELATIVE_IMPORT)) {
    await collectModules(path.resolve(path.dirname(entry), specifier!), found)
  }

  return found
}
