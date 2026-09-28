import { Toolbar } from "@sajam/ui/toolbar"
import { Tooltip } from "@sajam/ui/tooltip"
import { CalendarIcon, FolderIcon, MailIcon, MessageCircleIcon, SettingsIcon } from "lucide-react"

const apps = [
  { label: "Messages", icon: MessageCircleIcon },
  { label: "Mail", icon: MailIcon },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Files", icon: FolderIcon },
  { label: "Settings", icon: SettingsIcon },
]

// A dock-style launcher: icon buttons with tooltips and arrow-key navigation.
export default function ToolbarDockExample() {
  return (
    <div className="from-primary/15 to-muted flex min-h-48 w-full items-end justify-center rounded-xl bg-linear-to-br p-4">
      <Tooltip.Provider>
        <Toolbar.Root
          aria-label="Apps"
          className="bg-background/80 w-fit gap-2 rounded-2xl p-2 shadow-lg backdrop-blur"
        >
          {apps.map(function (app) {
            const Icon = app.icon
            return (
              <Tooltip.Root key={app.label}>
                <Tooltip.Trigger
                  render={
                    <Toolbar.Button
                      variant="secondary"
                      size="icon-lg"
                      aria-label={app.label}
                      className="size-10 rounded-xl hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                    />
                  }
                >
                  <Icon className="size-5" />
                </Tooltip.Trigger>
                <Tooltip.Content>{app.label}</Tooltip.Content>
              </Tooltip.Root>
            )
          })}
        </Toolbar.Root>
      </Tooltip.Provider>
    </div>
  )
}
