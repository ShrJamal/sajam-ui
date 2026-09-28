"use client"

import { Avatar } from "@sajam/ui/avatar"
import { OrganizationChart, type OrganizationChartNode } from "@sajam/ui/organization-chart"
import { useState } from "react"

type Person = { initials: string; role: string }

const people: OrganizationChartNode<Person>[] = [
  {
    key: "maya",
    label: "Maya Chen",
    data: { initials: "MC", role: "Chief executive" },
    children: [
      {
        key: "omar",
        label: "Omar Reed",
        data: { initials: "OR", role: "VP Product" },
        children: [
          { key: "jules", label: "Jules Park", data: { initials: "JP", role: "Design lead" } },
          { key: "lina", label: "Lina Bell", data: { initials: "LB", role: "Research lead" } },
        ],
      },
      {
        key: "nora",
        label: "Nora Diaz",
        data: { initials: "ND", role: "VP Engineering" },
        children: [
          { key: "rui", label: "Rui Evans", data: { initials: "RE", role: "Platform lead" } },
        ],
      },
    ],
  },
]

export default function TeamChartExample() {
  const [selected, setSelected] = useState<string | null>("omar")

  return (
    <OrganizationChart
      nodes={people}
      label="Leadership team"
      value={selected}
      onValueChange={setSelected}
      className="w-full"
      renderNode={function (node) {
        return (
          <div className="flex items-center gap-2 text-left">
            <Avatar.Root size="sm">
              <Avatar.Fallback>{node.data?.initials}</Avatar.Fallback>
            </Avatar.Root>
            <div>
              <p className="font-medium">{node.label}</p>
              <p className="text-muted-foreground text-xs">{node.data?.role}</p>
            </div>
          </div>
        )
      }}
    />
  )
}
