"use client"

import { Badge } from "@sajam/ui/badge"
import {
  DataTable,
  type DataTableColumn,
  type DataTablePaginationState,
  type DataTableSortingState,
} from "@sajam/ui/data-table"
import { useEffect, useState } from "react"

const statuses = ["Delivered", "Shipped", "Processing"] as const

const customers = ["Alex Morgan", "Riley Chen", "Sam Lee", "Jordan Blake", "Casey Reed"]

// Stands in for a database table on your server.
const allOrders: Order[] = Array.from({ length: 57 }, function (_, index) {
  return {
    id: `ORD-${String(2001 + index)}`,
    customer: customers[index % customers.length] ?? "",
    items: 1 + ((index * 7) % 9),
    status: statuses[index % statuses.length] ?? "Processing",
  }
})

const columns: DataTableColumn<Order>[] = [
  { accessorKey: "id", header: "Order" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "items", header: "Items" },
  {
    accessorKey: "status",
    header: "Status",
    cell: function ({ row }) {
      return (
        <Badge variant={row.original.status === "Delivered" ? "success" : "secondary"}>
          {row.original.status}
        </Badge>
      )
    },
  },
]

export default function DataTableServerSideExample() {
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<DataTableSortingState>([])
  const [search, setSearch] = useState("")
  const [result, setResult] = useState<QueryResult>({ rows: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(
    function () {
      setLoading(true)
      // Replace this timer with a request to your API.
      const timer = setTimeout(function () {
        setResult(queryOrders({ pagination, sorting, search }))
        setLoading(false)
      }, 400)
      return function () {
        clearTimeout(timer)
      }
    },
    [pagination, sorting, search],
  )

  return (
    <DataTable
      label="Orders"
      columns={columns}
      data={result.rows}
      getRowId={function (order) {
        return order.id
      }}
      manual
      rowCount={result.total}
      loading={loading}
      pagination={pagination}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      searchable
      globalFilter={search}
      onGlobalFilterChange={setSearch}
      labels={{ searchPlaceholder: "Search orders…" }}
      selectionMode="multiple"
      pageSizeOptions={[5, 10, 20]}
    />
  )
}

type Order = {
  id: string
  customer: string
  items: number
  status: (typeof statuses)[number]
}

type QueryResult = { rows: Order[]; total: number }

function queryOrders({
  pagination,
  sorting,
  search,
}: {
  pagination: DataTablePaginationState
  sorting: DataTableSortingState
  search: string
}): QueryResult {
  const query = search.trim().toLowerCase()
  const matches = allOrders.filter(function (order) {
    return [order.id, order.customer, order.status].some(function (value) {
      return value.toLowerCase().includes(query)
    })
  })
  const sort = sorting[0]
  if (sort) {
    const key = sort.id as keyof Order
    matches.sort(function (left, right) {
      const result = String(left[key]).localeCompare(String(right[key]), undefined, {
        numeric: true,
      })
      return sort.desc ? -result : result
    })
  }
  const start = pagination.pageIndex * pagination.pageSize
  return { rows: matches.slice(start, start + pagination.pageSize), total: matches.length }
}
