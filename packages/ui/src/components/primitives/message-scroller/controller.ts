import {
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
  type Layout,
} from "./geometry.js"
import { createStore } from "./store.js"
import type {
  MessageScrollerDefaultScrollPosition,
  MessageScrollerScrollOptions,
  MessageScrollerScrollable,
  MessageScrollerVisibilityState,
} from "./types.js"

// How long data-autoscrolling stays set after a programmatic scroll starts.
const AUTOSCROLLING_DURATION = 180

// Keys that scroll the focused viewport and so release follow and anchor modes.
const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "])

// Creates the scroll engine for one MessageScroller. It owns all mutable scroll
// state outside React; components attach elements and forward events to it.
function createMessageScrollerController(initialOptions: ControllerOptions) {
  const options = { ...initialOptions }
  const scrollable = createStore(EMPTY_SCROLLABLE, isSameScrollable)
  const visibility = createStore(EMPTY_VISIBILITY, isSameVisibility)
  // Hides the viewport until the opening position is applied, avoiding a jump.
  const pendingDefaultScroll = createStore(options.defaultScrollPosition !== "start", Object.is)
  const messages = new Map<string, HTMLElement>()
  const intersectingIds = new Set<string>()
  const handledAnchors = new WeakSet<HTMLElement>()
  const stateFrame = createFrame(commitScrollState)
  const visibilityFrame = createFrame(syncVisibility)
  const pendingScrollFrame = createFrame(() => {
    if (flushPendingScrollToMessage()) {
      capturePrependAnchor()
    }
  })

  let root: HTMLElement | null = null
  let viewport: HTMLElement | null = null
  let content: HTMLElement | null = null
  let spacer: HTMLElement | null = null
  let preserveScrollOnPrepend = true
  let mode: Mode = options.autoScroll ? "following-bottom" : "free-scrolling"
  // The turn held at the reading line while a reply streams in below it.
  let anchoredTurn: HTMLElement | null = null
  let autoscrolling = false
  let autoscrollingTimeout: number | null = null
  let defaultScrollApplied = false
  let itemCount = 0
  let firstItem: HTMLElement | null = null
  // scrollTop at the previous commit, to tell scrolling up from content growth.
  let lastScrollTop = 0
  let pendingScrollToMessage: { messageId: string; options?: MessageScrollerScrollOptions } | null =
    null
  // The row held steady on the next prepend: the first visible row or a jump target.
  let prependAnchor: { element: HTMLElement; viewportTop: number } | null = null
  let spacerGap = 0
  let spacerHeight = 0
  let visibilityObserver: IntersectionObserver | null = null

  // Options

  function setScrollOptions(next: Pick<ControllerOptions, ScrollOption>) {
    options.scrollEdgeThreshold = next.scrollEdgeThreshold
    options.scrollMargin = next.scrollMargin
    options.scrollPreviousItemPeek = next.scrollPreviousItemPeek
  }

  // Applies the opening position on mount, and again when the prop changes.
  // Only the mount hides the viewport while it waits.
  function setDefaultScrollPosition(position: MessageScrollerDefaultScrollPosition) {
    if (position !== options.defaultScrollPosition) {
      options.defaultScrollPosition = position
      defaultScrollApplied = false
    }

    if (!applyDefaultScrollPosition() && itemCount === 0) {
      pendingDefaultScroll.set(false)
    }
  }

  function setAutoScroll(autoScroll: boolean) {
    options.autoScroll = autoScroll

    if (autoScroll && mode === "following-bottom" && itemCount > 0) {
      scrollToEnd()
    } else {
      commitScrollState()
    }
  }

  function setPreserveScrollOnPrepend(preserve: boolean) {
    preserveScrollOnPrepend = preserve
  }

  // Elements. Each attach is a React 19 ref callback that returns its cleanup.

  function attachRoot(element: HTMLElement | null) {
    if (!element) {
      return
    }

    root = element
    writeStateAttributes(scrollable.get())

    return () => {
      root = null
    }
  }

  function attachViewport(element: HTMLElement | null) {
    if (!element) {
      return
    }

    viewport = element
    writeStateAttributes(scrollable.get())
    const stopObserving = observeResize(element)

    return () => {
      stopObserving()
      viewport = null
    }
  }

  function attachContent(element: HTMLElement | null) {
    if (!element) {
      return
    }

    content = element
    const stopObserving = observeResize(element)

    return () => {
      stopObserving()
      content = null
    }
  }

  function attachSpacer(element: HTMLElement | null) {
    if (!element) {
      return
    }

    spacer = element
    spacerGap = getRowGap(element.parentElement)

    return () => {
      spacer = null
    }
  }

  // Reconciles the current rows now and after every row insertion or removal.
  function observeContent() {
    if (!content) {
      return
    }

    handleContentChange()

    if (typeof MutationObserver === "undefined") {
      return
    }

    const observer = new MutationObserver(() => handleContentChange())

    observer.observe(content, { childList: true })

    return () => observer.disconnect()
  }

  function registerMessage(messageId: string, element: HTMLElement | null) {
    if (!element) {
      return
    }

    messages.set(messageId, element)
    visibilityObserver?.observe(element)
    scheduleVisibilitySync()

    if (pendingScrollToMessage?.messageId === messageId) {
      pendingScrollFrame.schedule()
    }

    return () => {
      if (messages.get(messageId) !== element) {
        return
      }

      messages.delete(messageId)
      intersectingIds.delete(messageId)
      visibilityObserver?.unobserve(element)
      scheduleVisibilitySync()
    }
  }

  // Viewport events

  function handleScroll() {
    commitScrollState()
    scheduleVisibilitySync()
    capturePrependAnchor()
  }

  // A deliberate gesture releases following, anchoring, and in-flight jumps so
  // the scroller never fights the reader.
  function handleUserScroll() {
    if (mode !== "free-scrolling") {
      anchoredTurn = null
      mode = "free-scrolling"
    }
  }

  function handleKeyDown(key: string) {
    if (SCROLL_KEYS.has(key)) {
      handleUserScroll()
    }
  }

  // Commands. Each returns false when the scroller is not mounted yet.

  function scrollToStart({ behavior = "auto" }: MessageScrollerScrollOptions = {}) {
    if (!viewport) {
      return false
    }

    setSpacerHeight(0)
    anchoredTurn = null
    mode = "free-scrolling"
    scrollTo(0, behavior)
    scheduleVisibilitySync()

    return true
  }

  function scrollToEnd({ behavior = "auto" }: MessageScrollerScrollOptions = {}) {
    if (!viewport) {
      return false
    }

    setSpacerHeight(0)
    anchoredTurn = null
    mode = options.autoScroll ? "following-bottom" : "free-scrolling"
    scrollTo(getMaxScrollTop(viewport), behavior, true)
    scheduleVisibilitySync()

    return true
  }

  // Scrolls to a row, queueing the request while the transcript is still empty.
  // An explicit jump also counts as the opening position.
  function scrollToMessage(messageId: string, scrollOptions?: MessageScrollerScrollOptions) {
    const element = messages.get(messageId)

    if (!element) {
      if (itemCount > 0) {
        return false
      }

      pendingScrollToMessage = { messageId, options: scrollOptions }
      markDefaultScrollApplied()

      return true
    }

    markDefaultScrollApplied()
    pendingScrollToMessage = scrollToElement(element, scrollOptions)
      ? null
      : { messageId, options: scrollOptions }

    return true
  }

  function flushPendingScrollToMessage() {
    const element = pendingScrollToMessage && messages.get(pendingScrollToMessage.messageId)

    if (!element || !scrollToElement(element, pendingScrollToMessage?.options)) {
      return false
    }

    pendingScrollToMessage = null
    markDefaultScrollApplied()

    return true
  }

  // Holds a turn at the reading line with the previous row peeking above it.
  function anchorTurn(element: HTMLElement) {
    return scrollToElement(element, { align: "start" }, true)
  }

  function scrollToElement(
    element: HTMLElement,
    {
      align = "start",
      behavior = "auto",
      scrollMargin = options.scrollMargin,
    }: MessageScrollerScrollOptions = {},
    anchor = false,
  ) {
    const layout = getLayout()

    if (!layout || !layout.content.contains(element)) {
      return false
    }

    const margin = anchor ? scrollMargin + options.scrollPreviousItemPeek : scrollMargin
    const scrollTop = getScrollTopFor(element, layout, align, margin)

    setSpacerHeight(getTailSpace(layout, scrollTop))
    // Seed the prepend anchor with the target so a prepend that lands before this
    // scroll settles keeps the target in place.
    prependAnchor = { element, viewportTop: getViewportOffset(element, layout.viewport) }
    mode = anchor ? "anchored-to-message" : "settling-jump"
    anchoredTurn = anchor ? element : null
    scrollTo(scrollTop, behavior)
    scheduleVisibilitySync()

    return true
  }

  function scrollTo(top: number, behavior: ScrollBehavior, marksAutoscrolling = false) {
    if (!viewport) {
      return
    }

    const nextTop = Math.max(0, top)

    if (Math.abs(viewport.scrollTop - nextTop) <= SCROLL_EPSILON) {
      viewport.scrollTop = nextTop
      commitScrollState()
      return
    }

    if (marksAutoscrolling) {
      setAutoscrolling()
    }

    viewport.scrollTo({ top: nextTop, behavior })
    stateFrame.schedule()
  }

  // Flags a programmatic scroll so it cannot release follow mode, then clears
  // the flag once the scroll has had time to settle.
  function setAutoscrolling() {
    if (autoscrollingTimeout !== null) {
      window.clearTimeout(autoscrollingTimeout)
    }

    if (!autoscrolling) {
      autoscrolling = true
      commitScrollState()
    }

    autoscrollingTimeout = window.setTimeout(() => {
      autoscrollingTimeout = null
      autoscrolling = false
      commitScrollState()
    }, AUTOSCROLLING_DURATION)
  }

  // The tail spacer pads short content so a turn can anchor near the top.
  function setSpacerHeight(height: number) {
    const nextHeight = Math.max(0, Math.ceil(height))

    if (!spacer || spacerHeight === nextHeight) {
      return
    }

    spacerHeight = nextHeight
    spacer.hidden = nextHeight === 0
    spacer.style.height = `${nextHeight}px`
    // Cancel the flex gap so the spacer adds exactly its own height.
    spacer.style.marginTop = nextHeight > 0 ? `${-spacerGap}px` : ""
  }

  // Content reconciliation

  function applyDefaultScrollPosition() {
    if (defaultScrollApplied || itemCount === 0) {
      return false
    }

    if (!scrollToDefaultPosition()) {
      return false
    }

    markDefaultScrollApplied()

    return true
  }

  function scrollToDefaultPosition() {
    if (options.defaultScrollPosition === "start") {
      return scrollToStart()
    }

    const layout = getLayout()
    const anchor =
      options.defaultScrollPosition === "last-anchor" && layout
        ? getItems(layout.content, layout.spacer).reverse().find(isAnchor)
        : undefined

    if (!layout || !anchor) {
      return scrollToEnd()
    }

    // A last turn that fits below its anchor opens at the end, without a blank
    // gap beneath it.
    const lastTurnHeight = getContentBottom(layout) - getContentOffset(anchor, layout.viewport)

    return lastTurnHeight <= layout.viewport.clientHeight ? scrollToEnd() : anchorTurn(anchor)
  }

  function markDefaultScrollApplied() {
    defaultScrollApplied = true
    pendingDefaultScroll.set(false)
  }

  function handleContentChange() {
    if (!content) {
      return
    }

    const items = getItems(content, spacer)
    const previousCount = itemCount
    const previousFirstItem = firstItem

    itemCount = items.length
    firstItem = items[0] ?? null
    reconcileContent(items, previousCount, previousFirstItem)
    capturePrependAnchor()
  }

  // Branch order matters: pending jump, first content, prepend, append, update.
  function reconcileContent(
    items: HTMLElement[],
    previousCount: number,
    previousFirstItem: HTMLElement | null,
  ) {
    if (flushPendingScrollToMessage()) {
      return
    }

    if (previousCount === 0) {
      if (applyDefaultScrollPosition()) {
        return
      }

      if (items.length > 0 && options.autoScroll && scrollToEnd()) {
        return
      }

      commitScrollState()
      scheduleVisibilitySync()
      return
    }

    const prepended =
      preserveScrollOnPrepend && previousFirstItem !== null && items.indexOf(previousFirstItem) > 0

    if (prepended) {
      restorePrependAnchor()
      return
    }

    const newAnchors = items.slice(previousCount).filter(isAnchor)
    const anchor =
      items.length > previousCount
        ? newAnchors[0]
        : items.length === previousCount
          ? items.find((item) => isAnchor(item) && !handledAnchors.has(item))
          : undefined

    if (anchor) {
      // A batch of several turns arriving while following keeps following the
      // end instead of jumping back to the first turn in the batch.
      if (options.autoScroll && mode === "following-bottom" && newAnchors.length > 1) {
        scrollToEnd()
        return
      }

      anchorTurn(anchor)
      handledAnchors.add(anchor)
      return
    }

    if (mode === "following-bottom" && options.autoScroll) {
      scrollToEnd()
    } else {
      commitScrollState()
      scheduleVisibilitySync()
    }
  }

  function handleResize() {
    if (mode === "following-bottom" && options.autoScroll) {
      scrollToEnd()
      return
    }

    // Re-pin the anchored turn as content below it resizes, so a shrinking reply
    // cannot let the browser clamp scrollTop and drop the turn.
    const previousSpacerHeight = spacerHeight

    if (mode === "anchored-to-message" && anchoredTurn?.isConnected && anchorTurn(anchoredTurn)) {
      // Once the reply consumes the whole spacer it fills the viewport, so hand
      // off to following. A turn taller than the viewport never had a spacer and
      // stays held.
      if (options.autoScroll && previousSpacerHeight > 0 && spacerHeight === 0) {
        scrollToEnd()
      }

      return
    }

    stateFrame.schedule()
    scheduleVisibilitySync()
  }

  // Native scroll anchoring already keeps a prepended row still in most engines.
  // Comparing its viewport offset corrects only the engines that did not.
  function restorePrependAnchor() {
    if (!prependAnchor || !viewport || !prependAnchor.element.isConnected) {
      return
    }

    const delta = getViewportOffset(prependAnchor.element, viewport) - prependAnchor.viewportTop

    if (Math.abs(delta) <= SCROLL_EPSILON) {
      return
    }

    viewport.scrollTop += delta
    prependAnchor.viewportTop = getViewportOffset(prependAnchor.element, viewport)
    stateFrame.schedule()
    scheduleVisibilitySync()
  }

  function capturePrependAnchor() {
    const layout = getLayout()
    const element = layout && getFirstVisibleItem(layout)

    prependAnchor =
      layout && element
        ? { element, viewportTop: getViewportOffset(element, layout.viewport) }
        : null
  }

  // Scroll state

  function commitScrollState() {
    const layout = getLayout()
    const next = layout ? getScrollable(layout, options.scrollEdgeThreshold) : EMPTY_SCROLLABLE

    updateFollowMode(next)

    // While following, the scroller is already closing any gap a streamed chunk
    // opens, so the end is not published as scrollable to avoid button flicker.
    const published = mode === "following-bottom" ? { ...next, end: false } : next

    writeStateAttributes(published)
    scrollable.set(published)
  }

  // Arms following at the bottom and releases it when the reader scrolls up.
  // Content growth and programmatic scrolls never release it, and anchored or
  // settling modes never re-arm it: the spacer makes an anchored turn look like
  // the end, and re-arming there would pull the reader off the turn.
  function updateFollowMode(next: MessageScrollerScrollable) {
    const scrollTop = viewport?.scrollTop ?? 0
    const scrolledUp = scrollTop < lastScrollTop - SCROLL_EPSILON

    lastScrollTop = scrollTop

    if (
      options.autoScroll &&
      !next.end &&
      mode !== "settling-jump" &&
      mode !== "anchored-to-message"
    ) {
      mode = "following-bottom"
    } else if (mode === "following-bottom" && next.end && scrolledUp && !autoscrolling) {
      mode = "free-scrolling"
    }
  }

  function writeStateAttributes(state: MessageScrollerScrollable) {
    const edges = [state.start && "start", state.end && "end"].filter(Boolean).join(" ")

    for (const element of [root, viewport]) {
      if (!element) {
        continue
      }

      if (edges) {
        element.setAttribute("data-scrollable", edges)
      } else {
        element.removeAttribute("data-scrollable")
      }

      element.toggleAttribute("data-autoscrolling", autoscrolling)
    }
  }

  // Visibility is tracked only while a component subscribes to it.

  function subscribeVisibility(listener: () => void) {
    const first = !visibility.hasListeners()
    const unsubscribe = visibility.subscribe(listener)

    if (first) {
      observeVisibility()
    }

    return () => {
      unsubscribe()

      if (!visibility.hasListeners()) {
        stopVisibility()
      }
    }
  }

  function observeVisibility() {
    if (!viewport) {
      return
    }

    if (typeof IntersectionObserver !== "undefined") {
      visibilityObserver ??= new IntersectionObserver(handleIntersections, {
        root: viewport,
        // Start the observed area at the reading line, matching currentAnchorId.
        // A prop change applies on the next subscription.
        rootMargin: `${-(options.scrollMargin + options.scrollPreviousItemPeek)}px 0px 0px 0px`,
        threshold: [0, 0.01, 0.5, 1],
      })
      messages.forEach((element) => visibilityObserver?.observe(element))
    }

    scheduleVisibilitySync()
  }

  function handleIntersections(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      const messageId = (entry.target as HTMLElement).dataset.messageId

      if (!messageId) {
        continue
      }

      if (entry.isIntersecting) {
        intersectingIds.add(messageId)
      } else {
        intersectingIds.delete(messageId)
      }
    }

    scheduleVisibilitySync()
  }

  function stopVisibility() {
    visibilityFrame.cancel()
    visibilityObserver?.disconnect()
    visibilityObserver = null
    intersectingIds.clear()
    visibility.set(EMPTY_VISIBILITY)
  }

  function scheduleVisibilitySync() {
    if (visibility.hasListeners()) {
      visibilityFrame.schedule()
    }
  }

  function syncVisibility() {
    // A frame can outlive the last subscriber; keep the empty snapshot it left.
    if (!visibility.hasListeners()) {
      return
    }

    const layout = getLayout()
    const readingLineOffset = options.scrollMargin + options.scrollPreviousItemPeek

    visibility.set(
      layout ? getVisibility(layout, readingLineOffset, intersectingIds) : EMPTY_VISIBILITY,
    )
  }

  // Helpers

  function getLayout(): Layout | null {
    return content && viewport ? { content, spacer, viewport } : null
  }

  function observeResize(element: HTMLElement) {
    if (typeof ResizeObserver === "undefined") {
      return () => {}
    }

    // handleResize changes the spacer inside observed content. Deferring it to a
    // frame avoids the "ResizeObserver loop completed" error.
    let frame = 0
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(handleResize)
    })

    observer.observe(element)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }

  // Cancels pending work. The controller stays usable for StrictMode remounts.
  function dispose() {
    stateFrame.cancel()
    visibilityFrame.cancel()
    pendingScrollFrame.cancel()

    if (autoscrollingTimeout !== null) {
      window.clearTimeout(autoscrollingTimeout)
      autoscrollingTimeout = null
    }

    visibilityObserver?.disconnect()
    visibilityObserver = null
  }

  return {
    attachContent,
    attachRoot,
    attachSpacer,
    attachViewport,
    dispose,
    handleKeyDown,
    handleScroll,
    handleUserScroll,
    observeContent,
    pendingDefaultScroll,
    registerMessage,
    scrollToEnd,
    scrollToMessage,
    scrollToStart,
    scrollable,
    setAutoScroll,
    setDefaultScrollPosition,
    setPreserveScrollOnPrepend,
    setScrollOptions,
    subscribeVisibility,
    visibility,
  }
}

type ScrollOption = "scrollEdgeThreshold" | "scrollMargin" | "scrollPreviousItemPeek"

type ControllerOptions = {
  autoScroll: boolean
  defaultScrollPosition: MessageScrollerDefaultScrollPosition
  scrollEdgeThreshold: number
  scrollMargin: number
  scrollPreviousItemPeek: number
}

type MessageScrollerController = ReturnType<typeof createMessageScrollerController>

// How the viewport reacts to content and resize.
type Mode =
  // Pinned to the latest message while autoScroll is on.
  | "following-bottom"
  // The reader scrolled away. Only prepends are corrected.
  | "free-scrolling"
  // A turn is held at the reading line while its reply streams in.
  | "anchored-to-message"
  // A programmatic jump is animating and must not re-arm following.
  | "settling-jump"

// Coalesces repeated requests into one animation frame.
function createFrame(callback: () => void) {
  let frame: number | null = null

  function schedule() {
    if (frame !== null) {
      return
    }

    frame = window.requestAnimationFrame(() => {
      frame = null
      callback()
    })
  }

  function cancel() {
    if (frame !== null) {
      window.cancelAnimationFrame(frame)
      frame = null
    }
  }

  return { cancel, schedule }
}

function isSameScrollable(current: MessageScrollerScrollable, next: MessageScrollerScrollable) {
  return current.start === next.start && current.end === next.end
}

function isSameVisibility(
  current: MessageScrollerVisibilityState,
  next: MessageScrollerVisibilityState,
) {
  return (
    current.currentAnchorId === next.currentAnchorId &&
    current.visibleMessageIds.length === next.visibleMessageIds.length &&
    current.visibleMessageIds.every(
      (messageId, index) => messageId === next.visibleMessageIds[index],
    )
  )
}

export { createMessageScrollerController }
export type { MessageScrollerController }
