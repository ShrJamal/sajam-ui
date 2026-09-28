import { OrganizationChart, type OrganizationChartNode } from "@sajam/ui/organization-chart"

const departments: OrganizationChartNode[] = [
  {
    key: "company",
    label: "Sajam",
    description: "42 people",
    children: [
      {
        key: "product",
        label: "Product",
        description: "12 people",
        children: [
          { key: "design", label: "Design", description: "5 people" },
          { key: "research", label: "Research", description: "3 people" },
        ],
      },
      {
        key: "engineering",
        label: "Engineering",
        description: "24 people",
        children: [
          { key: "platform", label: "Platform", description: "9 people" },
          { key: "mobile", label: "Mobile", description: "6 people" },
        ],
      },
      { key: "legacy", label: "Legacy apps", description: "Sunset in Q4", disabled: true },
    ],
  },
]

export default function HorizontalChartExample() {
  return (
    <OrganizationChart
      nodes={departments}
      label="Departments"
      orientation="horizontal"
      defaultExpandedKeys={["company", "product"]}
      className="w-full"
    />
  )
}
