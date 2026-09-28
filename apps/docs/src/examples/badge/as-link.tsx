"use client"

import { Badge } from "@sajam/ui/badge"
import { ArrowUpRightIcon } from "lucide-react"

// The render prop keeps link semantics while using badge styles.
export default function BadgeAsLinkExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge
        variant="outline"
        render={
          <a
            href="#"
            onClick={function (event) {
              event.preventDefault()
            }}
          />
        }
      >
        v2.4.0
      </Badge>
      <Badge
        variant="link"
        render={
          <a
            href="#"
            onClick={function (event) {
              event.preventDefault()
            }}
          />
        }
      >
        Changelog
        <ArrowUpRightIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
