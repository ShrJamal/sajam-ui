import { Separator } from "@sajam/ui/separator"

export default function SeparatorExample() {
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Sajam UI</h4>
        <p className="text-muted-foreground text-sm">Components for every product you build.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Templates</span>
      </div>
    </div>
  )
}
