import { Snippet } from "@sajam/ui/snippet"

export default function SnippetMultilineExample() {
  return (
    <Snippet
      variant="bordered"
      symbol={null}
      fullWidth
      className="max-w-sm"
    >
      {['import { Button } from "@sajam/ui/button"', 'import "@sajam/ui/styles.css"']}
    </Snippet>
  )
}
