"use client"

import type { TreeNode } from "@sajam/ui/tree"
import { TreeSelect } from "@sajam/ui/tree-select"

const repositories: TreeNode[] = [
  { key: "web", label: "web", lazy: true },
  { key: "api", label: "api", lazy: true },
]

export default function LazyTreeSelectExample() {
  return (
    <TreeSelect
      nodes={repositories}
      label="Folder"
      placeholder="Choose a folder"
      onLoadChildren={async function (node) {
        // Replace with a request for the folder's contents.
        await new Promise(function (resolve) {
          setTimeout(resolve, 600)
        })
        return [
          { key: `${node.key}/src`, label: `${node.key}/src` },
          { key: `${node.key}/tests`, label: `${node.key}/tests` },
        ]
      }}
      className="max-w-xs"
    />
  )
}
