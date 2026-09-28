import { Tree, type TreeNode } from "@sajam/ui/tree"

const pages: TreeNode[] = [
  {
    key: "marketing",
    label: "Marketing",
    children: [
      { key: "home", label: "Home" },
      { key: "pricing", label: "Pricing" },
      {
        key: "blog",
        label: "Blog",
        children: [
          { key: "launch-post", label: "Launch announcement" },
          { key: "pricing-post", label: "Pricing changes" },
        ],
      },
    ],
  },
  {
    key: "application",
    label: "Application",
    children: [
      { key: "dashboard", label: "Dashboard" },
      { key: "settings", label: "Settings" },
      { key: "billing", label: "Billing" },
    ],
  },
]

export default function FilterTreeExample() {
  return (
    <div className="w-full max-w-xs rounded-lg border p-2">
      <Tree
        nodes={pages}
        label="Site pages"
        filterable
        filterPlaceholder="Filter pages…"
        emptyMessage="No pages match."
      />
    </div>
  )
}
