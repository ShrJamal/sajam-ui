"use client"

import { FileUpload, type FileRejectReason } from "@sajam/ui/file-upload"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

const rejectionMessages: Record<FileRejectReason, string> = {
  type: "is not an image",
  size: "is larger than 2 MB",
  count: "was skipped because the limit is 3 images",
}

export default function FileUploadBasicExample() {
  const id = useId()
  const hintId = useId()
  const [error, setError] = useState("")

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Screenshots</Label>
      <FileUpload
        id={id}
        accept="image/*"
        multiple
        maxFiles={3}
        maxSize={2 * 1024 * 1024}
        aria-describedby={hintId}
        onFilesChange={function () {
          setError("")
        }}
        onFileReject={function (file, reason) {
          setError(`${file.name} ${rejectionMessages[reason]}.`)
        }}
      />
      <p
        id={hintId}
        className={error ? "text-destructive text-xs" : "text-muted-foreground text-xs"}
        role="status"
      >
        {error || "Up to 3 images, 2 MB each."}
      </p>
    </div>
  )
}
