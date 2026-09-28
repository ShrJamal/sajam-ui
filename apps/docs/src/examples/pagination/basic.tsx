"use client"

import { Pagination } from "@sajam/ui/pagination"
import { useState } from "react"

const totalPages = 10

export default function PaginationBasicExample() {
  const [page, setPage] = useState(1)
  const start = Math.min(Math.max(page - 1, 1), totalPages - 2)
  const visiblePages = [start, start + 1, start + 2]

  return (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            href="#"
            aria-disabled={page === 1}
            onClick={function (event) {
              event.preventDefault()
              setPage(page - 1)
            }}
          />
        </Pagination.Item>
        {visiblePages.map(function (number) {
          return (
            <Pagination.Item key={number}>
              <Pagination.Link
                href="#"
                isActive={page === number}
                onClick={function (event) {
                  event.preventDefault()
                  setPage(number)
                }}
              >
                {number}
              </Pagination.Link>
            </Pagination.Item>
          )
        })}
        {start + 2 < totalPages ? (
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        ) : null}
        <Pagination.Item>
          <Pagination.Next
            href="#"
            aria-disabled={page === totalPages}
            onClick={function (event) {
              event.preventDefault()
              setPage(page + 1)
            }}
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  )
}
