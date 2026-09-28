"use client"

import { PickList } from "@sajam/ui/pick-list"

export default function DragPickListExample() {
  return (
    <PickList
      defaultValue={{
        source: ["Onboarding", "Invoices", "Reports", "Integrations"],
        target: ["Dashboard", "Projects"],
      }}
      dragAndDrop
      itemKey={function (page) {
        return page
      }}
      sourceHeader="Available pages"
      targetHeader="Navigation"
      renderItem={function (page) {
        return page
      }}
    />
  )
}
