"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import * as React from "react"
import * as AlertDialog from "./alert-dialog.js"

// An AlertDialog with a trigger, title, description, and cancel/confirm actions in one component.
// Closes after onConfirm runs. For async work set closeOnConfirm={false}, pass loading, and close
// by controlling open when the request settles.
function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
  loadingLabel,
  closeOnConfirm = true,
  size,
  open,
  defaultOpen,
  onOpenChange,
  onConfirm,
  children,
}: Props) {
  const [localOpen, setLocalOpen] = React.useState(defaultOpen ?? false)
  const isOpen = open ?? localOpen

  function setOpen(nextOpen: boolean, details: AlertDialogPrimitive.Root.ChangeEventDetails) {
    // Keep the dialog up while a confirm request is running.
    if (loading && !nextOpen) return
    onOpenChange?.(nextOpen, details)
    if (details.isCanceled) return
    if (open === undefined) setLocalOpen(nextOpen)
  }

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={setOpen}
    >
      {trigger ? <AlertDialog.Trigger render={trigger} /> : null}
      <AlertDialog.Content size={size}>
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          {description ? <AlertDialog.Description>{description}</AlertDialog.Description> : null}
        </AlertDialog.Header>
        {children}
        <AlertDialog.Footer>
          <AlertDialog.Cancel disabled={loading}>{cancelLabel}</AlertDialog.Cancel>
          <AlertDialog.Action
            variant={variant}
            loading={loading}
            loadingLabel={loadingLabel}
            closeOnClick={closeOnConfirm}
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

type Props = {
  // Element that opens the dialog, such as <Button>Delete</Button>. Omit it and control open instead.
  trigger?: React.ReactElement<Record<string, unknown>>
  title: React.ReactNode
  description?: React.ReactNode
  confirmLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  variant?: "default" | "destructive"
  loading?: boolean
  loadingLabel?: React.ReactNode
  closeOnConfirm?: boolean
  size?: "default" | "sm"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, details: AlertDialogPrimitive.Root.ChangeEventDetails) => void
  onConfirm: () => void
  // Extra content between the description and the actions, such as a confirmation input.
  children?: React.ReactNode
}

export { ConfirmDialog }
