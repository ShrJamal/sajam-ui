import { Timeline, type TimelineItem } from "@sajam/ui/timeline"

const releases: TimelineItem[] = [
  { id: "v1", opposite: "Jan 2026", content: "Private beta with ten teams" },
  { id: "v2", opposite: "Apr 2026", content: "Public launch and pricing" },
  { id: "v3", opposite: "Jul 2026", content: "Mobile apps" },
  { id: "v4", opposite: "Oct 2026", content: "Enterprise controls" },
]

export default function ReleaseTimelineExample() {
  return (
    <Timeline
      items={releases}
      align="alternate"
      aria-label="Release history"
    />
  )
}
