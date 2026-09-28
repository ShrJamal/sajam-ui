import { Button } from "@sajam/ui/button"
import { Command } from "@sajam/ui/command"
import { Dialog } from "@sajam/ui/dialog"
import { Kbd } from "@sajam/ui/kbd"
import {
  BlocksIcon,
  HomeIcon,
  LayoutTemplateIcon,
  PackageIcon,
  PaletteIcon,
  SearchIcon,
} from "lucide-react"
import { useEffect, useState, type ComponentType } from "react"
import { pages as componentPages, templates } from "./catalog"
import { navigate } from "./navigation"

const componentResults: SearchResult[] = componentPages.flatMap(function (page) {
  const results: SearchResult[] = [
    {
      title: page.title,
      description: page.description,
      href: `/components/${page.slug}`,
      meta: page.group,
      icon: BlocksIcon,
    },
  ]
  if (page.sections.length === 1) return results
  return results.concat(
    page.sections.map(function (section) {
      return {
        title: section.title,
        description: section.description || page.description,
        href: `/components/${page.slug}#${section.component}`,
        meta: page.title,
        icon: BlocksIcon,
      }
    }),
  )
})

const pages: SearchResult[] = [
  {
    title: "Documentation",
    description: "Start with Sajam UI and explore its foundations.",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Components",
    description: "Browse the complete Sajam UI component collection.",
    href: "/components",
    icon: BlocksIcon,
  },
  {
    title: "Installation",
    description: "Install the package and configure its shared styles.",
    href: "/installation",
    icon: PackageIcon,
  },
  {
    title: "Theming",
    description: "Adjust the colors, type, radius, and visual style.",
    href: "/theming",
    icon: PaletteIcon,
  },
  {
    title: "Templates",
    description: "Preview and download complete React page starters.",
    href: "/templates",
    icon: LayoutTemplateIcon,
  },
]

const resultGroups: SearchGroup[] = [
  { value: "Pages", items: pages },
  { value: "Components", items: componentResults },
  {
    value: "Templates",
    items: templates.map(function (template) {
      return {
        title: template.title,
        description: template.description,
        href: `/templates/${template.slug}`,
        meta: template.tag,
        icon: LayoutTemplateIcon,
      }
    }),
  },
]

// Search every public page, component, and template from one keyboard-accessible palette.
export function SiteSearch() {
  const [open, setOpen] = useState(false)
  const [shortcutModifier, setShortcutModifier] = useState("⌘")

  useEffect(function () {
    if (!/Mac|iPhone|iPad|iPod/.test(navigator.platform)) setShortcutModifier("Ctrl")

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey))
        return
      event.preventDefault()
      setOpen(function (current) {
        return !current
      })
    }

    document.addEventListener("keydown", handleKeyDown)
    return function () {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function selectPage(href: string) {
    setOpen(false)
    if (!navigate(href)) window.location.assign(href)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger
        render={
          <Button
            type="button"
            variant="outline"
            aria-label="Search documentation"
            className="text-muted-foreground h-9 justify-start gap-2 px-2.5 font-normal sm:w-52 sm:px-3"
          />
        }
      >
        <SearchIcon className="size-4" />
        <span className="hidden flex-1 text-left text-sm sm:inline">Search docs...</span>
        <Kbd.Root className="hidden sm:inline-flex">{shortcutModifier} K</Kbd.Root>
      </Dialog.Trigger>

      <Dialog.Content
        className="top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0 sm:max-w-xl"
        showCloseButton={false}
      >
        <Dialog.Header className="sr-only">
          <Dialog.Title>Search documentation</Dialog.Title>
          <Dialog.Description>
            Find pages, components, and templates in Sajam UI.
          </Dialog.Description>
        </Dialog.Header>
        <SearchPalette onSelect={selectPage} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

type SearchResult = {
  title: string
  description: string
  href: string
  meta?: string
  icon: ComponentType<{ className?: string }>
}

type SearchGroup = {
  value: string
  items: SearchResult[]
}

type SearchItemProps = {
  result: SearchResult
  onSelect: (href: string) => void
}

// Lives inside the dialog content so the query resets whenever the dialog closes.
function SearchPalette({ onSelect }: { onSelect: (href: string) => void }) {
  const [query, setQuery] = useState("")

  return (
    <Command.Root
      items={resultGroups}
      filteredItems={rankResults(query)}
      value={query}
      onValueChange={setQuery}
    >
      <Command.Input
        autoFocus
        aria-label="Search documentation"
        placeholder="Search documentation…"
      />
      <Command.List className="max-h-[min(28rem,65vh)]">
        {function (group: SearchGroup) {
          return (
            <Command.Group
              key={group.value}
              items={group.items}
            >
              <Command.GroupLabel>{group.value}</Command.GroupLabel>
              <Command.Collection>
                {function (result: SearchResult) {
                  return (
                    <SearchItem
                      key={result.href}
                      result={result}
                      onSelect={onSelect}
                    />
                  )
                }}
              </Command.Collection>
            </Command.Group>
          )
        }}
      </Command.List>
      <Command.Empty>No documentation found.</Command.Empty>
    </Command.Root>
  )
}

// Rank title prefixes above title matches above description matches, so Enter picks the best hit.
function rankResults(query: string) {
  const term = query.trim().toLowerCase()
  if (!term) return resultGroups
  return resultGroups
    .map(function (group) {
      const scored = group.items
        .map(function (result) {
          const title = result.title.toLowerCase()
          const score = title.startsWith(term)
            ? 3
            : title.includes(term)
              ? 2
              : `${result.description} ${result.meta ?? ""}`.toLowerCase().includes(term)
                ? 1
                : 0
          return { result, score }
        })
        .filter(function (entry) {
          return entry.score > 0
        })
        .sort(function (a, b) {
          return b.score - a.score
        })
      return {
        group: { value: group.value, items: scored.map((entry) => entry.result) },
        best: scored[0]?.score ?? 0,
      }
    })
    .filter(function (entry) {
      return entry.best > 0
    })
    .sort(function (a, b) {
      return b.best - a.best
    })
    .map(function (entry) {
      return entry.group
    })
}

function SearchItem({ result, onSelect }: SearchItemProps) {
  const Icon = result.icon

  return (
    <Command.Item
      value={result}
      onClick={function () {
        onSelect(result.href)
      }}
      className="items-start py-2"
    >
      <Icon className="text-muted-foreground mt-0.5 size-4" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-medium">{result.title}</span>
          {result.meta ? (
            <span className="text-muted-foreground ml-auto hidden text-xs sm:inline">
              {result.meta}
            </span>
          ) : null}
        </span>
        <span className="text-muted-foreground line-clamp-1 block text-xs">
          {result.description}
        </span>
      </span>
    </Command.Item>
  )
}
