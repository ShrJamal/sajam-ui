// Measures what a browser downloads for @sajam/ui after `bun run build`: the
// minified JavaScript of each component entry and the Tailwind CSS the package
// adds to a consumer build. React is excluded; every React app already ships it.
//
// Usage:
//   bun scripts/size.ts                 every component, largest first
//   bun scripts/size.ts button dialog   one bundle with the listed components

import { mkdir, readdir, rm, stat } from "node:fs/promises"
import path from "node:path"
import { brotliCompressSync } from "node:zlib"
import { Glob } from "bun"
import { compile } from "tailwindcss"
import { extractCandidates, loadStylesheet } from "./tailwind.js"

const PACKAGE_DIR = path.join(import.meta.dir, "..")
const DIST_DIR = path.join(PACKAGE_DIR, "dist")
const COMPONENTS_DIR = path.join(DIST_DIR, "components/ui")
// Inside the package so generated entries resolve its dependencies.
const TEMP_DIR = path.join(PACKAGE_DIR, "node_modules/.cache/sajam-size")
const REACT_MODULES = ["react", "react-dom", "react/*", "react-dom/*"]

const available = await listComponents()
const requested = Bun.argv.slice(2)
const unknown = requested.filter((name) => !available.includes(name))

if (unknown.length > 0) {
  console.error(`Unknown component: ${unknown.join(", ")}`)
  process.exit(1)
}

await rm(TEMP_DIR, { force: true, recursive: true })
await mkdir(TEMP_DIR, { recursive: true })

try {
  const base = await buildCss(['@import "tailwindcss";'])
  const all = await buildCss(['@import "tailwindcss";', importCss("styles.css")])
  const react = await measureJs(
    ["react", "react-dom/client"].map((id) => `export * from "${id}"`),
    [],
  )

  console.log("CSS with styles.css (Tailwind scans every component)")
  printTable([
    ["Tailwind base", base],
    ["@sajam/ui", subtract(all, base)],
    ["Total CSS", all],
  ])

  if (requested.length > 0) {
    const js = await measureJs(requested.map(toExport))
    const scoped = await buildCss([
      '@import "tailwindcss";',
      importCss("theme.css"),
      ...requested.map((name) => importCss(`sources/${name}.css`)),
    ])

    console.log(`\nCSS with theme.css and sources for ${requested.join(", ")}`)
    printTable([
      ["@sajam/ui", subtract(scoped, base)],
      ["Total CSS", scoped],
    ])

    console.log(`\nJavaScript for ${requested.join(", ")} (shared code counted once)`)
    printTable([
      ["Components", js],
      ["+ CSS with styles.css", add(js, all)],
      ["+ CSS with sources", add(js, scoped)],
      ["React (context)", react],
    ])
  } else {
    const rows: Row[] = []

    for (const name of available) {
      rows.push([name, await measureJs([toExport(name)])])
    }

    rows.sort((first, second) => second[1].brotli - first[1].brotli)
    console.log("\nJavaScript per component (each measured alone)")
    printTable([...rows, ["React (context)", react]])
  }
} finally {
  await rm(TEMP_DIR, { force: true, recursive: true })
}

type Size = { minified: number; gzip: number; brotli: number }
type Row = [label: string, size: Size]

async function listComponents() {
  const files = await readdir(COMPONENTS_DIR).catch(() => {
    console.error("dist/ is missing. Run `bun run build` in packages/ui first.")
    process.exit(1)
  })

  return files
    .filter((file) => file.endsWith(".js"))
    .map((file) => file.slice(0, -3))
    .sort()
}

function toExport(name: string) {
  return `export * from "${path.join(COMPONENTS_DIR, `${name}.js`)}"`
}

// Bundles the given export lines as one browser entry and sizes the result.
async function measureJs(exportLines: string[], external = REACT_MODULES) {
  const entry = path.join(TEMP_DIR, `${crypto.randomUUID()}.js`)

  await Bun.write(entry, exportLines.join("\n"))

  const result = await Bun.build({
    // Production builds drop development-only warnings and checks.
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    entrypoints: [entry],
    external,
    minify: true,
    target: "browser",
    throw: false,
  })

  if (!result.success) {
    throw new AggregateError(result.logs, `Could not bundle ${exportLines.join(", ")}`)
  }

  const code = await result.outputs[0]!.text()

  return measure(code)
}

function importCss(file: string) {
  return `@import "${path.join(DIST_DIR, file)}";`
}

// Compiles Tailwind the way a consumer build does: the package's @source rules
// decide which files are scanned, then the output is minified.
async function buildCss(lines: string[]) {
  const compiler = await compile(lines.join("\n"), { base: PACKAGE_DIR, loadStylesheet })
  const candidates = new Set<string>()

  for (const source of compiler.sources.filter((entry) => !entry.negated)) {
    for await (const file of listSourceFiles(source.base, source.pattern)) {
      if (!/\.(css|map)$/.test(file)) {
        extractCandidates(await Bun.file(file).text(), candidates)
      }
    }
  }

  return measure(await minifyCss(compiler.build([...candidates])))
}

// An @source pattern is a glob, a directory to scan fully, or a single file.
async function* listSourceFiles(base: string, pattern: string) {
  if (/[*?{[]/.test(pattern)) {
    yield* new Glob(pattern).scan({ absolute: true, cwd: base })
    return
  }

  const target = path.resolve(base, pattern)

  if ((await stat(target)).isDirectory()) {
    yield* new Glob("**/*").scan({ absolute: true, cwd: target })
  } else {
    yield target
  }
}

async function minifyCss(css: string) {
  const file = path.join(TEMP_DIR, `${crypto.randomUUID()}.css`)

  await Bun.write(file, css)

  const result = await Bun.build({ entrypoints: [file], minify: true, throw: false })

  if (!result.success) {
    throw new AggregateError(result.logs, "Could not minify CSS")
  }

  return result.outputs[0]!.text()
}

function measure(content: string): Size {
  const bytes = new TextEncoder().encode(content)

  return {
    brotli: brotliCompressSync(bytes).byteLength,
    gzip: Bun.gzipSync(bytes).byteLength,
    minified: bytes.byteLength,
  }
}

function add(first: Size, second: Size): Size {
  return {
    brotli: first.brotli + second.brotli,
    gzip: first.gzip + second.gzip,
    minified: first.minified + second.minified,
  }
}

function subtract(first: Size, second: Size): Size {
  return {
    brotli: first.brotli - second.brotli,
    gzip: first.gzip - second.gzip,
    minified: first.minified - second.minified,
  }
}

function printTable(rows: Row[]) {
  const width = Math.max(...rows.map(([label]) => label.length))

  console.log(
    `${"".padEnd(width)}  ${"minified".padStart(10)}  ${"gzip".padStart(10)}  ${"brotli".padStart(10)}`,
  )

  for (const [label, size] of rows) {
    console.log(
      `${label.padEnd(width)}  ${formatBytes(size.minified)}  ${formatBytes(size.gzip)}  ${formatBytes(size.brotli)}`,
    )
  }
}

function formatBytes(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} kB`.padStart(10)
}
