import { Carousel } from "@sajam/ui/carousel"

const slides = [1, 2, 3, 4, 5]

export default function CarouselVerticalExample() {
  return (
    <div className="py-12">
      <Carousel.Root
        orientation="vertical"
        aria-label="Numbered slides"
        opts={{ align: "start" }}
        className="w-48"
      >
        <Carousel.Content className="-mt-2 h-52">
          {slides.map(function (slide) {
            return (
              <Carousel.Item
                key={slide}
                aria-label={`${slide} of ${slides.length}`}
                className="basis-1/2 pt-2"
              >
                <div className="bg-card grid h-full place-items-center rounded-xl border text-2xl font-semibold">
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
