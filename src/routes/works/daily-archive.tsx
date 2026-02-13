import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/works/daily-archive')({
  component: DailyArchivePage,
})

function DailyArchivePage() {
  return <h1>Daily Archive</h1>
}
