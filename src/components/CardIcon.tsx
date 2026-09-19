import type { IconId } from '../icons'

type CardIconProps = {
  icon: IconId
  className?: string
}

/** Built-in card icons. */
function CardIcon({ icon, className }: CardIconProps) {
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

  switch (icon) {
    case 'wings':
      return (
        <svg {...common} strokeWidth={1.5}>
          <path d="M12 18C8 19 2 16 2 5l6 5c3 1 4 4 4 8Z" />
          <path d="M12 18c4 1 10-2 10-13l-6 5c-3 1-4 4-4 8Z" />
          <path d="m3 10 5 4m-4-1 4 3m13-6-5 4m4-1-4 3" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 21 3.5 12.5C-2 7 6 0 12 7c6-7 14 0 8.5 5.5Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'star':
      return (
        <svg {...common}>
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'paw':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <ellipse cx="4.5" cy="10" rx="2.2" ry="3" transform="rotate(-25 4.5 10)" />
          <ellipse cx="9" cy="5.5" rx="2.2" ry="3" />
          <ellipse cx="15" cy="5.5" rx="2.2" ry="3" />
          <ellipse cx="19.5" cy="10" rx="2.2" ry="3" transform="rotate(25 19.5 10)" />
          <path d="M12 11c-3 0-4 3-6 5-3 4 1 6 4 4l2-.5 2 .5c3 2 7 0 4-4-2-2-3-5-6-5Z" />
        </svg>
      )
    case 'flower':
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
    case 'sun':
      // Sun (unchanged)
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      )
    case 'leaf':
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
    case 'snowflake':
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

export default CardIcon
