import { Avatar } from "@sajam/ui/avatar"
import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Checkbox } from "@sajam/ui/checkbox"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { Progress } from "@sajam/ui/progress"
import { Switch } from "@sajam/ui/switch"
import { Tabs } from "@sajam/ui/tabs"
import {
  ArrowUpRightIcon,
  CheckIcon,
  LayersIcon,
  SlidersHorizontalIcon,
  TrendingUpIcon,
} from "lucide-react"
import { useState } from "react"
import { getExamples, orderedPages, templates } from "./catalog"
import { Demo } from "./demo"
import { ThemeControls } from "./theme-controls"
import { resetTheme, updateTheme, useSiteTheme } from "./theme-state"

// Preview actual library examples and templates while editing the site's theme.
export function ThemeBuilder() {
  const { settings } = useSiteTheme()
  const [component, setComponent] = useState("overview")
  const [template, setTemplate] = useState("dashboard")
  return (
    <div className="mt-9 grid items-start gap-8 xl:grid-cols-[17rem_minmax(0,1fr)]">
      <aside
        aria-label="Theme settings"
        className="bg-card rounded-xl border p-5 xl:sticky xl:top-24 xl:max-h-[calc(100svh-7.5rem)] xl:overflow-y-auto"
      >
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontalIcon className="size-4" />
          Customize
        </div>
        <ThemeControls
          settings={settings}
          onChange={updateTheme}
          onReset={resetTheme}
        />
        <p className="text-muted-foreground mt-5 text-xs leading-5">
          Your choices stay active as you browse. Saved in this browser when storage is available.
        </p>
      </aside>
      <div className="min-w-0">
        <Tabs.Root defaultValue="components">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <Tabs.List variant="line">
              <Tabs.Trigger value="components">Components</Tabs.Trigger>
              <Tabs.Trigger value="templates">Templates</Tabs.Trigger>
            </Tabs.List>
            <Badge
              variant="outline"
              className="gap-1.5"
            >
              <span className="bg-primary size-1.5 rounded-full" />
              Live preview
            </Badge>
          </div>
          <Tabs.Content
            value="components"
            className="mt-5 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label htmlFor="theme-component-preview">Preview component</Label>
              <NativeSelect.Root
                id="theme-component-preview"
                value={component}
                className="min-w-44"
                onChange={function (event) {
                  setComponent(event.target.value)
                }}
              >
                <NativeSelect.Option value="overview">A little of everything</NativeSelect.Option>
                {orderedPages.map(function (item) {
                  return (
                    <NativeSelect.Option
                      key={item.slug}
                      value={item.slug}
                    >
                      {item.title}
                    </NativeSelect.Option>
                  )
                })}
              </NativeSelect.Root>
            </div>
            {component === "overview" ? (
              <ThemeShowcase />
            ) : (
              <div className="bg-card flex min-h-96 items-center justify-center rounded-xl border p-5 sm:p-8">
                <Demo
                  key={component}
                  path={getPreviewPath(component)}
                />
              </div>
            )}
          </Tabs.Content>
          <Tabs.Content
            value="templates"
            className="mt-5 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label htmlFor="theme-template-preview">Preview template</Label>
              <NativeSelect.Root
                id="theme-template-preview"
                value={template}
                className="min-w-44"
                onChange={function (event) {
                  setTemplate(event.target.value)
                }}
              >
                {templates.map(function (item) {
                  return (
                    <NativeSelect.Option
                      key={item.slug}
                      value={item.slug}
                    >
                      {item.title}
                    </NativeSelect.Option>
                  )
                })}
              </NativeSelect.Root>
            </div>
            <iframe
              key={template}
              src={`/preview/${template}`}
              title={`${
                templates.find(function (item) {
                  return item.slug === template
                })?.title
              } theme preview`}
              className="bg-background h-[780px] w-full rounded-xl border"
            />
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={`/preview/${template}`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Open full preview <ArrowUpRightIcon />
            </Button>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

function ThemeShowcase() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map(function (metric) {
          return (
            <Card.Root key={metric.label}>
              <Card.Header>
                <Card.Description>{metric.label}</Card.Description>
                <Card.Title className="text-3xl tabular-nums">{metric.value}</Card.Title>
              </Card.Header>
              <Card.Body className="flex items-center gap-2 text-sm">
                <Badge variant="success">
                  <TrendingUpIcon />
                  {metric.change}
                </Badge>
                <span className="text-muted-foreground">{metric.description}</span>
              </Card.Body>
            </Card.Root>
          )
        })}
      </div>
      <Card.Root>
        <Card.Header>
          <div className="flex items-center justify-between gap-3">
            <Card.Title>Your next project</Card.Title>
            <Badge variant="secondary">Draft</Badge>
          </div>
          <Card.Description>A few familiar controls. One shared theme.</Card.Description>
        </Card.Header>
        <Card.Body>
          <form
            className="grid gap-5"
            onSubmit={function (event) {
              event.preventDefault()
              setSaved(true)
            }}
            onChange={function () {
              setSaved(false)
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="theme-project-name">Project name</Label>
                <Input
                  id="theme-project-name"
                  defaultValue="Website refresh"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="theme-project-access">Visibility</Label>
                <NativeSelect.Root
                  id="theme-project-access"
                  defaultValue="team"
                  className="w-full"
                >
                  <NativeSelect.Option value="team">Everyone on the team</NativeSelect.Option>
                  <NativeSelect.Option value="private">Only you</NativeSelect.Option>
                </NativeSelect.Root>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-1">
                <Label htmlFor="theme-notifications">Project updates</Label>
                <p className="text-muted-foreground text-xs">Keep up with your team's progress.</p>
              </div>
              <Switch
                id="theme-notifications"
                defaultChecked
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="theme-starter-tasks"
                defaultChecked
              />
              <Label htmlFor="theme-starter-tasks">Include a starter task list</Label>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">
                {saved ? <CheckIcon /> : <LayersIcon />}
                {saved ? "Saved locally" : "Save project"}
              </Button>
              <span
                className="text-muted-foreground text-xs"
                role="status"
              >
                {saved ? "Preview saved. No data was sent." : "An interactive demo."}
              </span>
            </div>
          </form>
        </Card.Body>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Title>Same components. Your style.</Card.Title>
          <Card.Description>Buttons, badges, and status colors follow the theme.</Card.Description>
        </Card.Header>
        <Card.Body className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Active</Badge>
            <Badge variant="outline">In review</Badge>
            <Badge variant="info">Scheduled</Badge>
            <Badge variant="success">Passing</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Failed</Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <Avatar.Root>
                <Avatar.Fallback>AM</Avatar.Fallback>
              </Avatar.Root>
              <div className="text-sm">
                <p className="font-medium">Alex Morgan</p>
                <p className="text-muted-foreground text-xs">Design systems lead</p>
              </div>
            </div>
            <Progress.Root
              value={72}
              className="w-full max-w-60"
            >
              <Progress.Label>Release checklist</Progress.Label>
              <Progress.Value />
            </Progress.Root>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  )
}

const metrics = [
  {
    label: "Active projects",
    value: "24",
    change: "+4",
    description: "this month",
  },
  {
    label: "Monthly visits",
    value: "12,840",
    change: "+12.8%",
    description: "vs. last month",
  },
]

function getPreviewPath(slug: string) {
  const page = orderedPages.find(function (item) {
    return item.slug === slug
  })
  return page ? (getExamples(page.sections[0])[0]?.path ?? "") : ""
}
