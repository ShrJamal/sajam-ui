"use client"

import { Badge } from "@sajam/ui/badge"
import { PickList } from "@sajam/ui/pick-list"

type Permission = { id: string; label: string; required?: boolean }

const available: Permission[] = [
  { id: "comment", label: "Comment" },
  { id: "export", label: "Export data" },
  { id: "billing", label: "Manage billing" },
]

const granted: Permission[] = [
  { id: "view", label: "View projects", required: true },
  { id: "edit", label: "Edit projects" },
]

export default function RequiredPermissionsExample() {
  return (
    <PickList
      defaultValue={{ source: available, target: granted }}
      itemKey={function (permission) {
        return permission.id
      }}
      isItemDisabled={function (permission) {
        return Boolean(permission.required)
      }}
      sourceHeader="Available"
      targetHeader="Granted"
      renderItem={function (permission) {
        return (
          <div className="flex items-center justify-between gap-3">
            <span>{permission.label}</span>
            {permission.required ? <Badge variant="outline">Required</Badge> : null}
          </div>
        )
      }}
    />
  )
}
