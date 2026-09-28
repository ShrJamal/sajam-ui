import { Chart } from "@sajam/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const data = [
  { month: "Jan", new: 86, returning: 42 },
  { month: "Feb", new: 105, returning: 68 },
  { month: "Mar", new: 97, returning: 55 },
  { month: "Apr", new: 123, returning: 74 },
  { month: "May", new: 110, returning: 81 },
  { month: "Jun", new: 131, returning: 92 },
]

const config = {
  new: { label: "New", color: "var(--chart-1)" },
  returning: { label: "Returning", color: "var(--chart-2)" },
} satisfies Chart.Config

export default function StackedBarChartExample() {
  return (
    <Chart.Root
      config={config}
      className="h-64 w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Chart.Tooltip content={<Chart.TooltipContent />} />
        <Chart.Legend content={<Chart.LegendContent />} />
        <Bar
          dataKey="new"
          stackId="visitors"
          fill="var(--color-new)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="returning"
          stackId="visitors"
          fill="var(--color-returning)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </Chart.Root>
  )
}
