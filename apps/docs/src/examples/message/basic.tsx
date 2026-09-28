import { Avatar } from "@sajam/ui/avatar"
import { Bubble } from "@sajam/ui/bubble"
import { Message } from "@sajam/ui/message"

export default function MessageExample() {
  return (
    <Message.Root className="max-w-sm">
      <Message.Avatar>
        <Avatar.Root>
          <Avatar.Fallback>SC</Avatar.Fallback>
        </Avatar.Root>
      </Message.Avatar>
      <Message.Content>
        <Message.Header>Sara Chen</Message.Header>
        <Bubble.Root variant="secondary">
          <Bubble.Content>The new navigation is ready for review.</Bubble.Content>
        </Bubble.Root>
        <Message.Footer>10:12 AM</Message.Footer>
      </Message.Content>
    </Message.Root>
  )
}
