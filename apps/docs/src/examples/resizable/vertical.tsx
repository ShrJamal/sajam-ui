import { Resizable } from "@sajam/ui/resizable"

export default function ResizableVerticalExample() {
  return (
    <Resizable.Root
      orientation="vertical"
      className="h-60 w-full max-w-sm rounded-xl border"
    >
      <Resizable.Panel defaultSize="60%">
        <div className="grid h-full place-items-center text-sm">Preview</div>
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel defaultSize="40%">
        <div className="bg-muted/40 grid h-full place-items-center text-sm">Console</div>
      </Resizable.Panel>
    </Resizable.Root>
  )
}
