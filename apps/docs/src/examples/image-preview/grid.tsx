import { ImagePreview } from "@sajam/ui/image-preview"

const photos = [
  { alt: "Coastline at dawn", colors: ["#9ad0ec", "#1d4e89"] },
  { alt: "Autumn forest", colors: ["#f2a65a", "#772f1a"] },
  { alt: "Meadow in spring", colors: ["#b8e0a0", "#2f6b3a"] },
  { alt: "City skyline at dusk", colors: ["#c3a6ff", "#2a1f4f"] },
].map(function (photo) {
  const [start, end] = photo.colors
  return {
    alt: photo.alt,
    src: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
        <defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient></defs>
        <rect width="900" height="900" fill="url(#g)"/>
        <path d="M0 900 300 520l180 160 160-120 260 340Z" fill="#000" fill-opacity=".25"/>
      </svg>
    `)}`,
  }
})

export default function ImagePreviewGridExample() {
  return (
    <div className="grid w-full max-w-xs grid-cols-2 gap-2">
      {photos.map(function (photo) {
        return (
          <ImagePreview
            key={photo.alt}
            src={photo.src}
            alt={photo.alt}
            className="rounded-lg"
            imageClassName="aspect-square w-full object-cover"
          />
        )
      })}
    </div>
  )
}
