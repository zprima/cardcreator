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
    strokeWidth: 2.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (season) {
    case 'spring':
      // Flower — centered, open petals (outline style so it reads clearly)
      return (
        <svg {...common}>
          {/* Five petals as ellipses around center (12, 12) */}
          <ellipse
            cx="12"
            cy="6.5"
            rx="2.4"
            ry="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <ellipse
            cx="12"
            cy="6.5"
            rx="2.4"
            ry="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(72 12 12)"
          />
          <ellipse
            cx="12"
            cy="6.5"
            rx="2.4"
            ry="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(144 12 12)"
          />
          <ellipse
            cx="12"
            cy="6.5"
            rx="2.4"
            ry="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(216 12 12)"
          />
          <ellipse
            cx="12"
            cy="6.5"
            rx="2.4"
            ry="3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(288 12 12)"
          />
          {/* Center disk */}
          <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'summer':
      // Sun (unchanged)
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      )
    case 'autumn':
      // Classical maple leaf (Material Design “leaf-maple” silhouette, 24×24)
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            stroke="none"
            d="M21.79 13 16 16l1 2-4-.75V21h-2v-3.75L7 18l1-2-5.79-3 1-1.73L1.61 8l3.6-.23 1-1.77 3.42 3.9L8 5h2l2-3 2 3h2l-1.63 4.9L17.79 6l1 1.73 3.6.23-1.6 3.23z"
          />
        </svg>
      )
    case 'winter':
      // Snowflake (unchanged)
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
