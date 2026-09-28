"use client"

import { Bubble } from "@sajam/ui/bubble"
import { Button } from "@sajam/ui/button"
import { Input } from "@sajam/ui/input"
import { Message } from "@sajam/ui/message"
import { MessageScroller } from "@sajam/ui/message-scroller"
import { SendIcon } from "lucide-react"
import { useState } from "react"

const initialMessages = [
  "Welcome to the release channel.",
  "Builds post here when they finish.",
  "Send a message to see the view follow it.",
]

export default function MessageScrollerLiveExample() {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState("")

  return (
    <div className="grid w-full max-w-sm gap-2">
      <MessageScroller.Provider autoScroll>
        <MessageScroller.Root className="h-60 rounded-xl border">
          <MessageScroller.Viewport>
            <MessageScroller.Content className="gap-3 p-4">
              {messages.map(function (message, index) {
                return (
                  <MessageScroller.Item
                    key={index}
                    messageId={String(index)}
                  >
                    <Message.Root align={index < initialMessages.length ? "start" : "end"}>
                      <Message.Content>
                        <Bubble.Root
                          variant={index < initialMessages.length ? "secondary" : "default"}
                        >
                          <Bubble.Content>{message}</Bubble.Content>
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
      <form
        className="flex gap-2"
        onSubmit={function (event) {
          event.preventDefault()
          const text = draft.trim()
          if (!text) return
          setMessages([...messages, text])
          setDraft("")
        }}
      >
        <Input
          aria-label="Message"
          placeholder="Write a message"
          value={draft}
          onChange={function (event) {
            setDraft(event.target.value)
          }}
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Send message"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  )
}
