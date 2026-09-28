import { Collapsible } from "@sajam/ui/collapsible"
import { Sidebar } from "@sajam/ui/sidebar"
import { ChevronRightIcon, FolderIcon, SettingsIcon, UsersIcon } from "lucide-react"

const activeHref = "#website"

const sections = [
  {
    title: "Projects",
    icon: FolderIcon,
    defaultOpen: true,
    items: [
      { title: "Website", href: "#website" },
      { title: "Mobile app", href: "#mobile-app" },
      { title: "Design system", href: "#design-system" },
    ],
  },
  {
    title: "Team",
    icon: UsersIcon,
    items: [
      { title: "Members", href: "#members" },
      { title: "Invitations", href: "#invitations" },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    items: [
      { title: "General", href: "#general" },
      { title: "Billing", href: "#billing" },
      { title: "Notifications", href: "#notifications" },
    ],
  },
]

// Each section is a Collapsible rendered as a menu item, with its trigger rendered as the menu button.
export default function CollapsibleSubmenusExample() {
  return (
    <Sidebar.Provider
      contained
      keyboardShortcut={false}
      className="h-96 rounded-xl border"
    >
      <Sidebar.Root
        collapsible="none"
        className="border-r"
      >
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Sidebar.Menu>
              {sections.map(function (section) {
                return (
                  <Collapsible.Root
                    key={section.title}
                    defaultOpen={section.defaultOpen}
                    render={<Sidebar.MenuItem />}
                  >
                    <Collapsible.Trigger render={<Sidebar.MenuButton />}>
                      <section.icon />
                      <span>{section.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform group-data-panel-open/menu-button:rotate-90" />
                    </Collapsible.Trigger>
                    <Collapsible.Content className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
                      <Sidebar.MenuSub>
                        {section.items.map(function (item) {
                          return (
                            <Sidebar.MenuSubItem key={item.href}>
                              <Sidebar.MenuSubButton
                                href={item.href}
                                isActive={item.href === activeHref}
                              >
                                <span>{item.title}</span>
                              </Sidebar.MenuSubButton>
                            </Sidebar.MenuSubItem>
                          )
                        })}
                      </Sidebar.MenuSub>
                    </Collapsible.Content>
                  </Collapsible.Root>
                )
              })}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>
      <Sidebar.Inset className="text-muted-foreground grid place-items-center text-sm">
        Website
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}
