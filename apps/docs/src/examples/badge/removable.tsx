"use client"

import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { useRef, useState } from "react"

const initialFilters = ["Design", "Engineering", "Marketing", "Remote"]

export default function RemovableBadgeExample() {
  const [filters, setFilters] = useState(initialFilters)
  const listRef = useRef<HTMLUListElement>(null)
  const resetRef = useRef<HTMLButtonElement>(null)

  function removeFilter(filter: string) {
    // Move focus to a neighboring remove button before this one unmounts.
    const buttons = Array.from(listRef.current?.querySelectorAll("button") ?? [])
    const index = filters.indexOf(filter)
    ;(buttons[index + 1] ?? buttons[index - 1] ?? resetRef.current)?.focus()
    setFilters(
      filters.filter(function (item) {
        return item !== filter
      }),
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <ul
        ref={listRef}
        aria-label="Active filters"
        className="flex min-h-5 flex-wrap justify-center gap-2"
      >
        {filters.map(function (filter) {
          return (
            <li key={filter}>
              <Badge
                variant="secondary"
                removeLabel={`Remove ${filter}`}
                onRemove={function () {
                  removeFilter(filter)
                }}
              >
                {filter}
              </Badge>
            </li>
          )
        })}
      </ul>
      <Button
        ref={resetRef}
        variant="ghost"
        size="sm"
        disabled={filters.length === initialFilters.length}
        focusableWhenDisabled
        onClick={function () {
          setFilters(initialFilters)
        }}
      >
        Reset filters
      </Button>
    </div>
  )
}
