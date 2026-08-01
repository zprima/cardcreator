import type { Season } from '../seasons'
import SeasonSymbol from './SeasonSymbol'
import './Card.css'

type CardProps = {
  imageUrl?: string | null
  birthDateLabel?: string | null
  season?: Season | null
  name?: string
  subname?: string
  cardSet?: string
  breed?: string
  sex?: string
}

function Card({
  imageUrl,
  birthDateLabel,
  season,
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

  return (
    <div
      className="card"
      aria-label="Magic card"
      style={{ '--season-accent': seasonColor } as React.CSSProperties}
    >
      <div className="card__panel">
        <div className="card__art">
          {imageUrl ? (
            <img className="card__image" src={imageUrl} alt="Card art" />
          ) : null}
        </div>
        <div className="card__description">
          <div className="card__name">{name?.trim() || '—'}</div>
          {subname?.trim() ? (
            <div className="card__subname">{subname.trim()}</div>
          ) : null}
        </div>
      </div>

      <div className="card__seasonFrame" aria-hidden="true">
        <span className="card__seasonFrame-corner card__seasonFrame-corner--tl" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--tr" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--bl" />
        <span className="card__seasonFrame-corner card__seasonFrame-corner--br" />
      </div>

      <div
        className="card__seasonIndicator"
        title={season ? season.label : 'Season'}
        aria-label={season ? `Season: ${season.label}` : 'Season not set'}
      >
        {season ? <SeasonSymbol season={season.id} /> : null}
      </div>

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
