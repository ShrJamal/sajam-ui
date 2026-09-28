import { CircularProgress } from "@sajam/ui/circular-progress"

export default function IndeterminateCircularProgress() {
  return (
    <CircularProgress
      value={null}
      label="Preparing upload"
    />
  )
}
