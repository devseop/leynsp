import { getSoundArchiveItemTitle, type SoundArchiveItem } from '../types'

interface AlbumDetailProps {
  item: SoundArchiveItem
}

export function AlbumDetail({ item }: AlbumDetailProps) {
  const displayTitle = getSoundArchiveItemTitle(item)

  return (
    <section aria-labelledby={`album-title-${item.id}`} className='flex flex-row justify-between'>
      <div className='flex flex-col gap-3 max-w-[348px]'>
        <div className='flex flex-row items-top gap-2'>
          <h1 className='text-[32px] font-semibold leading-none'>{item.albumTitle ? `${item.albumTitle}` : `${item.trackTitle}`}</h1>
          {item.albumTitle && <span className='text-sm font-bold leading-none'> (Album)</span>}
        </div>
        <p className='text-[32px] font-normal leading-none'>{item.artist}</p>
      </div>

      <img
        src={item.coverImageUrl}
        alt={`${displayTitle} 커버 이미지`}
        width={604}
        height={604}
        style={{ width: 604, height: 604, objectFit: 'cover', viewTransitionName: `sound-archive-${item.id}` }}
      />
    </section>
  )
}
