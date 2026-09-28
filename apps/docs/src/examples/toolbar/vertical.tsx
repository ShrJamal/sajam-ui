import { ToggleGroup } from "@sajam/ui/toggle-group"
import { Toolbar } from "@sajam/ui/toolbar"
import { MousePointer2Icon, PenLineIcon, SquareIcon, TypeIcon, UndoIcon } from "lucide-react"

const tools = [
  { value: "select", label: "Select", icon: MousePointer2Icon },
  { value: "draw", label: "Draw", icon: PenLineIcon },
  { value: "shape", label: "Shape", icon: SquareIcon },
  { value: "text", label: "Text", icon: TypeIcon },
]

export default function VerticalToolbarExample() {
  return (
    <Toolbar.Root
      orientation="vertical"
      aria-label="Drawing tools"
    >
      <ToggleGroup.Root
        orientation="vertical"
        defaultValue={["select"]}
        aria-label="Tool"
      >
        {tools.map(function (tool) {
          const Icon = tool.icon
          return (
            <Toolbar.Button
              key={tool.value}
              size="icon"
              aria-label={tool.label}
              render={<ToggleGroup.Item value={tool.value} />}
            >
              <Icon />
            </Toolbar.Button>
          )
        })}
      </ToggleGroup.Root>
      <Toolbar.Separator />
      <Toolbar.Button
        size="icon"
        aria-label="Undo"
      >
        <UndoIcon />
      </Toolbar.Button>
    </Toolbar.Root>
  )
}
