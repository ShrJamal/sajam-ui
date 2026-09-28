"use client"

import { Button } from "@sajam/ui/button"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { Pagination } from "@sajam/ui/pagination"
import { useId, useState } from "react"

const totalItems = 250
const pageSize = 10
const totalPages = totalItems / pageSize

export default function PaginationJumpToPageExample() {
  const inputId = useId()
  const [page, setPage] = useState(1)
  const [requestedPage, setRequestedPage] = useState("1")

  function goTo(nextPage: number) {
    setPage(nextPage)
    setRequestedPage(String(nextPage))
  }

  return (
    <div className="grid w-full justify-items-center gap-4">
      <Pagination.Controls
        totalItems={totalItems}
        pageSize={pageSize}
        page={page}
        onPageChange={goTo}
        siblingCount={0}
        className="justify-center"
      />
      <form
        className="flex items-center gap-2"
        onSubmit={function (event) {
          event.preventDefault()
          goTo(Math.min(totalPages, Math.max(1, Math.round(Number(requestedPage)) || 1)))
        }}
      >
        <Label htmlFor={inputId}>Go to page</Label>
        <Input
          id={inputId}
          type="number"
          min={1}
          max={totalPages}
          value={requestedPage}
          className="w-20"
          onChange={function (event) {
            setRequestedPage(event.target.value)
          }}
        />
        <Button
          type="submit"
          variant="outline"
        >
          Go
        </Button>
      </form>
    </div>
  )
}
