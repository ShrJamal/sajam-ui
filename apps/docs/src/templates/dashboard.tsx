import { Avatar } from "@sajam/ui/avatar"
import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Chart } from "@sajam/ui/chart"
import { Dialog } from "@sajam/ui/dialog"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { Table } from "@sajam/ui/table"
import {
  ArrowDownToLineIcon,
  ArrowUpRightIcon,
  FolderIcon,
  LayoutDashboardIcon,
  LayersIcon,
  PlusIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const initialProjects = [
  { name: "Website refresh", owner: "Alex Morgan", status: "In progress", budget: 4200 },
  { name: "Mobile onboarding", owner: "Sam Lee", status: "In review", budget: 2800 },
  { name: "Design system", owner: "Jamal Shr", status: "Complete", budget: 6400 },
  { name: "Customer portal", owner: "Alex Morgan", status: "In progress", budget: 5100 },
]
const revenue = [
  { month: "Apr", revenue: 4200 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 5200 },
  { month: "Jul", revenue: 9200 },
  { month: "Aug", revenue: 8100 },
  { month: "Sep", revenue: 12480 },
]
const views = [
  { label: "Overview", icon: LayoutDashboardIcon },
  { label: "Projects", icon: FolderIcon },
  { label: "Team", icon: UsersIcon },
]

// Sample data and local state make the starter usable without a backend.
export default function DashboardTemplate() {
  const [view, setView] = useState("Overview")
  const [search, setSearch] = useState("")
  const [projects, setProjects] = useState(initialProjects)
  const [open, setOpen] = useState(false)
  const [period, setPeriod] = useState("6")
  const filtered = projects.filter(function (project) {
    return project.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="bg-muted/30 text-foreground min-h-svh md:grid md:grid-cols-[220px_1fr]">
      <aside className="bg-card flex flex-col border-b md:sticky md:top-0 md:h-svh md:border-r md:border-b-0">
        <div className="flex items-center gap-2.5 px-6 py-7 text-xl font-semibold tracking-tight">
          <LayersIcon className="text-primary size-6" />
          Forma
          <span className="text-muted-foreground ml-auto rounded border px-1.5 py-0.5 text-[10px] font-normal">
            PRO
          </span>
        </div>
        <nav
          aria-label="Workspace"
          className="flex gap-1 px-3 pb-3 md:flex-col"
        >
          {views.map(function (item) {
            return (
              <Button
                key={item.label}
                variant={view === item.label ? "secondary" : "ghost"}
                className="justify-start gap-3 px-3 md:w-full"
                onClick={function () {
                  setView(item.label)
                }}
                aria-current={view === item.label ? "page" : undefined}
              >
                <item.icon className="size-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>
        <div className="mt-auto hidden items-center gap-3 border-t p-5 md:flex">
          <Avatar.Root>
            <Avatar.Fallback>JS</Avatar.Fallback>
          </Avatar.Root>
          <div>
            <p className="text-sm font-medium">Jamal's workspace</p>
            <p className="text-muted-foreground text-xs">Personal account</p>
          </div>
        </div>
      </aside>
      <main className="min-w-0">
        <header className="bg-card flex items-center justify-between border-b px-6 py-4 text-sm">
          <span className="text-muted-foreground">
            Workspace <span className="text-border mx-2">/</span>
            <span className="text-foreground">{view}</span>
          </span>
          <Badge variant="outline">Sample workspace</Badge>
        </header>
        <div className="mx-auto grid max-w-6xl gap-7 p-5 lg:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-muted-foreground mb-2 text-xs">Monday, September 28</p>
              <h1 className="text-3xl font-semibold tracking-tight">
                {view === "Overview" ? "A good day to make progress." : view}
              </h1>
            </div>
            <Dialog.Root
              open={open}
              onOpenChange={setOpen}
            >
              <Dialog.Trigger render={<Button />}>
                <PlusIcon />
                New project
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Create a project</Dialog.Title>
                  <Dialog.Description>Add a project to this preview workspace.</Dialog.Description>
                </Dialog.Header>
                <form
                  className="grid gap-4"
                  onSubmit={function (event) {
                    event.preventDefault()
                    const data = new FormData(event.currentTarget)
                    const name = String(data.get("name") ?? "").trim()
                    if (!name) return
                    setProjects([
                      ...projects,
                      { name, owner: "You", status: "In progress", budget: 0 },
                    ])
                    setOpen(false)
                  }}
                >
                  <Label htmlFor="new-project-name">Project name</Label>
                  <Input
                    id="new-project-name"
                    name="name"
                    required
                    maxLength={80}
                  />
                  <Button type="submit">Create project</Button>
                </form>
              </Dialog.Content>
            </Dialog.Root>
          </div>
          {view === "Overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Monthly revenue", value: "$12,480", change: "+18.6%" },
                  {
                    label: "Active projects",
                    value: String(
                      projects.filter(function (project) {
                        return project.status !== "Complete"
                      }).length,
                    ),
                    change: "+2 this month",
                  },
                  { label: "Team members", value: "8", change: "+1 this month" },
                ].map(function (metric) {
                  return (
                    <Card.Root key={metric.label}>
                      <Card.Header>
                        <Card.Title className="text-muted-foreground text-sm font-normal">
                          {metric.label}
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <p className="text-3xl font-semibold tracking-tight tabular-nums">
                          {metric.value}
                        </p>
                        <p className="mt-3 flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
                          <ArrowUpRightIcon className="size-3.5" />
                          {metric.change}
                        </p>
                      </Card.Body>
                    </Card.Root>
                  )
                })}
              </div>
              <Card.Root>
                <Card.Header className="flex flex-row items-center justify-between">
                  <div>
                    <Card.Title>Revenue overview</Card.Title>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Monthly performance, at a glance.
                    </p>
                  </div>
                  <NativeSelect.Root
                    aria-label="Chart period"
                    value={period}
                    onChange={function (event) {
                      setPeriod(event.target.value)
                    }}
                  >
                    <NativeSelect.Option value="6">Last 6 months</NativeSelect.Option>
                    <NativeSelect.Option value="3">Last 3 months</NativeSelect.Option>
                  </NativeSelect.Root>
                </Card.Header>
                <Card.Body>
                  <Chart.Root
                    config={{ revenue: { label: "Revenue", color: "var(--chart-1)" } }}
                    className="h-60 w-full"
                  >
                    <AreaChart
                      accessibilityLayer
                      data={revenue.slice(-Number(period))}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Chart.Tooltip content={<Chart.TooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        fill="var(--color-revenue)"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </Chart.Root>
                </Card.Body>
              </Card.Root>
            </>
          )}
          {view !== "Team" ? (
            <Card.Root>
              <Card.Header className="gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Card.Title>Recent projects</Card.Title>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={function () {
                      const csv = [
                        "Project,Owner,Status,Budget",
                        ...projects.map(function (project) {
                          return [project.name, project.owner, project.status, project.budget]
                            .map(function (cell) {
                              return `"${String(cell).replaceAll('"', '""')}"`
                            })
                            .join(",")
                        }),
                      ].join("\n")
                      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
                      const link = document.createElement("a")
                      link.href = url
                      link.download = "projects.csv"
                      link.click()
                      setTimeout(function () {
                        URL.revokeObjectURL(url)
                      }, 1000)
                    }}
                  >
                    <ArrowDownToLineIcon />
                    Export
                  </Button>
                </div>
                <div className="relative max-w-xs">
                  <SearchIcon className="text-muted-foreground absolute top-2.5 left-3 size-4" />
                  <Input
                    aria-label="Search projects"
                    placeholder="Search projects…"
                    className="pl-9"
                    value={search}
                    onChange={function (event) {
                      setSearch(event.target.value)
                    }}
                  />
                </div>
              </Card.Header>
              <Card.Body>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Project</Table.Head>
                      <Table.Head>Owner</Table.Head>
                      <Table.Head>Status</Table.Head>
                      <Table.Head className="text-right">Budget</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filtered.map(function (project, i) {
                      return (
                        <Table.Row key={`${project.name}-${i}`}>
                          <Table.Cell className="font-medium">{project.name}</Table.Cell>
                          <Table.Cell className="text-muted-foreground">{project.owner}</Table.Cell>
                          <Table.Cell>
                            <Badge
                              variant={project.status === "Complete" ? "secondary" : "outline"}
                            >
                              {project.status}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell className="text-right tabular-nums">
                            ${project.budget.toLocaleString("en-US")}
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                    {filtered.length === 0 && (
                      <Table.Row>
                        <Table.Cell
                          colSpan={4}
                          className="text-muted-foreground py-10 text-center"
                        >
                          No projects match your search.
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Root>
              </Card.Body>
            </Card.Root>
          ) : (
            <Card.Root>
              <Card.Header>
                <Card.Title>Your team</Card.Title>
              </Card.Header>
              <Card.Body className="grid gap-5">
                {["Jamal Shr", "Alex Morgan", "Sam Lee"].map(function (name) {
                  return (
                    <div
                      key={name}
                      className="flex items-center gap-3"
                    >
                      <Avatar.Root>
                        <Avatar.Fallback>
                          {name
                            .split(" ")
                            .map(function (part) {
                              return part[0]
                            })
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <span className="text-sm font-medium">{name}</span>
                      <Badge
                        className="ml-auto"
                        variant="outline"
                      >
                        Member
                      </Badge>
                    </div>
                  )
                })}
              </Card.Body>
            </Card.Root>
          )}
          <p className="text-muted-foreground text-xs">
            Demo workspace. Changes stay in this session.
          </p>
        </div>
      </main>
    </div>
  )
}
