"use client"

import { Button } from "@sajam/ui/button"
import { FileUpload } from "@sajam/ui/file-upload"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function FileUploadFormExample() {
  const id = useId()
  const [submitted, setSubmitted] = useState<string[]>([])

  return (
    <form
      className="grid w-full max-w-sm gap-3"
      onSubmit={function (event) {
        event.preventDefault()
        // FormData reads the files straight from the native input.
        const files = new FormData(event.currentTarget).getAll("attachments") as File[]
        setSubmitted(
          files.map(function (file) {
            return file.name
          }),
        )
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor={id}>Attachments</Label>
        <FileUpload
          id={id}
          name="attachments"
          accept=".pdf,.doc,.docx"
          multiple
          required
        />
      </div>
      <Button
        type="submit"
        className="w-fit"
      >
        Submit
      </Button>
      <p
        className="text-muted-foreground text-xs"
        role="status"
      >
        {submitted.length > 0
          ? `Form data contains: ${submitted.join(", ")}`
          : "Submit to read the files from FormData."}
      </p>
    </form>
  )
}
