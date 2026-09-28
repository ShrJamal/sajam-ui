import { AlertDialog } from "@sajam/ui/alert-dialog"
import { Button } from "@sajam/ui/button"
import { LogOutIcon } from "lucide-react"

export default function CompactAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="outline" />}>Sign out</AlertDialog.Trigger>
      <AlertDialog.Content size="sm">
        <AlertDialog.Header>
          <AlertDialog.Media>
            <LogOutIcon />
          </AlertDialog.Media>
          <AlertDialog.Title>Sign out?</AlertDialog.Title>
          <AlertDialog.Description>You can sign back in at any time.</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Sign out</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
