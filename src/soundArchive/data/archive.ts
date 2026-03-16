import type { SoundArchiveItem } from '../types'
import { soundArchiveCoverImages } from './images'

export const soundArchiveItems: SoundArchiveItem[] = [
  {
    id: 'vol07',
    albumTitle: 'VOL.07',
    artist: '고고학',
    coverImageUrl: soundArchiveCoverImages.vol07,
    listenedAt: '2026.03.16',
  },
  {
    id: 'drive-me-crazy',
    trackTitle: 'Drive Me Crazy',
    artist: 'Myles Lloyd',
    coverImageUrl: soundArchiveCoverImages.driveMeCrazy,
    listenedAt: '2026.02.06',
  },
  {
    id: 'yin-and-yang',
    trackTitle: 'Yin and Yang (feat. DEAN & PENOMECO) [FANXY CHILD Ver.]',
    artist: 'ZICO & Crush',
    coverImageUrl: soundArchiveCoverImages.yinAndYang,
    listenedAt: '2026.02.04',
  },
  {
    id: 'do-your-thing-babe',
    trackTitle: 'Do Your Thing, Babe!',
    artist: 'Michael Medrano & Funk Leblanc',
    coverImageUrl: soundArchiveCoverImages.doYourThingBabe,
    listenedAt: '2026.01.23',
  },
  {
    id: 'soh-soh',
    trackTitle: 'Soh-Soh',
    artist: 'Odeal',
    coverImageUrl: soundArchiveCoverImages.sohSoh,
    listenedAt: '2026.01.14',
  },
  {
    id: 'here-we-are',
    trackTitle: '여기에 있자',
    artist: '설',
    coverImageUrl: soundArchiveCoverImages.hereWeAre,
    listenedAt: '2025.12.26',
  },
]
