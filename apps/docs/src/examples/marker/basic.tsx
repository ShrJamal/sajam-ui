import { Marker } from "@sajam/ui/marker"
import { UserPlusIcon } from "lucide-react"

export default function MarkerExample() {
  return (
    <Marker.Root className="max-w-sm">
      <Marker.Icon>
        <UserPlusIcon />
      </Marker.Icon>
      <Marker.Content>
        Maya added <span className="text-foreground font-medium">Omar</span> to the conversation
      </Marker.Content>
    </Marker.Root>
  )
}
