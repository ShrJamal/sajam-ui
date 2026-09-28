"use client"

import { Combobox } from "@sajam/ui/combobox"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

const frameworks = ["Astro", "Next.js", "Nuxt", "React Router", "Remix", "SolidStart", "SvelteKit"]

export default function ComboboxExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Framework</Label>
      <Combobox.Root items={frameworks}>
        <Combobox.Input
          id={id}
          placeholder="Search frameworks"
          showClear
          className="w-full"
        />
        <Combobox.Content>
          <Combobox.Empty>No frameworks found.</Combobox.Empty>
          <Combobox.List>
            {function (framework: string) {
              return (
                <Combobox.Item
                  key={framework}
                  value={framework}
                >
                  {framework}
                </Combobox.Item>
              )
            }}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  )
}
