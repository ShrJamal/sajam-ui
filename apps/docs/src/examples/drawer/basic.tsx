"use client"

import { Button } from "@sajam/ui/button"
import { Drawer } from "@sajam/ui/drawer"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

export default function GoalDrawer() {
  const [goal, setGoal] = useState(350)

  return (
    <Drawer.Root showSwipeHandle>
      <Drawer.Trigger render={<Button variant="outline" />}>Set daily goal</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Daily goal</Drawer.Title>
          <Drawer.Description>Choose how many minutes of focus time to aim for.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            aria-label="Decrease goal"
            disabled={goal <= 50}
            onClick={function () {
              setGoal(goal - 50)
            }}
          >
            <MinusIcon />
          </Button>
          <p className="text-center">
            <span className="block text-5xl font-semibold tabular-nums">{goal}</span>
            <span className="text-muted-foreground text-xs uppercase">minutes per day</span>
          </p>
          <Button
            variant="outline"
            size="icon"
            aria-label="Increase goal"
            disabled={goal >= 600}
            onClick={function () {
              setGoal(goal + 50)
            }}
          >
            <PlusIcon />
          </Button>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close render={<Button />}>Save goal</Drawer.Close>
          <Drawer.Close render={<Button variant="outline" />}>Cancel</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  )
}
