interface Music {
  id: number;
  title: string;
  artistName: string;
  albumCover: string;
}

export const musics: Music[] = [
  {
    id: 1,
    title: '첫 번째 앨범',
    artistName: '아티스트 1',
    albumCover: 'https://picsum.photos/300/300?random=1'
  },
  {
    id: 2,
    title: '두 번째 앨범',
    artistName: '아티스트 2',
    albumCover: 'https://picsum.photos/300/300?random=2'
  },
  {
    id: 3,
    title: '세 번째 앨범',
    artistName: '아티스트 3',
    albumCover: 'https://picsum.photos/300/300?random=3'
  },
  {
    id: 4,
    title: '네 번째 앨범',
    artistName: '아티스트 4',
    albumCover: 'https://picsum.photos/300/300?random=4'
  },
  {
    id: 5,
    title: '다섯 번째 앨범',
    artistName: '아티스트 5',
    albumCover: 'https://picsum.photos/300/300?random=5'
  }
]