"use client"

import {
  DataTable,
  type DataTableColumn,
  type DataTableColumnFiltersState,
} from "@sajam/ui/data-table"
import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { useId, useState } from "react"

const teams = ["Design", "Engineering", "Marketing"] as const

const people: Person[] = [
  {
    id: "alex",
    name: "Alex Morgan",
    email: "alex@example.com",
    team: "Design",
    title: "Lead designer",
    location: "Lisbon",
    joined: "2021",
    projects: 12,
  },
  {
    id: "sam",
    name: "Sam Lee",
    email: "sam@example.com",
    team: "Engineering",
    title: "Staff engineer",
    location: "Toronto",
    joined: "2019",
    projects: 18,
  },
  {
    id: "riley",
    name: "Riley Chen",
    email: "riley@example.com",
    team: "Engineering",
    title: "Frontend engineer",
    location: "Singapore",
    joined: "2023",
    projects: 5,
  },
  {
    id: "jordan",
    name: "Jordan Blake",
    email: "jordan@example.com",
    team: "Marketing",
    title: "Content lead",
    location: "Berlin",
    joined: "2020",
    projects: 9,
  },
  {
    id: "casey",
    name: "Casey Reed",
    email: "casey@example.com",
    team: "Design",
    title: "Product designer",
    location: "Austin",
    joined: "2022",
    projects: 7,
  },
  {
    id: "drew",
    name: "Drew Parker",
    email: "drew@example.com",
    team: "Engineering",
    title: "Platform engineer",
    location: "Nairobi",
    joined: "2021",
    projects: 11,
  },
]

const columns: DataTableColumn<Person>[] = [
  { accessorKey: "name", header: "Name", size: 150 },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "team", header: "Team", filterFn: "equalsString" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "joined", header: "Joined" },
  { accessorKey: "projects", header: "Projects" },
]

export default function DataTableColumnsExample() {
  const teamId = useId()
  const [columnFilters, setColumnFilters] = useState<DataTableColumnFiltersState>([])
  const team = columnFilters.find(function (filter) {
    return filter.id === "team"
  })?.value

  return (
    <DataTable
      label="People"
      columns={columns}
      data={people}
      getRowId={function (person) {
        return person.id
      }}
      columnMenu
      defaultColumnPinning={{ start: ["name"], end: [] }}
      defaultColumnVisibility={{ joined: false }}
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      paginate={false}
      toolbar={
        <div className="flex items-center gap-2">
          <Label htmlFor={teamId}>Team</Label>
          <NativeSelect.Root
            id={teamId}
            value={typeof team === "string" ? team : ""}
            onChange={function (event) {
              const value = event.target.value
              setColumnFilters(value ? [{ id: "team", value }] : [])
            }}
          >
            <NativeSelect.Option value="">All teams</NativeSelect.Option>
            {teams.map(function (name) {
              return (
                <NativeSelect.Option
                  key={name}
                  value={name}
                >
                  {name}
                </NativeSelect.Option>
              )
            })}
          </NativeSelect.Root>
        </div>
      }
    />
  )
}

type Person = {
  id: string
  name: string
  email: string
  team: (typeof teams)[number]
  title: string
  location: string
  joined: string
  projects: number
}
