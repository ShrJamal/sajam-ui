import { Kbd } from "@sajam/ui/kbd"

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Command menu", keys: ["⌘", "⇧", "P"] },
]

export default function KbdShortcutListExample() {
  return (
    <div className="w-full max-w-sm divide-y rounded-xl border">
      {shortcuts.map(function (shortcut) {
        return (
          <div
            key={shortcut.label}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <span>{shortcut.label}</span>
            <Kbd.Group>
              {shortcut.keys.map(function (key, index) {
                return <Kbd.Root key={`${key}-${index}`}>{key}</Kbd.Root>
              })}
            </Kbd.Group>
          </div>
        )
      })}
    </div>
  )
}
