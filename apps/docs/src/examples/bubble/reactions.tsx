import { Bubble } from "@sajam/ui/bubble"

export default function BubbleReactionsExample() {
  return (
    <Bubble.Group className="w-full max-w-sm gap-6">
      <Bubble.Root variant="secondary">
        <Bubble.Content>This direction feels right.</Bubble.Content>
        <Bubble.Reactions aria-label="2 reactions: thumbs up">👍 2</Bubble.Reactions>
      </Bubble.Root>
      <Bubble.Root align="end">
        <Bubble.Content>Great, I’ll share it with the team.</Bubble.Content>
        <Bubble.Reactions
          align="start"
          aria-label="1 reaction: party popper"
        >
          🎉
        </Bubble.Reactions>
      </Bubble.Root>
    </Bubble.Group>
  )
}
