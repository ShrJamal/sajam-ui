import { Breadcrumb } from "@sajam/ui/breadcrumb"
import { FolderIcon, HomeIcon } from "lucide-react"

export default function StyledBreadcrumbExample() {
  return (
    <Breadcrumb.Root className="bg-muted rounded-full px-3 py-1.5">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            href="#home"
            className="flex items-center gap-1.5"
          >
            <HomeIcon
              aria-hidden="true"
              className="size-3.5"
            />
            Home
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            href="#reports"
            className="flex items-center gap-1.5"
          >
            <FolderIcon
              aria-hidden="true"
              className="size-3.5"
            />
            Reports
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page className="bg-background rounded-full px-2.5 py-0.5 shadow-sm">
            September
          </Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
