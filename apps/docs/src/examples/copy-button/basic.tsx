import { CopyButton } from "@sajam/ui/copy-button"

export default function CopyButtonExample() {
  return (
    <div className="border-border flex w-full max-w-sm items-center gap-2 rounded-lg border py-1 pr-1 pl-3">
      <code className="min-w-0 flex-1 truncate text-sm">sk_live_51Hx9aQ2eZvKYlo2C</code>
      <CopyButton
        value="sk_live_51Hx9aQ2eZvKYlo2C"
        copyLabel="Copy API key"
      />
    </div>
  )
}
