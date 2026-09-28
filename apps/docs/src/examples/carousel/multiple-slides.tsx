import { Carousel } from "@sajam/ui/carousel"

const slides = [1, 2, 3, 4, 5, 6]

export default function CarouselMultipleSlidesExample() {
  return (
    <div className="w-full px-12">
      <Carousel.Root
        aria-label="Numbered slides"
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-xs"
      >
        <Carousel.Content className="-ms-2">
          {slides.map(function (slide) {
            return (
              <Carousel.Item
                key={slide}
                aria-label={`${slide} of ${slides.length}`}
                className="basis-1/2 ps-2"
              >
                <div className="bg-card grid aspect-square place-items-center rounded-xl border text-2xl font-semibold">
                  {slide}
                </div>
              </Carousel.Item>
            )
          })}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    </div>
  )
}
