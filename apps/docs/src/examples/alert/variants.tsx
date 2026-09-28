import { Alert } from "@sajam/ui/alert"
import { BellIcon, CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react"

export default function AlertVariants() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Alert.Root>
        <BellIcon />
        <Alert.Title>Workspace settings were updated</Alert.Title>
      </Alert.Root>
      <Alert.Root variant="info">
        <InfoIcon />
        <Alert.Title>A new version is available</Alert.Title>
      </Alert.Root>
      <Alert.Root variant="success">
        <CircleCheckIcon />
        <Alert.Title>Your domain is verified</Alert.Title>
      </Alert.Root>
      <Alert.Root variant="warning">
        <TriangleAlertIcon />
        <Alert.Title>Storage is almost full</Alert.Title>
      </Alert.Root>
      <Alert.Root variant="destructive">
        <OctagonXIcon />
        <Alert.Title>The last deployment failed</Alert.Title>
      </Alert.Root>
    </div>
  )
}
