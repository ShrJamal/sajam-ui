import { Button } from "@sajam/ui/button"
import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { BookOpenIcon, CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"

export default function AccountMenuExample() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>My account</DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>maya@example.com</DropdownMenu.GroupLabel>
          <DropdownMenu.Item>
            <UserIcon />
            Profile
            <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCardIcon />
            Billing
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <SettingsIcon />
            Settings
            <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.LinkItem
          href="#documentation"
          closeOnClick
        >
          <BookOpenIcon />
          Documentation
        </DropdownMenu.LinkItem>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
