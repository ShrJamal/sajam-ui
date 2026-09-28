"use client"

import { Badge } from "@sajam/ui/badge"
import { DataTable, type DataTableColumn } from "@sajam/ui/data-table"

const members: Member[] = [
  { id: "m1", name: "Alex Morgan", email: "alex@example.com", role: "Owner", projects: 12 },
  { id: "m2", name: "Sam Lee", email: "sam@example.com", role: "Admin", projects: 8 },
  { id: "m3", name: "Riley Chen", email: "riley@example.com", role: "Member", projects: 3 },
  { id: "m4", name: "Jordan Blake", email: "jordan@example.com", role: "Admin", projects: 6 },
  { id: "m5", name: "Casey Reed", email: "casey@example.com", role: "Member", projects: 2 },
  { id: "m6", name: "Drew Parker", email: "drew@example.com", role: "Member", projects: 9 },
  { id: "m7", name: "Taylor Quinn", email: "taylor@example.com", role: "Admin", projects: 4 },
  { id: "m8", name: "Jamie Ellis", email: "jamie@example.com", role: "Member", projects: 7 },
  { id: "m9", name: "Morgan Diaz", email: "morgan@example.com", role: "Member", projects: 1 },
  { id: "m10", name: "Avery Brooks", email: "avery@example.com", role: "Member", projects: 5 },
  { id: "m11", name: "Quinn Harper", email: "quinn@example.com", role: "Admin", projects: 11 },
  { id: "m12", name: "Rowan Price", email: "rowan@example.com", role: "Member", projects: 3 },
]

const columns: DataTableColumn<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: function ({ row }) {
      return <span className="font-medium">{row.original.name}</span>
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: function ({ row }) {
      return (
        <Badge variant={row.original.role === "Member" ? "outline" : "secondary"}>
          {row.original.role}
        </Badge>
      )
    },
  },
  { accessorKey: "projects", header: "Projects" },
]

export default function DataTableBasicExample() {
  return (
    <DataTable
      label="Team members"
      columns={columns}
      data={members}
      getRowId={function (member) {
        return member.id
      }}
      searchable
      labels={{ searchPlaceholder: "Search members…" }}
      defaultPagination={{ pageIndex: 0, pageSize: 5 }}
      pageSizeOptions={[5, 10, 20]}
    />
  )
}

type Member = {
  id: string
  name: string
  email: string
  role: "Owner" | "Admin" | "Member"
  projects: number
}
