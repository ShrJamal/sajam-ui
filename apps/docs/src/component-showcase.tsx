import { Avatar } from "@sajam/ui/avatar"
import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { Progress } from "@sajam/ui/progress"
import { Switch } from "@sajam/ui/switch"
import { Tabs } from "@sajam/ui/tabs"
import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  LayoutGridIcon,
  PaletteIcon,
  PanelsTopLeftIcon,
} from "lucide-react"
import { useState } from "react"
import { TemplateGallery } from "./template-pages"

const activity = [
  {
    initials: "AM",
    name: "Alex Morgan",
    action: "Updated the account settings",
    time: "12 min ago",
    status: "Updated",
  },
  {
    initials: "SL",
    name: "Sam Lee",
    action: "Shared a component review",
    time: "1 hr ago",
    status: "Review",
  },
  {
    initials: "JD",
    name: "Jamie Diaz",
    action: "Completed the release checklist",
    time: "Yesterday",
    status: "Complete",
  },
]

// Preview a small working interface assembled from the public component package.
export function ComponentShowcase() {
  const [saved, setSaved] = useState(false)

  return (
    <section
      aria-labelledby="component-showcase-title"
      className="py-8 sm:py-10"
    >
      <h2
        id="component-showcase-title"
        className="sr-only"
      >
        Components and templates
      </h2>
      <Tabs.Root
        defaultValue="components"
        className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs.List aria-label="Showcase type">
            <Tabs.Trigger
              value="components"
              className="gap-2 px-3"
            >
              <LayoutGridIcon />
              Components
            </Tabs.Trigger>
            <Tabs.Trigger
              value="templates"
              className="gap-2 px-3"
            >
              <PanelsTopLeftIcon />
              Templates
            </Tabs.Trigger>
          </Tabs.List>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<a href="/theming" />}
            className="text-primary"
          >
            <PaletteIcon />
            Customize the look
            <ArrowRightIcon />
          </Button>
        </div>

        <Tabs.Content
          value="components"
          className="mt-5"
        >
          <div className="grid items-stretch gap-4 lg:grid-cols-3">
            <Card.Root className="h-full">
              <Card.Header>
                <Card.Title>Profile</Card.Title>
                <Card.Description>Update the details shown to your team.</Card.Description>
              </Card.Header>
              <Card.Body className="flex-1">
                <form
                  className="flex h-full flex-col gap-4"
                  onSubmit={function (event) {
                    event.preventDefault()
                    setSaved(true)
                  }}
                  onChange={function () {
                    setSaved(false)
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="showcase-profile-name">Full name</Label>
                    <Input
                      id="showcase-profile-name"
                      name="name"
                      defaultValue="Alex Morgan"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="showcase-profile-email">Email address</Label>
                    <Input
                      id="showcase-profile-email"
                      name="email"
                      type="email"
                      defaultValue="alex@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="showcase-profile-role">Role</Label>
                    <NativeSelect.Root
                      id="showcase-profile-role"
                      name="role"
                      defaultValue="developer"
                      className="w-full"
                    >
                      <NativeSelect.Option value="developer">Developer</NativeSelect.Option>
                      <NativeSelect.Option value="designer">Designer</NativeSelect.Option>
                      <NativeSelect.Option value="product">Product manager</NativeSelect.Option>
                    </NativeSelect.Root>
                  </div>
                  <div className="mt-auto space-y-2 pt-1">
                    <Button
                      type="submit"
                      className="w-full"
                    >
                      {saved ? <CheckIcon /> : null}
                      {saved ? "Saved locally" : "Save changes"}
                    </Button>
                    <p
                      className="text-muted-foreground min-h-4 text-center text-xs"
                      aria-live="polite"
                    >
                      {saved ? "This preview stays in your browser." : "Try editing any field."}
                    </p>
                  </div>
                </form>
              </Card.Body>
            </Card.Root>

            <Card.Root className="h-full">
              <Card.Header>
                <Card.Title>Project activity</Card.Title>
                <Card.Description>Recent work from the sample team.</Card.Description>
              </Card.Header>
              <Card.Body className="flex flex-1 flex-col">
                <div className="divide-y">
                  {activity.map(function (item) {
                    return (
                      <div
                        key={item.name}
                        className="flex items-start gap-3 py-4 first:pt-1"
                      >
                        <Avatar.Root>
                          <Avatar.Fallback>{item.initials}</Avatar.Fallback>
                        </Avatar.Root>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium">{item.name}</p>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                          <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                            {item.action}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs">{item.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<a href="/components/avatar" />}
                  className="mt-auto w-full"
                >
                  View component
                  <ArrowRightIcon />
                </Button>
              </Card.Body>
            </Card.Root>

            <Card.Root className="h-full">
              <Card.Header>
                <Card.Title>Project setup</Card.Title>
                <Card.Description>Three of five steps are ready.</Card.Description>
              </Card.Header>
              <Card.Body className="flex flex-1 flex-col gap-6">
                <Progress.Root value={60}>
                  <Progress.Label>Workspace progress</Progress.Label>
                  <Progress.Value />
                </Progress.Root>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <CheckIcon className="text-primary size-4" />
                    <span className="flex-1 text-sm">Choose your theme</span>
                    <Badge variant="secondary">Done</Badge>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <CheckIcon className="text-primary size-4" />
                    <span className="flex-1 text-sm">Add your components</span>
                    <Badge variant="secondary">Done</Badge>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <BellIcon className="text-muted-foreground size-4" />
                    <Label
                      htmlFor="showcase-release-updates"
                      className="flex-1"
                    >
                      Release updates
                    </Label>
                    <Switch
                      id="showcase-release-updates"
                      defaultChecked
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<a href="/theming" />}
                  className="mt-auto w-full"
                >
                  Continue setup
                  <ArrowRightIcon />
                </Button>
              </Card.Body>
            </Card.Root>
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              variant="link"
              nativeButton={false}
              render={<a href="/components" />}
            >
              Explore all components
              <ArrowRightIcon />
            </Button>
          </div>
        </Tabs.Content>

        <Tabs.Content
          value="templates"
          className="mt-5"
        >
          <TemplateGallery limit={2} />
          <div className="mt-5 flex justify-end">
            <Button
              variant="link"
              nativeButton={false}
              render={<a href="/templates" />}
            >
              Browse all templates
              <ArrowRightIcon />
            </Button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  )
}
