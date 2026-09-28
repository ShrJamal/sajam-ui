import { Alert } from "@sajam/ui/alert"
import { TerminalIcon } from "lucide-react"

export default function AlertExample() {
  return (
    <Alert.Root className="max-w-md">
      <TerminalIcon />
      <Alert.Title>Command line access</Alert.Title>
      <Alert.Description>Install the CLI to deploy projects from your terminal.</Alert.Description>
    </Alert.Root>
  )
}
