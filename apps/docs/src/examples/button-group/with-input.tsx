"use client"

import { Button } from "@sajam/ui/button"
import { ButtonGroup } from "@sajam/ui/button-group"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function ButtonGroupWithInputExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Website</Label>
      <ButtonGroup.Root className="w-full">
        <ButtonGroup.Text>https://</ButtonGroup.Text>
        <Input
          id={id}
          placeholder="example.com"
        />
        <Button variant="outline">Verify</Button>
      </ButtonGroup.Root>
    </div>
  )
}
