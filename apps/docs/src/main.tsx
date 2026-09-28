import { useEffect, useState } from "react"
import type { ComponentType } from "react"
import { flushSync } from "react-dom"
import { createRoot, hydrateRoot } from "react-dom/client"
import { DocsApp } from "./app"
import { getPage } from "./catalog"
import { navigate } from "./navigation"
import { initializeTheme } from "./theme-state"
import "./styles.css"

// Templates load only on their preview route, which is always a full page load.
const templates = import.meta.glob<{ default: ComponentType }>("./templates/*.tsx")

initializeTheme()
const root = document.getElementById("root")!
const page = getPage(window.location.pathname)
const templateLoader =
  page.kind === "preview" ? templates[`./templates/${page.slug}.tsx`] : undefined
if (templateLoader) templateLoader().then(render)
else render()

function render(template?: { default: ComponentType }) {
  const app = <BrowserApp template={template?.default} />
  if (root.hasChildNodes()) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

function BrowserApp({ template }: { template?: ComponentType }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(function () {
    function updatePage() {
      flushSync(function () {
        setPath(window.location.pathname)
      })
    }

    function handleNavigation() {
      updatePage()
      const main = document.getElementById("main")
      main?.focus({ preventScroll: true })
      const target = window.location.hash
        ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
        : null
      if (target) target.scrollIntoView()
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }

    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return
      }
      const link = event.target.closest("a[href]")
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self") ||
        link.relList.contains("external")
      ) {
        return
      }
      const url = new URL(link.href)
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash
      ) {
        return
      }
      if (navigate(url.href)) event.preventDefault()
    }

    document.addEventListener("click", handleClick)
    window.addEventListener("sajam:navigate", handleNavigation)
    window.addEventListener("popstate", updatePage)
    return function () {
      document.removeEventListener("click", handleClick)
      window.removeEventListener("sajam:navigate", handleNavigation)
      window.removeEventListener("popstate", updatePage)
    }
  }, [])

  return (
    <DocsApp
      path={path}
      template={template}
    />
  )
}
