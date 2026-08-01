import './Card.css'

type CardProps = {
  imageUrl?: string | null
}

function Card({ imageUrl }: CardProps) {
  return (
    <div className="card" aria-label="Magic card">
      <div className="card__panel">
        <div className="card__art">
          {imageUrl ? (
            <img className="card__image" src={imageUrl} alt="Card art" />
          ) : null}
        </div>
        <div className="card__type">Pes - Mešanec</div>
        <div className="card__dateofbirth">18.12.2021</div>
        <div className="card__description">
          <div className="card__name">Blisk</div>
          <div className="card__subname">strah ovc</div>
        </div>
      </div>
      <div className="card__frame" aria-hidden="true">
        <span className="card__frame-corner card__frame-corner--tl" />
        <span className="card__frame-corner card__frame-corner--tr" />
        <span className="card__frame-corner card__frame-corner--bl" />
        <span className="card__frame-corner card__frame-corner--br" />
      </div>
      <div className="card__mana" aria-hidden="true" />
      <div className="card__picTaken">12.09.2021</div>
    </div>
  )
}

export default Card
