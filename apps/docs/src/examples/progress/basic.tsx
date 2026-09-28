import { Progress } from "@sajam/ui/progress"

export default function ProgressExample() {
  return (
    <Progress.Root
      value={64}
      className="w-full max-w-sm"
    >
      <Progress.Label>Uploading files</Progress.Label>
      <Progress.Value />
    </Progress.Root>
  )
}
