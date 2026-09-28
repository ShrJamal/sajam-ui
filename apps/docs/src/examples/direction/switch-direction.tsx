"use client"

import { Button } from "@sajam/ui/button"
import { Carousel } from "@sajam/ui/carousel"
import { DirectionProvider } from "@sajam/ui/direction"
import { useState } from "react"

const slides = [1, 2, 3, 4]

export default function DirectionSwitchExample() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl")

  return (
    <div className="grid w-full max-w-xs justify-items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={function () {
          setDirection(direction === "ltr" ? "rtl" : "ltr")
        }}
      >
        Switch to {direction === "ltr" ? "right to left" : "left to right"}
      </Button>
      <div
        dir={direction}
        className="w-full px-12"
      >
        <DirectionProvider direction={direction}>
          <Carousel.Root aria-label="Numbered slides">
            <Carousel.Content>
              {slides.map(function (slide) {
                return (
                  <Carousel.Item
                    key={slide}
                    aria-label={`${slide} of ${slides.length}`}
                  >
                    <div className="bg-card grid aspect-video place-items-center rounded-xl border text-3xl font-semibold">
                      {slide}
                    </div>
                  </Carousel.Item>
                )
              })}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </DirectionProvider>
      </div>
    </div>
  )
}
