import { AlertDialog } from "@sajam/ui/alert-dialog"
import { Button } from "@sajam/ui/button"

export default function DeleteProjectAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="outline" />}>
        Delete project
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>
            This permanently removes the project, its tasks, and its history.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="destructive">Delete project</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
