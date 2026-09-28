import { Button } from "@sajam/ui/button"
import { Dialog } from "@sajam/ui/dialog"
import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { Separator } from "@sajam/ui/separator"
import { cn } from "@sajam/ui/utils"
import { CodeIcon, RotateCcwIcon } from "lucide-react"
import { useId, type ReactNode } from "react"
import { CodeBlock } from "./code-block"
import { createThemeCss, type ThemeSettings } from "./theme-state"

const modes = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const

const bases = [
  { value: "neutral", label: "Neutral" },
  { value: "stone", label: "Stone" },
  { value: "slate", label: "Slate" },
] as const

const brandColors = [
  { value: "#c65d3b", label: "Sajam" },
  { value: "#7c3aed", label: "Violet" },
  { value: "#2563eb", label: "Blue" },
  { value: "#047857", label: "Emerald" },
  { value: "#be123c", label: "Rose" },
  { value: "#c2410c", label: "Orange" },
  { value: "#252525", label: "Neutral" },
] as const

const fonts = [
  { value: "sans", label: "Sans" },
  { value: "rounded", label: "Rounded" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
] as const

const densities = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
] as const

// Controls the visual theme applied to every documentation page and preview.
export function ThemeControls({ settings, onChange, onReset }: Props) {
  const id = useId()
  const fontId = `${id}-font`
  const colorId = `${id}-color`
  const radiusId = `${id}-radius`

  return (
    <div className="text-foreground w-full">
      <div className="grid gap-5 pb-5">
        <ControlSection label="Appearance">
          <SegmentedControl
            label="Appearance"
            value={settings.mode}
            options={modes}
            onChange={function (mode) {
              onChange({ mode })
            }}
          />
        </ControlSection>

        <ControlSection label="Gray tone">
          <SegmentedControl
            label="Gray tone"
            value={settings.base}
            options={bases}
            onChange={function (base) {
              onChange({ base })
            }}
          />
        </ControlSection>

        <ControlSection label="Brand color">
          <div className="grid grid-cols-7 gap-1.5">
            {brandColors.map(function (color) {
              const selected = settings.color.toLowerCase() === color.value

              return (
                <button
                  key={color.value}
                  type="button"
                  aria-label={`Use ${color.label} color ${color.value}`}
                  aria-pressed={selected}
                  title={color.label}
                  className={cn(
                    "focus-visible:ring-ring focus-visible:ring-offset-background relative size-7 rounded-full border border-black/10 transition-transform duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 dark:border-white/15",
                    selected &&
                      "after:absolute after:inset-1 after:rounded-full after:border-2 after:border-white after:shadow-sm",
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={function () {
                    onChange({ color: color.value })
                  }}
                />
              )
            })}
          </div>
          <div className="border-border flex items-center gap-3 rounded-lg border p-2">
            <input
              id={colorId}
              type="color"
              value={settings.color}
              aria-label="Choose a custom brand color"
              className="focus-visible:ring-ring h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0 outline-none focus-visible:ring-2"
              onChange={function (event) {
                onChange({ color: event.currentTarget.value })
              }}
            />
            <Label
              htmlFor={colorId}
              className="text-muted-foreground flex-1 cursor-pointer text-xs font-normal"
            >
              Custom
            </Label>
            <span className="font-mono text-xs tracking-tight uppercase">{settings.color}</span>
          </div>
          <p className="text-muted-foreground text-xs leading-5">
            Shades adapt to light and dark mode for readability.
          </p>
        </ControlSection>

        <ControlSection label="Typography">
          <Label
            htmlFor={fontId}
            className="sr-only"
          >
            Font family
          </Label>
          <NativeSelect.Root
            id={fontId}
            value={settings.font}
            aria-label="Font family"
            className="w-full"
            onChange={function (event) {
              onChange({ font: event.currentTarget.value as ThemeSettings["font"] })
            }}
          >
            {fonts.map(function (font) {
              return (
                <NativeSelect.Option
                  key={font.value}
                  value={font.value}
                >
                  {font.label}
                </NativeSelect.Option>
              )
            })}
          </NativeSelect.Root>
        </ControlSection>

        <ControlSection label="Corners">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Square</span>
            <output
              htmlFor={radiusId}
              className="font-mono tabular-nums"
            >
              {settings.radius.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}rem
            </output>
            <span className="text-muted-foreground">Round</span>
          </div>
          <input
            id={radiusId}
            type="range"
            min="0"
            max="1.5"
            step="0.05"
            value={settings.radius}
            aria-label="Corner radius"
            aria-valuetext={`${settings.radius} rem`}
            className="accent-primary h-5 w-full cursor-pointer"
            onChange={function (event) {
              onChange({ radius: Number(event.currentTarget.value) })
            }}
          />
        </ControlSection>

        <ControlSection label="Density">
          <SegmentedControl
            label="Density"
            value={settings.density}
            options={densities}
            onChange={function (density) {
              onChange({ density })
            }}
          />
        </ControlSection>
      </div>

      <Separator />

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="outline" />}>
            <CodeIcon />
            Export CSS
          </Dialog.Trigger>
          <Dialog.Content className="sm:max-w-2xl">
            <Dialog.Header>
              <Dialog.Title>Use this theme</Dialog.Title>
              <Dialog.Description>
                Paste this after <code className="inline-code">@import "@sajam/ui/styles.css"</code>{" "}
                in your global CSS. Add the <code className="inline-code">dark</code> class to{" "}
                <code className="inline-code">&lt;html&gt;</code> for dark mode.
              </Dialog.Description>
            </Dialog.Header>
            <CodeBlock
              code={createThemeCss(settings)}
              label="theme.css"
            />
          </Dialog.Content>
        </Dialog.Root>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
        >
          <RotateCcwIcon />
          Reset
        </Button>
      </div>
    </div>
  )
}

type Props = {
  settings: ThemeSettings
  onChange: (patch: Partial<ThemeSettings>) => void
  onReset: () => void
}

type SegmentOption<T extends string> = {
  value: T
  label: string
}

type SegmentedControlProps<T extends string> = {
  label: string
  value: T
  options: readonly SegmentOption<T>[]
  onChange: (value: T) => void
}

type ControlSectionProps = {
  label: string
  children: ReactNode
}

function ControlSection({ label, children }: ControlSectionProps) {
  return (
    <section className="grid gap-2.5">
      <h3 className="text-xs font-medium">{label}</h3>
      {children}
    </section>
  )
}

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="bg-muted/60 grid auto-cols-fr grid-flow-col gap-1 rounded-lg p-1"
    >
      {options.map(function (option) {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            className={cn(
              "text-muted-foreground focus-visible:ring-ring min-w-0 rounded-md px-2 py-1.5 text-xs font-medium transition-[color,background-color,box-shadow,transform] duration-150 ease-out outline-none focus-visible:ring-2 active:scale-[0.98]",
              selected && "bg-background text-foreground ring-border/60 shadow-sm ring-1",
            )}
            onClick={function () {
              onChange(option.value)
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
