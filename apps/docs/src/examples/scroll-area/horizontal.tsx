import { ScrollArea } from "@sajam/ui/scroll-area"

const boards = ["Backlog", "Design", "In progress", "Review", "Testing", "Ready", "Released"]

export default function ScrollAreaHorizontalExample() {
  return (
    <ScrollArea.Root
      scrollbars="horizontal"
      className="w-full max-w-sm rounded-xl border"
    >
      <div className="flex w-max gap-3 p-4">
        {boards.map(function (board) {
          return (
            <div
              key={board}
              className="bg-muted grid h-24 w-32 shrink-0 place-items-center rounded-lg text-sm font-medium"
            >
              {board}
            </div>
          )
        })}
      </div>
    </ScrollArea.Root>
  )
}
