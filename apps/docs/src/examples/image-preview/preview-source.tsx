import { ImagePreview } from "@sajam/ui/image-preview"

const thumbnail = artwork(320, 200)
const fullSize = artwork(2400, 1500)

export default function ImagePreviewSourceExample() {
  return (
    <ImagePreview
      src={thumbnail}
      previewSrc={fullSize}
      alt="Architectural drawing of a pavilion"
      maxZoom={6}
      className="w-full max-w-xs"
      imageClassName="aspect-[8/5] w-full object-cover"
    />
  )
}

function artwork(width: number, height: number) {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 640 400">
      <rect width="640" height="400" fill="#f4f1ea"/>
      <g fill="none" stroke="#33415c" stroke-width="3">
        <path d="M80 320h480M120 320V200l200-90 200 90v120M200 320v-80h80v80M360 240h80v50h-80z"/>
        <path d="M120 200h400" stroke-dasharray="8 8"/>
      </g>
      <text x="320" y="370" text-anchor="middle" font-family="monospace" font-size="14" fill="#33415c">Scale 1:100</text>
    </svg>
  `)}`
}
