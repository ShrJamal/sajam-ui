import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react"

const loaders = import.meta.glob<{ default: ComponentType }>("./examples/*/*.tsx")
const demos = Object.fromEntries(
  Object.entries(loaders).map(function ([path, loader]) {
    return [path, lazy(loader)]
  }),
)
export const exampleSources = import.meta.glob<string>("./examples/*/*.tsx", {
  query: "?raw",
  import: "default",
})

// Load only the selected example after the static page has hydrated.
export function Demo({ path }: { path: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(function () {
    setMounted(true)
  }, [])
  const Example = demos[path]
  if (!Example) return <p>Example unavailable.</p>
  const loading = (
    <p
      className="text-muted-foreground text-sm"
      role="status"
    >
      Loading preview…
    </p>
  )
  return (
    <DemoBoundary key={path}>
      {mounted ? (
        <Suspense fallback={loading}>
          <Example />
        </Suspense>
      ) : (
        loading
      )}
    </DemoBoundary>
  )
}

class DemoBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <p role="alert">This preview couldn't load. Refresh the page to try again.</p>
    ) : (
      this.props.children
    )
  }
}
