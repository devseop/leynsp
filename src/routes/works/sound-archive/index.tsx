import { createFileRoute } from '@tanstack/react-router'
import { SoundArchiveIntroPage } from '../../../soundArchive/pages/SoundArchiveIntroPage'

export const Route = createFileRoute('/works/sound-archive/')({
  component: SoundArchiveIntroPage,
})
