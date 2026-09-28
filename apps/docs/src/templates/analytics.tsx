import { Avatar } from "@sajam/ui/avatar"
import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Chart } from "@sajam/ui/chart"
import { DataTable, type DataTableColumn } from "@sajam/ui/data-table"
import { NativeSelect } from "@sajam/ui/native-select"
import { Tabs } from "@sajam/ui/tabs"
import {
  ArrowDownRightIcon,
  ArrowDownToLineIcon,
  ArrowUpRightIcon,
  ChartNoAxesCombinedIcon,
  CreditCardIcon,
  LayersIcon,
  MousePointerClickIcon,
  UsersIcon,
} from "lucide-react"
import { useState, type ReactNode } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const weekly = [
  { label: "Mon", revenue: 480 },
  { label: "Tue", revenue: 720 },
  { label: "Wed", revenue: 590 },
  { label: "Thu", revenue: 940 },
  { label: "Fri", revenue: 810 },
  { label: "Sat", revenue: 1250 },
  { label: "Sun", revenue: 1100 },
]
const monthly = [
  { label: "Week 1", revenue: 3280 },
  { label: "Week 2", revenue: 4190 },
  { label: "Week 3", revenue: 3760 },
  { label: "Week 4", revenue: 5890 },
]
const transactions = [
  { id: "INV-1001", customer: "Alex Morgan", plan: "Team", amount: 24, status: "Paid" },
  { id: "INV-1002", customer: "Riley Chen", plan: "Business", amount: 59, status: "Paid" },
  { id: "INV-1003", customer: "Sam Lee", plan: "Team", amount: 24, status: "Pending" },
  { id: "INV-1004", customer: "Jordan Blake", plan: "Business", amount: 59, status: "Paid" },
  { id: "INV-1005", customer: "Casey Reed", plan: "Team", amount: 24, status: "Paid" },
  { id: "INV-1006", customer: "Drew Parker", plan: "Business", amount: 59, status: "Refunded" },
  { id: "INV-1007", customer: "Taylor Quinn", plan: "Team", amount: 24, status: "Paid" },
  { id: "INV-1008", customer: "Jamie Ellis", plan: "Business", amount: 59, status: "Pending" },
]
const columns: DataTableColumn<(typeof transactions)[number]>[] = [
  { accessorKey: "id", header: "Invoice" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "plan", header: "Plan" },
  {
    accessorKey: "status",
    header: "Status",
    cell: function ({ row }) {
      return (
        <Badge variant={row.original.status === "Paid" ? "secondary" : "outline"}>
          {row.original.status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: function ({ row }) {
      return <span className="tabular-nums">${row.original.amount.toFixed(2)}</span>
    },
  },
]
const channels = [
  { name: "Direct", value: 42 },
  { name: "Search", value: 31 },
  { name: "Referrals", value: 18 },
  { name: "Social", value: 9 },
]

// Sample metrics and transactions stay local; the export contains only the sample rows.
export default function AnalyticsTemplate() {
  const [period, setPeriod] = useState("week")
  const [exported, setExported] = useState(false)
  const chart = period === "week" ? weekly : monthly
  const revenue = chart.reduce(function (total, day) {
    return total + day.revenue
  }, 0)
  return (
    <div className="bg-muted/25 text-foreground min-h-svh">
      <header className="bg-background border-b">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <LayersIcon className="text-primary size-6" />
              Forma
            </div>
            <span className="text-muted-foreground hidden border-l pl-6 text-sm sm:inline">
              Analytics workspace
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">Sample data</Badge>
            <Avatar.Root className="size-8">
              <Avatar.Fallback>AM</Avatar.Fallback>
            </Avatar.Root>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              A view of your business
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">See what's moving.</h1>
            <p className="text-muted-foreground mt-3 text-sm">
              Revenue, customers, and the details behind them.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <NativeSelect.Root
              aria-label="Reporting period"
              value={period}
              onChange={function (event) {
                setPeriod(event.target.value)
              }}
            >
              <NativeSelect.Option value="week">Last 7 days</NativeSelect.Option>
              <NativeSelect.Option value="month">Last 4 weeks</NativeSelect.Option>
            </NativeSelect.Root>
            <Button
              variant="outline"
              onClick={function () {
                const csv = [
                  "Invoice,Customer,Plan,Amount,Status",
                  ...transactions.map(function (row) {
                    return [row.id, row.customer, row.plan, row.amount, row.status].join(",")
                  }),
                ].join("\n")
                const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
                const link = document.createElement("a")
                link.href = url
                link.download = "forma-sample-transactions.csv"
                link.click()
                setTimeout(function () {
                  URL.revokeObjectURL(url)
                }, 1000)
                setExported(true)
              }}
            >
              <ArrowDownToLineIcon />
              Export transactions
            </Button>
          </div>
        </div>
        {exported && (
          <p
            role="status"
            className="text-muted-foreground mt-4 text-xs"
          >
            Sample transaction CSV downloaded.
          </p>
        )}
        <Tabs.Root
          defaultValue="overview"
          className="mt-9"
        >
          <Tabs.List variant="line">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="overview"
            className="space-y-6 pt-5"
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Revenue"
                value={`$${revenue.toLocaleString("en-US")}`}
                icon={<CreditCardIcon />}
                change={period === "week" ? "+18.2%" : "+12.6%"}
                trend="up"
              />
              <MetricCard
                label="Customers"
                value={period === "week" ? "428" : "1,284"}
                icon={<UsersIcon />}
                change="+8.4%"
                trend="up"
              />
              <MetricCard
                label="Conversion rate"
                value={period === "week" ? "3.6%" : "3.2%"}
                icon={<MousePointerClickIcon />}
                change="+0.4 points"
                trend="up"
              />
              <MetricCard
                label="Average order"
                value={period === "week" ? "$42.70" : "$39.80"}
                icon={<ChartNoAxesCombinedIcon />}
                change="−2.1%"
                trend="down"
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <Card.Root>
                <Card.Header>
                  <Card.Title>Revenue over time</Card.Title>
                  <p className="text-muted-foreground text-xs">
                    {period === "week" ? "Daily" : "Weekly"} sample revenue in USD
                  </p>
                </Card.Header>
                <Card.Body>
                  <Chart.Root
                    config={{ revenue: { label: "Revenue", color: "var(--chart-1)" } }}
                    className="h-64 w-full"
                  >
                    <AreaChart
                      data={chart}
                      margin={{ left: 12, right: 12 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                      />
                      <Chart.Tooltip content={<Chart.TooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        fill="var(--color-revenue)"
                        fillOpacity={0.14}
                        strokeWidth={2.5}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </Chart.Root>
                </Card.Body>
              </Card.Root>
              <Card.Root>
                <Card.Header>
                  <Card.Title>Where people find you</Card.Title>
                  <p className="text-muted-foreground text-xs">Share of sample visits</p>
                </Card.Header>
                <Card.Body className="space-y-6 pt-2">
                  {channels.map(function (channel) {
                    return (
                      <div key={channel.name}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span>{channel.name}</span>
                          <span className="text-muted-foreground tabular-nums">
                            {channel.value}%
                          </span>
                        </div>
                        <div
                          aria-hidden="true"
                          className="bg-muted h-1.5 overflow-hidden rounded-full"
                        >
                          <div
                            className="bg-chart-1 h-full rounded-full"
                            style={{ width: `${channel.value}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </Card.Body>
              </Card.Root>
            </div>
            <Card.Root>
              <Card.Header>
                <Card.Title>Recent transactions</Card.Title>
                <p className="text-muted-foreground text-xs">
                  A fixed sample ledger, independent of the reporting period above.
                </p>
              </Card.Header>
              <Card.Body>
                <DataTable
                  label="Recent transactions"
                  columns={columns}
                  data={transactions}
                  getRowId={function (row) {
                    return row.id
                  }}
                  searchable
                  labels={{ searchPlaceholder: "Search invoices, customers, or plans…" }}
                  defaultPagination={{ pageIndex: 0, pageSize: 5 }}
                />
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
          <Tabs.Content
            value="transactions"
            className="pt-5"
          >
            <Card.Root>
              <Card.Header>
                <Card.Title>All transactions</Card.Title>
                <p className="text-muted-foreground text-xs">
                  Sort a column, search the ledger, or change the page size.
                </p>
              </Card.Header>
              <Card.Body>
                <DataTable
                  label="All transactions"
                  columns={columns}
                  data={transactions}
                  getRowId={function (row) {
                    return row.id
                  }}
                  searchable
                />
              </Card.Body>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>
        <p className="text-muted-foreground mt-8 text-xs">
          Demo workspace. Connect your own data source before using these reports.
        </p>
      </main>
    </div>
  )
}

type MetricCardProps = {
  label: string
  value: string
  icon: ReactNode
  change: string
  trend: "up" | "down"
}

// Present a metric with its change against the previous period.
function MetricCard({ label, value, icon, change, trend }: MetricCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRightIcon : ArrowDownRightIcon
  return (
    <Card.Root>
      <Card.Header className="flex flex-row items-center justify-between gap-4">
        <Card.Description className="font-medium">{label}</Card.Description>
        <span
          aria-hidden="true"
          className="text-muted-foreground [&_svg]:size-4"
        >
          {icon}
        </span>
      </Card.Header>
      <Card.Body>
        <p className="text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span
            className={
              trend === "up"
                ? "text-success inline-flex items-center gap-1 font-medium"
                : "text-destructive inline-flex items-center gap-1 font-medium"
            }
          >
            <TrendIcon
              aria-hidden="true"
              className="size-3.5"
            />
            {change}
          </span>
          <span className="text-muted-foreground">vs. previous period</span>
        </p>
      </Card.Body>
    </Card.Root>
  )
}
