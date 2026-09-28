import type {
  MessageScrollerScrollAlign,
  MessageScrollerScrollable,
  MessageScrollerVisibilityState,
} from "./types.js"

// Scroll positions this close together are equal. Absorbs zoom and HiDPI rounding.
const SCROLL_EPSILON = 0.5

const EMPTY_SCROLLABLE: MessageScrollerScrollable = { start: false, end: false }

const EMPTY_VISIBILITY: MessageScrollerVisibilityState = {
  currentAnchorId: null,
  visibleMessageIds: [],
}

// The measured parts of one scroller. Content and viewport are mounted.
type Layout = {
  content: HTMLElement
  spacer: HTMLElement | null
  viewport: HTMLElement
}

// Transcript rows are the content's element children, excluding the tail spacer.
function getItems(content: HTMLElement, spacer: HTMLElement | null) {
  return Array.from(content.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && child !== spacer,
  )
}

function isAnchor(item: HTMLElement | undefined) {
  return item?.dataset.scrollAnchor === "true"
}

function getScrollable(layout: Layout, edgeThreshold: number): MessageScrollerScrollable {
  const { viewport } = layout
  const hiddenBelow = getContentBottom(layout) - viewport.scrollTop - viewport.clientHeight

  return {
    start: viewport.scrollTop > edgeThreshold,
    end: hiddenBelow > edgeThreshold,
  }
}

// Reports visible rows and the current turn. The reading line sits
// scrollMargin + peek below the viewport top: anchored turns land there with the
// previous row peeking above, and rows only in that band do not count as read.
function getVisibility(
  layout: Layout,
  readingLineOffset: number,
  intersectingIds: ReadonlySet<string>,
): MessageScrollerVisibilityState {
  const viewportRect = layout.viewport.getBoundingClientRect()
  const readingLine = viewportRect.top + readingLineOffset
  const measureAll = typeof IntersectionObserver === "undefined"
  const visibleMessageIds: string[] = []
  let currentAnchorId: string | null = null

  for (const item of getItems(layout.content, layout.spacer)) {
    const messageId = item.dataset.messageId

    if (!messageId) {
      continue
    }

    const anchor = isAnchor(item)
    const rect = anchor || measureAll ? item.getBoundingClientRect() : null
    const visible =
      measureAll && rect
        ? rect.bottom > readingLine && rect.top < viewportRect.bottom
        : intersectingIds.has(messageId)

    if (visible) {
      visibleMessageIds.push(messageId)
    }

    // The last anchor to reach the reading line is current, even after it
    // scrolls above the viewport.
    if (anchor && rect && rect.top <= readingLine + SCROLL_EPSILON) {
      currentAnchorId = messageId
    }
  }

  if (visibleMessageIds.length === 0 && currentAnchorId === null) {
    return EMPTY_VISIBILITY
  }

  return { currentAnchorId, visibleMessageIds }
}

function getFirstVisibleItem(layout: Layout) {
  const viewportRect = layout.viewport.getBoundingClientRect()

  return (
    getItems(layout.content, layout.spacer).find((item) => {
      if (!item.dataset.messageId) {
        return false
      }

      const rect = item.getBoundingClientRect()

      return rect.bottom > viewportRect.top && rect.top < viewportRect.bottom
    }) ?? null
  )
}

// The scrollTop that places element at align, inside the content's padding.
function getScrollTopFor(
  element: HTMLElement,
  layout: Layout,
  align: MessageScrollerScrollAlign,
  margin: number,
) {
  const { content, viewport } = layout
  const padding = getBlockPadding(content)
  const top = getContentOffset(element, viewport)
  const height = element.getBoundingClientRect().height
  const bottom = top + height

  if (align === "center") {
    const insetHeight = Math.max(0, viewport.clientHeight - padding.start - padding.end)

    return top - padding.start - (insetHeight - height) / 2 - margin
  }

  const alignToEnd = bottom - viewport.clientHeight + padding.end + margin

  if (align === "end") {
    return alignToEnd
  }

  if (align === "nearest") {
    const visibleTop = viewport.scrollTop + padding.start
    const visibleBottom = viewport.scrollTop + viewport.clientHeight - padding.end

    if (top >= visibleTop && bottom <= visibleBottom) {
      return viewport.scrollTop
    }

    if (top >= visibleTop) {
      return alignToEnd
    }
  }

  return top - padding.start - margin
}

// Spacer height needed to reach scrollTop when the content is too short.
function getTailSpace(layout: Layout, scrollTop: number) {
  return scrollTop + layout.viewport.clientHeight - getContentBottom(layout)
}

// Element top in the viewport's scroll coordinates.
function getContentOffset(element: HTMLElement, viewport: HTMLElement) {
  return getViewportOffset(element, viewport) + viewport.scrollTop
}

// Element top relative to the viewport's visible top edge.
function getViewportOffset(element: HTMLElement, viewport: HTMLElement) {
  return element.getBoundingClientRect().top - viewport.getBoundingClientRect().top
}

function getMaxScrollTop(viewport: HTMLElement) {
  return Math.max(0, viewport.scrollHeight - viewport.clientHeight)
}

function getRowGap(element: HTMLElement | null) {
  if (!element) {
    return 0
  }

  const style = window.getComputedStyle(element)

  return readPixels(style.rowGap === "normal" ? style.gap : style.rowGap)
}

// Bottom of the last row plus padding, ignoring the tail spacer.
function getContentBottom({ content, spacer, viewport }: Layout) {
  const padding = getBlockPadding(content)
  const viewportTop = viewport.getBoundingClientRect().top
  let bottom = padding.start + padding.end

  for (const item of getItems(content, spacer)) {
    const itemBottom = item.getBoundingClientRect().bottom - viewportTop + viewport.scrollTop

    bottom = Math.max(bottom, itemBottom + padding.end)
  }

  return bottom
}

function getBlockPadding(element: HTMLElement) {
  const style = window.getComputedStyle(element)

  return {
    start: readPixels(style.paddingBlockStart || style.paddingTop),
    end: readPixels(style.paddingBlockEnd || style.paddingBottom),
  }
}

function readPixels(value: string | undefined) {
  const pixels = Number.parseFloat(value ?? "")

  return Number.isFinite(pixels) ? pixels : 0
}

export {
  EMPTY_SCROLLABLE,
  EMPTY_VISIBILITY,
  SCROLL_EPSILON,
  getContentBottom,
  getContentOffset,
  getFirstVisibleItem,
  getItems,
  getMaxScrollTop,
  getRowGap,
  getScrollTopFor,
  getScrollable,
  getTailSpace,
  getViewportOffset,
  getVisibility,
  isAnchor,
}
export type { Layout }
