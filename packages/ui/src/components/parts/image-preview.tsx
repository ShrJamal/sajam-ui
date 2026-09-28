"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
import { RotateCwIcon, XIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"

const ZOOM_STEP = 0.5
// Space kept around the image inside the viewport, in pixels. Matches the stage's p-4.
const STAGE_PADDING = 16

// A thumbnail that opens the image in a dialog. Zoom enlarges the image inside a scrollable
// viewport, so every edge stays reachable by scrolling, dragging, or the arrow keys.
function ImagePreview({
  src,
  alt,
  previewSrc,
  maxZoom = 4,
  className,
  imageClassName,
  zoomInLabel = "Zoom in",
  zoomOutLabel = "Zoom out",
  rotateLabel = "Rotate",
  closeLabel = "Close preview",
  ...props
}: Props) {
  const [zoom, setZoom] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)
  const [natural, setNatural] = React.useState<Size | null>(null)
  const [viewport, setViewport] = React.useState<Size | null>(null)
  const viewportNodeRef = React.useRef<HTMLDivElement | null>(null)
  const pendingCenterRef = React.useRef<{ x: number; y: number } | null>(null)
  const dragRef = React.useRef<{ x: number; y: number } | null>(null)
  const stage = natural && viewport ? measureStage(natural, viewport, zoom, rotation) : null

  const viewportRef = React.useCallback(function (node: HTMLDivElement | null) {
    viewportNodeRef.current = node
    if (!node) return
    const observer = new ResizeObserver(function () {
      setViewport({ width: node.clientWidth, height: node.clientHeight })
    })
    observer.observe(node)
    return function () {
      viewportNodeRef.current = null
      observer.disconnect()
    }
  }, [])

  // Keep the point at the centre of the viewport in place when the image grows or turns.
  React.useLayoutEffect(
    function () {
      const node = viewportNodeRef.current
      const center = pendingCenterRef.current
      if (!node || !center) return
      pendingCenterRef.current = null
      node.scrollLeft = center.x * node.scrollWidth - node.clientWidth / 2
      node.scrollTop = center.y * node.scrollHeight - node.clientHeight / 2
    },
    [zoom, rotation],
  )

  function rememberCenter() {
    const node = viewportNodeRef.current
    if (!node) return
    pendingCenterRef.current = {
      x: (node.scrollLeft + node.clientWidth / 2) / node.scrollWidth,
      y: (node.scrollTop + node.clientHeight / 2) / node.scrollHeight,
    }
  }

  function zoomBy(step: number) {
    rememberCenter()
    setZoom(Math.min(maxZoom, Math.max(1, zoom + step)))
  }

  return (
    <DialogPrimitive.Root
      onOpenChange={function (open) {
        if (!open) return
        setZoom(1)
        setRotation(0)
      }}
    >
      <DialogPrimitive.Trigger
        data-slot="image-preview"
        className={cn(
          "group/image-preview focus-visible:ring-ring/50 relative inline-flex cursor-zoom-in overflow-hidden rounded-xl outline-none focus-visible:ring-3",
          className,
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className={cn("block max-w-full", imageClassName)}
        />
        <span className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover/image-preview:opacity-100 group-focus-visible/image-preview:opacity-100">
          <span className="bg-background/90 text-foreground rounded-full p-2 shadow-sm">
            <ZoomInIcon
              aria-hidden="true"
              className="size-4"
            />
          </span>
        </span>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="bg-background/70 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 duration-150 supports-backdrop-filter:backdrop-blur-sm" />
        <DialogPrimitive.Popup
          data-slot="image-preview-content"
          className="bg-background text-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed inset-4 z-50 flex flex-col overflow-hidden rounded-xl text-sm shadow-lg ring-1 duration-150 outline-none sm:inset-8"
        >
          <div className="flex items-center gap-1 border-b p-2 ps-4">
            <DialogPrimitive.Title className="min-w-0 flex-1 truncate font-medium">
              {alt}
            </DialogPrimitive.Title>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={zoomOutLabel}
              focusableWhenDisabled
              disabled={zoom <= 1}
              onClick={function () {
                zoomBy(-ZOOM_STEP)
              }}
            >
              <ZoomOutIcon />
            </Button>
            <output className="text-muted-foreground w-12 text-center text-xs tabular-nums">
              {Math.round(zoom * 100)}%
            </output>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={zoomInLabel}
              focusableWhenDisabled
              disabled={zoom >= maxZoom}
              onClick={function () {
                zoomBy(ZOOM_STEP)
              }}
            >
              <ZoomInIcon />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={rotateLabel}
              onClick={function () {
                rememberCenter()
                setRotation((rotation + 90) % 360)
              }}
            >
              <RotateCwIcon />
            </Button>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={closeLabel}
                />
              }
            >
              <XIcon />
            </DialogPrimitive.Close>
          </div>
          <div
            ref={viewportRef}
            tabIndex={0}
            data-zoomed={zoom > 1 || undefined}
            className="bg-muted/40 focus-visible:ring-ring/50 flex min-h-0 flex-1 overflow-auto outline-none select-none focus-visible:ring-3 focus-visible:ring-inset data-zoomed:cursor-grab data-zoomed:active:cursor-grabbing"
            onPointerDown={function (event) {
              // Drag the image itself; presses on the viewport's own scrollbars are left alone.
              if (
                event.pointerType !== "mouse" ||
                event.button !== 0 ||
                event.target === event.currentTarget
              ) {
                return
              }
              dragRef.current = { x: event.clientX, y: event.clientY }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={function (event) {
              const drag = dragRef.current
              if (!drag) return
              event.currentTarget.scrollBy(drag.x - event.clientX, drag.y - event.clientY)
              dragRef.current = { x: event.clientX, y: event.clientY }
            }}
            onPointerUp={function () {
              dragRef.current = null
            }}
            onPointerCancel={function () {
              dragRef.current = null
            }}
          >
            {/* Auto margins centre the stage while it fits and pin it to the start edge once it
                overflows, so the whole image can be scrolled into view. */}
            <div
              className="relative m-auto box-content shrink-0 p-4"
              style={stage ? { width: stage.width, height: stage.height } : undefined}
            >
              <img
                src={previewSrc ?? src}
                alt={alt}
                draggable={false}
                className="absolute top-1/2 left-1/2 max-w-none"
                style={
                  stage
                    ? {
                        width: stage.imageWidth,
                        height: stage.imageHeight,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      }
                    : { visibility: "hidden" }
                }
                onLoad={function (event) {
                  const image = event.currentTarget
                  setNatural({ width: image.naturalWidth, height: image.naturalHeight })
                }}
              />
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

type Props = Omit<DialogPrimitive.Trigger.Props, "children" | "render"> & {
  src: string
  alt: string
  // A larger source for the dialog; the thumbnail uses `src`.
  previewSrc?: string
  // Classes for the thumbnail image. `className` styles the trigger button.
  imageClassName?: string
  // Highest zoom level, relative to the image fitted in the dialog. Defaults to 4.
  maxZoom?: number
  zoomInLabel?: string
  zoomOutLabel?: string
  rotateLabel?: string
  closeLabel?: string
}

type Size = { width: number; height: number }

// Sizes the stage so the image fits the viewport at zoom 1. When the image is turned
// sideways the stage swaps its width and height, keeping the scroll area accurate.
function measureStage(natural: Size, viewport: Size, zoom: number, rotation: number) {
  const available = {
    width: Math.max(viewport.width - STAGE_PADDING * 2, 1),
    height: Math.max(viewport.height - STAGE_PADDING * 2, 1),
  }
  // SVGs without intrinsic dimensions report zero; fill the viewport instead.
  const imageWidth = natural.width || available.width
  const imageHeight = natural.height || available.height
  const sideways = rotation % 180 !== 0
  const width = sideways ? imageHeight : imageWidth
  const height = sideways ? imageWidth : imageHeight
  const scale = Math.min(available.width / width, available.height / height) * zoom
  return {
    width: width * scale,
    height: height * scale,
    imageWidth: imageWidth * scale,
    imageHeight: imageHeight * scale,
  }
}

export { ImagePreview }
export type { Props as ImagePreviewProps }
