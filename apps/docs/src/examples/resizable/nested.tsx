import { Resizable } from "@sajam/ui/resizable"

export default function ResizableNestedExample() {
  return (
    <Resizable.Root className="h-60 w-full max-w-sm rounded-xl border">
      <Resizable.Panel
        defaultSize="35%"
        minSize="20%"
      >
        <div className="grid h-full place-items-center text-sm">Files</div>
      </Resizable.Panel>
      <Resizable.Handle />
      <Resizable.Panel defaultSize="65%">
        <Resizable.Root orientation="vertical">
          <Resizable.Panel defaultSize="65%">
            <div className="grid h-full place-items-center text-sm">Editor</div>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel defaultSize="35%">
            <div className="bg-muted/40 grid h-full place-items-center text-sm">Terminal</div>
          </Resizable.Panel>
        </Resizable.Root>
      </Resizable.Panel>
    </Resizable.Root>
  )
}
