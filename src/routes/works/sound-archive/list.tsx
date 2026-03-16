import { createFileRoute } from '@tanstack/react-router'
import { SoundArchiveListPage } from '../../../soundArchive/pages/SoundArchiveListPage'

export const Route = createFileRoute('/works/sound-archive/list')({
  component: SoundArchiveListPage,
})
