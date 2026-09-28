"use client"

import { Badge } from "@sajam/ui/badge"
import { DataView } from "@sajam/ui/data-view"

const projects = [
  { id: 1, name: "Atlas", category: "Analytics", updated: 1 },
  { id: 2, name: "ChargeBell", category: "Billing", updated: 3 },
  { id: 3, name: "Rootabl", category: "Commerce", updated: 4 },
  { id: 4, name: "Toolur", category: "Utilities", updated: 6 },
  { id: 5, name: "Sqweal", category: "Analytics", updated: 8 },
  { id: 6, name: "Harpagia", category: "Games", updated: 9 },
  { id: 7, name: "Castle Busters", category: "Games", updated: 12 },
  { id: 8, name: "Ledgerly", category: "Billing", updated: 15 },
]

export default function ProjectsDataViewExample() {
  return (
    <DataView
      items={projects}
      itemKey={function (project) {
        return project.id
      }}
      label="Projects"
      defaultLayout="grid"
      pageSize={4}
      filterItem={function (project, query) {
        return `${project.name} ${project.category}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase())
      }}
      sort={function (a, b) {
        return a.updated - b.updated
      }}
      renderItem={function (project, { layout }) {
        return (
          <article
            className={
              layout === "grid"
                ? "bg-card flex h-full flex-col items-start gap-3 rounded-lg border p-4"
                : "bg-card flex items-center justify-between gap-3 rounded-lg border p-3"
            }
          >
            <div className="min-w-0">
              <h3 className="truncate font-medium">{project.name}</h3>
              <p className="text-muted-foreground text-sm">Updated {project.updated}d ago</p>
            </div>
            <Badge variant="secondary">{project.category}</Badge>
          </article>
        )
      }}
    />
  )
}
