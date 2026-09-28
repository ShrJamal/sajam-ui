import { Separator } from "@sajam/ui/separator"

export default function SeparatorLabeledExample() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <Separator>Or continue with</Separator>
      <Separator align="start">Details</Separator>
      <Separator align="end">Advanced</Separator>
    </div>
  )
}
