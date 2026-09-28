import { Breadcrumb } from "@sajam/ui/breadcrumb"

// Long segments truncate on one line; the title attribute exposes the full name on hover.
export default function TruncatedBreadcrumbExample() {
  return (
    <Breadcrumb.Root className="w-full max-w-xs">
      <Breadcrumb.List className="flex-nowrap">
        <Breadcrumb.Item className="min-w-0">
          <Breadcrumb.Link
            href="#workspace"
            className="truncate"
            title="Sajam product workspace"
          >
            Sajam product workspace
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item className="min-w-0">
          <Breadcrumb.Link
            href="#design-system"
            className="truncate"
            title="Design system"
          >
            Design system
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item className="min-w-0">
          <Breadcrumb.Page
            className="truncate"
            title="Component documentation"
          >
            Component documentation
          </Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
