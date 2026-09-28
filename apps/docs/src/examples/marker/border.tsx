import { Bubble } from "@sajam/ui/bubble"
import { Marker } from "@sajam/ui/marker"

export default function MarkerBorderExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Bubble.Root variant="secondary">
        <Bubble.Content>I pushed the fix for the login bug.</Bubble.Content>
      </Bubble.Root>
      <Marker.Root
        variant="border"
        className="text-primary text-xs font-medium"
      >
        <Marker.Content>2 unread messages</Marker.Content>
      </Marker.Root>
      <Bubble.Root variant="secondary">
        <Bubble.Content>Tests are green on every browser.</Bubble.Content>
      </Bubble.Root>
    </div>
  )
}
