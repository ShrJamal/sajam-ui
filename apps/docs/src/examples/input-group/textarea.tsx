"use client"

import { InputGroup } from "@sajam/ui/input-group"
import { SendIcon } from "lucide-react"
import { useState } from "react"

export default function InputGroupTextareaExample() {
  const [message, setMessage] = useState("")

  return (
    <InputGroup.Root className="max-w-sm">
      <InputGroup.Textarea
        aria-label="Message"
        placeholder="Write a message…"
        rows={3}
        maxLength={280}
        value={message}
        onChange={function (event) {
          setMessage(event.currentTarget.value)
        }}
      />
      <InputGroup.Addon align="block-end">
        <InputGroup.Text className="text-xs tabular-nums">{message.length}/280</InputGroup.Text>
        <InputGroup.Button
          size="sm"
          variant="default"
          className="ml-auto"
          disabled={!message.trim()}
          onClick={function () {
            setMessage("")
          }}
        >
          Send
          <SendIcon />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  )
}
