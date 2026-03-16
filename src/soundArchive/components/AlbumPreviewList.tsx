import { Link } from '@tanstack/react-router'
import { getSoundArchiveItemTitle, type SoundArchiveAlbumGroup } from '../types'

interface AlbumPreviewListProps {
  albums: SoundArchiveAlbumGroup[]
  year: number
}

export function AlbumPreviewList({ albums, year }: AlbumPreviewListProps) {
  return (
    <ul className='flex flex-row'>
      {albums.map((album) => (
        <li key={album.id}>
          <Link
            to="/works/sound-archive/$year/$archiveId"
            params={{ year: String(year), archiveId: album.items[0]?.id ?? album.id }}
          >
            <img
              src={album.coverImageUrl}
              alt={`${album.albumTitle ?? getSoundArchiveItemTitle(album.items[0] ?? {})} 커버`}
              width={40}
              height={604}
              style={{ width: 40, height: 604, objectFit: 'cover', viewTransitionName: `sound-archive-${album.items[0]?.id ?? album.id}` }}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
