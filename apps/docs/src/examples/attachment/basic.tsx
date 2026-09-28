import { Attachment } from "@sajam/ui/attachment"
import { FileTextIcon, XIcon } from "lucide-react"

export default function AttachmentExample() {
  return (
    <Attachment.Root>
      <Attachment.Media>
        <FileTextIcon />
      </Attachment.Media>
      <Attachment.Content>
        <Attachment.Title>Brand guidelines.pdf</Attachment.Title>
        <Attachment.Description>PDF · 2.4 MB</Attachment.Description>
      </Attachment.Content>
      <Attachment.Actions>
        <Attachment.Action aria-label="Remove Brand guidelines.pdf">
          <XIcon />
        </Attachment.Action>
      </Attachment.Actions>
    </Attachment.Root>
  )
}
