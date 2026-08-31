import {
  CARD_HEIGHT_MM,
  CARD_WIDTH_MM,
  MAX_BLEED_MM,
  MAX_COLUMNS,
  MAX_ROWS,
} from '../dimensions'
import './LayoutPanel.css'

type LayoutPanelProps = {
  pageSize: string
  columns: number
  rows: number
  bleedMm: number
  onColumnsChange: (columns: number) => void
  onRowsChange: (rows: number) => void
  onBleedMmChange: (bleedMm: number) => void
  onPrint: () => void
}

function LayoutPanel({
  pageSize,
  columns,
  rows,
  bleedMm,
  onColumnsChange,
  onRowsChange,
  onBleedMmChange,
  onPrint,
}: LayoutPanelProps) {
  return (
    <section className="layout-panel" aria-label="Layout">
      <header className="layout-panel__header">
        <h1 className="layout-panel__heading">Layout</h1>
      </header>

      <div className="layout-panel__body">
        <label className="layout-panel__field">
          <span className="layout-panel__label">Page size</span>
          <input
            className="layout-panel__input"
            type="text"
            value={pageSize}
            disabled
            readOnly
          />
        </label>

        <label className="layout-panel__field">
          <span className="layout-panel__label">Columns</span>
          <input
            className="layout-panel__input"
            type="number"
            min={1}
            max={MAX_COLUMNS}
            value={columns}
            onChange={(event) => {
              const next = Number(event.target.value)
              if (Number.isFinite(next) && next >= 1) onColumnsChange(next)
            }}
          />
        </label>

        <label className="layout-panel__field">
          <span className="layout-panel__label">Rows</span>
          <input
            className="layout-panel__input"
            type="number"
            min={1}
            max={MAX_ROWS}
            value={rows}
            onChange={(event) => {
              const next = Number(event.target.value)
              if (Number.isFinite(next) && next >= 1) onRowsChange(next)
            }}
          />
        </label>

        <label className="layout-panel__field">
          <span className="layout-panel__label">Bleed (mm)</span>
          <input
            className="layout-panel__input"
            type="number"
            min={0}
            max={MAX_BLEED_MM}
            step={0.1}
            value={bleedMm}
            onChange={(event) => {
              const next = Number(event.target.value)
              if (Number.isFinite(next) && next >= 0) onBleedMmChange(next)
            }}
          />
        </label>
        <p className="layout-panel__hint">
          Extra black border outside the card (0–{MAX_BLEED_MM} mm). Does not
          shrink the art.
        </p>

        <p className="layout-panel__hint">
          {columns} × {rows} cards on {pageSize}
        </p>
        <p className="layout-panel__hint">
          Card size: {CARD_WIDTH_MM}×{CARD_HEIGHT_MM} mm (MTG)
        </p>
        <p className="layout-panel__hint">
          Max grid at true size: {MAX_COLUMNS}×{MAX_ROWS}
        </p>

        <button
          type="button"
          className="layout-panel__print"
          onClick={onPrint}
        >
          Print
        </button>
      </div>
    </section>
  )
}

export default LayoutPanel
