import { MeterGroup, type MeterValue } from "@sajam/ui/meter-group"

const usage: MeterValue[] = [
  { label: "Backups", value: 180, color: "var(--chart-2)" },
  { label: "Databases", value: 96, color: "var(--chart-3)" },
  { label: "Logs", value: 42, color: "var(--chart-4)" },
]

export default function MeterGroupUnits() {
  return (
    <MeterGroup
      label="Disk usage (512 GB)"
      values={usage}
      max={512}
      format={{ style: "unit", unit: "gigabyte" }}
      className="max-w-md"
    />
  )
}
