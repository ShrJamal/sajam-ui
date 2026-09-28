import { Button } from "@sajam/ui/button"
import { Tabs } from "@sajam/ui/tabs"
import {
  ArrowRightIcon,
  BracesIcon,
  CheckIcon,
  CopyIcon,
  Layers3Icon,
  PaletteIcon,
} from "lucide-react"
import { useState } from "react"
import { ComponentShowcase } from "./component-showcase"

const buttonCode = `import { Button } from "@sajam/ui/button"
import { useState } from "react"

export function Example() {
  const [ready, setReady] = useState(false)

  return (
    <Button onClick={() => setReady(true)}>
      {ready ? "Ready!" : "Get started"}
    </Button>
  )
}`

const stylesCode = `@import "tailwindcss";
@import "@sajam/ui/styles.css";`

// Introduce Sajam UI and provide a direct path into its components and documentation.
export function HomePage() {
  const [activeFile, setActiveFile] = useState<"button" | "styles">("button")
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle")
  const [ready, setReady] = useState(false)

  return (
    <div className="overflow-hidden">
      <section className="relative isolate border-b">
        <div
          aria-hidden="true"
          className="dot-grid absolute inset-0 -z-20 opacity-45"
        />
        <div
          aria-hidden="true"
          className="bg-primary/5 absolute inset-y-0 right-0 -z-10 hidden w-[45%] border-l lg:block"
        />

        <div className="mx-auto grid min-h-[36rem] max-w-[1500px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-12 lg:py-18 xl:gap-16">
          <div className="max-w-2xl">
            <div className="text-primary mb-6 flex items-center gap-3 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
              <span className="bg-primary h-px w-8" />
              React components, shared across projects
            </div>
            <h1 className="text-5xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance sm:text-6xl xl:text-7xl">
              Build once.
              <span className="text-primary mt-2 block">Make it yours.</span>
            </h1>
            <p className="text-muted-foreground mt-7 max-w-xl text-base leading-7 text-pretty sm:text-lg sm:leading-8">
              Reusable React components built with Base UI and Tailwind CSS. Accessible by default,
              easy to theme, and ready for the projects you build next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="h-11 px-5"
                nativeButton={false}
                render={<a href="/installation" />}
              >
                Get started
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-5"
                nativeButton={false}
                render={<a href="/components" />}
              >
                Explore components
              </Button>
            </div>
            <div className="text-muted-foreground mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2">
                <BracesIcon className="text-primary size-4" />
                React 19
              </span>
              <span className="flex items-center gap-2">
                <Layers3Icon className="text-primary size-4" />
                Base UI primitives
              </span>
              <span className="flex items-center gap-2">
                <PaletteIcon className="text-primary size-4" />
                Themeable tokens
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-3xl lg:mx-0">
            <Tabs.Root
              value={activeFile}
              onValueChange={function (value) {
                if (value === "button" || value === "styles") {
                  setActiveFile(value)
                  setCopyState("idle")
                }
              }}
              className="bg-card overflow-hidden rounded-2xl border shadow-xl shadow-black/5 dark:shadow-black/20"
            >
              <div className="flex min-h-12 items-center justify-between gap-3 border-b px-3 sm:px-4">
                <Tabs.List
                  variant="line"
                  className="h-12 gap-1"
                >
                  <Tabs.Trigger
                    value="button"
                    className="h-12 px-3 font-mono text-xs"
                  >
                    button.tsx
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="styles"
                    className="h-12 px-3 font-mono text-xs"
                  >
                    styles.css
                  </Tabs.Trigger>
                </Tabs.List>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={copyState === "copied" ? "Code copied" : "Copy code"}
                  onClick={async function () {
                    try {
                      await navigator.clipboard.writeText(
                        activeFile === "button" ? buttonCode : stylesCode,
                      )
                      setCopyState("copied")
                    } catch {
                      setCopyState("failed")
                    }
                  }}
                >
                  {copyState === "copied" ? <CheckIcon /> : <CopyIcon />}
                  <span className="hidden sm:inline">
                    {copyState === "copied" ? "Copied" : "Copy"}
                  </span>
                  <span
                    className="sr-only"
                    role="status"
                  >
                    {copyState === "copied"
                      ? "Code copied to clipboard."
                      : copyState === "failed"
                        ? "Copy is unavailable. Select and copy the code below."
                        : ""}
                  </span>
                </Button>
              </div>
              <Tabs.Content
                value="button"
                className="m-0"
              >
                <pre className="min-h-64 overflow-x-auto px-4 py-5 font-mono text-[10px] leading-5 sm:px-8 sm:text-xs">
                  <code>
                    <span className="text-primary">import</span>
                    {" { Button } "}
                    <span className="text-primary">from</span>{" "}
                    <span className="text-muted-foreground">"@sajam/ui/button"</span>
                    {"\n"}
                    <span className="text-primary">import</span>
                    {" { useState } "}
                    <span className="text-primary">from</span>{" "}
                    <span className="text-muted-foreground">"react"</span>
                    {"\n\n"}
                    <span className="text-primary">export function</span>
                    {" Example() {\n  const [ready, setReady] = useState("}
                    <span className="text-primary">false</span>
                    {")\n\n  "}
                    <span className="text-primary">return</span>
                    {" (\n    "}
                    <span className="text-muted-foreground">
                      {"<Button onClick={() => setReady(true)}>"}
                    </span>
                    {'\n      {ready ? "Ready!" : "Get started"}\n    '}
                    <span className="text-muted-foreground">{"</Button>"}</span>
                    {"\n  )\n}"}
                  </code>
                </pre>
                <div className="bg-muted/35 flex min-h-28 items-center border-t px-5 py-6 sm:px-8">
                  <div className="flex w-full items-center justify-between gap-5">
                    <div>
                      <p className="text-sm font-medium">Live preview</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Styled by your active theme.
                      </p>
                    </div>
                    <Button
                      onClick={function () {
                        setReady(true)
                      }}
                    >
                      {ready ? "Ready!" : "Get started"}
                    </Button>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content
                value="styles"
                className="m-0"
              >
                <pre className="min-h-64 overflow-x-auto px-4 py-5 font-mono text-[10px] leading-5 sm:px-8 sm:text-xs">
                  <code>
                    <span className="text-primary">@import</span>{" "}
                    <span className="text-muted-foreground">"tailwindcss"</span>
                    {";\n"}
                    <span className="text-primary">@import</span>{" "}
                    <span className="text-muted-foreground">"@sajam/ui/styles.css"</span>
                    {";"}
                  </code>
                </pre>
                <div className="bg-muted/35 flex min-h-28 items-center border-t px-5 py-6 sm:px-8">
                  <p className="text-muted-foreground max-w-md text-sm leading-6">
                    Import the shared tokens once, then shape every component from the theme
                    builder.
                  </p>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </section>

      <ComponentShowcase />
    </div>
  )
}
