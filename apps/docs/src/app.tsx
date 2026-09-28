import { Button } from "@sajam/ui/button"
import { Tooltip } from "@sajam/ui/tooltip"
import { cn } from "@sajam/ui/utils"
import { ChevronRightIcon } from "lucide-react"
import { useEffect, type ComponentType } from "react"
import { getPage } from "./catalog"
import { ComponentsPage } from "./components-page"
import { ComponentPage, Installation } from "./documentation-pages"
import { HomePage } from "./home-page"
import { DocsNavigation, PageContents, SiteFooter, SiteHeader } from "./site-shell"
import { TemplateGallery, TemplatePage } from "./template-pages"
import { ThemeBuilder } from "./theme-builder"
import { ThemeMenu } from "./theme-menu"

const installationContents = [
  { id: "prerequisites", title: "Before you start" },
  { id: "install", title: "Install the package" },
  { id: "styles", title: "Add the styles" },
  { id: "usage", title: "Use a component" },
]

// Render the same route for static HTML and browser hydration. Preview routes receive their
// template already loaded so the server and the browser render identical markup.
export function DocsApp({ path, template: Template }: Props) {
  const page = getPage(path)
  const isDocs =
    page.kind === "component" || page.kind === "installation" || page.kind === "components"
  const hasContents =
    (page.kind === "component" && page.sections.length > 1) || page.kind === "installation"

  useEffect(
    function () {
      document.title = `${page.kind === "home" ? "React components for your next project" : page.title} | Sajam UI`
      document.querySelector('meta[name="description"]')?.setAttribute("content", page.description)
    },
    [page.kind, page.title, page.description],
  )

  if (page.kind === "preview") {
    return (
      <Tooltip.Provider>
        {Template ? <Template /> : null}
        <ThemeMenu floating />
      </Tooltip.Provider>
    )
  }

  return (
    <Tooltip.Provider>
      <a
        href="#main"
        className="bg-foreground text-background sr-only z-50 rounded p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <SiteHeader path={path} />
      <div
        className={cn(
          "mx-auto max-w-[1480px]",
          isDocs && "lg:grid lg:grid-cols-[220px_minmax(0,1fr)]",
          hasContents && "xl:grid-cols-[220px_minmax(0,1fr)_180px]",
        )}
      >
        {isDocs && (
          <aside className="docs-sidebar sticky top-16 hidden h-[calc(100svh-4rem)] overflow-y-auto border-r px-5 py-8 lg:block">
            <DocsNavigation path={path} />
          </aside>
        )}
        <main
          id="main"
          tabIndex={-1}
          className={cn(
            "min-w-0 outline-none",
            page.kind !== "home" && "px-5 py-10 sm:px-8 lg:px-10 lg:py-12",
            isDocs && "min-h-[calc(100svh-4rem)]",
          )}
        >
          {page.kind === "home" ? (
            <HomePage />
          ) : page.kind === "components" ? (
            <ComponentsPage />
          ) : (
            <div
              className={cn(
                "mx-auto",
                page.kind === "installation" && "max-w-3xl",
                page.kind === "component" && "max-w-5xl",
                page.kind === "not-found" && "max-w-2xl py-16",
              )}
            >
              <div className="text-muted-foreground mb-5 flex items-center gap-2 text-xs">
                <a
                  href={
                    page.kind === "component"
                      ? "/components"
                      : page.kind === "template"
                        ? "/templates"
                        : "/"
                  }
                  className="hover:text-foreground transition-colors"
                >
                  {page.kind === "component"
                    ? "Components"
                    : page.kind === "template"
                      ? "Templates"
                      : "Sajam UI"}
                </a>
                <ChevronRightIcon
                  className="size-3"
                  aria-hidden="true"
                />
                <span className="text-primary">
                  {page.kind === "component"
                    ? page.group
                    : page.kind === "templates"
                      ? "Templates"
                      : page.kind === "theming"
                        ? "Theme builder"
                        : page.title}
                </span>
              </div>
              <div className={cn("max-w-3xl", hasContents && "border-b pb-8")}>
                <h1 className="text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
                  {page.title}
                </h1>
                <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
                  {page.description}
                </p>
              </div>
              {page.kind === "installation" && <Installation />}
              {page.kind === "theming" && <ThemeBuilder />}
              {page.kind === "component" && <ComponentPage slug={page.slug} />}
              {page.kind === "templates" && (
                <div className="mt-10">
                  <TemplateGallery />
                </div>
              )}
              {page.kind === "template" && (
                <TemplatePage
                  key={page.slug}
                  slug={page.slug}
                  title={page.title}
                />
              )}
              {page.kind === "not-found" && (
                <Button
                  className="mt-8"
                  nativeButton={false}
                  render={<a href="/components" />}
                >
                  Browse components
                </Button>
              )}
            </div>
          )}
        </main>
        {hasContents && (
          <PageContents
            key={path}
            links={
              page.kind === "component"
                ? page.sections.map(function (section) {
                    return { id: section.component, title: section.title }
                  })
                : installationContents
            }
          />
        )}
      </div>
      <SiteFooter />
    </Tooltip.Provider>
  )
}

type Props = { path: string; template?: ComponentType }
