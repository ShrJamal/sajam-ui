import { Progress } from "@sajam/ui/progress"

export default function IndeterminateProgress() {
  return (
    <Progress.Root
      value={null}
      className="w-full max-w-sm"
    >
      <Progress.Label>Preparing export…</Progress.Label>
    </Progress.Root>
  )
}
