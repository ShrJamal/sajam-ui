import { MeterGroup, type MeterValue } from "@sajam/ui/meter-group"

const storage: MeterValue[] = [
  { label: "Documents", value: 34, color: "var(--chart-2)" },
  { label: "Media", value: 27, color: "var(--chart-3)" },
  { label: "Applications", value: 16, color: "var(--chart-4)" },
]

export default function MeterGroupExample() {
  return (
    <MeterGroup
      label="Storage"
      values={storage}
      className="max-w-md"
    />
  )
}
