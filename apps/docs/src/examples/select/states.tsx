"use client"

import { Select } from "@sajam/ui/select"
import { useId } from "react"

const plans = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
]

export default function SelectStatesExample() {
  const errorId = useId()

  return (
    <div className="grid w-full max-w-xs gap-5">
      <Select.Root
        items={plans}
        defaultValue="pro"
        disabled
      >
        <div className="grid gap-2">
          <Select.Label>Disabled</Select.Label>
          <Select.Trigger className="w-full">
            <Select.Value />
          </Select.Trigger>
        </div>
        <PlanItems />
      </Select.Root>
      <Select.Root
        items={plans}
        defaultValue="enterprise"
        readOnly
      >
        <div className="grid gap-2">
          <Select.Label>Read-only</Select.Label>
          <Select.Trigger className="w-full">
            <Select.Value />
          </Select.Trigger>
        </div>
        <PlanItems />
      </Select.Root>
      <Select.Root items={plans}>
        <div className="grid gap-2">
          <Select.Label>Invalid</Select.Label>
          <Select.Trigger
            className="w-full"
            aria-invalid
            aria-describedby={errorId}
          >
            <Select.Value placeholder="Choose a plan" />
          </Select.Trigger>
          <p
            id={errorId}
            className="text-destructive text-xs"
          >
            Choose a plan to continue.
          </p>
        </div>
        <PlanItems />
      </Select.Root>
    </div>
  )
}

function PlanItems() {
  return (
    <Select.Content>
      {plans.map(function (plan) {
        return (
          <Select.Item
            key={plan.value}
            value={plan.value}
          >
            {plan.label}
          </Select.Item>
        )
      })}
    </Select.Content>
  )
}
