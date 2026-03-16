import type { SoundArchiveYearGroup } from '../types'

interface YearListProps {
  years: SoundArchiveYearGroup[]
  selectedYear: number
  onSelectYear: (year: number) => void
}

export function YearList({ years, selectedYear, onSelectYear }: YearListProps) {
  return (
    <nav aria-label="연도별 사운드 아카이브" className='flex flex-col justify-between'>
      {years.map((yearGroup) => (
        <button
          type="button"
          key={yearGroup.year}
          onClick={() => onSelectYear(yearGroup.year)}
          disabled={yearGroup.year === selectedYear}
          className={yearGroup.year === selectedYear ? 'opacity-100' : 'opacity-20'}
        >
          <span className='text-[40px] font-semibold line-height-[1] text-center'>{yearGroup.year}</span>
        </button>
      ))}
    </nav>
  )
}
