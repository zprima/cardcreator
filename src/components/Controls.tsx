import { SEASONS, type Season } from '../seasons'
import SeasonSymbol from './SeasonSymbol'
import './Controls.css'

type ControlsProps = {
  onImageChange: (file: File | null) => void
  fileName?: string | null
  birthDate: string
  onBirthDateChange: (value: string) => void
  season?: Season | null
}

function Controls({
  onImageChange,
  fileName,
  birthDate,
  onBirthDateChange,
  season,
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
        {season ? (
          <div className="controls__season-preview">
            <span
              className="controls__season-swatch"
              style={{ backgroundColor: season.color }}
              title={season.label}
            >
              <SeasonSymbol season={season.id} />
            </span>
            <p className="controls__hint">
              Season: <strong>{season.label}</strong>
            </p>
          </div>
        ) : (
          <p className="controls__hint">
            Pick a birth day to set the season color and symbol.
          </p>
        )}
        <div className="controls__season-legend" aria-label="Season colors">
          {(Object.keys(SEASONS) as Array<keyof typeof SEASONS>).map((id) => {
            const s = SEASONS[id]
            return (
              <div key={s.id} className="controls__season-legend-item">
                <span
                  className="controls__season-legend-swatch"
                  style={{ backgroundColor: s.color }}
                >
                  <SeasonSymbol season={s.id} />
                </span>
                <span>{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Controls
