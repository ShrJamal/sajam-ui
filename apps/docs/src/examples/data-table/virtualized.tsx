"use client"

import { Badge } from "@sajam/ui/badge"
import { DataTable, type DataTableColumn } from "@sajam/ui/data-table"

const levels = ["Info", "Info", "Warning", "Info", "Error"] as const

const services = ["api", "billing", "auth", "search"]

const events: LogEvent[] = Array.from({ length: 10000 }, function (_, index) {
  const level = levels[index % levels.length] ?? "Info"
  return {
    id: String(index + 1),
    level,
    service: services[index % services.length] ?? "api",
    message:
      level === "Error"
        ? `Request ${index + 1} failed after 3 retries`
        : level === "Warning"
          ? `Slow response for request ${index + 1}`
          : `Handled request ${index + 1}`,
  }
})

const levelVariant = { Info: "info", Warning: "warning", Error: "destructive" } as const

const columns: DataTableColumn<LogEvent>[] = [
  { accessorKey: "id", header: "#", sortFn: "alphanumeric" },
  {
    accessorKey: "level",
    header: "Level",
    cell: function ({ row }) {
      return <Badge variant={levelVariant[row.original.level]}>{row.original.level}</Badge>
    },
  },
  { accessorKey: "service", header: "Service" },
  { accessorKey: "message", header: "Message" },
]

export default function DataTableVirtualizedExample() {
  return (
    <DataTable
      label="Log events"
      columns={columns}
      data={events}
      getRowId={function (event) {
        return event.id
      }}
      searchable
      labels={{ searchPlaceholder: "Search 10,000 events…" }}
      density="compact"
      paginate={false}
      virtual={{ height: 360 }}
    />
  )
}

type LogEvent = {
  id: string
  level: (typeof levels)[number]
  service: string
  message: string
}
