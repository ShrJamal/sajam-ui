import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Checkbox } from "@sajam/ui/checkbox"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { Progress } from "@sajam/ui/progress"
import { Select } from "@sajam/ui/select"
import { Switch } from "@sajam/ui/switch"
import { Tabs } from "@sajam/ui/tabs"
import { cn } from "@sajam/ui/utils"
import {
  CircleIcon,
  CompassIcon,
  ImageIcon,
  Layers3Icon,
  LayoutGridIcon,
  MessageSquareIcon,
  MousePointer2Icon,
  SearchIcon,
  SparklesIcon,
  TableIcon,
  WrenchIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"
import { useState, type ReactNode } from "react"
import { groups, orderedPages, type Group } from "./catalog"

const allCategories = ["All", ...groups]
const roles = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
]
const componentCount = orderedPages.reduce(function (count, page) {
  return count + page.sections.length
}, 0)
const groupIcons: Record<Group, LucideIcon> = {
  Actions: SparklesIcon,
  Inputs: MousePointer2Icon,
  Overlays: Layers3Icon,
  Navigation: CompassIcon,
  Feedback: CircleIcon,
  Data: TableIcon,
  Layout: LayoutGridIcon,
  Media: ImageIcon,
  Messaging: MessageSquareIcon,
  Utilities: WrenchIcon,
}

// Browse every documented component without loading the full set of interactive demos.
export function ComponentsPage() {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const matches = orderedPages.filter(function (page) {
    const matchesCategory = category === "All" || page.group === category
    const sections = page.sections
      .map(function (section) {
        return section.title
      })
      .join(" ")
    const matchesQuery =
      normalizedQuery.length === 0 ||
      `${page.title} ${page.description} ${page.group} ${sections}`
        .toLowerCase()
        .includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })

  return (
    <div className="pb-8">
      <section className="border-border/80 relative overflow-hidden border-b pb-10 sm:pb-12">
        <p className="text-primary mb-4 font-mono text-sm font-medium tracking-wide">@sajam/ui</p>
        <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.045em] sm:text-6xl">
          Components for your next interface.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7 sm:text-lg">
          Accessible React components with thoughtful defaults and room to make every detail your
          own.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button
            nativeButton={false}
            render={<a href="/installation" />}
          >
            Get started
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href="/templates" />}
          >
            Browse templates
          </Button>
          <span className="text-muted-foreground ml-1 text-sm">
            {componentCount} components on {orderedPages.length} pages
          </span>
        </div>
      </section>

      <section
        aria-labelledby="component-catalog-title"
        className="pt-8"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-primary mb-2 text-xs font-semibold tracking-[0.16em] uppercase">
              Library
            </p>
            <h2
              id="component-catalog-title"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Explore the components
            </h2>
            <p
              className="text-muted-foreground mt-2 text-sm"
              role="status"
            >
              Showing {matches.length} of {orderedPages.length} pages
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={function (event) {
                setQuery(event.target.value)
              }}
              aria-label="Search all components"
              placeholder="Search components..."
              className="bg-card h-10 pr-10 pl-9"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={function () {
                  setQuery("")
                }}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Clear component search"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-2"
          role="group"
          aria-label="Filter components by category"
        >
          {allCategories.map(function (item) {
            const count =
              item === "All"
                ? orderedPages.length
                : orderedPages.filter(function (page) {
                    return page.group === item
                  }).length
            const selected = item === category
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={function () {
                  setCategory(item)
                }}
                className={cn(
                  "focus-visible:ring-ring inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3.5 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none",
                  selected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20 border",
                )}
              >
                {item}
                <span className="text-xs">{count}</span>
              </button>
            )
          })}
        </div>

        {matches.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {matches.map(function (page) {
              const Icon = groupIcons[page.group]
              return (
                <article
                  key={page.slug}
                  className="group bg-card hover:border-primary/35 relative overflow-hidden rounded-xl border transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div
                    className="dot-grid bg-muted/20 flex h-44 items-center justify-center overflow-hidden p-5 [&_*]:select-none"
                    aria-hidden="true"
                    inert
                  >
                    {previews[page.slug] ?? (
                      <span className="bg-card text-primary grid size-12 place-items-center rounded-xl border shadow-sm transition-transform group-hover:scale-105">
                        <Icon className="size-5" />
                      </span>
                    )}
                  </div>
                  <div className="border-t p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold tracking-tight">
                        <a
                          href={`/components/${page.slug}`}
                          className="group-hover:text-primary focus-visible:ring-ring rounded-sm transition-colors after:absolute after:inset-0 focus-visible:ring-2 focus-visible:outline-none"
                        >
                          {page.title}
                        </a>
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground shrink-0 text-[10px] font-normal"
                      >
                        {page.group}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
                      {page.description}
                    </p>
                    {page.sections.length > 1 && (
                      <p className="text-muted-foreground mt-3 text-xs leading-5">
                        {page.sections
                          .map(function (section) {
                            return section.title
                          })
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="bg-muted/25 mt-5 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
            <span className="bg-card mb-4 grid size-11 place-items-center rounded-xl border shadow-sm">
              <SearchIcon className="text-muted-foreground size-5" />
            </span>
            <h3 className="font-semibold">No components found</h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-6">
              Try a different search or clear the category filter to browse the full collection.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-5"
              onClick={function () {
                setQuery("")
                setCategory("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

// Small static previews for the most common pages; others show their group icon.
const previews: Record<string, ReactNode> = {
  button: (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm">Primary action</Button>
      <Button
        size="sm"
        variant="outline"
      >
        Secondary
      </Button>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge>Published</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="outline">In review</Badge>
    </div>
  ),
  card: (
    <Card.Root className="w-full max-w-[15rem] gap-3 py-4 shadow-sm">
      <Card.Header className="px-4">
        <Card.Title className="text-sm">New project</Card.Title>
        <Card.Description className="text-xs">Bring your next idea to life.</Card.Description>
      </Card.Header>
      <Card.Footer className="px-4">
        <Button size="sm">Get started</Button>
      </Card.Footer>
    </Card.Root>
  ),
  input: (
    <div className="grid w-full max-w-[16rem] gap-2">
      <Label htmlFor="catalog-email-preview">Email address</Label>
      <Input
        id="catalog-email-preview"
        type="email"
        placeholder="you@example.com"
      />
    </div>
  ),
  select: (
    <Select.Root
      items={roles}
      defaultValue="developer"
    >
      <Select.Trigger
        className="w-56"
        aria-label="Role preview"
      >
        <Select.Value />
      </Select.Trigger>
    </Select.Root>
  ),
  checkbox: (
    <div className="flex items-center gap-3">
      <Checkbox
        id="catalog-checkbox-preview"
        defaultChecked
      />
      <Label htmlFor="catalog-checkbox-preview">Product updates</Label>
    </div>
  ),
  switch: (
    <div className="flex items-center gap-3">
      <Switch
        id="catalog-switch-preview"
        defaultChecked
      />
      <Label htmlFor="catalog-switch-preview">Email notifications</Label>
    </div>
  ),
  tabs: (
    <div className="bg-card/95 w-full max-w-[16rem] overflow-hidden rounded-xl border shadow-sm">
      <Tabs.Root defaultValue="account">
        <Tabs.List className="w-full rounded-none border-0 border-b">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="account"
          className="p-4 text-xs"
        >
          Manage your account settings.
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
  progress: (
    <Progress.Root
      value={72}
      className="w-full max-w-[15rem]"
    >
      <Progress.Label>Uploading files</Progress.Label>
      <Progress.Value />
    </Progress.Root>
  ),
}
