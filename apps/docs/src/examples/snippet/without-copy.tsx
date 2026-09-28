import { Snippet } from "@sajam/ui/snippet"

export default function SnippetWithoutCopyExample() {
  return (
    <Snippet
      disableCopy
      variant="bordered"
    >
      git status
    </Snippet>
  )
}
