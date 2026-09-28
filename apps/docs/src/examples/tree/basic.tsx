import { Tree, type TreeNode } from "@sajam/ui/tree"
import { FileTextIcon, FolderIcon } from "lucide-react"

const files: TreeNode[] = [
  {
    key: "design",
    label: "Design",
    icon: <FolderIcon />,
    children: [
      { key: "brand", label: "Brand guidelines.pdf", icon: <FileTextIcon /> },
      { key: "research", label: "Research notes.md", icon: <FileTextIcon /> },
    ],
  },
  {
    key: "engineering",
    label: "Engineering",
    icon: <FolderIcon />,
    children: [
      {
        key: "web",
        label: "Web app",
        icon: <FolderIcon />,
        children: [
          { key: "readme", label: "README.md", icon: <FileTextIcon /> },
          { key: "changelog", label: "CHANGELOG.md", icon: <FileTextIcon /> },
        ],
      },
      { key: "api", label: "API reference.md", icon: <FileTextIcon /> },
    ],
  },
  { key: "roadmap", label: "Roadmap.md", icon: <FileTextIcon /> },
]

export default function FileTreeExample() {
  return (
    <div className="w-full max-w-xs rounded-lg border p-2">
      <Tree
        nodes={files}
        label="Project files"
        defaultValue="brand"
        defaultExpandedKeys={["design"]}
      />
    </div>
  )
}
