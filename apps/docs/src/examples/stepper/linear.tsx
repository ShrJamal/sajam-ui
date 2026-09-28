"use client"

import { Button } from "@sajam/ui/button"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { Stepper } from "@sajam/ui/stepper"
import { useId, useState } from "react"

const steps = [
  { value: "workspace", title: "Workspace", description: "Choose a name" },
  { value: "invite", title: "Invite", description: "Add a teammate" },
  { value: "review", title: "Review", description: "Confirm and create" },
]

// Later steps unlock as earlier ones are completed; Next stays disabled until the step is valid.
export default function LinearStepperExample() {
  const id = useId()
  const [step, setStep] = useState("workspace")
  const [completed, setCompleted] = useState<string[]>([])
  const [workspace, setWorkspace] = useState("")
  const [email, setEmail] = useState("")
  const [created, setCreated] = useState(false)
  const valid = step === "workspace" ? workspace.trim() !== "" : email.includes("@")

  return (
    <Stepper.Root
      value={step}
      onValueChange={setStep}
      orientation="vertical"
      linear
      className="w-full"
    >
      <Stepper.List aria-label="Create a workspace">
        {steps.map(function (item) {
          return (
            <Stepper.Step
              key={item.value}
              value={item.value}
              completed={completed.includes(item.value)}
            >
              <Stepper.Indicator />
              <Stepper.Title>{item.title}</Stepper.Title>
              <Stepper.Description>{item.description}</Stepper.Description>
            </Stepper.Step>
          )
        })}
      </Stepper.List>
      <div className="grid flex-1 content-start gap-4">
        <Stepper.Panel
          value="workspace"
          className="grid gap-2"
        >
          <Label htmlFor={`${id}-workspace`}>Workspace name</Label>
          <Input
            id={`${id}-workspace`}
            value={workspace}
            placeholder="Acme design"
            onChange={function (event) {
              setWorkspace(event.target.value)
            }}
          />
        </Stepper.Panel>
        <Stepper.Panel
          value="invite"
          className="grid gap-2"
        >
          <Label htmlFor={`${id}-email`}>Teammate email</Label>
          <Input
            id={`${id}-email`}
            type="email"
            value={email}
            placeholder="sam@example.com"
            onChange={function (event) {
              setEmail(event.target.value)
            }}
          />
        </Stepper.Panel>
        <Stepper.Panel
          value="review"
          className="grid gap-3 text-sm"
        >
          <p>
            Create <strong>{workspace}</strong> and invite <strong>{email}</strong>.
          </p>
          <Button
            className="justify-self-start"
            onClick={function () {
              setCreated(true)
            }}
          >
            Create workspace
          </Button>
          <p
            aria-live="polite"
            className="text-muted-foreground"
          >
            {created ? "Workspace created." : null}
          </p>
        </Stepper.Panel>
        <div className="flex gap-2">
          <Stepper.Previous />
          <Stepper.Next
            disabled={step !== "review" && !valid}
            onClick={function () {
              setCompleted(function (current) {
                return current.includes(step) ? current : [...current, step]
              })
            }}
          />
        </div>
      </div>
    </Stepper.Root>
  )
}
