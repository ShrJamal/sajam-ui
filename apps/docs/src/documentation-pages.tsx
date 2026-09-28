import { Badge } from "@sajam/ui/badge"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PackageIcon, PaletteIcon } from "lucide-react"
import { orderedPages } from "./catalog"
import { CodeBlock } from "./code-block"
import { ComponentSections } from "./component-gallery"

const installCode = "npm install @sajam/ui"
const styleCode = '@import "tailwindcss";\n@import "@sajam/ui/styles.css";'
const scopedStyleCode =
  '@import "tailwindcss";\n@import "@sajam/ui/theme.css";\n@import "@sajam/ui/sources/button.css";\n@import "@sajam/ui/sources/dialog.css";'
const usageCode =
  'import { Button } from "@sajam/ui/button"\n\nexport default function App() {\n  return <Button>Get started</Button>\n}'

// Guide consumers from project prerequisites to their first rendered component.
export function Installation() {
  return (
    <div className="mt-10">
      <div className="border-primary/20 bg-primary/5 overflow-hidden rounded-2xl border">
        <div className="flex gap-4 p-5 sm:p-6">
          <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
            <PackageIcon className="size-4" />
          </span>
          <div>
            <Badge
              variant="outline"
              className="border-primary/20 bg-background/70 mb-2"
            >
              Release status
            </Badge>
            <p className="font-medium">The first npm release is being prepared.</p>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Until it is published, run{" "}
              <code className="inline-code">npm pack --workspace @sajam/ui</code> in the monorepo,
              then install that tarball in your app.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-14">
        <section
          id="prerequisites"
          className="scroll-mt-24"
        >
          <StepHeading
            number="01"
            title="Start with React and Tailwind"
            description="Use React 19, React DOM 19, and Tailwind CSS 4. Your app supplies React, so the package shares the same instance."
          />
          <div className="bg-card mt-5 grid gap-3 rounded-xl border p-5 sm:grid-cols-3">
            {["React 19", "React DOM 19", "Tailwind CSS 4"].map(function (dependency) {
              return (
                <div
                  key={dependency}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CheckIcon className="text-primary size-4" />
                  {dependency}
                </div>
              )
            })}
          </div>
        </section>

        <section
          id="install"
          className="scroll-mt-24"
        >
          <StepHeading
            number="02"
            title="Install the package"
            description="Use the package name after the public release, or install a packed archive while developing locally."
          />
          <div className="mt-5 space-y-4">
            <CodeBlock
              code={installCode}
              label="terminal · after the first release"
            />
            <CodeBlock
              code="npm install /path/to/sajam-ui-0.1.0.tgz"
              label="terminal · local development"
            />
          </div>
        </section>

        <section
          id="styles"
          className="scroll-mt-24"
        >
          <StepHeading
            number="03"
            title="Add the stylesheet"
            description="Import the package stylesheet after Tailwind in your global CSS. It provides theme tokens and registers installed component files with Tailwind."
          />
          <div className="mt-5">
            <CodeBlock
              code={styleCode}
              label="src/styles.css"
            />
          </div>
          <div className="bg-muted/40 mt-4 rounded-xl border px-5 py-4 text-sm leading-6">
            <p className="font-medium">Want smaller CSS?</p>
            <p className="text-muted-foreground mt-1">
              <code className="inline-code">styles.css</code> generates classes for every component.
              Import <code className="inline-code">theme.css</code> and one{" "}
              <code className="inline-code">sources/&lt;component&gt;.css</code> file per component
              you use instead. Add a sources import when you start using another component.
            </p>
            <div className="mt-3">
              <CodeBlock
                code={scopedStyleCode}
                label="src/styles.css · only the components you use"
              />
            </div>
          </div>
        </section>

        <section
          id="usage"
          className="scroll-mt-24"
        >
          <StepHeading
            number="04"
            title="Use a component"
            description="Import each component from its public package path so your app only includes what it uses."
          />
          <div className="mt-5">
            <CodeBlock
              code={usageCode}
              label="src/app.tsx"
            />
          </div>
          <div className="bg-muted/40 mt-4 rounded-xl border px-5 py-4 text-sm leading-6">
            <p className="font-medium">Using React Server Components?</p>
            <p className="text-muted-foreground mt-1">
              Add <code className="inline-code">"use client"</code> to your components when they use
              hooks or event handlers. Tooltip examples also need a{" "}
              <code className="inline-code">Tooltip.Provider</code>.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-14 grid gap-3 border-t pt-7 sm:grid-cols-2">
        <a
          href="/components"
          className="group bg-card hover:bg-muted/50 flex items-center gap-4 rounded-xl border p-5 transition-colors"
        >
          <span className="bg-muted grid size-10 place-items-center rounded-lg">
            <PackageIcon className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">Browse components</span>
            <span className="text-muted-foreground mt-1 block text-xs">
              Explore every live example.
            </span>
          </span>
          <ArrowRightIcon className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="/theming"
          className="group bg-card hover:bg-muted/50 flex items-center gap-4 rounded-xl border p-5 transition-colors"
        >
          <span className="bg-muted grid size-10 place-items-center rounded-lg">
            <PaletteIcon className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium">Shape your theme</span>
            <span className="text-muted-foreground mt-1 block text-xs">
              Tune the whole site in one place.
            </span>
          </span>
          <ArrowRightIcon className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}

// Show every section of a component page, then link to its neighbors in sidebar order.
export function ComponentPage({ slug }: { slug: string }) {
  const index = orderedPages.findIndex(function (item) {
    return item.slug === slug
  })
  const previous = orderedPages[index - 1]
  const next = orderedPages[index + 1]

  return (
    <>
      <div className="@container">
        <ComponentSections
          key={slug}
          sections={orderedPages[index].sections}
        />
      </div>

      <nav
        aria-label="Component pagination"
        className="mt-14 grid gap-3 border-t pt-7 sm:grid-cols-2"
      >
        {previous ? (
          <a
            href={`/components/${previous.slug}`}
            className="group bg-card hover:bg-muted/50 flex min-h-24 items-center gap-4 rounded-xl border p-5 transition-colors"
          >
            <ArrowLeftIcon className="text-muted-foreground size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="text-muted-foreground block text-xs">Previous</span>
              <span className="mt-1 block text-sm font-medium">{previous.title}</span>
            </span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a
            href={`/components/${next.slug}`}
            className="group bg-card hover:bg-muted/50 flex min-h-24 items-center justify-end gap-4 rounded-xl border p-5 text-right transition-colors"
          >
            <span>
              <span className="text-muted-foreground block text-xs">Next</span>
              <span className="mt-1 block text-sm font-medium">{next.title}</span>
            </span>
            <ArrowRightIcon className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        )}
      </nav>
    </>
  )
}

function StepHeading({ number, title, description }: StepHeadingProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[3rem_1fr]">
      <span className="text-primary font-mono text-xs font-medium tracking-wider">{number}</span>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">{description}</p>
      </div>
    </div>
  )
}

type StepHeadingProps = {
  number: string
  title: string
  description: string
}
