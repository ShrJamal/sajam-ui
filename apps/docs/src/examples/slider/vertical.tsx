import { Slider } from "@sajam/ui/slider"

const bands = [
  { label: "Bass", value: 60 },
  { label: "Mid", value: 45 },
  { label: "Treble", value: 70 },
]

export default function SliderVerticalExample() {
  return (
    <div className="flex h-52 gap-8">
      {bands.map(function (band) {
        return (
          <div
            key={band.label}
            className="flex flex-col items-center gap-2"
          >
            <Slider
              orientation="vertical"
              defaultValue={band.value}
              aria-label={band.label}
              className="min-h-0 flex-1"
            />
            <span className="text-muted-foreground text-xs">{band.label}</span>
          </div>
        )
      })}
    </div>
  )
}
