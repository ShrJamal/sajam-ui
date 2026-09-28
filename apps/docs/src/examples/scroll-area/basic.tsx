import { ScrollArea } from "@sajam/ui/scroll-area"
import { Separator } from "@sajam/ui/separator"

const releases = Array.from({ length: 30 }, function (_, index) {
  return `v1.${30 - index}.0`
})

export default function ScrollAreaExample() {
  return (
    <ScrollArea.Root className="h-64 w-48 rounded-xl border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium">Releases</h4>
        {releases.map(function (release, index) {
          return (
            <div key={release}>
              {index > 0 && <Separator className="my-2" />}
              <p className="font-mono text-sm">{release}</p>
            </div>
          )
        })}
      </div>
    </ScrollArea.Root>
  )
}
