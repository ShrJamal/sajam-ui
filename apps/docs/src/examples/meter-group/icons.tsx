import { MeterGroup, type MeterValue } from "@sajam/ui/meter-group"
import { GlobeIcon, LinkIcon, MousePointerClickIcon } from "lucide-react"

const traffic: MeterValue[] = [
  { label: "Search", value: 48, color: "var(--chart-2)", icon: <GlobeIcon /> },
  { label: "Referral", value: 31, color: "var(--chart-3)", icon: <LinkIcon /> },
  { label: "Direct", value: 21, color: "var(--chart-4)", icon: <MousePointerClickIcon /> },
]

export default function MeterGroupIcons() {
  return (
    <MeterGroup
      label="Traffic sources"
      values={traffic}
      labelPosition="start"
      className="max-w-md"
    />
  )
}
