import { Snippet } from "@sajam/ui/snippet"

export default function SnippetVariantsExample() {
  return (
    <div className="grid justify-items-start gap-3">
      <Snippet>bun add @sajam/ui</Snippet>
      <Snippet
        variant="bordered"
        symbol="❯"
      >
        bun run dev
      </Snippet>
    </div>
  )
}
