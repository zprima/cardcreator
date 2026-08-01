import type { Season } from '../seasons'
import SeasonSymbol from './SeasonSymbol'
import './Card.css'

type CardProps = {
  imageUrl?: string | null
  birthDateLabel?: string | null
  season?: Season | null
}

function Card({ imageUrl, birthDateLabel, season }: CardProps) {
  const seasonColor = season?.color ?? '#c9a227'

  return (
    <div className="card" aria-label="Magic card">
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
          <div className="card__name">Blisk</div>
          <div className="card__subname">strah ovc</div>
        </div>
      </div>

      <div className="card__seasonFrame" aria-hidden="true">
        <span
          className="card__seasonFrame-corner card__seasonFrame-corner--tl"
          style={{ borderColor: seasonColor }}
        />
        <span
          className="card__seasonFrame-corner card__seasonFrame-corner--tr"
          style={{ borderColor: seasonColor }}
        />
        <span
          className="card__seasonFrame-corner card__seasonFrame-corner--bl"
          style={{ borderColor: seasonColor }}
        />
        <span
          className="card__seasonFrame-corner card__seasonFrame-corner--br"
          style={{ borderColor: seasonColor }}
        />
      </div>

      <div
        className="card__seasonIndicator"
        style={{ backgroundColor: seasonColor }}
        title={season ? season.label : 'Season'}
        aria-label={season ? `Season: ${season.label}` : 'Season not set'}
      >
        {season ? <SeasonSymbol season={season.id} /> : null}
      </div>

      <div className="card__picTaken">12.09.2021</div>
    </div>
  )
}

export default Card
