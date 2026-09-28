import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { Table } from "@sajam/ui/table"
import { EllipsisIcon } from "lucide-react"

const deployments = [
  { id: "web-184", branch: "main", status: "Ready", duration: "42s" },
  { id: "api-392", branch: "billing", status: "Building", duration: "1m 08s" },
  { id: "docs-071", branch: "content", status: "Failed", duration: "28s" },
] as const

const statusVariant = { Ready: "success", Building: "info", Failed: "destructive" } as const

export default function TableStatusAndActionsExample() {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Deployment</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Duration</Table.Head>
          <Table.Head className="w-8">
            <span className="sr-only">Actions</span>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {deployments.map(function (deployment) {
          return (
            <Table.Row key={deployment.id}>
              <Table.Cell>
                <div className="font-medium">{deployment.id}</div>
                <div className="text-muted-foreground text-xs">{deployment.branch}</div>
              </Table.Cell>
              <Table.Cell>
                <Badge variant={statusVariant[deployment.status]}>{deployment.status}</Badge>
              </Table.Cell>
              <Table.Cell className="text-right tabular-nums">{deployment.duration}</Table.Cell>
              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${deployment.id}`}
                      />
                    }
                  >
                    <EllipsisIcon />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    align="end"
                    className="w-36"
                  >
                    <DropdownMenu.Item>View logs</DropdownMenu.Item>
                    <DropdownMenu.Item>Redeploy</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
