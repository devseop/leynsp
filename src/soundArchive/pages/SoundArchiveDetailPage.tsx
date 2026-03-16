import { Link } from '@tanstack/react-router'
import { AlbumDetail } from '../components/AlbumDetail'
import { getAdjacentArchiveItems, getArchiveItem } from '../lib/archive'
import type { SoundArchiveItem } from '../types'

interface SoundArchiveDetailPageProps {
  year: number
  archiveId: string
}

interface ArchiveNavigationLinkProps {
  item: SoundArchiveItem | null
  label: string
  year: number
}

function ArchiveNavigationLink({ item, label, year }: ArchiveNavigationLinkProps) {
  const className = `text-base font-medium leading-none ${item ? 'hover:underline' : 'opacity-20 cursor-not-allowed'}`

  if (!item) {
    return (
      <span aria-disabled="true" className={className}>
        {label}
      </span>
    )
  }

  return (
    <Link to="/works/sound-archive/$year/$archiveId" params={{ year: String(year), archiveId: item.id }} className={className}>
      {label}
    </Link>
  )
}

export function SoundArchiveDetailPage({ year, archiveId }: SoundArchiveDetailPageProps) {
  const item = getArchiveItem(year, archiveId)

  if (!item) return null

  const { previousItem, nextItem } = getAdjacentArchiveItems(year, archiveId)

  return (
    <main>
      <AlbumDetail item={item} />
      <nav aria-label="아카이브 이동" className="mt-[-16px] flex max-w-[348px] flex-row justify-between">
        <ArchiveNavigationLink item={previousItem} label="이전" year={year} />
        <ArchiveNavigationLink item={nextItem} label="다음" year={year} />
        <Link to="/works/sound-archive/list" className="text-base font-medium leading-none hover:underline">
          목록으로
        </Link>
      </nav>
    </main>
  )
}
