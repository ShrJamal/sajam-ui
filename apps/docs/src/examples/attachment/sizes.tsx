import { Attachment } from "@sajam/ui/attachment"
import { FileTextIcon } from "lucide-react"

const sizes = ["default", "sm", "xs"] as const

export default function AttachmentSizesExample() {
  return (
    <div className="grid justify-items-start gap-3">
      {sizes.map(function (size) {
        return (
          <Attachment.Root
            key={size}
            size={size}
          >
            <Attachment.Media>
              <FileTextIcon />
            </Attachment.Media>
            <Attachment.Content>
              <Attachment.Title>Meeting notes.txt</Attachment.Title>
              <Attachment.Description>12 KB</Attachment.Description>
            </Attachment.Content>
          </Attachment.Root>
        )
      })}
    </div>
  )
}
