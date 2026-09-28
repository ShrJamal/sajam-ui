import { Accordion } from "@sajam/ui/accordion"

export default function AccordionDisabledExample() {
  return (
    <Accordion.Root className="w-full max-w-sm">
      <Accordion.Item value="starter">
        <Accordion.Trigger>Starter plan</Accordion.Trigger>
        <Accordion.Content>Three projects and community support.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item
        value="enterprise"
        disabled
      >
        <Accordion.Trigger>Enterprise plan (coming soon)</Accordion.Trigger>
        <Accordion.Content>Single sign-on and audit logs.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="team">
        <Accordion.Trigger>Team plan</Accordion.Trigger>
        <Accordion.Content>Unlimited projects and priority support.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
