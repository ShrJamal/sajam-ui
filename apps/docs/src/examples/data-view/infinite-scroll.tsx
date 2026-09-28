"use client"

import { DataView } from "@sajam/ui/data-view"
import { useState } from "react"

type Update = { id: number; text: string }

const TOTAL = 30

export default function InfiniteDataViewExample() {
  const [updates, setUpdates] = useState<Update[]>(function () {
    return createUpdates(0)
  })
  const [loading, setLoading] = useState(false)

  async function loadMore() {
    setLoading(true)
    // Replace with a request for the next page of records.
    await new Promise(function (resolve) {
      setTimeout(resolve, 700)
    })
    setUpdates(function (current) {
      return [...current, ...createUpdates(current.length)]
    })
    setLoading(false)
  }

  return (
    <div className="max-h-80 w-full overflow-auto rounded-lg border p-3">
      <DataView
        items={updates}
        itemKey={function (update) {
          return update.id
        }}
        label="Activity"
        paging="infinite"
        hasMore={updates.length < TOTAL}
        loading={loading}
        onLoadMore={loadMore}
        showLayoutToggle={false}
        renderItem={function (update) {
          return <p className="bg-muted/50 rounded-md px-3 py-2 text-sm">{update.text}</p>
        }}
      />
    </div>
  )
}

function createUpdates(offset: number): Update[] {
  return Array.from({ length: 6 }, function (_, index) {
    const id = offset + index + 1
    return { id, text: `Activity update ${id}` }
  })
}
