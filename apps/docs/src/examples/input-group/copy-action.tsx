"use client"

import { InputGroup } from "@sajam/ui/input-group"
import { Label } from "@sajam/ui/label"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useId, useState } from "react"

const apiKey = "sk_live_51H8xample"

export default function InputGroupCopyActionExample() {
  const id = useId()
  const [copied, setCopied] = useState(false)

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>API key</Label>
      <InputGroup.Root>
        <InputGroup.Input
          id={id}
          value={apiKey}
          readOnly
          className="font-mono"
        />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button
            onClick={function () {
              void navigator.clipboard?.writeText(apiKey)
              setCopied(true)
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied" : "Copy"}
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  )
}
