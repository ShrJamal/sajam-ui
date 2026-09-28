"use client"

import { Badge } from "@sajam/ui/badge"
import { OrderList } from "@sajam/ui/order-list"

const steps = [
  { id: "research", title: "Research", owner: "Maya" },
  { id: "design", title: "Design", owner: "Noah" },
  { id: "review", title: "Review", owner: "Amir" },
  { id: "build", title: "Build", owner: "Lina" },
  { id: "launch", title: "Launch", owner: "Maya" },
]

export default function WorkflowOrderExample() {
  return (
    <OrderList
      defaultValue={steps}
      itemKey={function (step) {
        return step.id
      }}
      header="Workflow"
      filterItem={function (step, query) {
        return `${step.title} ${step.owner}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase())
      }}
      renderItem={function (step) {
        return (
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium">{step.title}</span>
            <Badge variant="secondary">{step.owner}</Badge>
          </div>
        )
      }}
      className="max-w-sm"
    />
  )
}
