import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/works/sound-archive')({
  component: SoundArchiveLayout,
})

function SoundArchiveLayout() {
  return <Outlet />
}
