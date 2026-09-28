import { cn } from "cn"
import * as React from "react"

// Displays related events along a vertical or horizontal track.
function Timeline({
  items,
  orientation = "vertical",
  align = "start",
  className,
  ...props
}: Props) {
  const horizontal = orientation === "horizontal"
  return (
    <ol
      {...props}
      data-slot="timeline"
      data-orientation={orientation}
      data-align={align}
      className={cn(
        "m-0 list-none p-0",
        horizontal
          ? "grid w-full auto-cols-[minmax(10rem,1fr)] grid-flow-col overflow-x-auto pb-2"
          : "flex w-full flex-col",
        horizontal &&
          (align === "alternate" ? "grid-rows-[auto_auto_auto]" : "grid-rows-[auto_auto]"),
        className,
      )}
    >
      {items.map(function (item, index) {
        return (
          <TimelineEvent
            key={item.id ?? index}
            item={item}
            index={index}
            count={items.length}
            orientation={orientation}
            align={align}
          />
        )
      })}
    </ol>
  )
}

type TimelineItem = {
  id?: React.Key
  content: React.ReactNode
  // Secondary detail such as a date. It sits across the track when `align` is "alternate",
  // and above the content otherwise.
  opposite?: React.ReactNode
  marker?: React.ReactNode
}

type Props = Omit<React.ComponentProps<"ol">, "children"> & {
  items: TimelineItem[]
  orientation?: "horizontal" | "vertical"
  // Places the track at the start or end of every event, or alternates content across it.
  align?: "start" | "end" | "alternate"
}

type EventProps = {
  item: TimelineItem
  index: number
  count: number
  orientation: "horizontal" | "vertical"
  align: "start" | "end" | "alternate"
}

function TimelineEvent({ item, index, count, orientation, align }: EventProps) {
  const first = index === 0
  const last = index === count - 1
  const horizontal = orientation === "horizontal"
  const separator = (
    <div
      data-slot="timeline-separator"
      className={cn(
        "relative flex",
        horizontal ? "items-center justify-center py-2" : "justify-center",
      )}
    >
      {count > 1 ? (
        <span
          aria-hidden="true"
          className={cn(
            "bg-border absolute",
            horizontal
              ? cn(
                  "top-1/2 h-px",
                  first ? "right-0 left-1/2" : last ? "right-1/2 left-0" : "inset-x-0",
                )
              : !last && "top-8 bottom-0 w-px",
          )}
        />
      ) : null}
      <TimelineMarker>{item.marker}</TimelineMarker>
    </div>
  )

  if (align === "alternate") {
    // Even events put the opposite detail before the track, odd events after it.
    const oppositeFirst = index % 2 === 0
    return (
      <li
        data-slot="timeline-event"
        className={cn(
          "grid",
          horizontal
            ? "row-span-3 grid-rows-subgrid"
            : "grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] gap-x-3",
        )}
      >
        <div
          data-slot={oppositeFirst ? "timeline-opposite" : "timeline-content"}
          className={cn(
            horizontal
              ? "flex items-end justify-center px-3 pb-2 text-center"
              : "pt-1.5 pb-6 text-end",
            slotText(oppositeFirst),
          )}
        >
          {oppositeFirst ? item.opposite : item.content}
        </div>
        {separator}
        <div
          data-slot={oppositeFirst ? "timeline-content" : "timeline-opposite"}
          className={cn(
            horizontal ? "px-3 pt-2 text-center" : "pt-1.5 pb-6",
            slotText(!oppositeFirst),
          )}
        >
          {oppositeFirst ? item.content : item.opposite}
        </div>
      </li>
    )
  }

  return (
    <li
      data-slot="timeline-event"
      className={cn(
        "grid",
        horizontal
          ? "row-span-2 grid-rows-subgrid"
          : align === "start"
            ? "grid-cols-[2rem_minmax(0,1fr)] gap-x-3"
            : "grid-cols-[minmax(0,1fr)_2rem] gap-x-3",
      )}
    >
      {align === "start" ? separator : null}
      <div
        className={cn(
          "flex flex-col gap-0.5",
          horizontal
            ? cn("items-center px-3 text-center", align === "start" ? "pt-2" : "justify-end pb-2")
            : cn("pt-1.5 pb-6", align === "end" && "items-end text-end"),
        )}
      >
        {item.opposite ? (
          <div
            data-slot="timeline-opposite"
            className={slotText(true)}
          >
            {item.opposite}
          </div>
        ) : null}
        <div
          data-slot="timeline-content"
          className={slotText(false)}
        >
          {item.content}
        </div>
      </div>
      {align === "end" ? separator : null}
    </li>
  )
}

function TimelineMarker({ children }: { children?: React.ReactNode }) {
  return (
    <span
      data-slot="timeline-marker"
      className="border-background bg-primary text-primary-foreground relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-4 text-xs shadow-sm [&_svg]:size-3.5"
    >
      {children ?? (
        <span
          aria-hidden="true"
          className="bg-primary-foreground size-1.5 rounded-full"
        />
      )}
    </span>
  )
}

function slotText(opposite: boolean) {
  return opposite ? "text-muted-foreground text-xs" : "text-foreground text-sm"
}

export { Timeline, type TimelineItem }
