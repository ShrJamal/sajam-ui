"use client"

import { Badge } from "@sajam/ui/badge"
import { DataTable, type DataTableColumn } from "@sajam/ui/data-table"

const orders: Order[] = [
  {
    id: "ORD-2041",
    customer: "Alex Morgan",
    status: "Shipped",
    address: "18 Harbor Street, Portland",
    items: [
      { name: "Desk lamp", quantity: 1, price: 64 },
      { name: "Notebook set", quantity: 3, price: 12 },
    ],
  },
  {
    id: "ORD-2042",
    customer: "Riley Chen",
    status: "Processing",
    address: "4 Elm Court, Austin",
    items: [{ name: "Standing desk", quantity: 1, price: 420 }],
  },
  {
    id: "ORD-2043",
    customer: "Sam Lee",
    status: "Delivered",
    address: "92 Park Avenue, Denver",
    items: [
      { name: "Monitor arm", quantity: 2, price: 89 },
      { name: "Cable tray", quantity: 1, price: 24 },
    ],
  },
]

const columns: DataTableColumn<Order>[] = [
  { accessorKey: "id", header: "Order" },
  { accessorKey: "customer", header: "Customer" },
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
  {
    id: "total",
    header: "Total",
    accessorFn: function (order) {
      return getTotal(order)
    },
    cell: function ({ row }) {
      return <span className="tabular-nums">${getTotal(row.original).toFixed(2)}</span>
    },
  },
]

export default function DataTableExpandableDetailExample() {
  return (
    <DataTable
      label="Orders"
      columns={columns}
      data={orders}
      getRowId={function (order) {
        return order.id
      }}
      paginate={false}
      renderSubComponent={function (row) {
        return (
          <div className="grid gap-2 py-1 text-sm">
            <p className="text-muted-foreground">Ships to {row.original.address}</p>
            <ul className="grid gap-1">
              {row.original.items.map(function (item) {
                return (
                  <li
                    key={item.name}
                    className="flex justify-between gap-4"
                  >
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span className="tabular-nums">${(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }}
    />
  )
}

type Order = {
  id: string
  customer: string
  status: "Processing" | "Shipped" | "Delivered"
  address: string
  items: { name: string; quantity: number; price: number }[]
}

function getTotal(order: Order) {
  return order.items.reduce(function (sum, item) {
    return sum + item.quantity * item.price
  }, 0)
}
