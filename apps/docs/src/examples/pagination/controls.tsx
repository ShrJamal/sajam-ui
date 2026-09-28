import { Pagination } from "@sajam/ui/pagination"

export default function PaginationControlsExample() {
  return (
    <Pagination.Controls
      totalItems={123}
      defaultPageSize={10}
      pageSizeOptions={[10, 25, 50]}
    />
  )
}
