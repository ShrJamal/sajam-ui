"use client"

import { Badge } from "@sajam/ui/badge"
import { PickList } from "@sajam/ui/pick-list"

const people = [
  { id: 1, name: "Amina Idrissi", team: "Design" },
  { id: 2, name: "Youssef Naji", team: "Engineering" },
  { id: 3, name: "Sara Amrani", team: "Product" },
  { id: 4, name: "Adam Benali", team: "Engineering" },
  { id: 5, name: "Leila Alaoui", team: "Design" },
  { id: 6, name: "Omar Fassi", team: "Security" },
]

export default function ReleaseTeamExample() {
  return (
    <PickList
      defaultValue={{ source: people.slice(0, 5), target: people.slice(5) }}
      itemKey={function (person) {
        return person.id
      }}
      filterItem={function (person, query) {
        return `${person.name} ${person.team}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase())
      }}
      sourceHeader="People"
      targetHeader="Release team"
      renderItem={function (person) {
        return (
          <div className="flex items-center justify-between gap-3">
            <span className="truncate font-medium">{person.name}</span>
            <Badge variant="secondary">{person.team}</Badge>
          </div>
        )
      }}
    />
  )
}
