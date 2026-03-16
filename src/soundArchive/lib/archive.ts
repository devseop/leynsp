import { soundArchiveItems } from '../data/archive'
import type { SoundArchiveAlbumGroup, SoundArchiveItem, SoundArchiveYearGroup } from '../types'

function getYearFromListenedAt(listenedAt: string) {
  return Number(listenedAt.slice(0, 4))
}

function compareByListenedAtDesc(a: SoundArchiveItem, b: SoundArchiveItem) {
  return b.listenedAt.localeCompare(a.listenedAt)
}

function createAlbumGroupId(item: SoundArchiveItem) {
  return `${item.artist}::${item.albumTitle ?? item.trackTitle}::${item.coverImageUrl}`
}

export function groupArchiveItemsByYear(items: SoundArchiveItem[]): SoundArchiveYearGroup[] {
  const sortedItems = [...items].sort(compareByListenedAtDesc)
  const yearMap = new Map<number, SoundArchiveItem[]>()

  for (const item of sortedItems) {
    const year = getYearFromListenedAt(item.listenedAt)
    const existingItems = yearMap.get(year) ?? []
    existingItems.push(item)
    yearMap.set(year, existingItems)
  }

  return [...yearMap.entries()]
    .sort(([leftYear], [rightYear]) => rightYear - leftYear)
    .map(([year, yearItems]) => ({
      year,
      items: yearItems,
      albums: groupArchiveItemsByAlbum(yearItems, year),
    }))
}

export function groupArchiveItemsByAlbum(items: SoundArchiveItem[], year?: number): SoundArchiveAlbumGroup[] {
  const albumMap = new Map<string, SoundArchiveItem[]>()

  for (const item of [...items].sort(compareByListenedAtDesc)) {
    const groupId = createAlbumGroupId(item)
    const existingItems = albumMap.get(groupId) ?? []
    existingItems.push(item)
    albumMap.set(groupId, existingItems)
  }

  return [...albumMap.entries()].map(([id, albumItems]) => {
    const [firstItem] = albumItems

    return {
      id,
      albumTitle: firstItem.albumTitle,
      artist: firstItem.artist,
      coverImageUrl: firstItem.coverImageUrl,
      year: year ?? getYearFromListenedAt(firstItem.listenedAt),
      items: albumItems,
    }
  })
}

export function getArchiveCounts(items: SoundArchiveItem[]) {
  const yearGroups = groupArchiveItemsByYear(items)
  const albumCount = yearGroups.reduce((count, yearGroup) => count + yearGroup.albums.length, 0)

  return {
    trackCount: items.length,
    albumCount,
  }
}

export function getArchiveYearGroups() {
  return groupArchiveItemsByYear(soundArchiveItems)
}

export function getArchiveYearGroup(year: number) {
  return getArchiveYearGroups().find((yearGroup) => yearGroup.year === year) ?? null
}

export function getArchiveItem(year: number, archiveId: string) {
  return getArchiveYearGroup(year)?.items.find((item) => item.id === archiveId) ?? null
}

export function getAdjacentArchiveItems(year: number, archiveId: string) {
  const yearItems = getArchiveYearGroup(year)?.items ?? []
  const currentIndex = yearItems.findIndex((item) => item.id === archiveId)

  if (currentIndex === -1) {
    return {
      previousItem: null,
      nextItem: null,
    }
  }

  return {
    previousItem: yearItems[currentIndex - 1] ?? null,
    nextItem: yearItems[currentIndex + 1] ?? null,
  }
}
