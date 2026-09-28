import { Accordion } from "@sajam/ui/accordion"
import { Alert } from "@sajam/ui/alert"
import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { Rating } from "@sajam/ui/rating"
import { Sheet } from "@sajam/ui/sheet"
import {
  ArrowRightIcon,
  CheckIcon,
  CircleDotIcon,
  LayersIcon,
  MenuIcon,
  MessageSquareIcon,
  SlidersHorizontalIcon,
  UsersIcon,
} from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: LayersIcon,
    title: "A home for every project",
    description: "Keep the brief, tasks, and decisions together. Pick up where you left off.",
  },
  {
    icon: MessageSquareIcon,
    title: "Feedback in context",
    description: "Discuss the work next to the work. Give every decision a place to live.",
  },
  {
    icon: SlidersHorizontalIcon,
    title: "Your team's way of working",
    description: "Start with a simple board. Add the stages and details your team needs.",
  },
]
const stages = [
  { title: "Planned", tasks: ["Customer interviews", "Explore directions"] },
  { title: "In progress", tasks: ["Design the workspace", "Build the component kit"] },
  { title: "Ready", tasks: ["Project brief", "Brand foundations"] },
]
const questions = [
  {
    title: "What is included in this starter?",
    answer:
      "A responsive landing page, mobile navigation, product preview, feature section, FAQ, and a signup form built with Sajam UI.",
  },
  {
    title: "Can I use my own branding?",
    answer:
      "Yes. Replace the sample product name, copy, and colors. Every part of this page lives in one editable React file.",
  },
  {
    title: "Where does the signup form send data?",
    answer:
      "Nowhere in this preview. Connect the submit handler to your own signup or mailing-list service before launching.",
  },
]

// The signup handler is intentionally local until an app connects its own service.
export default function LandingTemplate() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div
      id="top"
      className="bg-background text-foreground min-h-svh"
    >
      <header className="bg-background/95 sticky top-0 z-20 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-6">
          <a
            href="#top"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <LayersIcon className="text-primary size-6" />
            Forma
          </a>
          <nav
            aria-label="Main"
            className="text-muted-foreground hidden items-center gap-8 text-sm md:flex"
          >
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#questions">Questions</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              nativeButton={false}
              render={<a href="#join" />}
            >
              Get started <ArrowRightIcon />
            </Button>
            <Sheet.Root>
              <Sheet.Trigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    className="md:hidden"
                  />
                }
              >
                <MenuIcon />
              </Sheet.Trigger>
              <Sheet.Content>
                <Sheet.Header>
                  <Sheet.Title>Explore Forma</Sheet.Title>
                </Sheet.Header>
                <nav
                  aria-label="Mobile navigation"
                  className="grid gap-5 p-4"
                >
                  {[
                    ["Features", "#features"],
                    ["How it works", "#how-it-works"],
                    ["Questions", "#questions"],
                  ].map(function ([label, href]) {
                    return (
                      <Sheet.Close
                        key={href}
                        nativeButton={false}
                        render={<a href={href} />}
                      >
                        {label}
                      </Sheet.Close>
                    )
                  })}
                </nav>
              </Sheet.Content>
            </Sheet.Root>
          </div>
        </div>
      </header>
      <main>
        <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <Badge
              variant="outline"
              className="mb-7"
            >
              A workspace for small teams
            </Badge>
            <h1 className="max-w-xl text-5xl leading-[1.04] font-semibold tracking-[-0.055em] sm:text-6xl">
              Less chasing.
              <br />
              <span className="text-primary">More making.</span>
            </h1>
            <p className="text-muted-foreground mt-7 max-w-md text-lg leading-8">
              Give your team's projects, conversations, and next steps one place to come together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href="#join" />}
              >
                Make room for your work <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#how-it-works" />}
              >
                Take a look
              </Button>
            </div>
            <div className="text-muted-foreground mt-7 flex items-center gap-2 text-xs">
              <CheckIcon className="size-3.5" />
              An original Sajam UI starter. Make it yours.
            </div>
          </div>
          <div
            id="how-it-works"
            className="bg-muted/40 scroll-mt-24 rounded-2xl border p-3 sm:p-5"
          >
            <div className="bg-card overflow-hidden rounded-xl border shadow-lg">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <p className="text-sm font-medium">Website refresh</p>
                  <p className="text-muted-foreground mt-1 text-xs">Design team · Sample project</p>
                </div>
                <UsersIcon className="text-muted-foreground size-4" />
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                {stages.map(function (stage, index) {
                  return (
                    <div
                      key={stage.title}
                      className="space-y-3"
                    >
                      <p className="text-muted-foreground flex items-center gap-2 text-xs">
                        <span
                          className={`size-1.5 rounded-full ${index === 1 ? "bg-primary" : "bg-muted-foreground/50"}`}
                        />
                        {stage.title}
                        <span className="ml-auto">2</span>
                      </p>
                      {stage.tasks.map(function (task) {
                        return (
                          <div
                            key={task}
                            className="bg-muted/40 rounded-lg border p-3"
                          >
                            <CircleDotIcon className="text-muted-foreground mb-5 size-4" />
                            <p className="text-xs leading-5 font-medium">{task}</p>
                            <div className="text-muted-foreground mt-4 flex justify-between text-[10px]">
                              <span>Design</span>
                              <span>2 tasks</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
              <div className="text-muted-foreground border-t px-5 py-3 text-xs">
                Everything you need for the next small step.
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="bg-muted/25 scroll-mt-20 border-y"
        >
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Keep the work moving
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Good work needs a little room.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {features.map(function (feature) {
                return (
                  <Card.Root
                    key={feature.title}
                    className="shadow-none"
                  >
                    <Card.Body className="pt-3">
                      <feature.icon className="text-primary mb-7 size-6" />
                      <h3 className="text-base font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mt-3 text-sm leading-7">
                        {feature.description}
                      </p>
                    </Card.Body>
                  </Card.Root>
                )
              })}
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <Badge variant="secondary">Built with Sajam UI</Badge>
            <h2 className="mt-5 max-w-sm text-3xl leading-tight font-semibold tracking-tight">
              A starting point you can actually change.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-md text-sm leading-7">
              Use the components across your product. Change the theme once, then spend your time on
              the work that makes your app useful.
            </p>
            <Rating
              value={5}
              readOnly
              aria-label="Sample five-star rating"
              className="mt-5"
            />
          </div>
          <div
            id="questions"
            className="scroll-mt-24"
          >
            <h2 className="mb-4 text-xl font-semibold">A few questions</h2>
            <Accordion.Root>
              {questions.map(function (question, index) {
                return (
                  <Accordion.Item
                    key={question.title}
                    value={String(index)}
                  >
                    <Accordion.Trigger>{question.title}</Accordion.Trigger>
                    <Accordion.Content>{question.answer}</Accordion.Content>
                  </Accordion.Item>
                )
              })}
            </Accordion.Root>
          </div>
        </section>
        <section
          id="join"
          className="bg-muted/40 scroll-mt-24 border-t"
        >
          <div className="mx-auto max-w-2xl px-6 py-18 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Make space for your next project.
            </h2>
            <p className="text-muted-foreground mt-4 text-sm">
              Start with a simple workspace and see where it takes you.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={function (event) {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <Label
                htmlFor="landing-email"
                className="sr-only"
              >
                Work email
              </Label>
              <Input
                id="landing-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                className="bg-background h-11"
              />
              <Button
                type="submit"
                className="h-11 shrink-0"
              >
                Get started <ArrowRightIcon />
              </Button>
            </form>
            {submitted && (
              <Alert.Root
                role="status"
                className="mt-5 text-left"
              >
                <Alert.Title>Signup preview complete</Alert.Title>
                <Alert.Description>
                  Connect a signup service to receive submissions. This preview sends no data.
                </Alert.Description>
              </Alert.Root>
            )}
            <p className="text-muted-foreground mt-4 text-xs">
              Demo form. No email is sent or stored.
            </p>
          </div>
        </section>
      </main>
      <footer className="text-muted-foreground mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 text-xs">
        <p>Forma · A Sajam UI starter</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}
