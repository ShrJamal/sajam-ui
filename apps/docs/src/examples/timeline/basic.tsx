import { Timeline, type TimelineItem } from "@sajam/ui/timeline"
import { CheckIcon, PackageIcon, TruckIcon } from "lucide-react"

const events: TimelineItem[] = [
  {
    id: "ordered",
    opposite: "Today, 09:15",
    content: "Order confirmed",
    marker: <CheckIcon />,
  },
  {
    id: "packed",
    opposite: "Today, 11:40",
    content: "Package prepared",
    marker: <PackageIcon />,
  },
  {
    id: "shipped",
    opposite: "Today, 14:05",
    content: "In transit — expected tomorrow afternoon",
    marker: <TruckIcon />,
  },
]

export default function OrderTimelineExample() {
  return (
    <Timeline
      items={events}
      aria-label="Order progress"
      className="max-w-sm"
    />
  )
}
