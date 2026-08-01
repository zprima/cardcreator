export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter'

export type Season = {
  id: SeasonId
  label: string
  /** Primary season color used by seasonFrame + seasonIndicator */
  color: string
}

export const SEASONS: Record<SeasonId, Season> = {
  spring: {
    id: 'spring',
    label: 'Spring',
    color: '#15cc2b',
  },
  summer: {
    id: 'summer',
    label: 'Summer',
    color: '#e6d215',
  },
  autumn: {
    id: 'autumn',
    label: 'Autumn',
    color: '#FF5A00',
  },
  winter: {
    id: 'winter',
    label: 'Winter',
    color: '#3d9bff',
  },
}

/**
 * Meteorological seasons (Northern hemisphere):
 * Spring Mar–May, Summer Jun–Aug, Autumn Sep–Nov, Winter Dec–Feb
 */
export function getSeasonFromDate(date: Date): Season {
  const month = date.getMonth() + 1 // 1–12

  if (month >= 3 && month <= 5) return SEASONS.spring
  if (month >= 6 && month <= 8) return SEASONS.summer
  if (month >= 9 && month <= 11) return SEASONS.autumn
  return SEASONS.winter
}

/** Parse HTML date input value (YYYY-MM-DD) as local date. */
export function parseDateInput(value: string): Date | null {
  if (!value) return null
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

/** Format date as DD.MM.YYYY for card display. */
export function formatCardDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}
