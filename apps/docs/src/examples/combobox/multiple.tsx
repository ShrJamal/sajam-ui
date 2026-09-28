"use client"

import { Button } from "@sajam/ui/button"
import { Combobox } from "@sajam/ui/combobox"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

const teams = ["Design", "Engineering", "Marketing", "Product", "Research", "Support"]

export default function ComboboxMultipleExample() {
  const id = useId()
  const anchor = Combobox.useAnchor()
  const [selected, setSelected] = useState<string[]>(["Design", "Engineering"])

  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>Teams</Label>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={selected.length === teams.length}
            onClick={function () {
              setSelected(teams)
            }}
          >
            Select all
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={selected.length === 0}
            onClick={function () {
              setSelected([])
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <Combobox.Root
        items={teams}
        multiple
        value={selected}
        onValueChange={setSelected}
      >
        <Combobox.Chips ref={anchor}>
          <Combobox.Value>
            {function (values: string[]) {
              return values.map(function (team) {
                return <Combobox.Chip key={team}>{team}</Combobox.Chip>
              })
            }}
          </Combobox.Value>
          <Combobox.ChipsInput
            id={id}
            placeholder={selected.length ? "" : "Add teams"}
          />
        </Combobox.Chips>
        <Combobox.Content anchor={anchor}>
          <Combobox.Empty>No teams found.</Combobox.Empty>
          <Combobox.List>
            {function (team: string) {
              return (
                <Combobox.Item
                  key={team}
                  value={team}
                >
                  {team}
                </Combobox.Item>
              )
            }}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
      <p className="text-muted-foreground text-xs">
        {selected.length} of {teams.length} teams selected
      </p>
    </div>
  )
}
