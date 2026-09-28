import { Button } from "@sajam/ui/button"
import { Dialog } from "@sajam/ui/dialog"
import { Tooltip } from "@sajam/ui/tooltip"
import { cn } from "@sajam/ui/utils"
import { CodeIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { getExamples, getImportNames, type DocSection } from "./catalog"
import { CodeBlock, CopyButton } from "./code-block"
import { Demo, exampleSources } from "./demo"

// Render each component on the page with its import, guidance, and live examples.
export function ComponentSections({ sections }: { sections: DocSection[] }) {
  return (
    <div className="mt-10 space-y-16">
      {sections.map(function (section) {
        return (
          <section
            key={section.component}
            id={section.component}
            aria-labelledby={`${section.component}-title`}
            className="scroll-mt-24"
          >
            <h2
              id={`${section.component}-title`}
              className={sections.length > 1 ? "text-2xl font-semibold tracking-tight" : "sr-only"}
            >
              {section.title}
            </h2>
            {section.description && sections.length > 1 && (
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
                {section.description}
              </p>
            )}
            <div className="mt-5">
              <CodeBlock
                code={`import { ${getImportNames(section)} } from "@sajam/ui/${section.component}"`}
                label="import"
                inline
              />
            </div>
            {section.usage && (
              <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-6">
                {section.usage.split("`").map(function (part, index) {
                  // Odd segments sit between backticks and render as inline code.
                  return index % 2 === 1 ? (
                    <code
                      key={index}
                      className="inline-code"
                    >
                      {part}
                    </code>
                  ) : (
                    part
                  )
                })}
              </p>
            )}
            <div className="mt-6 grid gap-4 @min-[44rem]:grid-cols-2">
              {getExamples(section).map(function (example) {
                return (
                  <ExampleCard
                    key={example.id}
                    sectionTitle={section.title}
                    {...example}
                  />
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

type Props = {
  sectionTitle: string
  id: string
  title: string
  wide: boolean
  path: string
}

// Pair a live preview with an on-demand dialog showing its exact source.
function ExampleCard({ sectionTitle, id, title, wide, path }: Props) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState<string>()
  const [failed, setFailed] = useState(false)

  useEffect(
    function () {
      if (!open || source !== undefined) return
      let cancelled = false
      setFailed(false)
      exampleSources[path]().then(
        function (code) {
          if (!cancelled) setSource(code)
        },
        function () {
          if (!cancelled) setFailed(true)
        },
      )
      return function () {
        cancelled = true
      }
    },
    [open, source, path],
  )

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <article
        className={cn(
          "dot-grid flex min-w-0 flex-col overflow-hidden rounded-xl border",
          wide && "@min-[44rem]:col-span-2",
        )}
      >
        <div className="flex items-center gap-1 py-1.5 pr-1.5 pl-3.5">
          <h3 className="text-muted-foreground min-w-0 flex-1 truncate text-xs font-medium">
            {title}
          </h3>
          <CopyButton
            code={async function () {
              // Keep the loaded source so the code dialog opens without refetching.
              const code = source ?? (await exampleSources[path]())
              setSource(code)
              return code
            }}
            label={`code for ${sectionTitle}: ${title}`}
            iconOnly
          />
          <Tooltip.Root>
            <Tooltip.Trigger
              render={
                <Dialog.Trigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                    />
                  }
                />
              }
              aria-label={`View code for ${sectionTitle}: ${title}`}
            >
              <CodeIcon />
            </Tooltip.Trigger>
            <Tooltip.Content>View code</Tooltip.Content>
          </Tooltip.Root>
        </div>
        <div className="flex min-h-44 flex-1 items-center justify-center overflow-x-auto px-5 pt-1 pb-8">
          <div className="flex w-full min-w-0 items-center justify-center">
            <Demo path={path} />
          </div>
        </div>
      </article>
      <Dialog.Content
        showCloseButton={false}
        className="max-h-[calc(100dvh-4rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl"
      >
        <div className="flex shrink-0 items-center gap-3 border-b py-1.5 pr-1.5 pl-4">
          <Dialog.Title className="min-w-0 flex-1 truncate text-sm">
            {sectionTitle}
            <span className="text-muted-foreground mx-1.5 font-normal">/</span>
            {title}
            <span className="text-muted-foreground ml-2 font-mono text-xs font-normal">
              {id}.tsx
            </span>
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Copy the complete source for this example.
          </Dialog.Description>
          {source !== undefined && (
            <CopyButton
              code={source}
              label={`${id}.tsx`}
              iconOnly
            />
          )}
          <Dialog.Close
            render={
              <Button
                variant="ghost"
                size="icon-sm"
              />
            }
            aria-label="Close"
          >
            <XIcon />
          </Dialog.Close>
        </div>
        {source !== undefined ? (
          <pre
            className="min-h-0 flex-1 overflow-auto p-4 text-xs leading-6"
            tabIndex={0}
          >
            <code>{source}</code>
          </pre>
        ) : (
          <p
            role={failed ? "alert" : "status"}
            className="text-muted-foreground p-4 text-sm"
          >
            {failed ? "Source couldn't load. Close this dialog and try again." : "Loading source…"}
          </p>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
