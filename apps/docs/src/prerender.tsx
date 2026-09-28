import * as library from "@sajam/ui"
import type { ComponentType } from "react"
import { renderToString } from "react-dom/server"
import { DocsApp } from "./app"
import { getExamples, getImportNames, getPage, pages, templates } from "./catalog"

const html = await Bun.file("dist/index.html").text()
const templateModules = import.meta.glob<{ default: ComponentType }>("./templates/*.tsx", {
  eager: true,
})
const routes = [
  "/",
  "/installation",
  "/theming",
  "/components",
  "/templates",
  ...pages.map(function (page) {
    return `/components/${page.slug}`
  }),
  ...templates.flatMap(function (item) {
    return [`/templates/${item.slug}`, `/preview/${item.slug}`]
  }),
]
const sections = pages.flatMap(function (page) {
  return page.sections
})

// Every package component appears in exactly one section.
const libraryFiles = [...new Bun.Glob("*.tsx").scanSync("../../packages/ui/src/components/ui")]
  .map(function (file) {
    return file.replace(/\.tsx$/, "")
  })
  .sort()
const documented = sections
  .map(function (section) {
    return section.component
  })
  .sort()
if (JSON.stringify(libraryFiles) !== JSON.stringify(documented)) {
  const missing = libraryFiles.filter(function (file) {
    return !documented.includes(file)
  })
  const extra = documented.filter(function (component, index) {
    return !libraryFiles.includes(component) || documented.indexOf(component) !== index
  })
  throw new Error(
    `Every package component needs exactly one docs section. Missing: ${missing.join(", ") || "none"}. Unknown or duplicated: ${extra.join(", ") || "none"}.`,
  )
}

const slugs = pages.map(function (page) {
  return page.slug
})
if (new Set(slugs).size !== slugs.length) throw new Error("Page slugs must be unique.")

// Listed examples and example files on disk must match exactly.
const listed = sections.flatMap(function (section) {
  const examples = getExamples(section)
  if (examples.length === 0) throw new Error(`Section ${section.component} has no examples.`)
  return examples.map(function (example) {
    return example.path.slice(2)
  })
})
const onDisk = [...new Bun.Glob("**/*.tsx").scanSync("src/examples")].map(function (path) {
  return `examples/${path}`
})
const unlisted = onDisk.filter(function (path) {
  return !listed.includes(path)
})
const absent = listed.filter(function (path) {
  return !onDisk.includes(path)
})
if (unlisted.length || absent.length || new Set(listed).size !== listed.length) {
  throw new Error(
    `Examples must match the catalog. Unlisted files: ${unlisted.join(", ") || "none"}. Missing files: ${absent.join(", ") || "none"}.`,
  )
}

for (const path of onDisk) {
  const source = await Bun.file(`src/${path}`).text()
  if (/\bfrom\s*["']\./.test(source)) {
    throw new Error(`Example ${path} must use public package imports instead of local files.`)
  }
}

// Import lines shown on each section must name real package exports.
for (const section of sections) {
  for (const name of getImportNames(section).split(", ")) {
    if (!(name in library)) {
      throw new Error(`Section ${section.component} shows an import for missing export ${name}.`)
    }
  }
}

// Emit real HTML pages so navigation and documentation work on static hosts.
for (const route of [...routes, "/404"]) {
  const page = getPage(route)
  const title = page.kind === "home" ? "React components for your next project" : page.title
  const template =
    page.kind === "preview" ? templateModules[`./templates/${page.slug}.tsx`].default : undefined
  const content = renderToString(
    <DocsApp
      path={route}
      template={template}
    />,
  )
  const output = html
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | Sajam UI</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      "</head>",
      `${route === "/404" ? '<meta name="robots" content="noindex" />' : ""}</head>`,
    )
  await Bun.write(
    route === "/404"
      ? "dist/404.html"
      : route === "/"
        ? "dist/index.html"
        : `dist${route}/index.html`,
    output,
  )
  // Serve clean URLs on hosts that resolve .html before directory indexes.
  if (route !== "/" && route !== "/404") await Bun.write(`dist${route}.html`, output)
}
console.log(
  `Generated ${routes.length} static pages and a 404 page. ${sections.length} components on ${pages.length} pages with ${listed.length} examples.`,
)

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]!
  })
}
