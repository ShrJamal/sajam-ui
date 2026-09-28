import { AspectRatio } from "@sajam/ui/aspect-ratio"

const landscape = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
    <defs><linearGradient id="g" x2="0" y2="1"><stop stop-color="#8fb8f0"/><stop offset="1" stop-color="#2d3f73"/></linearGradient></defs>
    <rect width="960" height="540" fill="url(#g)"/>
    <circle cx="700" cy="150" r="70" fill="#fff" fill-opacity=".6"/>
    <path d="M0 540 280 280l160 140 140-110 380 230Z" fill="#000" fill-opacity=".3"/>
  </svg>
`)}`

export default function AspectRatioExample() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="bg-muted w-full max-w-sm overflow-hidden rounded-xl"
    >
      <img
        src={landscape}
        alt="Mountains at dusk"
        className="size-full object-cover"
      />
    </AspectRatio>
  )
}
