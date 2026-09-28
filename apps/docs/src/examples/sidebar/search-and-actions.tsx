"use client"

import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { Label } from "@sajam/ui/label"
import { Sidebar } from "@sajam/ui/sidebar"
import { FolderIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { useId, useState } from "react"

const projects = [
  { name: "Atlas", openIssues: 12 },
  { name: "Northstar", openIssues: 3 },
  { name: "Pulse", openIssues: 0 },
  { name: "Quarry", openIssues: 7 },
]

export default function SidebarSearchAndActionsExample() {
  const searchId = useId()
  const [query, setQuery] = useState("")
  const matches = projects.filter(function (project) {
    return project.name.toLowerCase().includes(query.trim().toLowerCase())
  })

  return (
    <Sidebar.Provider
      contained
      keyboardShortcut={false}
      className="h-96 rounded-xl border"
    >
      <Sidebar.Root
        collapsible="none"
        className="border-r"
      >
        <Sidebar.Header>
          <Label
            htmlFor={searchId}
            className="sr-only"
          >
            Search projects
          </Label>
          <Sidebar.Input
            id={searchId}
            type="search"
            placeholder="Search projects"
            value={query}
            onChange={function (event) {
              setQuery(event.target.value)
            }}
          />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
            <Sidebar.GroupAction title="Add project">
              <PlusIcon />
              <span className="sr-only">Add project</span>
            </Sidebar.GroupAction>
            <Sidebar.Menu>
              {matches.map(function (project) {
                return (
                  <Sidebar.MenuItem key={project.name}>
                    <Sidebar.MenuButton>
                      <FolderIcon />
                      <span>{project.name}</span>
                    </Sidebar.MenuButton>
                    {project.openIssues > 0 ? (
                      <Sidebar.MenuBadge className="mr-6">{project.openIssues}</Sidebar.MenuBadge>
                    ) : null}
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger render={<Sidebar.MenuAction showOnHover />}>
                        <MoreHorizontalIcon />
                        <span className="sr-only">More actions for {project.name}</span>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="w-40">
                        <DropdownMenu.Item>Open</DropdownMenu.Item>
                        <DropdownMenu.Item>Share</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item variant="destructive">Archive</DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Sidebar.MenuItem>
                )
              })}
            </Sidebar.Menu>
            {matches.length === 0 ? (
              <p className="text-muted-foreground px-2 py-1.5 text-sm">No projects found.</p>
            ) : null}
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>
      <Sidebar.Inset className="text-muted-foreground grid place-items-center text-sm">
        Select a project
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}
