"use client"

import { buttonVariants } from "@sajam/ui/button"
import { ArrowUpRightIcon } from "lucide-react"

// Links keep link semantics and borrow the button styles through buttonVariants.
export default function ButtonAsLinkExample() {
  return (
    <a
      href="#"
      className={buttonVariants({ variant: "outline" })}
      onClick={function (event) {
        event.preventDefault()
      }}
    >
      Read the guide
      <ArrowUpRightIcon data-icon="inline-end" />
    </a>
  )
}
