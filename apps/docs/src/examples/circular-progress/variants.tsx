import { CircularProgress } from "@sajam/ui/circular-progress"

const variants = [
  { variant: "default", label: "Default", value: 40 },
  { variant: "info", label: "Info", value: 55 },
  { variant: "success", label: "Success", value: 100 },
  { variant: "warning", label: "Warning", value: 80 },
  { variant: "destructive", label: "Destructive", value: 95 },
] as const

export default function CircularProgressVariants() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {variants.map(function (item) {
        return (
          <CircularProgress
            key={item.variant}
            value={item.value}
            variant={item.variant}
            label={item.label}
            showValue
          />
        )
      })}
    </div>
  )
}
