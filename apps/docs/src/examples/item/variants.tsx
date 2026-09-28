import { Item } from "@sajam/ui/item"

const variants = ["default", "outline", "muted"] as const

export default function ItemVariantsExample() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      {variants.map(function (variant) {
        return (
          <Item.Root
            key={variant}
            variant={variant}
          >
            <Item.Content>
              <Item.Title className="capitalize">{variant}</Item.Title>
              <Item.Description>Quarterly planning notes and open questions.</Item.Description>
            </Item.Content>
          </Item.Root>
        )
      })}
    </div>
  )
}
