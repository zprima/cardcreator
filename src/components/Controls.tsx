import { SEASONS, type SeasonId } from '../seasons'
import SeasonSymbol from './SeasonSymbol'
import './Controls.css'

const SEASON_IDS = Object.keys(SEASONS) as SeasonId[]

type ControlsProps = {
  onImageChange: (file: File | null) => void
  fileName?: string | null
  birthDate: string
  onBirthDateChange: (value: string) => void
  seasonId: SeasonId | null
  onSeasonChange: (seasonId: SeasonId) => void
}

function Controls({
  onImageChange,
  fileName,
  birthDate,
  onBirthDateChange,
  seasonId,
  onSeasonChange,
}: ControlsProps) {
  return (
    <section className="controls" aria-label="Card controls">
      <div className="controls__panel">
        <h2 className="controls__title">Picture</h2>
        <label className="controls__upload">
          <span className="controls__upload-label">
            {fileName ? 'Change image' : 'Upload image'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="controls__file-input"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null
              onImageChange(file)
            }}
          />
        </label>
        {fileName ? (
          <p className="controls__filename">{fileName}</p>
        ) : (
          <p className="controls__hint">Choose an image to show on the card.</p>
        )}
      </div>

      <div className="controls__panel">
        <h2 className="controls__title">Birth day</h2>
        <label className="controls__field">
          <span className="controls__field-label">Date of birth</span>
          <input
            type="date"
            className="controls__date-input"
            value={birthDate}
            onChange={(event) => onBirthDateChange(event.target.value)}
          />
        </label>
        <p className="controls__hint">
          Shown on the card as the date of birth.
        </p>
      </div>

      <div className="controls__panel">
        <h2 className="controls__title">Season</h2>
        <p className="controls__hint">
          Colors the season frame and indicator on the card.
        </p>
        <div
          className="controls__season-options"
          role="radiogroup"
          aria-label="Season"
        >
          {SEASON_IDS.map((id) => {
            const season = SEASONS[id]
            const selected = seasonId === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`controls__season-option${selected ? ' controls__season-option--selected' : ''}`}
                onClick={() => onSeasonChange(id)}
              >
                <span
                  className="controls__season-option-swatch"
                  style={{ backgroundColor: season.color }}
                >
                  <SeasonSymbol season={season.id} />
                </span>
                <span className="controls__season-option-label">
                  {season.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Controls
