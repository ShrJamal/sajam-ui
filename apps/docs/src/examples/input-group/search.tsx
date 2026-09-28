"use client"

import { InputGroup } from "@sajam/ui/input-group"
import { SearchIcon, XIcon } from "lucide-react"
import { useState } from "react"

export default function InputGroupSearchExample() {
  const [query, setQuery] = useState("")

  return (
    <InputGroup.Root className="max-w-sm">
      <InputGroup.Addon>
        <SearchIcon aria-hidden="true" />
      </InputGroup.Addon>
      <InputGroup.Input
        type="search"
        aria-label="Search projects"
        placeholder="Search projects…"
        value={query}
        onChange={function (event) {
          setQuery(event.currentTarget.value)
        }}
      />
      {query ? (
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button
            size="icon-xs"
            aria-label="Clear search"
            onClick={function () {
              setQuery("")
            }}
          >
            <XIcon />
          </InputGroup.Button>
        </InputGroup.Addon>
      ) : null}
    </InputGroup.Root>
  )
}
