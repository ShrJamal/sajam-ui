import { Knob } from "@sajam/ui/knob"

// Size the dial with `size-*` and color the value arc with `text-*`.
export default function KnobAppearanceExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Knob
        defaultValue={35}
        aria-label="Bass"
        className="size-16"
        showValue={false}
      />
      <Knob
        defaultValue={60}
        aria-label="Mid"
        className="text-chart-2 size-20"
      />
      <Knob
        defaultValue={80}
        aria-label="Treble"
        className="text-chart-4 size-28"
      />
    </div>
  )
}
