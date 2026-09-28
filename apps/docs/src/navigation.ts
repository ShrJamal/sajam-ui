import { getPage } from "./catalog"

// Update known documentation routes without replacing the page or its navigation.
export function navigate(href: string) {
  const url = new URL(href, window.location.href)
  const page = getPage(url.pathname)
  if (
    url.origin !== window.location.origin ||
    page.kind === "not-found" ||
    page.kind === "preview"
  ) {
    return false
  }
  if (url.href !== window.location.href) {
    window.history.pushState(null, "", url)
    window.dispatchEvent(new Event("sajam:navigate"))
  }
  return true
}
