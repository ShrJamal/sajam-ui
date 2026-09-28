import { Accordion } from "@sajam/ui/accordion"

export default function AccordionExample() {
  return (
    <Accordion.Root
      defaultValue={["shipping"]}
      className="w-full max-w-sm"
    >
      <Accordion.Item value="shipping">
        <Accordion.Trigger>How long does shipping take?</Accordion.Trigger>
        <Accordion.Content>
          Orders ship within two business days and usually arrive in three to five days.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="returns">
        <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
        <Accordion.Content>
          Return unused items within 30 days for a full refund. Return shipping is free.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="support">
        <Accordion.Trigger>How do I contact support?</Accordion.Trigger>
        <Accordion.Content>
          Email the support team any day of the week. Most replies arrive within a few hours.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
