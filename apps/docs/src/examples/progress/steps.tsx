import { Progress } from "@sajam/ui/progress"

// Compose the track yourself to place it and format the value as steps.
export default function ProgressSteps() {
  return (
    <Progress.Root
      value={3}
      max={5}
      variant="success"
      className="w-full max-w-sm"
    >
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
      <Progress.Label className="text-muted-foreground font-normal">Setup checklist</Progress.Label>
      <Progress.Value>
        {function (_, value) {
          return `${value} of 5 steps`
        }}
      </Progress.Value>
    </Progress.Root>
  )
}
