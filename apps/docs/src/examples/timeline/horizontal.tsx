import { Timeline, type TimelineItem } from "@sajam/ui/timeline"

const steps: TimelineItem[] = [
  { id: "apply", opposite: "Week 1", content: "Apply" },
  { id: "interview", opposite: "Week 2", content: "Interview" },
  { id: "offer", opposite: "Week 3", content: "Offer" },
  { id: "start", opposite: "Week 5", content: "First day" },
]

export default function HiringTimelineExample() {
  return (
    <Timeline
      items={steps}
      orientation="horizontal"
      aria-label="Hiring process"
    />
  )
}
