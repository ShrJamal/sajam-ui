"use client"

import { PickList, type PickListValue } from "@sajam/ui/pick-list"
import { useState } from "react"

export default function ControlledPickListExample() {
  const [columns, setColumns] = useState<PickListValue<string>>({
    source: ["Email", "Phone", "Company", "Country"],
    target: ["Name", "Plan", "Created"],
  })

  return (
    <div className="w-full space-y-3">
      <PickList
        value={columns}
        onValueChange={setColumns}
        itemKey={function (column) {
          return column
        }}
        sourceHeader="Hidden columns"
        targetHeader="Visible columns"
        renderItem={function (column) {
          return column
        }}
      />
      <p className="text-muted-foreground text-sm">Table columns: {columns.target.join(", ")}</p>
    </div>
  )
}
