import { Attachment } from "@sajam/ui/attachment"
import { Button } from "@sajam/ui/button"
import { Textarea } from "@sajam/ui/textarea"
import { ArrowUpIcon, FileIcon, ImageIcon, SheetIcon, XIcon } from "lucide-react"

const files = [
  { name: "Brief.pdf", size: "1.2 MB", icon: FileIcon },
  { name: "Cover.png", size: "840 KB", icon: ImageIcon },
  { name: "Budget.csv", size: "96 KB", icon: SheetIcon },
  { name: "Timeline.pdf", size: "310 KB", icon: FileIcon },
]

export default function AttachmentComposerExample() {
  return (
    <div className="bg-card grid w-full max-w-lg gap-2 rounded-xl border p-2">
      <Attachment.Group>
        {files.map(function (file) {
          const Icon = file.icon
          return (
            <Attachment.Root
              key={file.name}
              size="sm"
            >
              <Attachment.Media>
                <Icon />
              </Attachment.Media>
              <Attachment.Content>
                <Attachment.Title>{file.name}</Attachment.Title>
                <Attachment.Description>{file.size}</Attachment.Description>
              </Attachment.Content>
              <Attachment.Actions>
                <Attachment.Action aria-label={`Remove ${file.name}`}>
                  <XIcon />
                </Attachment.Action>
              </Attachment.Actions>
            </Attachment.Root>
          )
        })}
      </Attachment.Group>
      <Textarea
        aria-label="Message"
        placeholder="Add a message…"
        className="min-h-16 resize-none border-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        size="icon-sm"
        aria-label="Send"
        className="justify-self-end rounded-full"
      >
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
