import { AspectRatio } from "@sajam/ui/aspect-ratio"

const ratios = [
  { label: "1 : 1", value: 1 },
  { label: "3 : 4", value: 3 / 4 },
  { label: "16 : 9", value: 16 / 9 },
]

export default function AspectRatioRatiosExample() {
  return (
    <div className="grid w-full max-w-sm grid-cols-[1fr_0.75fr_1.6fr] items-end gap-3">
      {ratios.map(function (ratio) {
        return (
          <AspectRatio
            key={ratio.label}
            ratio={ratio.value}
            className="bg-muted text-muted-foreground grid place-items-center rounded-lg font-mono text-xs"
          >
            {ratio.label}
          </AspectRatio>
        )
      })}
    </div>
  )
}
