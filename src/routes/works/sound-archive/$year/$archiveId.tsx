import { createFileRoute } from '@tanstack/react-router'
import { SoundArchiveDetailPage } from '../../../../soundArchive/pages/SoundArchiveDetailPage'

export const Route = createFileRoute('/works/sound-archive/$year/$archiveId')({
  component: SoundArchiveDetailRoute,
})

function SoundArchiveDetailRoute() {
  const { year, archiveId } = Route.useParams()

  return <SoundArchiveDetailPage year={Number(year)} archiveId={archiveId} />
}
