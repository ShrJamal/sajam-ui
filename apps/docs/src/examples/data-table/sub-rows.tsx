"use client"

import { Badge } from "@sajam/ui/badge"
import { DataTable, type DataTableColumn } from "@sajam/ui/data-table"

const files: FileNode[] = [
  {
    id: "src",
    name: "src",
    kind: "Folder",
    size: 124,
    children: [
      {
        id: "src/components",
        name: "components",
        kind: "Folder",
        size: 82,
        children: [
          { id: "src/components/button.tsx", name: "button.tsx", kind: "File", size: 18 },
          { id: "src/components/dialog.tsx", name: "dialog.tsx", kind: "File", size: 31 },
          { id: "src/components/table.tsx", name: "table.tsx", kind: "File", size: 33 },
        ],
      },
      { id: "src/app.tsx", name: "app.tsx", kind: "File", size: 42 },
    ],
  },
  {
    id: "public",
    name: "public",
    kind: "Folder",
    size: 56,
    children: [{ id: "public/logo.svg", name: "logo.svg", kind: "File", size: 56 }],
  },
  { id: "readme", name: "README.md", kind: "File", size: 6 },
]

const columns: DataTableColumn<FileNode>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "kind",
    header: "Type",
    cell: function ({ row }) {
      return <Badge variant="outline">{row.original.kind}</Badge>
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: function ({ row }) {
      return <span className="tabular-nums">{row.original.size} KB</span>
    },
  },
]

export default function DataTableSubRowsExample() {
  return (
    <DataTable
      label="Project files"
      columns={columns}
      data={files}
      getRowId={function (file) {
        return file.id
      }}
      getSubRows={function (file) {
        return file.children
      }}
      defaultExpanded={{ src: true, "src/components": true }}
      selectionMode="multiple"
      paginate={false}
    />
  )
}

type FileNode = {
  id: string
  name: string
  kind: "Folder" | "File"
  size: number
  children?: FileNode[]
}
