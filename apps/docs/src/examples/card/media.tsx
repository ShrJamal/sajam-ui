import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"

const cover = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="280" viewBox="0 0 640 280">
    <defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#6d7cff"/><stop offset="1" stop-color="#1f2a5c"/></linearGradient></defs>
    <rect width="640" height="280" fill="url(#g)"/>
    <circle cx="500" cy="80" r="46" fill="#fff" fill-opacity=".7"/>
    <path d="M0 280 170 130l110 90 90-70 270 130Z" fill="#fff" fill-opacity=".25"/>
  </svg>
`)}`

export default function CardMediaExample() {
  return (
    <Card.Root className="w-full max-w-sm">
      <Card.Media className="aspect-[16/7]">
        <img
          src={cover}
          alt="Illustrated mountains under a pale moon"
        />
      </Card.Media>
      <Card.Header>
        <Card.Title>Weekend in the mountains</Card.Title>
        <Card.Description>Three trails, two cabins, and one very early sunrise.</Card.Description>
      </Card.Header>
      <Card.Footer className="justify-end gap-2">
        <Button variant="ghost">Save</Button>
        <Button>Read story</Button>
      </Card.Footer>
    </Card.Root>
  )
}
