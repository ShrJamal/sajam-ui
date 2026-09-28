"use client"

import { Badge } from "@sajam/ui/badge"
import { DataView } from "@sajam/ui/data-view"

const deployments = Array.from({ length: 14 }, function (_, index) {
  return {
    id: index + 1,
    title: `Deployment #${String(240 - index)}`,
    environment: index % 3 === 0 ? "Production" : "Preview",
  }
})

export default function LoadMoreDataViewExample() {
  return (
    <DataView
      items={deployments}
      itemKey={function (deployment) {
        return deployment.id
      }}
      label="Deployments"
      paging="load-more"
      pageSize={4}
      showLayoutToggle={false}
      renderItem={function (deployment) {
        return (
          <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">{deployment.title}</p>
              <p className="text-muted-foreground text-xs">Completed successfully</p>
            </div>
            <Badge variant={deployment.environment === "Production" ? "default" : "secondary"}>
              {deployment.environment}
            </Badge>
          </div>
        )
      }}
    />
  )
}
