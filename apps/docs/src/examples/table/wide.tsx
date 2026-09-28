import { Table } from "@sajam/ui/table"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const plans = [
  { name: "Starter", base: 120 },
  { name: "Team", base: 480 },
  { name: "Enterprise", base: 2100 },
]

export default function TableWideExample() {
  return (
    <Table.Root containerClassName="max-w-md rounded-lg border [--table-fade:var(--color-card)] bg-card">
      <Table.Header>
        <Table.Row>
          <Table.Head>Plan</Table.Head>
          {months.map(function (month) {
            return (
              <Table.Head
                key={month}
                className="text-right"
              >
                {month}
              </Table.Head>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {plans.map(function (plan) {
          return (
            <Table.Row key={plan.name}>
              <Table.Cell className="font-medium">{plan.name}</Table.Cell>
              {months.map(function (month, index) {
                return (
                  <Table.Cell
                    key={month}
                    className="text-right tabular-nums"
                  >
                    ${(plan.base + index * 25).toLocaleString("en-US")}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
