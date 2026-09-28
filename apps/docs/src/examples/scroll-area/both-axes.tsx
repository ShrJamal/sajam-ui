import { ScrollArea } from "@sajam/ui/scroll-area"

export default function ScrollAreaBothAxesExample() {
  return (
    <ScrollArea.Root
      scrollbars="both"
      className="h-60 w-full max-w-sm rounded-xl border"
    >
      <div className="grid w-2xl grid-cols-6 gap-3 p-4">
        {Array.from({ length: 36 }, function (_, index) {
          return (
            <div
              key={index}
              className="bg-muted grid h-20 place-items-center rounded-lg text-xs tabular-nums"
            >
              Cell {index + 1}
            </div>
          )
        })}
      </div>
    </ScrollArea.Root>
  )
}
