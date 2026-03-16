export interface SoundArchiveItem {
  id: string
  trackTitle?: string
  albumTitle?: string
  artist: string
  coverImageUrl: string
  listenedAt: string
  audioSrc?: string
}

export interface SoundArchiveAlbumGroup {
  id: string
  albumTitle?: string
  artist: string
  coverImageUrl: string
  year: number
  items: SoundArchiveItem[]
}

export interface SoundArchiveYearGroup {
  year: number
  items: SoundArchiveItem[]
  albums: SoundArchiveAlbumGroup[]
}

export function getSoundArchiveItemTitle(item: Pick<SoundArchiveItem, 'albumTitle' | 'trackTitle'>) {
  return item.albumTitle ?? item.trackTitle ?? 'Untitled'
}
