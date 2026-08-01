import { countryCodeToFlagEmoji, getCountry } from '../countries'
import { DEFAULT_FRAME_ID, type FrameId } from '../frames'
import type { Season } from '../seasons'
import SeasonSymbol from './SeasonSymbol'
import './Card.css'

type CardProps = {
  imageUrl?: string | null
  birthDateLabel?: string | null
  season?: Season | null
  countryCode?: string | null
  frameId?: FrameId
  name?: string
  subname?: string
  cardSet?: string
  breed?: string
  sex?: string
}

function CardFrame({ frameId }: { frameId: FrameId }) {
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
  countryCode,
  frameId = DEFAULT_FRAME_ID,
  name,
  subname,
  cardSet,
  breed,
  sex,
}: CardProps) {
  const seasonColor = season?.color ?? '#c9a227'
  const cardSetLabel = cardSet?.trim() || ''
  const breedLabel = breed?.trim() || ''
  const sexRaw = sex?.trim() || ''
  const sexGlyph = sexRaw ? formatSexGlyph(sexRaw) : ''
  const displayName = name?.trim() || '—'
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

  const showFooter = Boolean(birthDateLabel || cardSetLabel)

  return (
    <div
      className="card"
      aria-label="Magic card"
      style={{ '--season-accent': seasonColor } as React.CSSProperties}
    >
      {/* Full-bleed art */}
      <div className="card__art">
        <img className="card__image" src={imageUrl!} alt="Card art" />
      </div>

      {/* Soft vignette so top badges + bottom panel always read */}
      <div className="card__vignette" aria-hidden="true" />

      {/* Season color edge — ticket / spine accent */}
      <div className="card__spine" aria-hidden="true" />

      <CardFrame frameId={frameId} />

      {/* Top-left: season diamond badge */}
      <div
        className="card__seasonBadge"
        title={season ? season.label : 'Season'}
        aria-label={season ? `Season: ${season.label}` : 'Season not set'}
      >
        <span className="card__seasonBadge-diamond" aria-hidden="true" />
        <span className="card__seasonBadge-icon">
          {season ? <SeasonSymbol season={season.id} /> : null}
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
        <div className="card__plate-panel" aria-hidden="true" />
        <div className="card__plate-body">
          <div className="card__name">{displayName}</div>
          {displaySubname ? (
            <div className="card__subname">{displaySubname}</div>
          ) : null}

          {showFooter ? (
            <div className="card__footer">
              <span className="card__footer-item card__footer-item--date">
                {birthDateLabel ?? ''}
              </span>
              <span className="card__footer-item card__footer-item--set">
                {cardSetLabel}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Card
