import { Chart } from "@sajam/ui/chart"
import { Pie, PieChart } from "recharts"

const data = [
  { channel: "desktop", visitors: 58, fill: "var(--color-desktop)" },
  { channel: "mobile", visitors: 34, fill: "var(--color-mobile)" },
  { channel: "tablet", visitors: 8, fill: "var(--color-tablet)" },
]

const config = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-3)" },
} satisfies Chart.Config

export default function DoughnutChartExample() {
  return (
    <Chart.Root
      config={config}
      className="mx-auto h-64 w-full max-w-sm"
    >
      <PieChart accessibilityLayer>
        <Chart.Tooltip content={<Chart.TooltipContent hideLabel />} />
        <Chart.Legend content={<Chart.LegendContent nameKey="channel" />} />
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="channel"
          innerRadius={52}
          outerRadius={82}
          strokeWidth={4}
        />
      </PieChart>
    </Chart.Root>
  )
}
