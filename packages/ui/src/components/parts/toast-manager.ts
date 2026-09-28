"use client"

import {
  Toast as ToastPrimitive,
  type ToastManager as BaseToastManager,
  type ToastManagerAddOptions,
  type ToastManagerUpdateOptions,
  type ToastObject,
} from "@base-ui/react/toast"

// Shared manager for app-wide toasts. Render a single Toaster for it; give any additional
// Toaster its own manager from createToastManager() so each toast renders only once.
const toast = createToastManager()

// Creates an independent manager, for example to scope a Toaster to one part of the page.
function createToastManager(): ToastManager {
  const manager = ToastPrimitive.createToastManager<ToastData>() as ToastManagerMethods

  function shorthand(type: ToastType): ToastShorthand {
    return function (title, options) {
      return manager.add({ ...options, title, type })
    }
  }

  // Extends the Base UI manager in place so Toaster keeps receiving the original object.
  return Object.assign(manager, {
    info: shorthand("info"),
    success: shorthand("success"),
    warning: shorthand("warning"),
    destructive: shorthand("destructive"),
    loading: shorthand("loading"),
  })
}

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
type ToastManagerMethods = Pick<BaseToastManager<ToastData>, " subscribe" | "close"> & {
  add: (options: ToastOptions) => string
  update: (
    id: string,
    updates: ToastUpdateOptions | ((previous: ToastObject<ToastData>) => ToastUpdateOptions),
  ) => void
  promise: <Value>(promise: Promise<Value>, options: ToastPromiseOptions<Value>) => Promise<Value>
}

// Adds a toast of one type: toast.success("Saved", { description }).
type ToastShorthand = (
  title: ToastOptions["title"],
  options?: Omit<ToastOptions, "title" | "type">,
) => string

type ToastManager = ToastManagerMethods & Record<ToastType, ToastShorthand>

export {
  type ToastData,
  type ToastManager,
  type ToastManagerMethods,
  type ToastOptions,
  type ToastType,
  createToastManager,
  toast,
}
