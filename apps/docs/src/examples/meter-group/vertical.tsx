import { MeterGroup, type MeterValue } from "@sajam/ui/meter-group"

const effort: MeterValue[] = [
  { label: "Design", value: 40, color: "var(--chart-2)" },
  { label: "Development", value: 35, color: "var(--chart-3)" },
  { label: "QA", value: 15, color: "var(--chart-4)" },
]

export default function VerticalMeterGroup() {
  return (
    <MeterGroup
      aria-label="Project effort"
      values={effort}
      orientation="vertical"
    />
  )
}
