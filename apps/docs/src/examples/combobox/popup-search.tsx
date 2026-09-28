import { Button } from "@sajam/ui/button"
import { Combobox } from "@sajam/ui/combobox"

const countries = [
  { value: "ca", label: "Canada" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "ma", label: "Morocco" },
  { value: "es", label: "Spain" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
]

export default function ComboboxPopupSearchExample() {
  return (
    <Combobox.Root items={countries}>
      <div className="grid w-full max-w-xs gap-2">
        <Combobox.Label>Country</Combobox.Label>
        <Combobox.Trigger
          render={
            <Button
              variant="outline"
              className="data-placeholder:text-muted-foreground w-full justify-between font-normal"
            />
          }
        >
          <Combobox.Value placeholder="Select a country" />
        </Combobox.Trigger>
      </div>
      <Combobox.Content>
        <Combobox.Input
          aria-label="Search countries"
          placeholder="Search countries"
          showTrigger={false}
        />
        <Combobox.Empty>No countries found.</Combobox.Empty>
        <Combobox.List>
          {function (country: Country) {
            return (
              <Combobox.Item
                key={country.value}
                value={country}
              >
                {country.label}
              </Combobox.Item>
            )
          }}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  )
}

type Country = (typeof countries)[number]
