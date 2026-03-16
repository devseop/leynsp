import { useState } from 'react'
import { AlbumPreviewList } from '../components/AlbumPreviewList'
import { YearList } from '../components/YearList'
import { getArchiveYearGroups } from '../lib/archive'

export function SoundArchiveListPage() {
  const yearGroups = getArchiveYearGroups()
  const [selectedYear, setSelectedYear] = useState(yearGroups[0]?.year ?? 0)
  const currentYearGroup = yearGroups.find((yearGroup) => yearGroup.year === selectedYear) ?? yearGroups[0] ?? null

  return (
    <main>
      <section aria-label="연도별 아카이브 목록" className="flex flex-row justify-between">
        <YearList years={yearGroups} selectedYear={selectedYear} onSelectYear={setSelectedYear} />

        <div>
          {currentYearGroup ? <AlbumPreviewList albums={currentYearGroup.albums} year={currentYearGroup.year} /> : null}
        </div>
      </section>
    </main>
  )
}
