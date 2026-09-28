"use client"

import { Tree, type TreeNode } from "@sajam/ui/tree"
import { CloudIcon, GitCommitHorizontalIcon } from "lucide-react"

const environments: TreeNode[] = [
  { key: "production", label: "Production", icon: <CloudIcon />, lazy: true },
  { key: "preview", label: "Preview", icon: <CloudIcon />, lazy: true },
  { key: "staging", label: "Staging", icon: <CloudIcon />, lazy: true },
]

export default function LazyTreeExample() {
  return (
    <div className="w-full max-w-xs rounded-lg border p-2">
      <Tree
        nodes={environments}
        label="Deployments"
        onLoadChildren={async function (node) {
          // Replace with a request for the node's children.
          await new Promise(function (resolve) {
            setTimeout(resolve, 600)
          })
          if (node.key === "staging") return []
          return [
            {
              key: `${node.key}-current`,
              label: "Current release",
              icon: <GitCommitHorizontalIcon />,
            },
            {
              key: `${node.key}-previous`,
              label: "Previous release",
              icon: <GitCommitHorizontalIcon />,
            },
          ]
        }}
      />
    </div>
  )
}
