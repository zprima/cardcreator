import './Controls.css'

type ControlsProps = {
  onImageChange: (file: File | null) => void
  fileName?: string | null
}

function Controls({ onImageChange, fileName }: ControlsProps) {
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
    </section>
  )
}

export default Controls
