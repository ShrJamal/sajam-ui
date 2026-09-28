import { Attachment } from "@sajam/ui/attachment"

const cover = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
    <defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#f29fb0"/><stop offset="1" stop-color="#5a3d8a"/></linearGradient></defs>
    <rect width="240" height="240" fill="url(#g)"/>
    <circle cx="170" cy="70" r="38" fill="#fff" fill-opacity=".65"/>
  </svg>
`)}`

export default function AttachmentImageExample() {
  return (
    <Attachment.Root orientation="vertical">
      <Attachment.Media variant="image">
        <img
          src={cover}
          alt="Pink and violet abstract cover"
        />
      </Attachment.Media>
      <Attachment.Content>
        <Attachment.Title>Cover artwork.png</Attachment.Title>
        <Attachment.Description>PNG · 840 KB</Attachment.Description>
      </Attachment.Content>
    </Attachment.Root>
  )
}
