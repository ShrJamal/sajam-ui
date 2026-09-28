import { Chart } from "@sajam/ui/chart"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

const data = [
  { subject: "Speed", score: 86 },
  { subject: "Access", score: 94 },
  { subject: "Quality", score: 82 },
  { subject: "Support", score: 74 },
  { subject: "Value", score: 90 },
]

const config = {
  score: { label: "Score", color: "var(--chart-1)" },
} satisfies Chart.Config

export default function RadarChartExample() {
  return (
    <Chart.Root
      config={config}
      className="mx-auto h-64 w-full max-w-sm"
    >
      <RadarChart
        accessibilityLayer
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Chart.Tooltip content={<Chart.TooltipContent />} />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.3}
          stroke="var(--color-score)"
        />
      </RadarChart>
    </Chart.Root>
  )
}
