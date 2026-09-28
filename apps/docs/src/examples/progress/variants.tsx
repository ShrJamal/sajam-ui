import { Progress } from "@sajam/ui/progress"

const variants = [
  { variant: "default", label: "Onboarding", value: 45 },
  { variant: "info", label: "Sync", value: 60 },
  { variant: "success", label: "Tests passed", value: 100 },
  { variant: "warning", label: "Storage used", value: 82 },
  { variant: "destructive", label: "Error budget used", value: 95 },
] as const

export default function ProgressVariants() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {variants.map(function (item) {
        return (
          <Progress.Root
            key={item.variant}
            value={item.value}
            variant={item.variant}
          >
            <Progress.Label>{item.label}</Progress.Label>
            <Progress.Value />
          </Progress.Root>
        )
      })}
    </div>
  )
}
