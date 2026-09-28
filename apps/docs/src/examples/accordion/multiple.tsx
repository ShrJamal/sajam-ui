import { Accordion } from "@sajam/ui/accordion"

export default function AccordionMultipleExample() {
  return (
    <Accordion.Root
      multiple
      defaultValue={["notifications", "privacy"]}
      className="w-full max-w-sm"
    >
      <Accordion.Item value="notifications">
        <Accordion.Trigger>Notifications</Accordion.Trigger>
        <Accordion.Content>Email and push alerts for mentions and replies.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="privacy">
        <Accordion.Trigger>Privacy</Accordion.Trigger>
        <Accordion.Content>Only members of your workspace can see your profile.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="billing">
        <Accordion.Trigger>Billing</Accordion.Trigger>
        <Accordion.Content>Invoices are sent to the account owner each month.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
