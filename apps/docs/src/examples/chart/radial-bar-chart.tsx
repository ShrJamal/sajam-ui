import { Chart } from "@sajam/ui/chart"
import { RadialBar, RadialBarChart } from "recharts"

const data = [
  { channel: "search", visitors: 46, fill: "var(--color-search)" },
  { channel: "direct", visitors: 31, fill: "var(--color-direct)" },
  { channel: "social", visitors: 23, fill: "var(--color-social)" },
]

const config = {
  visitors: { label: "Visitors" },
  search: { label: "Search", color: "var(--chart-1)" },
  direct: { label: "Direct", color: "var(--chart-2)" },
  social: { label: "Social", color: "var(--chart-3)" },
} satisfies Chart.Config

export default function RadialBarChartExample() {
  return (
    <Chart.Root
      config={config}
      className="mx-auto h-64 w-full max-w-sm"
    >
      <RadialBarChart
        accessibilityLayer
        data={data}
        innerRadius="30%"
        outerRadius="100%"
        startAngle={90}
        endAngle={-270}
      >
        <Chart.Tooltip
          content={
            <Chart.TooltipContent
              nameKey="channel"
              hideLabel
            />
          }
        />
        <RadialBar
          dataKey="visitors"
          background
          cornerRadius={6}
        />
      </RadialBarChart>
    </Chart.Root>
  )
}
