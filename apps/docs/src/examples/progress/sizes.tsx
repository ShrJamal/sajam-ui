import { Progress } from "@sajam/ui/progress"

const sizes = ["sm", "default", "lg"] as const

export default function ProgressSizes() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {sizes.map(function (size) {
        return (
          <Progress.Root
            key={size}
            value={56}
            size={size}
          >
            <Progress.Label className="capitalize">{size}</Progress.Label>
            <Progress.Value />
          </Progress.Root>
        )
      })}
    </div>
  )
}
