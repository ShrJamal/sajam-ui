"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as React from "react"
import { createMessageScrollerController, type MessageScrollerController } from "./controller.js"
import type {
  MessageScrollerButtonProps,
  MessageScrollerContentProps,
  MessageScrollerItemProps,
  MessageScrollerProps,
  MessageScrollerProviderProps,
  MessageScrollerViewportProps,
} from "./types.js"

const MessageScrollerContext = React.createContext<MessageScrollerController | null>(null)

// Hides Root and Viewport until the opening scroll position is applied.
const PENDING_ATTRIBUTE = {
  pending: (pending: boolean) => (pending ? { "data-pending-scroll": "" } : null),
}

// Headless owner of a transcript's scroll behavior. Renders no DOM.
function MessageScrollerProvider({
  autoScroll = false,
  children,
  defaultScrollPosition = "end",
  scrollEdgeThreshold = 8,
  scrollMargin = 0,
  scrollPreviousItemPeek = 64,
}: MessageScrollerProviderProps) {
  const [controller] = React.useState(() =>
    createMessageScrollerController({
      autoScroll,
      defaultScrollPosition,
      scrollEdgeThreshold,
      scrollMargin,
      scrollPreviousItemPeek,
    }),
  )

  React.useLayoutEffect(() => {
    controller.setScrollOptions({ scrollEdgeThreshold, scrollMargin, scrollPreviousItemPeek })
  }, [controller, scrollEdgeThreshold, scrollMargin, scrollPreviousItemPeek])
  React.useLayoutEffect(() => {
    controller.setDefaultScrollPosition(defaultScrollPosition)
  }, [controller, defaultScrollPosition])
  React.useLayoutEffect(() => {
    controller.setAutoScroll(autoScroll)
  }, [autoScroll, controller])
  React.useEffect(() => controller.dispose, [controller])

  return (
    <MessageScrollerContext.Provider value={controller}>{children}</MessageScrollerContext.Provider>
  )
}

function MessageScroller(props: MessageScrollerProps) {
  const controller = useController()
  const pending = usePendingDefaultScroll(controller)

  return useRender({
    ref: controller.attachRoot,
    props: { ...props },
    state: { pending },
    stateAttributesMapping: PENDING_ATTRIBUTE,
  })
}

function MessageScrollerViewport({
  preserveScrollOnPrepend = true,
  ...props
}: MessageScrollerViewportProps) {
  const controller = useController()
  const pending = usePendingDefaultScroll(controller)

  React.useLayoutEffect(() => {
    controller.setPreserveScrollOnPrepend(preserveScrollOnPrepend)
  }, [controller, preserveScrollOnPrepend])

  return useRender({
    ref: controller.attachViewport,
    state: { pending },
    stateAttributesMapping: PENDING_ATTRIBUTE,
    props: mergeProps<"div">(
      {
        "aria-label": "Messages",
        role: "region",
        tabIndex: 0,
        onKeyDown: (event) => controller.handleKeyDown(event.key),
        onScroll: controller.handleScroll,
        onTouchMove: controller.handleUserScroll,
        onWheel: controller.handleUserScroll,
      },
      props,
    ),
  })
}

// Row container. Every direct child should be a MessageScrollerItem.
function MessageScrollerContent({
  children,
  spacerClassName,
  ...props
}: MessageScrollerContentProps) {
  const { attachContent, attachSpacer, observeContent } = useController()

  React.useLayoutEffect(observeContent, [observeContent])

  return useRender({
    ref: attachContent,
    props: mergeProps<"div">(
      {
        "aria-relevant": "additions",
        role: "log",
        children: (
          <>
            {children}
            <div
              ref={attachSpacer}
              aria-hidden="true"
              data-message-scroller-spacer=""
              hidden
              className={spacerClassName}
            />
          </>
        ),
      },
      props,
    ),
  })
}

function MessageScrollerItem({
  messageId,
  scrollAnchor = false,
  ...props
}: MessageScrollerItemProps) {
  const controller = useController()
  const register = React.useCallback(
    (element: HTMLElement | null) =>
      messageId ? controller.registerMessage(messageId, element) : undefined,
    [controller, messageId],
  )

  return useRender({
    ref: register,
    props,
    state: { messageId, scrollAnchor },
    stateAttributesMapping: {
      messageId: (value) => (value ? { "data-message-id": value } : null),
      scrollAnchor: (value) => ({ "data-scroll-anchor": String(value) }),
    },
  })
}

// Scrolls to the start or end. Inert while there is nothing to scroll toward.
function MessageScrollerButton({
  behavior = "smooth",
  children,
  direction = "end",
  onClick,
  render,
  tabIndex,
  type = "button",
  ...props
}: MessageScrollerButtonProps) {
  const controller = useController()
  const active = useMessageScrollerScrollable()[direction]

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!active) {
      return
    }

    onClick?.(event)

    if (event.defaultPrevented) {
      return
    }

    event.currentTarget.blur()

    if (direction === "start") {
      controller.scrollToStart({ behavior })
    } else {
      controller.scrollToEnd({ behavior })
    }
  }

  return useRender({
    defaultTagName: "button",
    render,
    state: { active, direction },
    stateAttributesMapping: { active: (value) => ({ "data-active": String(value) }) },
    props: mergeProps<"button">(
      {
        children: children ?? <span>Scroll to {direction}</span>,
        inert: !active,
        tabIndex: active ? tabIndex : -1,
        type,
        onClick: handleClick,
      },
      props,
    ),
  })
}

// Returns stable scroll commands for the nearest MessageScroller.
function useMessageScroller() {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useController()

  return React.useMemo(
    () => ({ scrollToEnd, scrollToMessage, scrollToStart }),
    [scrollToEnd, scrollToMessage, scrollToStart],
  )
}

// Returns which edges the viewport can still scroll toward.
function useMessageScrollerScrollable() {
  const { scrollable } = useController()

  return React.useSyncExternalStore(scrollable.subscribe, scrollable.get, scrollable.get)
}

// Returns visible rows and the current turn. Tracking runs only while subscribed.
function useMessageScrollerVisibility() {
  const { subscribeVisibility, visibility } = useController()

  return React.useSyncExternalStore(subscribeVisibility, visibility.get, visibility.get)
}

function useController() {
  const controller = React.useContext(MessageScrollerContext)

  if (!controller) {
    throw new Error("MessageScroller parts must be used within a MessageScroller.Provider.")
  }

  return controller
}

function usePendingDefaultScroll({ pendingDefaultScroll }: MessageScrollerController) {
  return React.useSyncExternalStore(
    pendingDefaultScroll.subscribe,
    pendingDefaultScroll.get,
    pendingDefaultScroll.get,
  )
}

export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
