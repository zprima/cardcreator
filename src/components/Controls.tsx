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
  sex: string
  onSexChange: (sex: string) => void
  breed: string
  onBreedChange: (breed: string) => void
  name: string
  onNameChange: (name: string) => void
  subname: string
  onSubnameChange: (subname: string) => void
  cardSet: string
  onCardSetChange: (cardSet: string) => void
}

function Controls({
  onImageChange,
  fileName,
  birthDate,
  onBirthDateChange,
  seasonId,
  onSeasonChange,
  sex,
  onSexChange,
  breed,
  onBreedChange,
  name,
  onNameChange,
  subname,
  onSubnameChange,
  cardSet,
  onCardSetChange,
}: ControlsProps) {
  return (
    <section className="controls" aria-label="Card controls">
      <header className="controls__header">
        <h1 className="controls__heading">Card controls</h1>
      </header>

      <div className="controls__body">
        <div className="controls__section">
          <p className="controls__section-title">Required</p>

          <div className="controls__row controls__row--picture">
            <span className="controls__label">Picture</span>
            <div className="controls__picture">
              <label className="controls__upload">
                <span className="controls__upload-label">
                  {fileName ? 'Change' : 'Upload'}
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
              <span
                className="controls__filename"
                title={fileName ?? undefined}
              >
                {fileName ?? 'No image'}
              </span>
            </div>
          </div>

          <div className="controls__grid">
            <label className="controls__field">
              <span className="controls__label">Name</span>
              <input
                type="text"
                className="controls__input"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="Blisk"
                autoComplete="off"
              />
            </label>

            <label className="controls__field">
              <span className="controls__label">Subname</span>
              <input
                type="text"
                className="controls__input"
                value={subname}
                onChange={(event) => onSubnameChange(event.target.value)}
                placeholder="natural sheep intimidator"
                autoComplete="off"
              />
            </label>
          </div>

          <div className="controls__season">
            <span className="controls__label">Season</span>
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
                    title={season.label}
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
        </div>

        <div className="controls__section controls__section--optional">
          <p className="controls__section-title">Optional</p>

          <div className="controls__grid">
            <label className="controls__field">
              <span className="controls__label">Breed</span>
              <input
                type="text"
                className="controls__input"
                value={breed}
                onChange={(event) => onBreedChange(event.target.value)}
                placeholder="mixed"
                autoComplete="off"
              />
            </label>

            <label className="controls__field">
              <span className="controls__label">Sex</span>
              <select
                className="controls__input"
                value={sex}
                onChange={(event) => onSexChange(event.target.value)}
              >
                <option value="">Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <label className="controls__field">
              <span className="controls__label">Birth day</span>
              <input
                type="date"
                className="controls__input"
                value={birthDate}
                onChange={(event) => onBirthDateChange(event.target.value)}
              />
            </label>

            <label className="controls__field">
              <span className="controls__label">Card set</span>
              <input
                type="text"
                className="controls__input"
                value={cardSet}
                onChange={(event) => onCardSetChange(event.target.value)}
                placeholder="BLK001"
                autoComplete="off"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Controls
