import { ART_ADJUST_DEFAULT, artFilterCss } from '../artAdjust'
import { countryCodeToFlagEmoji, getCountry } from '../countries'
import { DEFAULT_FRAME_ID, type FrameId } from '../frames'
import type { IconId } from '../icons'
import type { Season } from '../seasons'
import CardIcon from './CardIcon'
import './Card.css'

type CardProps = {
  imageUrl?: string | null
  birthDateLabel?: string | null
  season?: Season | null
  seasonColor?: string | null
  seasonIcon?: IconId | null
  seasonIconImage?: string | null
  showSeasonDiamond?: boolean
  seasonIconSize?: number
  showBottomShadow?: boolean
  countryCode?: string | null
  frameId?: FrameId
  name?: string
  subname?: string
  cardSet?: string
  breed?: string
  sex?: string
  brightness?: number
  saturation?: number
  contrast?: number
}

function CardFrame({ frameId }: { frameId: FrameId }) {
  if (frameId === 'none') return null

  if (frameId === 'full') {
    return (
      <div
        className="card__seasonFrame card__seasonFrame--full"
        aria-hidden="true"
      >
        <span className="card__seasonFrame-box" />
      </div>
    )
  }

  // Default: L corners
  return (
    <div className="card__seasonFrame card__seasonFrame--l" aria-hidden="true">
      <span className="card__seasonFrame-corner card__seasonFrame-corner--tl" />
      <span className="card__seasonFrame-corner card__seasonFrame-corner--tr" />
      <span className="card__seasonFrame-corner card__seasonFrame-corner--bl" />
      <span className="card__seasonFrame-corner card__seasonFrame-corner--br" />
    </div>
  )
}

function formatSexGlyph(sex: string): string {
  const s = sex.trim().toLowerCase()
  if (s === 'male' || s === 'm') return '♂'
  if (s === 'female' || s === 'f') return '♀'
  return sex.trim().charAt(0).toUpperCase()
}

function Card({
  imageUrl,
  birthDateLabel,
  season,
  seasonColor: customSeasonColor,
  seasonIcon,
  seasonIconImage,
  showSeasonDiamond = true,
  seasonIconSize = 100,
  showBottomShadow = true,
  countryCode,
  frameId = DEFAULT_FRAME_ID,
  name,
  subname,
  cardSet,
  breed,
  sex,
  brightness = ART_ADJUST_DEFAULT,
  saturation = ART_ADJUST_DEFAULT,
  contrast = ART_ADJUST_DEFAULT,
}: CardProps) {
  const seasonColor = customSeasonColor ?? season?.color ?? '#c9a227'
  const icon = seasonIcon
  const cardSetLabel = cardSet?.trim() || ''
  const breedLabel = breed?.trim() || ''
  const sexRaw = sex?.trim() || ''
  const sexGlyph = sexRaw ? formatSexGlyph(sexRaw) : ''
  const displayName = name?.trim() || ''
  const displaySubname = subname?.trim() || ''
  const hasContent = Boolean(imageUrl)
  const country = getCountry(countryCode)
  const flagEmoji = countryCode ? countryCodeToFlagEmoji(countryCode) : ''

  if (!hasContent) {
    return (
      <div className="card card--empty" aria-label="Empty card">
        <span className="card__empty-label">No content</span>
      </div>
    )
  }

  // Always reserve footer height so name/subname sit at a fixed offset from
  // the card bottom even when date/set are empty.
  const dateText = birthDateLabel?.trim() || ''
  const setText = cardSetLabel
  const footerEmpty = !dateText && !setText

  return (
    <div
      className="card"
      aria-label="Magic card"
      style={{ '--season-accent': seasonColor } as React.CSSProperties}
    >
      {/* Full-bleed art */}
      <div className="card__art">
        <img
          className="card__image"
          src={imageUrl!}
          alt="Card art"
          style={{
            filter: artFilterCss({ brightness, saturation, contrast }),
          }}
        />
      </div>

      {/* Season color edge — ticket / spine accent */}
      <div className="card__spine" aria-hidden="true" />

      <CardFrame frameId={frameId} />

      {/* Top-left: season diamond badge */}
      <div
        className="card__seasonBadge"
        title="Card icon"
        aria-label="Card icon"
      >
        {showSeasonDiamond ? (
          <span className="card__seasonBadge-diamond" aria-hidden="true" />
        ) : null}
        <span
          className="card__seasonBadge-icon"
          style={{ transform: `scale(${seasonIconSize / 100})` }}
        >
          {seasonIconImage ? (
            <img className="card__custom-icon" src={seasonIconImage} alt="Custom icon" />
          ) : icon ? <CardIcon icon={icon} /> : null}
        </span>
      </div>

      {/* Top-right: origin + sex */}
      {(flagEmoji || sexGlyph) && (
        <div className="card__topChips">
          {flagEmoji ? (
            <span
              className="card__chip card__chip--flag"
              title={country?.name}
              aria-label={country ? `Country: ${country.name}` : 'Country flag'}
            >
              <span className="card__flag" aria-hidden="true">
                {flagEmoji}
              </span>
            </span>
          ) : null}
          {sexGlyph ? (
            <span
              className="card__chip card__chip--sex"
              title={sexRaw}
              aria-label={`Sex: ${sexRaw}`}
            >
              {sexGlyph}
            </span>
          ) : null}
        </div>
      )}

      {/* Left edge: breed (rotated) */}
      {breedLabel ? <div className="card__breed">{breedLabel}</div> : null}

      {/* Bottom info — full transparent panel (frame draws above it) */}
      <div className="card__plate">
        {showBottomShadow ? <div className="card__plate-panel" aria-hidden="true" /> : null}
        <div className="card__plate-body">
          <div className="card__name">{displayName}</div>
          {displaySubname ? (
            <div className="card__subname">{displaySubname}</div>
          ) : null}

          <div
            className="card__footer"
            aria-hidden={footerEmpty ? true : undefined}
          >
            <span className="card__footer-item card__footer-item--date">
              {dateText || '\u00A0'}
            </span>
            <span className="card__footer-item card__footer-item--set">
              {setText || '\u00A0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
