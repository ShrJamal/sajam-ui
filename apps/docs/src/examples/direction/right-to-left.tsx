import { DirectionProvider } from "@sajam/ui/direction"
import { Tabs } from "@sajam/ui/tabs"

export default function DirectionRightToLeftExample() {
  return (
    <div
      dir="rtl"
      className="w-full max-w-xs"
    >
      <DirectionProvider direction="rtl">
        <Tabs.Root defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="account">الحساب</Tabs.Trigger>
            <Tabs.Trigger value="team">الفريق</Tabs.Trigger>
            <Tabs.Trigger value="billing">الفوترة</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="account"
            className="text-muted-foreground"
          >
            حدّث اسمك وصورتك وبريدك الإلكتروني.
          </Tabs.Content>
          <Tabs.Content
            value="team"
            className="text-muted-foreground"
          >
            ادعُ زملاءك وحدّد أدوارهم.
          </Tabs.Content>
          <Tabs.Content
            value="billing"
            className="text-muted-foreground"
          >
            راجع خطتك وطريقة الدفع.
          </Tabs.Content>
        </Tabs.Root>
      </DirectionProvider>
    </div>
  )
}
