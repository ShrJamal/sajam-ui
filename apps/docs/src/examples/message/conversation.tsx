import { Avatar } from "@sajam/ui/avatar"
import { Bubble } from "@sajam/ui/bubble"
import { Message } from "@sajam/ui/message"

export default function MessageConversationExample() {
  return (
    <Message.Group className="w-full max-w-sm">
      <Message.Root>
        <Message.Avatar>
          <Avatar.Root size="sm">
            <Avatar.Fallback>SC</Avatar.Fallback>
          </Avatar.Root>
        </Message.Avatar>
        <Message.Content>
          <Bubble.Group>
            <Bubble.Root variant="secondary">
              <Bubble.Content>The release build passed.</Bubble.Content>
            </Bubble.Root>
            <Bubble.Root variant="secondary">
              <Bubble.Content>Can you publish it this afternoon?</Bubble.Content>
            </Bubble.Root>
          </Bubble.Group>
        </Message.Content>
      </Message.Root>
      <Message.Root align="end">
        <Message.Content>
          <Bubble.Root>
            <Bubble.Content>Sure, I’ll publish it after lunch.</Bubble.Content>
          </Bubble.Root>
          <Message.Footer>Read 1:04 PM</Message.Footer>
        </Message.Content>
      </Message.Root>
    </Message.Group>
  )
}
