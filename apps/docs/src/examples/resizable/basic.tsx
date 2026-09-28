import { Resizable } from "@sajam/ui/resizable"

export default function ResizableExample() {
  return (
    <Resizable.Root className="h-48 w-full max-w-sm rounded-xl border">
      <Resizable.Panel defaultSize="40%">
        <div className="grid h-full place-items-center text-sm">Sidebar</div>
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel defaultSize="60%">
        <div className="bg-muted/40 grid h-full place-items-center text-sm">Content</div>
      </Resizable.Panel>
    </Resizable.Root>
  )
}
