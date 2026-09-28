import { Breadcrumb } from "@sajam/ui/breadcrumb"
import { DropdownMenu } from "@sajam/ui/dropdown-menu"

const hiddenPages = [
  { title: "Workspace", href: "#workspace" },
  { title: "Design system", href: "#design-system" },
  { title: "Components", href: "#components" },
]

export default function CollapsedBreadcrumbExample() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="hover:text-foreground focus-visible:ring-ring/50 rounded-sm outline-none focus-visible:ring-3">
              <Breadcrumb.Ellipsis label="Show hidden pages" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {hiddenPages.map(function (page) {
                return (
                  <DropdownMenu.LinkItem
                    key={page.href}
                    href={page.href}
                    closeOnClick
                  >
                    {page.title}
                  </DropdownMenu.LinkItem>
                )
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
