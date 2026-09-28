"use client"

import { Label } from "@sajam/ui/label"
import type { TreeNode } from "@sajam/ui/tree"
import { TreeSelect } from "@sajam/ui/tree-select"
import { useId, useState } from "react"

const offices: TreeNode[] = [
  {
    key: "europe",
    label: "Europe",
    children: [
      { key: "paris", label: "Paris" },
      { key: "lisbon", label: "Lisbon" },
      { key: "berlin", label: "Berlin" },
    ],
  },
  {
    key: "africa",
    label: "Africa",
    children: [
      { key: "casablanca", label: "Casablanca" },
      { key: "cairo", label: "Cairo" },
    ],
  },
]

export default function MultipleTreeSelectExample() {
  const labelId = useId()
  const [value, setValue] = useState<string[]>(["lisbon", "casablanca"])

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label id={labelId}>Offices</Label>
      <TreeSelect
        nodes={offices}
        aria-labelledby={labelId}
        selectionMode="multiple"
        value={value}
        onValueChange={setValue}
        display="chips"
        placeholder="Choose offices"
        clearable
      />
    </div>
  )
}
