"use client"

import { Carousel } from "@sajam/ui/carousel"
import { cn } from "@sajam/ui/utils"
import { useEffect, useState } from "react"

const photos = [
  { alt: "Sunrise over a calm lake", colors: ["#f6a15b", "#6b3fa0"] },
  { alt: "Pine forest in the fog", colors: ["#7fb49a", "#1d3b35"] },
  { alt: "Desert dunes at noon", colors: ["#f3d38b", "#b0603a"] },
  { alt: "Harbour lights at night", colors: ["#5b7cf6", "#141a3f"] },
  { alt: "Snowy mountain ridge", colors: ["#dfe8f3", "#5f7896"] },
].map(function (photo, index) {
  const [start, end] = photo.colors
  return {
    alt: photo.alt,
    src: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
        <defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient></defs>
        <rect width="800" height="450" fill="url(#g)"/>
        <circle cx="${180 + index * 110}" cy="140" r="60" fill="#fff" fill-opacity=".45"/>
        <path d="M0 450 220 250l120 100 110-80 350 180Z" fill="#000" fill-opacity=".25"/>
      </svg>
    `)}`,
  }
})

export default function CarouselGalleryExample() {
  const [api, setApi] = useState<Carousel.Api>()
  const [selected, setSelected] = useState(0)

  useEffect(
    function () {
      if (!api) return
      const embla = api
      function updateSelection() {
        setSelected(embla.selectedScrollSnap())
      }
      updateSelection()
      embla.on("select", updateSelection).on("reInit", updateSelection)
      return function () {
        embla.off("select", updateSelection).off("reInit", updateSelection)
      }
    },
    [api],
  )

  return (
    <div className="w-full max-w-xl space-y-3">
      <Carousel.Root
        aria-label="Photo gallery"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <Carousel.Content>
          {photos.map(function (photo, index) {
            return (
              <Carousel.Item
                key={photo.alt}
                aria-label={`${index + 1} of ${photos.length}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-video w-full rounded-xl object-cover"
                />
              </Carousel.Item>
            )
          })}
        </Carousel.Content>
        <Carousel.Previous className="inset-s-3" />
        <Carousel.Next className="inset-e-3" />
      </Carousel.Root>
      <div className="grid grid-cols-5 gap-2">
        {photos.map(function (photo, index) {
          return (
            <button
              key={photo.alt}
              type="button"
              aria-label={`Show photo ${index + 1}: ${photo.alt}`}
              aria-current={index === selected}
              className={cn(
                "focus-visible:ring-ring/50 overflow-hidden rounded-lg ring-2 ring-transparent transition outline-none focus-visible:ring-3",
                index === selected ? "ring-primary" : "opacity-60 hover:opacity-100",
              )}
              onClick={function () {
                api?.scrollTo(index)
              }}
            >
              <img
                src={photo.src}
                alt=""
                className="aspect-video w-full object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
