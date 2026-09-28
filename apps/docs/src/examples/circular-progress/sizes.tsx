import { CircularProgress } from "@sajam/ui/circular-progress"

const sizes = ["sm", "default", "lg"] as const

export default function CircularProgressSizes() {
  return (
    <div className="flex items-end gap-6">
      {sizes.map(function (size) {
        return (
          <CircularProgress
            key={size}
            value={72}
            size={size}
            label={size}
            showValue
            className="capitalize"
          />
        )
      })}
    </div>
  )
}
