import { strToU8, zipSync } from "fflate"
import { templates } from "./catalog"

const uiPackage = await Bun.file("../../packages/ui/package.json").json()
const docsPackage = await Bun.file("package.json").json()

// Bundle each displayed template with a small, runnable React app.
for (const template of templates) {
  const name = template.slug
  const app = await Bun.file(`src/templates/${name}.tsx`).text()
  const files = {
    "package.json": JSON.stringify(
      {
        name: `sajam-${name}-starter`,
        version: "0.0.0",
        private: true,
        type: "module",
        scripts: { dev: "vite", build: "tsc --noEmit && vite build", preview: "vite preview" },
        dependencies: {
          "@sajam/ui": `^${uiPackage.version}`,
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          "lucide-react": docsPackage.dependencies["lucide-react"],
          ...(app.includes('from "recharts"')
            ? { recharts: docsPackage.dependencies.recharts }
            : {}),
        },
        devDependencies: {
          "@tailwindcss/vite": docsPackage.devDependencies["@tailwindcss/vite"],
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          tailwindcss: docsPackage.devDependencies.tailwindcss,
          typescript: "7.0.2",
          vite: "^8.0.0",
        },
      },
      null,
      2,
    ),
    "index.html":
      '<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>My workspace</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
    "src/App.tsx": app,
    "src/main.tsx":
      'import { createRoot } from "react-dom/client"\nimport { Tooltip } from "@sajam/ui/tooltip"\nimport App from "./App"\nimport "./styles.css"\n\ncreateRoot(document.getElementById("root")!).render(<Tooltip.Provider><App /></Tooltip.Provider>)\n',
    "src/styles.css": '@import "tailwindcss";\n@import "@sajam/ui/styles.css";\n',
    "vite.config.ts":
      'import { defineConfig } from "vite"\nimport tailwindcss from "@tailwindcss/vite"\n\nexport default defineConfig({ plugins: [tailwindcss()], build: { rolldownOptions: { checks: { moduleLevelDirective: false } } } })\n',
    "tsconfig.json": JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          types: ["vite/client"],
        },
        include: ["src"],
      },
      null,
      2,
    ),
    ".gitignore": "node_modules/\ndist/\n.env\n.env.*\n",
    LICENSE: await Bun.file("../../LICENSE").text(),
    "README.md": `# Sajam UI ${template.title} starter\n\nRun npm install, then npm run dev. Use npm run build for production.\n\nThis starter depends on @sajam/ui ${uiPackage.version}. Before the first npm release, install a local tarball with npm install /path/to/sajam-ui-${uiPackage.version}.tgz.\n\n${template.note}\n`,
  }
  const entries = Object.fromEntries(
    Object.entries(files).map(function ([path, contents]) {
      return [path, strToU8(contents)]
    }),
  )
  await Bun.write(`public/starters/${name}.zip`, zipSync(entries))
}
console.log(`Built ${templates.length} starter downloads.`)
