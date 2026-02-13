import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/works/someones-face')({
  component: SomeonesFacePage,
})

function SomeonesFacePage() {
  return <h1>Someone's face</h1>
}
