"use client"

import { Checkbox } from "@sajam/ui/checkbox"
import { Table } from "@sajam/ui/table"
import { useState } from "react"

const members = [
  { id: "amina", name: "Amina Idrissi", role: "Owner" },
  { id: "youssef", name: "Youssef Naji", role: "Editor" },
  { id: "sara", name: "Sara Amrani", role: "Viewer" },
]

export default function TableSelectableRowsExample() {
  const [selected, setSelected] = useState<string[]>(["amina"])
  const allSelected = selected.length === members.length

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-8">
            <Checkbox
              aria-label="Select all members"
              checked={allSelected}
              indeterminate={selected.length > 0 && !allSelected}
              onCheckedChange={function (checked) {
                setSelected(
                  checked
                    ? members.map(function (member) {
                        return member.id
                      })
                    : [],
                )
              }}
            />
          </Table.Head>
          <Table.Head>Member</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {members.map(function (member) {
          const isSelected = selected.includes(member.id)
          return (
            <Table.Row
              key={member.id}
              data-state={isSelected ? "selected" : undefined}
            >
              <Table.Cell>
                <Checkbox
                  aria-label={`Select ${member.name}`}
                  checked={isSelected}
                  onCheckedChange={function (checked) {
                    setSelected(function (current) {
                      return checked
                        ? [...current, member.id]
                        : current.filter(function (id) {
                            return id !== member.id
                          })
                    })
                  }}
                />
              </Table.Cell>
              <Table.Cell className="font-medium">{member.name}</Table.Cell>
              <Table.Cell>{member.role}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
