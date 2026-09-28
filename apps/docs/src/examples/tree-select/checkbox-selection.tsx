"use client"

import type { TreeNode } from "@sajam/ui/tree"
import { TreeSelect } from "@sajam/ui/tree-select"

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
      { key: "billing-write", label: "Change plan" },
    ],
  },
]

export default function CheckboxTreeSelectExample() {
  return (
    <TreeSelect
      nodes={permissions}
      label="Permissions"
      selectionMode="checkbox"
      defaultValue={["projects-read", "projects-write", "projects"]}
      renderValue={function (nodes) {
        const count = nodes.filter(function (node) {
          return !node.children
        }).length
        return count ? `${count} permissions` : "Choose permissions"
      }}
      className="max-w-xs"
    />
  )
}
