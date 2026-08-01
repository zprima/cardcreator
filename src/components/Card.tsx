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

  if (frameId === 'double') {
    return (
      <div
        className="card__seasonFrame card__seasonFrame--double"
        aria-hidden="true"
      >
        <span className="card__seasonFrame-corner card__seasonFrame-corner--tl" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--tr" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--bl" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--br" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--tl card__seasonFrame-corner--inner" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--tr card__seasonFrame-corner--inner" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--bl card__seasonFrame-corner--inner" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--br card__seasonFrame-corner--inner" />
      </div>
    )
  }

  if (frameId === 'pips') {
    return (
      <div
        className="card__seasonFrame card__seasonFrame--pips"
        aria-hidden="true"
      >
        <span className="card__seasonFrame-pip card__seasonFrame-pip--tl" />
        <span className="card__seasonFrame-pip card__seasonFrame-pip--tr" />
        <span className="card__seasonFrame-pip card__seasonFrame-pip--bl" />
        <span className="card__seasonFrame-pip card__seasonFrame-pip--br" />
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
  const sexLabel = sex?.trim()
    ? sex.trim().charAt(0).toUpperCase() + sex.trim().slice(1)
    : ''
  const showMetaStrip = Boolean(breedLabel || sexLabel)
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

  return (
    <div
      className="card"
      aria-label="Magic card"
      style={{ '--season-accent': seasonColor } as React.CSSProperties}
    >
      <div className="card__panel">
        <div className="card__art">
          <img className="card__image" src={imageUrl!} alt="Card art" />
        </div>
        <div className="card__description">
          <div className="card__name">{name?.trim() || '—'}</div>
          {subname?.trim() ? (
            <div className="card__subname">{subname.trim()}</div>
          ) : null}
        </div>
      </div>

      <CardFrame frameId={frameId} />

      <div
        className="card__seasonIndicator"
        title={season ? season.label : 'Season'}
        aria-label={season ? `Season: ${season.label}` : 'Season not set'}
      >
        {season ? <SeasonSymbol season={season.id} /> : null}
      </div>

      {flagEmoji ? (
        <div
          className="card__countryFlag"
          title={country?.name}
          aria-label={country ? `Country: ${country.name}` : 'Country flag'}
        >
          <span className="card__flag" aria-hidden="true">
            {flagEmoji}
          </span>
        </div>
      ) : null}

      {showMetaStrip ? (
        <div className="card__metaStrip">
          {breedLabel ? <div className="card__breed">{breedLabel}</div> : null}
          {sexLabel ? <div className="card__sex">{sexLabel}</div> : null}
        </div>
      ) : null}

      {birthDateLabel ? (
        <div className="card__dateofbirth">{birthDateLabel}</div>
      ) : null}

      {cardSetLabel ? (
        <div className="card__cardSet">{cardSetLabel}</div>
      ) : null}
    </div>
  )
}

export default Card
