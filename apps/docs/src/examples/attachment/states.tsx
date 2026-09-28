import { Attachment } from "@sajam/ui/attachment"
import { Spinner } from "@sajam/ui/spinner"
import { FilePlusIcon, FileWarningIcon, RotateCcwIcon } from "lucide-react"

export default function AttachmentStatesExample() {
  return (
    <div className="grid w-full max-w-64 gap-3">
      <Attachment.Root
        state="idle"
        className="w-full"
      >
        <Attachment.Media>
          <FilePlusIcon />
        </Attachment.Media>
        <Attachment.Content>
          <Attachment.Title>Drop a file</Attachment.Title>
          <Attachment.Description>PDF, PNG, or ZIP</Attachment.Description>
        </Attachment.Content>
      </Attachment.Root>
      <Attachment.Root
        state="uploading"
        className="w-full"
      >
        <Attachment.Media>
          <Spinner />
        </Attachment.Media>
        <Attachment.Content>
          <Attachment.Title>Campaign assets.zip</Attachment.Title>
          <Attachment.Description>Uploading · 68%</Attachment.Description>
          <Attachment.Progress value={68} />
        </Attachment.Content>
      </Attachment.Root>
      <Attachment.Root
        state="processing"
        className="w-full"
      >
        <Attachment.Media>
          <Spinner />
        </Attachment.Media>
        <Attachment.Content>
          <Attachment.Title>Interview.mov</Attachment.Title>
          <Attachment.Description>Processing preview</Attachment.Description>
        </Attachment.Content>
      </Attachment.Root>
      <Attachment.Root
        state="error"
        className="w-full"
      >
        <Attachment.Media>
          <FileWarningIcon />
        </Attachment.Media>
        <Attachment.Content>
          <Attachment.Title>Annual report.pdf</Attachment.Title>
          <Attachment.Description>Upload failed</Attachment.Description>
        </Attachment.Content>
        <Attachment.Actions>
          <Attachment.Action aria-label="Retry uploading Annual report.pdf">
            <RotateCcwIcon />
          </Attachment.Action>
        </Attachment.Actions>
      </Attachment.Root>
    </div>
  )
}
