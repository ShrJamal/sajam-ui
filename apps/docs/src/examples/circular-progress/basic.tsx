import { CircularProgress } from "@sajam/ui/circular-progress"

export default function CircularProgressExample() {
  return (
    <CircularProgress
      value={64}
      label="Upload"
      showValue
      size="lg"
    />
  )
}
