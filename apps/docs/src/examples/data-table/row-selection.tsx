"use client"

import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import {
  DataTable,
  type DataTableColumn,
  type DataTableRowSelectionState,
} from "@sajam/ui/data-table"
import { ArchiveIcon } from "lucide-react"
import { useState } from "react"

const initialInvoices: Invoice[] = [
  { id: "INV-1001", customer: "Alex Morgan", amount: 240, status: "Paid" },
  { id: "INV-1002", customer: "Riley Chen", amount: 590, status: "Pending" },
  { id: "INV-1003", customer: "Sam Lee", amount: 120, status: "Paid" },
  { id: "INV-1004", customer: "Jordan Blake", amount: 890, status: "Overdue" },
  { id: "INV-1005", customer: "Casey Reed", amount: 310, status: "Paid" },
  { id: "INV-1006", customer: "Drew Parker", amount: 470, status: "Pending" },
  { id: "INV-1007", customer: "Taylor Quinn", amount: 150, status: "Paid" },
]

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "destructive",
} as const

const columns: DataTableColumn<Invoice>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "status",
    header: "Status",
    cell: function ({ row }) {
      return <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: function ({ row }) {
      return <span className="tabular-nums">${row.original.amount.toFixed(2)}</span>
    },
  },
]

export default function DataTableRowSelectionExample() {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>({})
  const selectedCount = Object.keys(rowSelection).length

  return (
    <DataTable
      label="Invoices"
      columns={columns}
      data={invoices}
      getRowId={function (invoice) {
        return invoice.id
      }}
      selectionMode="multiple"
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      defaultPagination={{ pageIndex: 0, pageSize: 5 }}
      toolbar={
        <Button
          variant="outline"
          disabled={selectedCount === 0}
          onClick={function () {
            setInvoices(function (current) {
              return current.filter(function (invoice) {
                return !rowSelection[invoice.id]
              })
            })
            setRowSelection({})
          }}
        >
          <ArchiveIcon />
          Archive{selectedCount > 0 ? ` (${selectedCount})` : ""}
        </Button>
      }
      emptyMessage="All invoices are archived."
    />
  )
}

type Invoice = {
  id: string
  customer: string
  amount: number
  status: keyof typeof statusVariant
}
