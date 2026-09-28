"use client"

import {
  Toast as ToastPrimitive,
  type ToastManager as BaseToastManager,
  type ToastManagerAddOptions,
  type ToastManagerUpdateOptions,
  type ToastObject,
} from "@base-ui/react/toast"
import { cn } from "cn"
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"
import { Spinner } from "./spinner.js"

const viewportPositions: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "right-4 bottom-4",
}

const ToastPositionContext = React.createContext<ToastPosition>("bottom-right")

// Shared manager for app-wide toasts. Render a single Toaster for it; give any additional
// Toaster its own manager from createToastManager() so each toast renders only once.
const toast = createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return (
    <ToastPrimitive.Portal
      data-slot="toast-portal"
      {...props}
    />
  )
}

// Positions the stack and shares the position with every Toast.Root inside it.
function ToastViewport({
  className,
  position = "bottom-right",
  ...props
}: ToastPrimitive.Viewport.Props & { position?: ToastPosition }) {
  return (
    <ToastPositionContext.Provider value={position}>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        data-position={position}
        className={cn(
          "pointer-events-none fixed z-50 w-[calc(100%-2rem)] max-w-sm outline-none sm:w-full",
          viewportPositions[position],
          className,
        )}
        {...props}
      />
    </ToastPositionContext.Provider>
  )
}

function Toast({ className, swipeDirection, ...props }: ToastPrimitive.Root.Props) {
  const position = React.useContext(ToastPositionContext)
  const top = position.startsWith("top")

  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-position={position}
      swipeDirection={
        swipeDirection ?? [top ? "up" : "down", position.endsWith("left") ? "left" : "right"]
      }
      className={cn(
        "group/toast bg-popover text-popover-foreground focus-visible:border-ring focus-visible:ring-ring/50 pointer-events-auto absolute right-0 z-[calc(1000-var(--toast-index))] w-full rounded-2xl border shadow-lg will-change-transform outline-none select-none focus-visible:ring-[3px]",
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        "h-(--height) [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-limited:opacity-0",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        top
          ? "top-0 origin-top [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] data-starting-style:[transform:translateY(-150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]"
          : "bottom-0 origin-bottom [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] data-starting-style:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        className,
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = (
    <Button
      variant="outline"
      size="sm"
    />
  ),
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  render = (
    <Button
      variant="ghost"
      size="icon-sm"
    />
  ),
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label={children ? undefined : "Close"}
      render={render}
      className={cn(
        "text-muted-foreground hover:text-foreground relative shrink-0 after:absolute after:-inset-2 after:content-['']",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  )
}

// Renders the viewport and the default toast layout for a manager (the shared `toast` by default).
function Toaster({
  children,
  toastManager = toast,
  position = "bottom-right",
  renderToast,
  closeLabel = "Close",
  ...props
}: ToasterProps) {
  return (
    <ToastProvider
      toastManager={toastManager as BaseToastManager}
      {...props}
    >
      {children}
      <ToastPortal>
        <ToastViewport position={position}>
          <ToastList
            renderToast={renderToast}
            closeLabel={closeLabel}
          />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

type ToastType = "info" | "success" | "warning" | "destructive" | "loading"

type ToastData = Record<string, unknown>

type ToastOptions = Omit<ToastManagerAddOptions<ToastData>, "type"> & { type?: ToastType }

type ToastUpdateOptions = Omit<ToastManagerUpdateOptions<ToastData>, "type"> & {
  type?: ToastType
}

type ToastPromiseOptions<Value> = {
  loading: string | ToastUpdateOptions
  success: string | ToastUpdateOptions | ((result: Value) => string | ToastUpdateOptions)
  error: string | ToastUpdateOptions | ((error: unknown) => string | ToastUpdateOptions)
}

// Base UI's manager with `type` narrowed to the styled toast types.
type ToastManager = Pick<BaseToastManager<ToastData>, " subscribe" | "close"> & {
  add: (options: ToastOptions) => string
  update: (
    id: string,
    updates: ToastUpdateOptions | ((previous: ToastObject<ToastData>) => ToastUpdateOptions),
  ) => void
  promise: <Value>(promise: Promise<Value>, options: ToastPromiseOptions<Value>) => Promise<Value>
}

type ToastRenderer = (
  toastItem: ToastObject<ToastData>,
  defaultContent: React.ReactNode,
) => React.ReactNode

type ToasterProps = Omit<ToastPrimitive.Provider.Props, "toastManager"> & {
  toastManager?: ToastManager
  position?: ToastPosition
  renderToast?: ToastRenderer
  closeLabel?: string
}

// Creates an independent manager, for example to scope a Toaster to one part of the page.
function createToastManager() {
  return ToastPrimitive.createToastManager<ToastData>() as ToastManager
}

// Returns the nearest Toaster's toasts together with its typed manager methods.
function useToastManager() {
  return ToastPrimitive.useToastManager<ToastData>() as ToastManager & {
    toasts: ToastObject<ToastData>[]
  }
}

function ToastList({
  renderToast,
  closeLabel,
}: {
  renderToast?: ToastRenderer
  closeLabel: string
}) {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>()

  return toasts.map((toastItem) => {
    const defaultContent = (
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose aria-label={closeLabel} />
      </ToastContent>
    )

    return (
      <Toast
        key={toastItem.id}
        toast={toastItem}
      >
        {renderToast ? renderToast(toastItem, defaultContent) : defaultContent}
      </Toast>
    )
  })
}

function ToastIcon({ type }: { type: string | undefined }) {
  const className = "size-4 shrink-0"

  switch (type) {
    case "loading":
      return (
        <Spinner
          data-slot="toast-icon"
          aria-hidden="true"
          className={cn(className, "text-muted-foreground")}
        />
      )
    case "info":
      return (
        <InfoIcon
          data-slot="toast-icon"
          aria-hidden="true"
          className={cn(className, "text-info")}
        />
      )
    case "success":
      return (
        <CircleCheckIcon
          data-slot="toast-icon"
          aria-hidden="true"
          className={cn(className, "text-success")}
        />
      )
    case "warning":
      return (
        <TriangleAlertIcon
          data-slot="toast-icon"
          aria-hidden="true"
          className={cn(className, "text-warning")}
        />
      )
    case "destructive":
      return (
        <OctagonXIcon
          data-slot="toast-icon"
          aria-hidden="true"
          className={cn(className, "text-destructive")}
        />
      )
    default:
      return null
  }
}

export {
  Toaster,
  Toast as Root,
  ToastAction as Action,
  ToastClose as Close,
  ToastContent as Content,
  ToastDescription as Description,
  ToastPortal as Portal,
  ToastProvider as Provider,
  ToastTitle as Title,
  ToastViewport as Viewport,
  type ToastManager,
  type ToastOptions,
  type ToastPosition,
  type ToastRenderer,
  type ToastType,
  createToastManager,
  toast,
  useToastManager,
}
