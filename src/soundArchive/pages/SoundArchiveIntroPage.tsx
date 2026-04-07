import { Link } from '@tanstack/react-router'
import { soundArchiveItems } from '../data/archive'
import { getArchiveCounts } from '../lib/archive'

export function SoundArchiveIntroPage() {
  const counts = getArchiveCounts(soundArchiveItems)

  return (
    <main>
      <section>
        <h1 className="text-5xl font-semibold">사운드 아카이브</h1>
        <div className="flex flex-col gap-4 mt-[48px] mb-[80px]">
          <p className="text-2xl">
            2020년부터 저는 듣기 좋았던 노래, 혹은 그날의 날씨와 감정에 어울리는 음악과 음반을 인스타그램 스토리에 공유해왔습니다. 스토리에 남긴 음악은 하이라이트로 다시 모였고, 그 기록은 6년 동안 차곡차곡 쌓였습니다.
          </p>
          <p className="text-2xl">
            사운드 아카이브는 그렇게 축적된 기록을 플랫폼 안에만 머무르게 두기 아깝다는 마음에서 출발한 작업입니다. 지나온 시간과 그때의 감정을, 책장에 한 권씩 꽂아두듯 오래 간직하고 싶었습니다.
          </p>
          <p className="text-2xl">
            현재 아카이브에는 2022년부터 2026년까지의 기록이 먼저 정리되어 있으며, 총 {counts.trackCount}곡의 음악과 {counts.albumCount}장의 앨범이 담겨 있습니다.
          </p>
          <p className="text-2xl">
            2021년 이전의 기록은 순차적으로 추가하고 있습니다.
          </p>
        </div>
        <Link to="/works/sound-archive/list"className="text-[32px] font-semibold hover:underline">아카이빙 보기 →</Link>
      </section>
    </main>
  )
}
