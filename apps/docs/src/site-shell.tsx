import { Button } from "@sajam/ui/button"
import { Input } from "@sajam/ui/input"
import { Sheet } from "@sajam/ui/sheet"
import { cn } from "@sajam/ui/utils"
import { ArrowUpRightIcon, MenuIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { groups, pages, templates } from "./catalog"
import { SiteSearch } from "./site-search"
import { ThemeMenu } from "./theme-menu"

const mainLinks = [
  { href: "/installation", title: "Docs" },
  { href: "/components", title: "Components" },
  { href: "/templates", title: "Templates" },
]

const componentCount = pages.reduce(function (count, page) {
  return count + page.sections.length
}, 0)

// Share navigation and appearance controls across every documentation route.
export function SiteHeader({ path }: Props) {
  const selectedPath = path.replace(/\/$/, "") || "/"
  return (
    <header className="bg-background/95 sticky top-0 z-30 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-3 px-5 sm:gap-6 lg:grid lg:grid-cols-[220px_1fr_auto] lg:px-8">
        <a
          href="/"
          className="flex w-fit shrink-0 items-center gap-2.5 text-lg font-semibold tracking-tight"
          aria-label="Sajam UI home"
        >
          <img
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0"
          />
          <span>
            sajam <span className="text-muted-foreground font-normal">/ ui</span>
          </span>
        </a>
        <nav
          aria-label="Main"
          className="hidden h-full items-center justify-center gap-7 text-sm lg:flex"
        >
          {mainLinks.map(function (link) {
            const active =
              selectedPath === link.href ||
              (link.href !== "/installation" && selectedPath.startsWith(`${link.href}/`)) ||
              (link.href === "/installation" && selectedPath === "/theming")
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:text-foreground flex h-full items-center border-b-2 border-transparent pt-0.5 transition-colors",
                  active ? "text-primary border-primary font-medium" : "text-muted-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.title}
              </a>
            )
          })}
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-3">
          <SiteSearch />
          <ThemeMenu />
          <Sheet.Root key={path}>
            <Sheet.Trigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <MenuIcon />
            </Sheet.Trigger>
            <Sheet.Content
              side="left"
              className="w-80 max-w-[calc(100vw-2rem)]"
            >
              <Sheet.Header>
                <Sheet.Title>Sajam UI</Sheet.Title>
                <Sheet.Description>Documentation, components, and templates.</Sheet.Description>
              </Sheet.Header>
              <div className="min-h-0 overflow-y-auto px-5 py-6">
                <DocsNavigation path={path} />
              </div>
            </Sheet.Content>
          </Sheet.Root>
        </div>
      </div>
    </header>
  )
}

// Keep catalog navigation compact and searchable on desktop and mobile.
export function DocsNavigation({ path }: Props) {
  const [query, setQuery] = useState("")
  const selectedPath = path.replace(/\/$/, "") || "/"
  const matches = pages.filter(function (item) {
    const sections = item.sections
      .map(function (section) {
        return section.title
      })
      .join(" ")
    return `${item.title} ${item.slug} ${item.description} ${sections}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  })
  return (
    <nav aria-label="Documentation">
      <div className="relative mb-7">
        <SearchIcon
          className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 size-3.5"
          aria-hidden="true"
        />
        <Input
          aria-label="Filter components in navigation"
          value={query}
          onChange={function (event) {
            setQuery(event.target.value)
          }}
          placeholder="Filter components…"
          className="bg-muted/40 h-9 pl-9 text-xs"
        />
      </div>
      <p className="nav-heading">Getting started</p>
      {[
        { href: "/", title: "Introduction" },
        { href: "/installation", title: "Installation" },
        { href: "/theming", title: "Theme builder" },
        { href: "/templates", title: "Templates", count: templates.length },
        { href: "/components", title: "All components", count: componentCount },
      ].map(function (link) {
        const active =
          selectedPath === link.href ||
          (link.href === "/templates" && selectedPath.startsWith("/templates/"))
        return (
          <a
            key={link.href}
            href={link.href}
            className={cn("nav-link", active && "nav-link-active")}
            aria-current={active ? "page" : undefined}
          >
            {link.title}
            {link.count !== undefined && (
              <span className="text-muted-foreground ml-auto font-mono text-[10px]">
                {link.count}
              </span>
            )}
          </a>
        )
      })}
      {groups.map(function (group) {
        const items = matches.filter(function (item) {
          return item.group === group
        })
        if (!items.length) return null
        return (
          <div
            key={group}
            className="mt-7"
          >
            <p className="nav-heading">{group}</p>
            <div className="ml-3 border-l pl-2">
              {items.map(function (item) {
                const active = selectedPath === `/components/${item.slug}`
                return (
                  <a
                    key={item.slug}
                    href={`/components/${item.slug}`}
                    className={cn("nav-link", active && "nav-link-active")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.title}
                  </a>
                )
              })}
            </div>
          </div>
        )
      })}
      {matches.length === 0 && (
        <p
          role="status"
          className="text-muted-foreground mt-6 text-sm"
        >
          No components match "{query}".
        </p>
      )}
    </nav>
  )
}

// Link to the sections of the current documentation page.
export function PageContents({ links }: { links: { id: string; title: string }[] }) {
  const [active, setActive] = useState(links[0].id)
  const ids = links
    .map(function (link) {
      return link.id
    })
    .join(",")
  useEffect(
    function () {
      const observer = new IntersectionObserver(
        function (entries) {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(entry.target.id)
          }
        },
        { rootMargin: "-80px 0px -65% 0px" },
      )
      for (const id of ids.split(",")) {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      }
      return function () {
        observer.disconnect()
      }
    },
    [ids],
  )
  return (
    <aside
      aria-label="On this page"
      className="sticky top-16 hidden h-fit px-5 pt-12 text-xs xl:block"
    >
      <p className="mb-4 font-medium">On this page</p>
      <div className="border-l">
        {links.map(function (link) {
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "-ml-px block border-l py-2 pl-4 transition-colors",
                active === link.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.title}
            </a>
          )
        })}
      </div>
      <a
        href="/theming"
        className="text-muted-foreground hover:text-foreground mt-8 flex items-center gap-1.5 border-t pt-5"
      >
        Customize the theme <ArrowUpRightIcon className="size-3.5" />
      </a>
    </aside>
  )
}

// Keep product links and attribution visible without competing with the docs.
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-5 px-5 py-7 text-xs sm:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt=""
            width={22}
            height={22}
          />
          <span>Built with Sajam UI. Shared under the MIT license.</span>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-5"
        >
          <a
            href="/installation"
            className="hover:text-foreground"
          >
            Documentation
          </a>
          <a
            href="/components"
            className="hover:text-foreground"
          >
            Components
          </a>
          <a
            href="/templates"
            className="hover:text-foreground"
          >
            Templates
          </a>
          <a
            href="https://base-ui.com/react/overview/quick-start"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground flex items-center gap-1"
          >
            Base UI <ArrowUpRightIcon className="size-3" />
          </a>
        </nav>
      </div>
    </footer>
  )
}

type Props = { path: string }
