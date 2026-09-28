import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Tabs } from "@sajam/ui/tabs"
import { cn } from "@sajam/ui/utils"
import { ArrowUpRightIcon, CodeIcon, DownloadIcon, MonitorIcon, SmartphoneIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { templates } from "./catalog"
import { CodeBlock } from "./code-block"

const templateSources = import.meta.glob<string>("./templates/*.tsx", {
  query: "?raw",
  import: "default",
})
const PREVIEW_WIDTH = 1400
const PREVIEW_HEIGHT = 900

// Show the live template, its actual source, and the downloadable starter.
export function TemplatePage({ slug, title }: Props) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop")
  const [source, setSource] = useState<string>()
  const template = templates.find(function (item) {
    return item.slug === slug
  })

  // Load the template's source only when its code tab opens.
  useEffect(
    function () {
      if (tab !== "code" || source !== undefined) return
      let cancelled = false
      templateSources[`./templates/${slug}.tsx`]().then(function (code) {
        if (!cancelled) setSource(code)
      })
      return function () {
        cancelled = true
      }
    },
    [tab, source, slug],
  )

  return (
    <>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button
          nativeButton={false}
          render={
            <a
              href={`/starters/${slug}.zip`}
              download
            />
          }
        >
          <DownloadIcon />
          Download starter
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a
              href={`/preview/${slug}`}
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          Open full preview <ArrowUpRightIcon />
        </Button>
      </div>
      <section
        id="template-preview"
        className="mt-9 scroll-mt-24"
      >
        <Tabs.Root
          value={tab}
          onValueChange={function (value) {
            if (value === "preview" || value === "code") setTab(value)
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-b">
            <Tabs.List variant="line">
              <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
              <Tabs.Trigger value="code">
                <CodeIcon className="size-3.5" />
                Source code
              </Tabs.Trigger>
            </Tabs.List>
            {tab === "preview" && (
              <div
                role="group"
                className="bg-card mb-2 flex items-center rounded-lg border p-1"
                aria-label="Preview width"
              >
                <button
                  type="button"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md transition-colors",
                    viewport === "desktop"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label="Desktop preview"
                  aria-pressed={viewport === "desktop"}
                  onClick={function () {
                    setViewport("desktop")
                  }}
                >
                  <MonitorIcon className="size-4" />
                </button>
                <button
                  type="button"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md transition-colors",
                    viewport === "mobile"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label="Mobile preview"
                  aria-pressed={viewport === "mobile"}
                  onClick={function () {
                    setViewport("mobile")
                  }}
                >
                  <SmartphoneIcon className="size-4" />
                </button>
              </div>
            )}
          </div>
          <Tabs.Content value="preview">
            <div className="dot-grid overflow-x-auto rounded-2xl border p-2 sm:p-4">
              <iframe
                title={`${title} interactive preview`}
                src={`/preview/${slug}`}
                className={cn(
                  "bg-card mx-auto block h-[720px] max-w-full rounded-xl border shadow-sm transition-[width] duration-300",
                  viewport === "desktop" ? "w-full" : "w-[390px]",
                )}
              />
            </div>
          </Tabs.Content>
          <Tabs.Content value="code">
            {source === undefined ? (
              <p
                role="status"
                className="text-muted-foreground p-6 text-sm"
              >
                Loading source…
              </p>
            ) : (
              <CodeBlock
                code={source}
                label={`${slug}.tsx`}
              />
            )}
          </Tabs.Content>
        </Tabs.Root>
      </section>
      <section
        id="starter"
        className="bg-card mt-12 scroll-mt-24 rounded-2xl border p-6 sm:p-8"
      >
        <Badge
          variant="secondary"
          className="mb-4"
        >
          React + Vite
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight">A working starting point</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
          The download includes this page, a React + Vite app, TypeScript, and Tailwind CSS. Unzip
          it and run the following commands.
        </p>
        <div className="mt-6">
          <CodeBlock
            code="npm install\nnpm run dev"
            label="terminal"
          />
        </div>
        <p className="text-muted-foreground mt-5 text-sm leading-7">
          The starter depends on <code className="inline-code">@sajam/ui@^0.1.0</code>. Before the
          first release, install your local @sajam/ui tarball instead. {template?.note}
        </p>
      </section>
    </>
  )
}

// Render reusable, non-interactive live thumbnails for the template catalog.
export function TemplateGallery({ limit }: { limit?: number }) {
  const visibleTemplates = limit === undefined ? templates : templates.slice(0, limit)

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {visibleTemplates.map(function (template) {
        return (
          <article
            key={template.slug}
            className="group bg-card hover:border-primary/35 hover:shadow-foreground/5 relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <TemplateThumbnail
              slug={template.slug}
              title={template.title}
            />
            <div className="flex items-start justify-between gap-5 p-5 sm:p-6">
              <div>
                <Badge
                  variant="outline"
                  className="mb-3"
                >
                  {template.tag}
                </Badge>
                <h2 className="text-lg font-semibold tracking-tight">
                  <a
                    href={`/templates/${template.slug}`}
                    className="before:absolute before:inset-0"
                  >
                    {template.title}
                  </a>
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {template.description}
                </p>
              </div>
              <span className="bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground mt-1 grid size-9 shrink-0 place-items-center rounded-full transition-colors">
                <ArrowUpRightIcon className="size-4" />
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}

type Props = {
  slug: string
  title: string
}

function TemplateThumbnail({ slug, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)

  useEffect(function () {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(function ([entry]) {
      setScale(Math.min(1, entry.contentRect.width / PREVIEW_WIDTH))
    })
    observer.observe(container)

    return function () {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="bg-muted/30 relative aspect-[14/9] overflow-hidden border-b"
    >
      <iframe
        src={`/preview/${slug}`}
        title={`${title} thumbnail`}
        tabIndex={-1}
        aria-hidden="true"
        loading="lazy"
        className="bg-background pointer-events-none absolute top-0 left-0 border-0"
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  )
}
