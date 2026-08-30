import { useEffect, useState } from 'react'
import {
  ART_ADJUST_MAX,
  ART_ADJUST_MIN,
  clampArtAdjust,
} from '../artAdjust'
import { COUNTRIES } from '../countries'
import { FRAMES, type FrameId } from '../frames'
import { SEASONS, type SeasonId } from '../seasons'
import SeasonSymbol from './SeasonSymbol'
import './Controls.css'

const SEASON_IDS = Object.keys(SEASONS) as SeasonId[]

function ArtAdjustSlider({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  disabled: boolean
}) {
  return (
    <label className="controls__adjust">
      <span className="controls__adjust-head">
        <span className="controls__label">{label}</span>
        <span className="controls__adjust-value">{value}%</span>
      </span>
      <input
        type="range"
        className="controls__range"
        min={ART_ADJUST_MIN}
        max={ART_ADJUST_MAX}
        step={1}
        value={value}
        disabled={disabled}
        aria-valuetext={`${value}%`}
        onChange={(event) =>
          onChange(clampArtAdjust(Number(event.target.value)))
        }
      />
    </label>
  )
}

type ControlsProps = {
  selectedIndex?: number
  totalCards?: number
  onImageChange: (file: File | null) => void
  fileName?: string | null
  birthDate: string
  onBirthDateChange: (value: string) => void
  seasonId: SeasonId | null
  onSeasonChange: (seasonId: SeasonId) => void
  countryCode: string
  onCountryChange: (countryCode: string) => void
  frameId: FrameId
  onFrameChange: (frameId: FrameId) => void
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
  onClear: () => void
  duplicateSources: { id: string; label: string }[]
  onDuplicateFrom: (sourceId: string) => void
  brightness: number
  onBrightnessChange: (value: number) => void
  saturation: number
  onSaturationChange: (value: number) => void
  contrast: number
  onContrastChange: (value: number) => void
}

function Controls({
  selectedIndex,
  totalCards,
  onImageChange,
  fileName,
  birthDate,
  onBirthDateChange,
  seasonId,
  onSeasonChange,
  countryCode,
  onCountryChange,
  frameId,
  onFrameChange,
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
  onClear,
  duplicateSources,
  onDuplicateFrom,
  brightness,
  onBrightnessChange,
  saturation,
  onSaturationChange,
  contrast,
  onContrastChange,
}: ControlsProps) {
  const [duplicateSourceId, setDuplicateSourceId] = useState('')

  useEffect(() => {
    // Drop selection if source list no longer includes it (e.g. switched cards)
    if (
      duplicateSourceId &&
      !duplicateSources.some((source) => source.id === duplicateSourceId)
    ) {
      setDuplicateSourceId('')
    }
  }, [duplicateSourceId, duplicateSources])

  return (
    <section className="controls" aria-label="Card controls">
      <header className="controls__header">
        <h1 className="controls__heading">Card controls</h1>
        {selectedIndex != null && totalCards != null ? (
          <p className="controls__selection">
            Editing card {selectedIndex} of {totalCards}
          </p>
        ) : null}
        <button
          type="button"
          className="controls__clear"
          onClick={onClear}
        >
          Clear card
        </button>

        <div className="controls__duplicate">
          <span className="controls__label">Duplicate from</span>
          <div className="controls__duplicate-row">
            <select
              className="controls__input controls__duplicate-select"
              value={duplicateSourceId}
              onChange={(event) => setDuplicateSourceId(event.target.value)}
              aria-label="Source card to duplicate from"
            >
              <option value="">Select card…</option>
              {duplicateSources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="controls__duplicate-btn"
              disabled={!duplicateSourceId}
              onClick={() => {
                if (!duplicateSourceId) return
                onDuplicateFrom(duplicateSourceId)
              }}
            >
              Duplicate
            </button>
          </div>
          <p className="controls__duplicate-hint">
            Copies fields only — picture is not changed.
          </p>
        </div>
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
                  key={`${selectedIndex ?? 'x'}-${fileName ?? 'none'}`}
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
            <div className="controls__adjusts">
              <ArtAdjustSlider
                label="Brightness"
                value={brightness}
                onChange={onBrightnessChange}
                disabled={!fileName}
              />
              <ArtAdjustSlider
                label="Saturation"
                value={saturation}
                onChange={onSaturationChange}
                disabled={!fileName}
              />
              <ArtAdjustSlider
                label="Contrast"
                value={contrast}
                onChange={onContrastChange}
                disabled={!fileName}
              />
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
              <span className="controls__label">Frame</span>
              <select
                className="controls__input"
                value={frameId}
                onChange={(event) =>
                  onFrameChange(event.target.value as FrameId)
                }
              >
                {FRAMES.map((frame) => (
                  <option key={frame.id} value={frame.id}>
                    {frame.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="controls__field">
              <span className="controls__label">Country</span>
              <select
                className="controls__input"
                value={countryCode}
                onChange={(event) => onCountryChange(event.target.value)}
              >
                <option value="">Select country…</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>

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
