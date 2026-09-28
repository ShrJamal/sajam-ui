import { NavigationMenu } from "@sajam/ui/navigation-menu"
import {
  BookOpenIcon,
  BoxesIcon,
  CodeIcon,
  LayoutTemplateIcon,
  MessagesSquareIcon,
  PaletteIcon,
} from "lucide-react"

const columns = [
  {
    title: "Build",
    links: [
      {
        title: "Components",
        description: "Accessible building blocks",
        href: "#components",
        icon: BoxesIcon,
      },
      {
        title: "Templates",
        description: "Responsive page layouts",
        href: "#templates",
        icon: LayoutTemplateIcon,
      },
    ],
  },
  {
    title: "Learn",
    links: [
      {
        title: "Guides",
        description: "Patterns and integration notes",
        href: "#guides",
        icon: BookOpenIcon,
      },
      {
        title: "Examples",
        description: "Copyable code to adapt",
        href: "#examples",
        icon: CodeIcon,
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        title: "Themes",
        description: "Palettes shared by others",
        href: "#themes",
        icon: PaletteIcon,
      },
      {
        title: "Discussions",
        description: "Questions and ideas",
        href: "#discussions",
        icon: MessagesSquareIcon,
      },
    ],
  },
]

export default function MultiColumnNavigationExample() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div className="grid w-[min(42rem,calc(100vw-2rem))] gap-4 p-2 sm:grid-cols-3">
              {columns.map(function (column) {
                return (
                  <section key={column.title}>
                    <h3 className="text-muted-foreground px-2 pb-1 text-xs font-medium">
                      {column.title}
                    </h3>
                    <ul className="grid gap-1">
                      {column.links.map(function (link) {
                        return (
                          <li key={link.href}>
                            <NavigationMenu.Link
                              href={link.href}
                              className="items-start"
                            >
                              <link.icon className="text-muted-foreground mt-0.5" />
                              <span>
                                <span className="block font-medium">{link.title}</span>
                                <span className="text-muted-foreground block text-xs">
                                  {link.description}
                                </span>
                              </span>
                            </NavigationMenu.Link>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                )
              })}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#pricing"
            className={NavigationMenu.triggerStyle()}
          >
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#changelog"
            className={NavigationMenu.triggerStyle()}
          >
            Changelog
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
