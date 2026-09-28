import { Table } from "@sajam/ui/table"

const invoices = [
  { id: "INV-1042", status: "Paid", amount: 420 },
  { id: "INV-1041", status: "Pending", amount: 280 },
  { id: "INV-1040", status: "Paid", amount: 155 },
]

export default function TableBasicExample() {
  return (
    <Table.Root>
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map(function (invoice) {
          return (
            <Table.Row key={invoice.id}>
              <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
              <Table.Cell>{invoice.status}</Table.Cell>
              <Table.Cell className="text-right tabular-nums">
                ${invoice.amount.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>Total</Table.Cell>
          <Table.Cell className="text-right tabular-nums">$855.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  )
}
