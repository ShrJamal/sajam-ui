"use client"

import { Combobox } from "@sajam/ui/combobox"
import { Label } from "@sajam/ui/label"
import { Spinner } from "@sajam/ui/spinner"
import { useEffect, useId, useRef, useState } from "react"

const directory = [
  "Alex Morgan",
  "Amara Okafor",
  "Jamie Diaz",
  "Leila Haddad",
  "Nora Patel",
  "Omar Aziz",
  "Sam Lee",
  "Yuki Tanaka",
]

export default function ComboboxAsyncSearchExample() {
  const id = useId()
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [reviewer, setReviewer] = useState<string | null>(null)
  // Keep the selected person in the items so its label survives new searches.
  const items = reviewer && !results.includes(reviewer) ? [...results, reviewer] : results

  useEffect(function () {
    return function () {
      clearTimeout(timeout.current)
    }
  }, [])

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Reviewer</Label>
      <Combobox.Root
        items={items}
        filter={null}
        value={reviewer}
        onValueChange={setReviewer}
        onInputValueChange={function (nextQuery, details) {
          if (details.reason === "item-press") return
          setQuery(nextQuery)
          clearTimeout(timeout.current)
          const search = nextQuery.trim().toLowerCase()
          if (!search) {
            setResults([])
            setLoading(false)
            return
          }
          setLoading(true)
          // Stand-in for a request to your search endpoint.
          timeout.current = setTimeout(function () {
            setResults(
              directory.filter(function (person) {
                return person.toLowerCase().includes(search)
              }),
            )
            setLoading(false)
          }, 400)
        }}
      >
        <Combobox.Input
          id={id}
          placeholder="Search people"
          showClear
          className="w-full"
        />
        <Combobox.Content aria-busy={loading || undefined}>
          <Combobox.Status>
            {loading ? (
              <>
                <Spinner aria-hidden />
                Searching…
              </>
            ) : null}
          </Combobox.Status>
          <Combobox.Empty>
            {loading ? null : query.trim() ? "No people found." : "Type a name to search."}
          </Combobox.Empty>
          <Combobox.List>
            {function (person: string) {
              return (
                <Combobox.Item
                  key={person}
                  value={person}
                >
                  {person}
                </Combobox.Item>
              )
            }}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  )
}
