import { Carousel } from "@sajam/ui/carousel"

const slides = [1, 2, 3, 4, 5]

export default function CarouselExample() {
  return (
    <div className="w-full px-12">
      <Carousel.Root
        aria-label="Numbered slides"
        className="mx-auto w-full max-w-xs"
      >
        <Carousel.Content>
          {slides.map(function (slide) {
            return (
              <Carousel.Item
                key={slide}
                aria-label={`${slide} of ${slides.length}`}
              >
                <div className="bg-card grid aspect-square place-items-center rounded-xl border text-4xl font-semibold">
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
