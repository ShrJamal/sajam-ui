import { Separator } from "@sajam/ui/separator"

export default function SeparatorVariantsExample() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <Separator align="start">Solid</Separator>
      <Separator
        variant="dashed"
        align="start"
      >
        Dashed
      </Separator>
      <Separator
        variant="dotted"
        align="start"
      >
        Dotted
      </Separator>
    </div>
  )
}
