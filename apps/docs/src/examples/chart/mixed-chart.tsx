import { Chart } from "@sajam/ui/chart"
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", visitors: 1860, conversionRate: 2.4 },
  { month: "Feb", visitors: 3050, conversionRate: 3.1 },
  { month: "Mar", visitors: 2370, conversionRate: 2.8 },
  { month: "Apr", visitors: 2730, conversionRate: 3.6 },
  { month: "May", visitors: 2090, conversionRate: 3.3 },
  { month: "Jun", visitors: 3140, conversionRate: 4.1 },
]

const config = {
  visitors: { label: "Visitors", color: "var(--chart-1)" },
  conversionRate: { label: "Conversion rate (%)", color: "var(--chart-2)" },
} satisfies Chart.Config

// Bars and a line share the x-axis but use separate y-axes for different units.
export default function MixedChartExample() {
  return (
    <Chart.Root
      config={config}
      className="h-72 w-full"
    >
      <ComposedChart
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
        <YAxis
          yAxisId="visitors"
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <YAxis
          yAxisId="rate"
          orientation="right"
          tickLine={false}
          axisLine={false}
          width={32}
          unit="%"
        />
        <Chart.Tooltip content={<Chart.TooltipContent />} />
        <Chart.Legend content={<Chart.LegendContent />} />
        <Bar
          yAxisId="visitors"
          dataKey="visitors"
          fill="var(--color-visitors)"
          radius={4}
        />
        <Line
          yAxisId="rate"
          dataKey="conversionRate"
          type="monotone"
          stroke="var(--color-conversionRate)"
          strokeWidth={2}
        />
      </ComposedChart>
    </Chart.Root>
  )
}
