import { Stepper } from "@sajam/ui/stepper"

export default function StepperExample() {
  return (
    <Stepper.Root
      defaultValue="details"
      className="w-full gap-4"
    >
      <Stepper.List aria-label="Project setup">
        <Stepper.Step value="details">
          <Stepper.Indicator />
          <Stepper.Title>Details</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step value="team">
          <Stepper.Indicator />
          <Stepper.Title>Team</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step value="review">
          <Stepper.Indicator />
          <Stepper.Title>Review</Stepper.Title>
        </Stepper.Step>
      </Stepper.List>
      <Stepper.Panel
        value="details"
        className="text-muted-foreground rounded-xl border p-4 text-sm"
      >
        Name the project and choose an owner.
      </Stepper.Panel>
      <Stepper.Panel
        value="team"
        className="text-muted-foreground rounded-xl border p-4 text-sm"
      >
        Invite teammates now or continue on your own.
      </Stepper.Panel>
      <Stepper.Panel
        value="review"
        className="text-muted-foreground rounded-xl border p-4 text-sm"
      >
        Check the setup before creating the project.
      </Stepper.Panel>
      <div className="flex justify-between gap-2">
        <Stepper.Previous />
        <Stepper.Next />
      </div>
    </Stepper.Root>
  )
}
