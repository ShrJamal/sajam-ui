import { Bubble } from "@sajam/ui/bubble"

export default function BubbleExample() {
  return (
    <Bubble.Group className="w-full max-w-sm">
      <Bubble.Root variant="secondary">
        <Bubble.Content>Are we still on for the design review?</Bubble.Content>
      </Bubble.Root>
      <Bubble.Root align="end">
        <Bubble.Content>Yes, 3 PM in the main room.</Bubble.Content>
      </Bubble.Root>
    </Bubble.Group>
  )
}
