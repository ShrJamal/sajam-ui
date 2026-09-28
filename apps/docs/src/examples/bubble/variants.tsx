import { Bubble } from "@sajam/ui/bubble"

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const

export default function BubbleVariantsExample() {
  return (
    <Bubble.Group className="w-full max-w-sm">
      {variants.map(function (variant) {
        return (
          <Bubble.Root
            key={variant}
            variant={variant}
          >
            <Bubble.Content className="capitalize">{variant}</Bubble.Content>
          </Bubble.Root>
        )
      })}
    </Bubble.Group>
  )
}
