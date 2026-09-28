import { Accordion } from "@sajam/ui/accordion"
import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Dialog } from "@sajam/ui/dialog"
import { Label } from "@sajam/ui/label"
import { Switch } from "@sajam/ui/switch"
import { Table } from "@sajam/ui/table"
import { cn } from "@sajam/ui/utils"
import { CheckIcon, LayersIcon } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Personal",
    description: "A little space for your own ideas.",
    monthly: 0,
    annual: 0,
    features: ["3 active projects", "Personal workspace", "Community support"],
  },
  {
    name: "Team",
    description: "For a small team with big plans.",
    monthly: 24,
    annual: 19,
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Shared asset library",
      "Priority support",
    ],
  },
  {
    name: "Business",
    description: "Bring every team into the picture.",
    monthly: 59,
    annual: 49,
    features: [
      "Everything in Team",
      "Unlimited members",
      "Advanced permissions",
      "Activity reports",
    ],
  },
]
const comparison = [
  ["Active projects", "3", "Unlimited", "Unlimited"],
  ["Team members", "1", "10", "Unlimited"],
  ["Shared asset library", "—", "Included", "Included"],
  ["Advanced permissions", "—", "—", "Included"],
]

// Prices are sample data; selecting a plan never starts a payment flow.
export default function PricingTemplate() {
  const [annual, setAnnual] = useState(true)
  const [selected, setSelected] = useState<(typeof plans)[number] | null>(null)
  return (
    <div className="bg-background text-foreground min-h-svh">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a
          href="#plans"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <LayersIcon className="text-primary" />
          Forma
        </a>
        <a
          href="#pricing-faq"
          className="text-muted-foreground text-sm"
        >
          Pricing questions
        </a>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section
          id="plans"
          className="pt-12 text-center"
        >
          <Badge variant="outline">Simple plans. Room to grow.</Badge>
          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            A plan for the way you work.
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-lg leading-7">
            Start on your own. Bring your team when you're ready. Choose the space you need today.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Label
              htmlFor="annual-billing"
              className={!annual ? "font-semibold" : "text-muted-foreground"}
            >
              Monthly
            </Label>
            <Switch
              id="annual-billing"
              aria-label="Bill yearly"
              checked={annual}
              onCheckedChange={setAnnual}
            />
            <Label
              htmlFor="annual-billing"
              className={annual ? "font-semibold" : "text-muted-foreground"}
            >
              Yearly
            </Label>
            <Badge variant="secondary">Save with yearly</Badge>
          </div>
        </section>
        <section
          aria-label="Plans"
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {plans.map(function (plan, index) {
            const price = annual ? plan.annual : plan.monthly
            const highlighted = index === 1
            return (
              <Card.Root
                key={plan.name}
                className={cn("h-full gap-6", highlighted && "ring-primary ring-2")}
              >
                <Card.Header className="gap-3">
                  <div className="flex min-h-6 items-center justify-between gap-3">
                    <Card.Title className="text-lg">{plan.name}</Card.Title>
                    {highlighted && <Badge>Most popular</Badge>}
                  </div>
                  <Card.Description>{plan.description}</Card.Description>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight tabular-nums">
                      ${price}
                    </span>
                    <span className="text-muted-foreground text-sm">/ month</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {price === 0
                      ? "Free, with no billing required"
                      : annual
                        ? `$${price * 12} billed once a year`
                        : `$${price} billed each month`}
                  </p>
                </Card.Header>
                <Card.Body className="flex flex-1 flex-col gap-6">
                  <Button
                    variant={highlighted ? "default" : "outline"}
                    className="w-full"
                    onClick={function () {
                      setSelected(plan)
                    }}
                  >
                    Choose {plan.name}
                  </Button>
                  <ul className="grid gap-3 text-sm">
                    {plan.features.map(function (feature) {
                      return (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5"
                        >
                          <CheckIcon
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0"
                          />
                          <span>{feature}</span>
                        </li>
                      )
                    })}
                  </ul>
                </Card.Body>
              </Card.Root>
            )
          })}
        </section>
        <p className="text-muted-foreground mt-6 text-center text-xs">
          Sample plans for this starter. No purchases or subscriptions are created.
        </p>
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">The details, side by side.</h2>
          <div className="rounded-xl border">
            <Table.Root aria-label="Plan comparison">
              <Table.Header>
                <Table.Row>
                  <Table.Head>What's included</Table.Head>
                  {plans.map(function (plan) {
                    return <Table.Head key={plan.name}>{plan.name}</Table.Head>
                  })}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {comparison.map(function (row) {
                  return (
                    <Table.Row key={row[0]}>
                      {row.map(function (cell, index) {
                        return (
                          <Table.Cell
                            key={index}
                            className="py-4"
                          >
                            {cell === "Included" ? (
                              <span className="inline-flex items-center gap-2">
                                <CheckIcon
                                  className="size-4"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Included</span>
                              </span>
                            ) : (
                              cell
                            )}
                          </Table.Cell>
                        )
                      })}
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </div>
        </section>
        <section
          id="pricing-faq"
          className="mx-auto mt-20 max-w-2xl scroll-mt-8"
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">Before you choose</h2>
          <Accordion.Root>
            <Accordion.Item value="billing">
              <Accordion.Trigger>How does yearly billing work?</Accordion.Trigger>
              <Accordion.Content>
                The monthly figure is the annual price divided by 12. The full annual amount appears
                below each price and in the plan preview.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="change">
              <Accordion.Trigger>Can I change plans later?</Accordion.Trigger>
              <Accordion.Content>
                This starter leaves plan changes to your billing integration. Add your upgrade,
                downgrade, and proration policy here.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="payment">
              <Accordion.Trigger>Is checkout connected?</Accordion.Trigger>
              <Accordion.Content>
                No. The buttons open a local plan summary. Connect your own billing provider before
                accepting payments.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </section>
      </main>
      <Dialog.Root
        open={selected !== null}
        onOpenChange={function (open) {
          if (!open) setSelected(null)
        }}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{selected?.name} plan</Dialog.Title>
            <Dialog.Description>
              Review the sample plan. This preview does not create a subscription.
            </Dialog.Description>
          </Dialog.Header>
          {selected && (
            <div className="bg-muted/50 rounded-lg p-5">
              <p className="text-3xl font-semibold">
                ${annual ? selected.annual * 12 : selected.monthly}
                <span className="text-muted-foreground text-sm font-normal">
                  {" "}
                  / {annual ? "year" : "month"}
                </span>
              </p>
              <p className="text-muted-foreground mt-3 text-sm">{selected.description}</p>
            </div>
          )}
          <Dialog.Footer>
            <Button
              onClick={function () {
                setSelected(null)
              }}
            >
              Done
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <footer className="text-muted-foreground border-t px-6 py-6 text-center text-xs">
        Forma · Original Sajam UI pricing starter
      </footer>
    </div>
  )
}
