import { Bubble } from "@sajam/ui/bubble"
import { Message } from "@sajam/ui/message"
import { MessageScroller } from "@sajam/ui/message-scroller"
import { Separator } from "@sajam/ui/separator"

const messages = [
  { id: "1", from: "them", text: "Morning! Did the nightly build pass?" },
  { id: "2", from: "me", text: "It did. Every check is green." },
  { id: "3", from: "them", text: "Great. Any changes to the release notes?" },
  { id: "4", from: "me", text: "I added the new carousel keyboard support." },
  { id: "5", from: "them", text: "Nice. And the image preview fixes?" },
  { id: "6", from: "me", text: "Those too, including zoom and pan." },
  { id: "7", from: "them", text: "Perfect. Let’s ship it after lunch." },
  { id: "8", from: "me", text: "Sounds good. I’ll tag the release." },
]

export default function MessageScrollerExample() {
  return (
    <MessageScroller.Provider>
      <MessageScroller.Root className="h-72 w-full max-w-sm rounded-xl border">
        <MessageScroller.Viewport>
          <MessageScroller.Content className="gap-3 p-4">
            <MessageScroller.Item>
              <Separator>Today</Separator>
            </MessageScroller.Item>
            {messages.map(function (message) {
              return (
                <MessageScroller.Item
                  key={message.id}
                  messageId={message.id}
                >
                  <Message.Root align={message.from === "me" ? "end" : "start"}>
                    <Message.Content>
                      <Bubble.Root variant={message.from === "me" ? "default" : "secondary"}>
                        <Bubble.Content>{message.text}</Bubble.Content>
                      </Bubble.Root>
                    </Message.Content>
                  </Message.Root>
                </MessageScroller.Item>
              )
            })}
          </MessageScroller.Content>
        </MessageScroller.Viewport>
        <MessageScroller.Button aria-label="Scroll to latest message" />
      </MessageScroller.Root>
    </MessageScroller.Provider>
  )
}
