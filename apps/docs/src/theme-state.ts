import { useSyncExternalStore } from "react"

const STORAGE_KEY = "sajam-ui-appearance"
const LEGACY_STORAGE_KEY = "sajam-ui-theme"
const STORAGE_VERSION = 1
const MESSAGE_TYPE = "sajam-ui-appearance"
const MESSAGE_VERSION = 1

export const DEFAULT_THEME: ThemeSettings = Object.freeze({
  mode: "system",
  base: "stone",
  color: "#c65d3b",
  font: "sans",
  radius: 0.65,
  density: "comfortable",
})

const SERVER_SNAPSHOT: Snapshot = Object.freeze({ settings: DEFAULT_THEME, dark: false })
const subscribers = new Set<() => void>()
const childFrames = new Set<Window>()

let snapshot = SERVER_SNAPSHOT
let initialized = false
let mediaQuery: MediaQueryList | undefined

// Load and apply the saved appearance before React hydrates.
export function initializeTheme() {
  if (typeof window === "undefined" || initialized) return
  initialized = true

  window.addEventListener("storage", handleStorage)
  window.addEventListener("message", handleMessage)
  document.documentElement.dataset.themeEmbedded = window.parent !== window ? "true" : "false"

  let settings = readStoredTheme()
  if (!settings) {
    settings = readLegacyTheme()
    if (settings) writeStoredTheme(settings)
  }

  applyTheme(settings ?? DEFAULT_THEME, false)
  broadcastTheme(snapshot.settings)

  if (window.parent !== window) {
    window.parent.postMessage(
      { type: MESSAGE_TYPE, version: MESSAGE_VERSION, action: "request" } satisfies ThemeMessage,
      window.location.origin,
    )
  }
}

// Subscribe a React component to the current site appearance.
export function useSiteTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Update validated appearance fields and synchronize the result.
export function updateTheme(patch: Partial<ThemeSettings>) {
  initializeTheme()
  const next = mergeTheme(snapshot.settings, patch)
  if (!next || sameTheme(next, snapshot.settings)) return

  applyTheme(next, true)
  writeStoredTheme(next)
  shareTheme(next)
}

// Restore the default Sajam appearance and synchronize it.
export function resetTheme() {
  initializeTheme()
  applyTheme(DEFAULT_THEME, true)
  writeStoredTheme(DEFAULT_THEME)
  shareTheme(DEFAULT_THEME)
}

// Write the appearance as CSS to paste after `@sajam/ui/styles.css` in an app.
export function createThemeCss(settings: ThemeSettings) {
  const light = createTokens(settings, false)
  const dark = createTokens(settings, true)
  const declarations = function (tokens: Record<string, string>, skip: string[]) {
    return Object.entries(tokens)
      .filter(function ([name]) {
        return !name.startsWith("--theme-") && !skip.includes(name)
      })
      .map(function ([name, value]) {
        return `  ${name}: ${value};`
      })
      .join("\n")
  }
  // The app owns its font, so only non-default families and compact density are exported.
  const font = settings.font === "sans" ? "" : `  --font-sans: ${light["--theme-font-sans"]};\n`
  const density = settings.density === "compact" ? "\n\nhtml {\n  font-size: 93.75%;\n}" : ""

  return `:root {\n${font}${declarations(light, [])}\n}\n\n.dark {\n${declarations(dark, ["--radius"])}\n}${density}\n`
}

export type ThemeSettings = {
  mode: "system" | "light" | "dark"
  base: "neutral" | "stone" | "slate"
  color: string
  font: "sans" | "rounded" | "serif" | "mono"
  radius: number
  density: "comfortable" | "compact"
}

type Snapshot = Readonly<{
  settings: ThemeSettings
  dark: boolean
}>

type ThemeMessage =
  | { type: typeof MESSAGE_TYPE; version: typeof MESSAGE_VERSION; action: "request" }
  | {
      type: typeof MESSAGE_TYPE
      version: typeof MESSAGE_VERSION
      action: "state" | "update"
      settings: ThemeSettings
    }

type Rgb = [number, number, number]

function subscribe(callback: () => void) {
  subscribers.add(callback)
  return function () {
    subscribers.delete(callback)
  }
}

function getSnapshot() {
  return snapshot
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT
}

function applyTheme(settings: ThemeSettings, notify: boolean) {
  const frozenSettings = Object.freeze({ ...settings })
  const dark = resolveDark(frozenSettings.mode)
  const changed = !sameTheme(snapshot.settings, frozenSettings) || snapshot.dark !== dark

  if (changed) snapshot = Object.freeze({ settings: frozenSettings, dark })
  applyThemeToDocument(frozenSettings, dark)
  syncMediaListener(frozenSettings.mode)

  if (notify && changed) {
    for (const callback of subscribers) callback()
  }
}

function applyThemeToDocument(settings: ThemeSettings, dark: boolean) {
  const root = document.documentElement
  const tokens = createTokens(settings, dark)

  root.classList.toggle("dark", dark)
  root.dataset.themeBase = settings.base
  root.dataset.themeDensity = settings.density
  root.style.colorScheme = dark ? "dark" : "light"

  for (const [name, value] of Object.entries(tokens)) {
    root.style.setProperty(name, value)
  }
}

function createTokens(settings: ThemeSettings, dark: boolean) {
  const base = {
    neutral: { hue: 0, chroma: 0 },
    stone: { hue: 55, chroma: 0.008 },
    slate: { hue: 255, chroma: 0.018 },
  }[settings.base]
  const neutral = function (lightness: number, alpha?: number) {
    return `oklch(${lightness} ${base.chroma} ${base.hue}${alpha === undefined ? "" : ` / ${alpha}`})`
  }
  const accent = parseColor(settings.color)
  const pageReference: Rgb = dark ? [32, 32, 32] : [245, 245, 245]
  const primaryTarget: Rgb = dark ? [255, 255, 255] : [0, 0, 0]
  const primaryStart = dark ? mixRgb(accent, primaryTarget, 0.08) : accent
  const primary = ensureContrast(primaryStart, pageReference, primaryTarget)
  const primaryValue = formatRgb(primary)
  const primaryForeground =
    contrast(primary, [255, 255, 255]) >= 4.5 ? "rgb(255 255 255)" : "rgb(0 0 0)"
  const borderLightness = dark ? 0.3 : 0.9
  const fonts = {
    sans: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    rounded: 'ui-rounded, "SF Pro Rounded", "Nunito Sans", ui-sans-serif, system-ui, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  }
  const mono = '"SFMono-Regular", Consolas, "Liberation Mono", monospace'

  return {
    "--background": neutral(dark ? 0.145 : 0.995),
    "--foreground": neutral(dark ? 0.965 : 0.16),
    "--card": neutral(dark ? 0.19 : 1),
    "--card-foreground": neutral(dark ? 0.965 : 0.16),
    "--popover": neutral(dark ? 0.19 : 1),
    "--popover-foreground": neutral(dark ? 0.965 : 0.16),
    "--primary": primaryValue,
    "--primary-foreground": primaryForeground,
    "--secondary": neutral(dark ? 0.255 : 0.955),
    "--secondary-foreground": neutral(dark ? 0.96 : 0.2),
    "--muted": neutral(dark ? 0.245 : 0.955),
    "--muted-foreground": neutral(dark ? 0.71 : 0.49),
    "--accent": neutral(dark ? 0.255 : 0.95),
    "--accent-foreground": neutral(dark ? 0.97 : 0.2),
    "--destructive": dark ? "oklch(0.704 0.191 22.216)" : "oklch(0.577 0.245 27.325)",
    "--border": neutral(borderLightness),
    "--input": neutral(dark ? 0.34 : 0.9),
    "--ring": primaryValue,
    "--chart-1": primaryValue,
    "--chart-2": formatRgb(mixRgb(accent, dark ? [255, 255, 255] : [17, 17, 17], 0.25)),
    "--chart-3": formatRgb(mixRgb(accent, dark ? [255, 255, 255] : [17, 17, 17], 0.45)),
    "--chart-4": formatRgb(mixRgb(accent, dark ? [17, 17, 17] : [255, 255, 255], 0.35)),
    "--chart-5": formatRgb(mixRgb(accent, dark ? [17, 17, 17] : [255, 255, 255], 0.58)),
    "--sidebar": neutral(dark ? 0.18 : 0.985),
    "--sidebar-foreground": neutral(dark ? 0.965 : 0.16),
    "--sidebar-primary": primaryValue,
    "--sidebar-primary-foreground": primaryForeground,
    "--sidebar-accent": neutral(dark ? 0.255 : 0.95),
    "--sidebar-accent-foreground": neutral(dark ? 0.97 : 0.2),
    "--sidebar-border": neutral(borderLightness),
    "--sidebar-ring": primaryValue,
    "--radius": `${settings.radius}rem`,
    "--theme-font-sans": fonts[settings.font],
    "--theme-font-mono": mono,
    "--theme-font-size": settings.density === "compact" ? "93.75%" : "100%",
  }
}

function resolveDark(mode: ThemeSettings["mode"]) {
  if (mode === "dark") return true
  if (mode === "light") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function syncMediaListener(mode: ThemeSettings["mode"]) {
  if (mode === "system" && !mediaQuery) {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleMediaChange)
  } else if (mode !== "system" && mediaQuery) {
    mediaQuery.removeEventListener("change", handleMediaChange)
    mediaQuery = undefined
  }
}

function handleMediaChange() {
  if (snapshot.settings.mode !== "system") return
  applyTheme(snapshot.settings, true)
  shareTheme(snapshot.settings)
}

function handleStorage(event: StorageEvent) {
  try {
    if (event.storageArea && event.storageArea !== window.localStorage) return
  } catch {
    return
  }

  if (event.key === null) {
    applyTheme(DEFAULT_THEME, true)
    broadcastTheme(DEFAULT_THEME)
  } else if (event.key === STORAGE_KEY) {
    const settings = event.newValue ? parseStoredTheme(event.newValue) : DEFAULT_THEME
    if (settings) {
      applyTheme(settings, true)
      broadcastTheme(settings)
    }
  } else if (event.key === LEGACY_STORAGE_KEY && !readStoredTheme()) {
    const mode: ThemeSettings["mode"] =
      event.newValue === "dark" || event.newValue === "light" ? event.newValue : "system"
    const settings = { ...DEFAULT_THEME, mode }
    applyTheme(settings, true)
    broadcastTheme(settings)
  }
}

function handleMessage(event: MessageEvent<unknown>) {
  if (event.origin !== window.location.origin || !isThemeMessage(event.data)) return

  if (event.data.action === "request") {
    if (!isDirectChild(event.source)) return
    childFrames.add(event.source)
    event.source.postMessage(
      {
        type: MESSAGE_TYPE,
        version: MESSAGE_VERSION,
        action: "state",
        settings: snapshot.settings,
      } satisfies ThemeMessage,
      { targetOrigin: window.location.origin },
    )
    return
  }

  if (event.data.action === "state") {
    if (event.source !== window.parent || window.parent === window) return
    applyTheme(event.data.settings, true)
    return
  }

  if (!isDirectChild(event.source)) return
  childFrames.add(event.source)
  applyTheme(event.data.settings, true)
  writeStoredTheme(event.data.settings)
  broadcastTheme(event.data.settings, event.source)
}

function shareTheme(settings: ThemeSettings) {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: MESSAGE_TYPE,
        version: MESSAGE_VERSION,
        action: "update",
        settings,
      } satisfies ThemeMessage,
      window.location.origin,
    )
  }
  broadcastTheme(settings)
}

function broadcastTheme(settings: ThemeSettings, excluded?: Window) {
  const targets = new Set(childFrames)
  for (const frame of document.querySelectorAll("iframe")) {
    if (frame.contentWindow) targets.add(frame.contentWindow)
  }

  for (const child of targets) {
    if (child === excluded || !isDirectChild(child)) {
      if (!isDirectChild(child)) childFrames.delete(child)
      continue
    }
    child.postMessage(
      {
        type: MESSAGE_TYPE,
        version: MESSAGE_VERSION,
        action: "state",
        settings,
      } satisfies ThemeMessage,
      window.location.origin,
    )
  }
}

function isDirectChild(source: MessageEventSource | null): source is Window {
  if (!source) return false
  return Array.from(document.querySelectorAll("iframe")).some(function (frame) {
    return frame.contentWindow === source
  })
}

function readStoredTheme() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value ? parseStoredTheme(value) : undefined
  } catch {
    return undefined
  }
}

function readLegacyTheme() {
  try {
    const value = window.localStorage.getItem(LEGACY_STORAGE_KEY)
    if (value !== "light" && value !== "dark") return undefined
    return Object.freeze({ ...DEFAULT_THEME, mode: value })
  } catch {
    return undefined
  }
}

function writeStoredTheme(settings: ThemeSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, settings }))
  } catch {
    /* Live theme synchronization still works when storage is unavailable. */
  }
}

function parseStoredTheme(value: string) {
  try {
    const parsed: unknown = JSON.parse(value)
    if (!isRecord(parsed) || parsed.version !== STORAGE_VERSION) return undefined
    return parseTheme(parsed.settings)
  } catch {
    return undefined
  }
}

function isThemeMessage(value: unknown): value is ThemeMessage {
  if (!isRecord(value) || value.type !== MESSAGE_TYPE || value.version !== MESSAGE_VERSION)
    return false
  if (value.action === "request") return true
  if (value.action !== "state" && value.action !== "update") return false
  return parseTheme(value.settings) !== undefined
}

function parseTheme(value: unknown) {
  if (!isRecord(value)) return undefined
  const result = mergeTheme(DEFAULT_THEME, value)
  if (!result) return undefined
  const expected = ["mode", "base", "color", "font", "radius", "density"]
  if (
    !expected.every(function (key) {
      return key in value
    })
  )
    return undefined
  return result
}

function mergeTheme(
  current: ThemeSettings,
  patch: Record<string, unknown> | Partial<ThemeSettings>,
) {
  const next = { ...current }
  let valid = true

  if ("mode" in patch) {
    if (patch.mode === "system" || patch.mode === "light" || patch.mode === "dark")
      next.mode = patch.mode
    else valid = false
  }
  if ("base" in patch) {
    if (patch.base === "neutral" || patch.base === "stone" || patch.base === "slate")
      next.base = patch.base
    else valid = false
  }
  if ("color" in patch) {
    if (typeof patch.color === "string" && /^#[0-9a-f]{6}$/i.test(patch.color))
      next.color = patch.color.toLowerCase()
    else valid = false
  }
  if ("font" in patch) {
    if (
      patch.font === "sans" ||
      patch.font === "rounded" ||
      patch.font === "serif" ||
      patch.font === "mono"
    )
      next.font = patch.font
    else valid = false
  }
  if ("radius" in patch) {
    if (
      typeof patch.radius === "number" &&
      Number.isFinite(patch.radius) &&
      patch.radius >= 0 &&
      patch.radius <= 1.5
    )
      next.radius = patch.radius
    else valid = false
  }
  if ("density" in patch) {
    if (patch.density === "comfortable" || patch.density === "compact") next.density = patch.density
    else valid = false
  }

  return valid ? Object.freeze(next) : undefined
}

function sameTheme(left: ThemeSettings, right: ThemeSettings) {
  return (
    left.mode === right.mode &&
    left.base === right.base &&
    left.color === right.color &&
    left.font === right.font &&
    left.radius === right.radius &&
    left.density === right.density
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function parseColor(value: string): Rgb {
  return [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ]
}

function mixRgb(color: Rgb, target: Rgb, amount: number): Rgb {
  return color.map(function (channel, index) {
    return Math.round(channel + (target[index] - channel) * amount)
  }) as Rgb
}

function ensureContrast(color: Rgb, background: Rgb, target: Rgb): Rgb {
  if (contrast(color, background) >= 4.5) return color
  for (let step = 1; step <= 100; step += 1) {
    const candidate = mixRgb(color, target, step / 100)
    if (contrast(candidate, background) >= 4.5) return candidate
  }
  return target
}

function formatRgb(color: Rgb) {
  return `rgb(${color.join(" ")})`
}

function contrast(left: Rgb, right: Rgb) {
  const leftLuminance = relativeLuminance(left)
  const rightLuminance = relativeLuminance(right)
  return (
    (Math.max(leftLuminance, rightLuminance) + 0.05) /
    (Math.min(leftLuminance, rightLuminance) + 0.05)
  )
}

function relativeLuminance(color: Rgb) {
  const channels = color.map(function (channel) {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}
