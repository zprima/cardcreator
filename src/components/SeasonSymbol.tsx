import type { SeasonId } from '../seasons'

type SeasonSymbolProps = {
  season: SeasonId
  className?: string
}

/** Simple seasonal glyphs for the seasonIndicator. */
function SeasonSymbol({ season, className }: SeasonSymbolProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    width: '60%',
    height: '60%',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (season) {
    case 'spring':
      // Bloom / flower
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
          <path d="M12 3.5c1.2 2.2 1.2 4.3 0 5.5-1.2-1.2-1.2-3.3 0-5.5Z" fill="currentColor" stroke="none" />
          <path d="M12 15c1.2 2.2 1.2 4.3 0 5.5-1.2-1.2-1.2-3.3 0-5.5Z" fill="currentColor" stroke="none" />
          <path d="M3.5 12c2.2-1.2 4.3-1.2 5.5 0-1.2 1.2-3.3 1.2-5.5 0Z" fill="currentColor" stroke="none" />
          <path d="M15 12c2.2-1.2 4.3-1.2 5.5 0-1.2 1.2-3.3 1.2-5.5 0Z" fill="currentColor" stroke="none" />
          <path d="M6.2 6.2c2.4.4 4 1.6 4.3 3.6-2-.3-3.2-1.9-4.3-3.6Z" fill="currentColor" stroke="none" />
          <path d="M17.8 6.2c-2.4.4-4 1.6-4.3 3.6 2-.3 3.2-1.9 4.3-3.6Z" fill="currentColor" stroke="none" />
          <path d="M6.2 17.8c2.4-.4 4-1.6 4.3-3.6-2 .3-3.2 1.9-4.3 3.6Z" fill="currentColor" stroke="none" />
          <path d="M17.8 17.8c-2.4-.4-4-1.6-4.3-3.6 2 .3 3.2 1.9 4.3 3.6Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'summer':
      // Sun
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      )
    case 'autumn':
      // Leaf
      return (
        <svg {...common}>
          <path
            d="M12 21c0-6 3-9 9-9-1.5 6-5 9-9 9Z"
            fill="currentColor"
            stroke="none"
          />
          <path
            d="M12 21c0-6-3-9-9-9 1.5 6 5 9 9 9Z"
            fill="currentColor"
            stroke="none"
            opacity="0.85"
          />
          <path d="M12 21V10" />
          <path d="M12 14c-2-1-3.5-2.5-4-4.5M12 14c2-1 3.5-2.5 4-4.5" />
        </svg>
      )
    case 'winter':
      // Snowflake
      return (
        <svg {...common}>
          <path d="M12 3v18M5.5 6.5l13 11M18.5 6.5l-13 11" />
          <path d="M12 6.5l-1.5-2M12 6.5l1.5-2M12 17.5l-1.5 2M12 17.5l1.5 2" />
          <path d="M7.2 8l-2.3.2M7.2 8l-.2-2.3M16.8 16l2.3-.2M16.8 16l.2 2.3" />
          <path d="M16.8 8l2.3.2M16.8 8l.2-2.3M7.2 16l-2.3-.2M7.2 16l-.2 2.3" />
        </svg>
      )
  }
}

export default SeasonSymbol
