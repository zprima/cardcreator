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
}

function Card({
  imageUrl,
  birthDateLabel,
  season,
  name,
  subname,
  cardSet,
}: CardProps) {
  const seasonColor = season?.color ?? '#c9a227'
  const cardSetLabel = cardSet?.trim() || ''

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
        <div className="card__type">Pes - Mešanec</div>
        <div className="card__dateofbirth">
          {birthDateLabel ?? '—'}
        </div>
        <div className="card__description">
          <div className="card__name">{name?.trim() || '—'}</div>
          <div className="card__subname">{subname?.trim() || '—'}</div>
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

      {cardSetLabel ? (
        <div className="card__cardSet">{cardSetLabel}</div>
      ) : null}
    </div>
  )
}

export default Card
