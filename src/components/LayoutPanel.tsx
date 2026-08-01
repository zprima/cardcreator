import './LayoutPanel.css'

type LayoutPanelProps = {
  pageSize: string
  columns: number
  rows: number
  onColumnsChange: (columns: number) => void
  onRowsChange: (rows: number) => void
  onPrint: () => void
}

function LayoutPanel({
  pageSize,
  columns,
  rows,
  onColumnsChange,
  onRowsChange,
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
            max={6}
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
            max={6}
            value={rows}
            onChange={(event) => {
              const next = Number(event.target.value)
              if (Number.isFinite(next) && next >= 1) onRowsChange(next)
            }}
          />
        </label>

        <p className="layout-panel__hint">
          {columns} × {rows} cards on {pageSize}
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
