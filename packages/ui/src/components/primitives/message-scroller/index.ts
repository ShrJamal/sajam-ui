"use client"

import {
  MessageScrollerButton as Button,
  MessageScrollerContent as Content,
  MessageScrollerItem as Item,
  MessageScrollerProvider as Provider,
  MessageScroller as Root,
  MessageScrollerViewport as Viewport,
} from "./components.js"

export const MessageScroller = {
  Provider,
  Root,
  Viewport,
  Content,
  Item,
  Button,
}

export {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "./components.js"

export type {
  MessageScrollerDefaultScrollPosition,
  MessageScrollerScrollAlign,
  MessageScrollerScrollOptions,
  MessageScrollerScrollable,
  MessageScrollerVisibilityState,
} from "./types.js"
