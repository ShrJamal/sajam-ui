import { Sidebar } from "@sajam/ui/sidebar"
import {
  BarChart3Icon,
  ChevronsUpDownIcon,
  FolderIcon,
  GalleryVerticalEndIcon,
  InboxIcon,
  LayoutDashboardIcon,
} from "lucide-react"

const navigation = [
  { title: "Overview", href: "#overview", icon: LayoutDashboardIcon, active: true },
  { title: "Projects", href: "#projects", icon: FolderIcon },
  { title: "Inbox", href: "#inbox", icon: InboxIcon, badge: 4 },
  { title: "Reports", href: "#reports", icon: BarChart3Icon },
]

// `contained` keeps the sidebar inside this bordered preview instead of the viewport.
export default function AppShellSidebarExample() {
  return (
    <Sidebar.Provider
      contained
      keyboardShortcut={false}
      className="h-96 rounded-xl border"
    >
      <Sidebar.Root collapsible="icon">
        <Sidebar.Header>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                size="lg"
                render={<a href="#home" />}
              >
                <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <GalleryVerticalEndIcon />
                </span>
                <span className="grid leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="text-muted-foreground truncate text-xs">Enterprise</span>
                </span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu>
              {navigation.map(function (item) {
                return (
                  <Sidebar.MenuItem key={item.href}>
                    <Sidebar.MenuButton
                      isActive={item.active}
                      tooltip={item.title}
                      render={<a href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Sidebar.MenuButton>
                    {item.badge ? <Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge> : null}
                  </Sidebar.MenuItem>
                )
              })}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton size="lg">
                <span className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium">
                  MR
                </span>
                <span className="grid flex-1 leading-tight">
                  <span className="truncate font-medium">Maya Reyes</span>
                  <span className="text-muted-foreground truncate text-xs">maya@example.com</span>
                </span>
                <ChevronsUpDownIcon className="ml-auto" />
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar.Root>
      <Sidebar.Inset>
        <header className="flex h-12 items-center gap-2 border-b px-3">
          <Sidebar.Trigger />
          <span className="text-sm font-medium">Overview</span>
        </header>
        <div className="grid flex-1 auto-rows-min gap-3 p-4 sm:grid-cols-3">
          <div className="bg-muted/60 h-20 rounded-lg" />
          <div className="bg-muted/60 h-20 rounded-lg" />
          <div className="bg-muted/60 h-20 rounded-lg" />
          <div className="bg-muted/60 h-32 rounded-lg sm:col-span-3" />
        </div>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}
