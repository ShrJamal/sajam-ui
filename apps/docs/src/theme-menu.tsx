import { Button } from "@sajam/ui/button"
import { Popover } from "@sajam/ui/popover"
import { ArrowUpRightIcon, PaintbrushIcon } from "lucide-react"
import { ThemeControls } from "./theme-controls"
import { resetTheme, updateTheme, useSiteTheme } from "./theme-state"

// Keep the same appearance controls within reach on every page.
export function ThemeMenu({ floating = false }: Props) {
  const { settings } = useSiteTheme()
  return (
    <div className={floating ? "preview-theme-menu fixed right-5 bottom-5 z-40" : undefined}>
      <Popover.Root>
        <Popover.Trigger
          render={
            <Button
              variant="outline"
              className="bg-background shadow-sm"
            />
          }
          aria-label="Customize theme"
        >
          <PaintbrushIcon />
          <span className={floating ? undefined : "hidden sm:inline"}>Theme</span>
        </Popover.Trigger>
        <Popover.Content
          align="end"
          side={floating ? "top" : "bottom"}
          sideOffset={10}
          className="max-h-[min(46rem,calc(100svh-6rem))] w-80 max-w-[calc(100vw-2rem)] gap-5 overflow-y-auto p-5"
        >
          <div>
            <Popover.Title>Make it yours</Popover.Title>
            <Popover.Description className="mt-1 text-xs leading-5">
              Change the look of every demo and template.
            </Popover.Description>
          </div>
          <ThemeControls
            settings={settings}
            onChange={updateTheme}
            onReset={resetTheme}
          />
          <Button
            variant="ghost"
            nativeButton={false}
            render={<a href="/theming" />}
          >
            Open theme builder <ArrowUpRightIcon />
          </Button>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

type Props = { floating?: boolean }
