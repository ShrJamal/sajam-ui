"use client"

import { Field } from "@sajam/ui/field"
import { Switch } from "@sajam/ui/switch"

const settings = [
  {
    id: "deployments",
    title: "Deployment alerts",
    description: "When a deployment finishes or fails.",
    defaultChecked: true,
  },
  {
    id: "mentions",
    title: "Mentions",
    description: "When someone mentions you in a comment.",
    defaultChecked: false,
  },
  {
    id: "security",
    title: "Security alerts",
    description: "Required by your organization.",
    defaultChecked: true,
    disabled: true,
  },
]

export default function SwitchSettingsExample() {
  return (
    <Field.Group className="w-full max-w-sm gap-0 divide-y rounded-xl border">
      {settings.map(function (setting) {
        return (
          <Field.Root
            key={setting.id}
            orientation="horizontal"
            disabled={setting.disabled}
            className="p-3"
          >
            <Field.Content>
              <Field.Label>{setting.title}</Field.Label>
              <Field.Description>{setting.description}</Field.Description>
            </Field.Content>
            <Switch defaultChecked={setting.defaultChecked} />
          </Field.Root>
        )
      })}
    </Field.Group>
  )
}
