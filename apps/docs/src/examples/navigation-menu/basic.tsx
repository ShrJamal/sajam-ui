import { NavigationMenu } from "@sajam/ui/navigation-menu"
import { BlocksIcon } from "lucide-react"

const guides = [
  { title: "Installation", description: "Add the package to a React app.", href: "#installation" },
  { title: "Theming", description: "Tune colors, radius, and type.", href: "#theming" },
  { title: "Accessibility", description: "Keyboard and screen reader support.", href: "#a11y" },
]

const components = [
  { title: "Button", href: "#button" },
  { title: "Dialog", href: "#dialog" },
  { title: "Menu", href: "#menu" },
  { title: "Table", href: "#table" },
]

export default function SiteNavigationExample() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Guides</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div className="grid w-[min(28rem,calc(100vw-2rem))] gap-1 sm:grid-cols-[10rem_1fr]">
              <NavigationMenu.Link
                href="#overview"
                className="from-primary/15 to-muted flex-col items-start justify-end gap-1 bg-linear-to-br p-4"
              >
                <BlocksIcon className="text-primary mb-auto size-6" />
                <span className="font-medium">Sajam UI</span>
                <span className="text-muted-foreground text-xs">Components for React apps.</span>
              </NavigationMenu.Link>
              <ul className="grid gap-1">
                {guides.map(function (guide) {
                  return (
                    <li key={guide.href}>
                      <NavigationMenu.Link
                        href={guide.href}
                        className="flex-col items-start gap-0.5"
                      >
                        <span className="font-medium">{guide.title}</span>
                        <span className="text-muted-foreground text-xs">{guide.description}</span>
                      </NavigationMenu.Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-44 gap-1">
              {components.map(function (component) {
                return (
                  <li key={component.href}>
                    <NavigationMenu.Link href={component.href}>
                      {component.title}
                    </NavigationMenu.Link>
                  </li>
                )
              })}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#blog"
            className={NavigationMenu.triggerStyle()}
          >
            Blog
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
