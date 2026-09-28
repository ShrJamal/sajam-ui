"use client"

import { cn } from "cn"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"
import { useDirection } from "./direction.js"

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

// Slides powered by Embla with touch, button, and arrow key navigation. Horizontal carousels
// follow the direction from DirectionProvider; also set `dir="rtl"` on an ancestor.
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  onKeyDown,
  "aria-label": ariaLabel = "Carousel",
  ...props
}: Props) {
  const providerDirection = useDirection()
  const direction = opts?.direction ?? providerDirection
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, direction, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(
    function () {
      api?.scrollPrev()
    },
    [api],
  )

  const scrollNext = React.useCallback(
    function () {
      api?.scrollNext()
    },
    [api],
  )

  React.useEffect(
    function () {
      if (api && setApi) setApi(api)
    },
    [api, setApi],
  )

  React.useEffect(
    function () {
      if (!api) return
      const embla = api

      function updateButtons() {
        setCanScrollPrev(embla.canScrollPrev())
        setCanScrollNext(embla.canScrollNext())
      }

      updateButtons()
      embla.on("reInit", updateButtons).on("select", updateButtons)
      return function () {
        embla.off("reInit", updateButtons).off("select", updateButtons)
      }
    },
    [api],
  )

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)
    const target = event.target as HTMLElement
    // Leave arrow keys to text fields and to widgets that already handled them.
    if (
      event.defaultPrevented ||
      target.isContentEditable ||
      target.closest("input, textarea, select")
    ) {
      return
    }

    const [previousKey, nextKey] =
      orientation === "vertical"
        ? ["ArrowUp", "ArrowDown"]
        : direction === "rtl"
          ? ["ArrowRight", "ArrowLeft"]
          : ["ArrowLeft", "ArrowRight"]

    if (event.key === previousKey) {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === nextKey) {
      event.preventDefault()
      scrollNext()
    }
  }

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        data-slot="carousel"
        data-orientation={orientation}
        className={cn("relative", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn("flex", orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  disabled,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -inset-s-12 my-auto"
          : "-top-12 left-1/2 -translate-x-1/2",
        className,
      )}
      disabled={disabled || !canScrollPrev}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented) scrollPrev()
      }}
      {...props}
    >
      {orientation === "horizontal" ? (
        <ChevronLeftIcon className="rtl:rotate-180" />
      ) : (
        <ChevronUpIcon />
      )}
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  disabled,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -inset-e-12 my-auto"
          : "-bottom-12 left-1/2 -translate-x-1/2",
        className,
      )}
      disabled={disabled || !canScrollNext}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented) scrollNext()
      }}
      {...props}
    >
      {orientation === "horizontal" ? (
        <ChevronRightIcon className="rtl:rotate-180" />
      ) : (
        <ChevronDownIcon />
      )}
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

type CarouselApi = UseEmblaCarouselType[1]
type EmblaParameters = Parameters<typeof useEmblaCarousel>

type Props = React.ComponentProps<"div"> & {
  opts?: EmblaParameters[0]
  plugins?: EmblaParameters[1]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0]
  api: CarouselApi
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

// Reads the carousel state inside Carousel.Root, for custom controls such as dots or thumbnails.
function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within Carousel.Root")
  return context
}

export {
  type CarouselApi as Api,
  Carousel as Root,
  CarouselContent as Content,
  CarouselItem as Item,
  CarouselPrevious as Previous,
  CarouselNext as Next,
  useCarousel,
}
