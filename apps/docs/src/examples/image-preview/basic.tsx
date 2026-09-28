import { ImagePreview } from "@sajam/ui/image-preview"

const image = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="#f7b267"/><stop offset="1" stop-color="#5b3a8c"/></linearGradient></defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <circle cx="880" cy="220" r="110" fill="#fff" fill-opacity=".6"/>
    <path d="M0 800 320 420l200 170 170-130 510 340Z" fill="#000" fill-opacity=".3"/>
    <text x="40" y="70" font-family="sans-serif" font-size="28" fill="#fff" fill-opacity=".8">Top-left corner</text>
    <text x="1160" y="770" text-anchor="end" font-family="sans-serif" font-size="28" fill="#fff" fill-opacity=".8">Bottom-right corner</text>
  </svg>
`)}`

export default function ImagePreviewExample() {
  return (
    <ImagePreview
      src={image}
      alt="Sunset over layered mountains"
      className="w-full max-w-xs"
      imageClassName="aspect-[3/2] w-full object-cover"
    />
  )
}
