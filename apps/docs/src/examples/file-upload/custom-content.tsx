import { FileUpload } from "@sajam/ui/file-upload"
import { FileTextIcon } from "lucide-react"

export default function FileUploadCustomContentExample() {
  return (
    <FileUpload
      className="max-w-sm"
      accept=".pdf"
      maxSize={5 * 1024 * 1024}
    >
      <FileTextIcon aria-hidden="true" />
      <span className="text-foreground font-medium">Upload your résumé</span>
      <span className="text-xs">PDF up to 5 MB. Drop it here or click to choose.</span>
    </FileUpload>
  )
}
