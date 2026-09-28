"use client"

import { VirtualScroller } from "@sajam/ui/virtual-scroller"

const sentences = [
  "Shipped the new billing page.",
  "Reviewed the onboarding copy and left a few suggestions about tone and length for the welcome email.",
  "Merged the fix.",
  "Paired on the search indexer. We found that the nightly job retried failed batches forever, so we added a limit and an alert.",
]

const messages = Array.from({ length: 2_000 }, function (_, index) {
  return { id: index + 1, text: sentences[index % sentences.length]! }
})

export default function VariableHeightExample() {
  return (
    <VirtualScroller
      items={messages}
      itemKey={function (message) {
        return message.id
      }}
      estimatedItemSize={64}
      height={280}
      label="Team updates"
      className="w-full"
      renderItem={function (message) {
        return (
          <div className="border-b px-3 py-2.5">
            <p className="text-muted-foreground text-xs">Update {message.id}</p>
            <p className="text-sm">{message.text}</p>
          </div>
        )
      }}
    />
  )
}
