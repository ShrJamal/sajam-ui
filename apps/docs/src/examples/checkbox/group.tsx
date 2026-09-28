"use client"

import { Checkbox, CheckboxGroup } from "@sajam/ui/checkbox"
import { Field } from "@sajam/ui/field"
import { useState } from "react"

const channels = [
  { value: "email", label: "Email" },
  { value: "sms", label: "Text message" },
  { value: "push", label: "Push notification" },
]

// The parent checkbox is checked, unchecked, or indeterminate from the group value.
export default function CheckboxGroupExample() {
  const [value, setValue] = useState(["email"])

  return (
    <Field.Root className="max-w-sm">
      <Field.Set
        className="gap-3"
        render={
          <CheckboxGroup
            value={value}
            onValueChange={setValue}
            allValues={channels.map(function (channel) {
              return channel.value
            })}
          />
        }
      >
        <Field.Legend variant="label">Notify me by</Field.Legend>
        <Field.Item>
          <Field.Label>
            <Checkbox parent />
            All channels
          </Field.Label>
        </Field.Item>
        <div className="grid gap-3 pl-6">
          {channels.map(function (channel) {
            return (
              <Field.Item key={channel.value}>
                <Field.Label className="font-normal">
                  <Checkbox value={channel.value} />
                  {channel.label}
                </Field.Label>
              </Field.Item>
            )
          })}
        </div>
      </Field.Set>
    </Field.Root>
  )
}
