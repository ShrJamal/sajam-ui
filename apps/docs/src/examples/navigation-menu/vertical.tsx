import { NavigationMenu } from "@sajam/ui/navigation-menu"

const products = [
  { title: "Components", href: "#components" },
  { title: "Templates", href: "#templates" },
  { title: "Themes", href: "#themes" },
]

const solutions = [
  { title: "Dashboards", href: "#dashboards" },
  { title: "Marketing sites", href: "#marketing" },
  { title: "Internal tools", href: "#internal-tools" },
]

// Vertical menus open their panels beside the trigger (the inline-end side by default).
export default function VerticalNavigationExample() {
  return (
    <NavigationMenu.Root
      orientation="vertical"
      className="w-48"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-44 gap-1">
              {products.map(function (link) {
                return (
                  <li key={link.href}>
                    <NavigationMenu.Link href={link.href}>{link.title}</NavigationMenu.Link>
                  </li>
                )
              })}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="grid w-44 gap-1">
              {solutions.map(function (link) {
                return (
                  <li key={link.href}>
                    <NavigationMenu.Link href={link.href}>{link.title}</NavigationMenu.Link>
                  </li>
                )
              })}
            </ul>
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
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
