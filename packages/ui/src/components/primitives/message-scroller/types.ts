import type { useRender } from "@base-ui/react/use-render"
import type * as React from "react"

// Where a saved transcript opens on its first non-empty render.
type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor"

// Viewport alignment for scrollToMessage and programmatic jumps.
type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest"

type MessageScrollerScrollOptions = {
  align?: MessageScrollerScrollAlign
  behavior?: ScrollBehavior
  // Margin on the aligned edge in pixels. Defaults to the provider scrollMargin.
  scrollMargin?: number
}

// Which edges the viewport can still scroll toward.
type MessageScrollerScrollable = {
  start: boolean
  end: boolean
}

type MessageScrollerVisibilityState = {
  // The anchored turn at or above the reading line. It stays current after its
  // header scrolls out of view.
  currentAnchorId: string | null
  // Visible messageId values in document order.
  visibleMessageIds: string[]
}

type MessageScrollerProviderProps = {
  children?: React.ReactNode
  // Follow new content while the viewport is at the end.
  autoScroll?: boolean
  defaultScrollPosition?: MessageScrollerDefaultScrollPosition
  // Distance from an edge that still counts as being at that edge. Defaults to 8.
  scrollEdgeThreshold?: number
  // Space kept for the previous row above a newly anchored turn. Defaults to 64.
  scrollPreviousItemPeek?: number
  // Default margin on the aligned edge for commands and visibility. Defaults to 0.
  scrollMargin?: number
}

type MessageScrollerProps = React.ComponentProps<"div">

type MessageScrollerViewportProps = React.ComponentProps<"div"> & {
  // Keep the first visible row in place when rows are prepended. Defaults to true.
  preserveScrollOnPrepend?: boolean
}

type MessageScrollerContentProps = React.ComponentProps<"div"> & {
  // Class name for the tail spacer that lets a turn anchor near the top.
  spacerClassName?: string
}

type MessageScrollerItemProps = React.ComponentProps<"div"> & {
  // Stable row id for scrollToMessage, visibility, and prepend preservation.
  messageId?: string
  // Marks the start of a turn. New anchors scroll to the reading line.
  scrollAnchor?: boolean
}

type MessageScrollerButtonDirection = "start" | "end"

type MessageScrollerButtonRenderState = {
  // Whether content overflows toward this button's direction.
  active: boolean
  direction: MessageScrollerButtonDirection
}

type MessageScrollerButtonProps = useRender.ComponentProps<
  "button",
  MessageScrollerButtonRenderState
> & {
  // Defaults to "smooth".
  behavior?: ScrollBehavior
  // Defaults to "end".
  direction?: MessageScrollerButtonDirection
}

export type {
  MessageScrollerButtonDirection,
  MessageScrollerButtonProps,
  MessageScrollerButtonRenderState,
  MessageScrollerContentProps,
  MessageScrollerDefaultScrollPosition,
  MessageScrollerItemProps,
  MessageScrollerProps,
  MessageScrollerProviderProps,
  MessageScrollerScrollAlign,
  MessageScrollerScrollOptions,
  MessageScrollerScrollable,
  MessageScrollerViewportProps,
  MessageScrollerVisibilityState,
}
