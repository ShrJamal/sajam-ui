"use client"

import { Label } from "@sajam/ui/label"
import type { TreeNode } from "@sajam/ui/tree"
import { TreeSelect } from "@sajam/ui/tree-select"
import { useId, useState } from "react"

const teams: TreeNode[] = [
  {
    key: "product",
    label: "Product",
    children: [
      { key: "design", label: "Design" },
      { key: "research", label: "User research" },
    ],
  },
  {
    key: "engineering",
    label: "Engineering",
    children: [
      { key: "frontend", label: "Frontend" },
      { key: "platform", label: "Platform" },
      { key: "security", label: "Security", disabled: true },
    ],
  },
]

export default function TeamSelectExample() {
  const labelId = useId()
  const [team, setTeam] = useState<string | null>("frontend")

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label id={labelId}>Team</Label>
      <TreeSelect
        nodes={teams}
        aria-labelledby={labelId}
        value={team}
        onValueChange={setTeam}
        placeholder="Choose a team"
        name="team"
      />
    </div>
  )
}
