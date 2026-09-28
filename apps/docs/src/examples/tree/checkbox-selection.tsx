"use client"

import { Tree, type TreeNode } from "@sajam/ui/tree"
import { useState } from "react"

const permissions: TreeNode[] = [
  {
    key: "projects",
    label: "Projects",
    children: [
      { key: "projects-read", label: "View projects" },
      { key: "projects-write", label: "Edit projects" },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    children: [
      { key: "billing-read", label: "View invoices" },
      { key: "billing-write", label: "Change plan", disabled: true },
    ],
  },
]

const permissionKeys = permissions.flatMap(function (group) {
  return (group.children ?? []).map(function (permission) {
    return permission.key
  })
})

export default function PermissionTreeExample() {
  const [selected, setSelected] = useState<string[]>(["projects-read"])
  const count = selected.filter(function (key) {
    return permissionKeys.includes(key)
  }).length

  return (
    <div className="w-full max-w-xs space-y-2 rounded-lg border p-2">
      <Tree
        nodes={permissions}
        label="Role permissions"
        selectionMode="checkbox"
        value={selected}
        onValueChange={setSelected}
        defaultExpandedKeys={["projects", "billing"]}
      />
      <p className="text-muted-foreground px-2 text-xs">
        {count} {count === 1 ? "permission" : "permissions"} granted
      </p>
    </div>
  )
}
