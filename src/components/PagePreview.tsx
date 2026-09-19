import { useEffect, useRef, useState } from 'react'
import {
  CARD_HEIGHT_MM,
  CARD_WIDTH_MM,
  PAGE_GAP_MM,
} from '../dimensions'
import type { CardData } from '../cardData'
import { isPrintableCard } from '../cardData'
import {
  formatCardDate,
  parseDateInput,
  SEASONS,
} from '../seasons'
import Card from './Card'
import './PagePreview.css'

const ZOOM_MIN = 0.25
const ZOOM_MAX = 3
const ZOOM_STEP = 0.1

type PagePreviewProps = {
  cards: CardData[]
  columns: number
  rows: number
  selectedId: string | null
  onSelect: (id: string) => void
  /** When true, only render printable cards packed into pages */
  printMode?: boolean
  /** Extra black border bleed in mm */
  bleedMm?: number
}

function cardToProps(card: CardData) {
  const parsed = parseDateInput(card.birthDate)
  return {
    imageUrl: card.imageUrl,
    birthDateLabel: parsed ? formatCardDate(parsed) : null,
    season: card.seasonId ? SEASONS[card.seasonId] : null,
    seasonColor: card.seasonColor,
    seasonIcon: card.seasonIcon,
    seasonIconImage: card.seasonIconImage,
    showSeasonDiamond: card.showSeasonDiamond,
    seasonIconSize: card.seasonIconSize,
    showBottomShadow: card.showBottomShadow,
    countryCode: card.countryCode,
    frameId: card.frameId,
    name: card.name,
    subname: card.subname,
    cardSet: card.cardSet,
    breed: card.breed,
    sex: card.sex,
    brightness: card.brightness,
    saturation: card.saturation,
    contrast: card.contrast,
  }
}

function pageStyle(
  columns: number,
  rows: number,
  bleedMm: number,
): React.CSSProperties {
  return {
    '--page-cols': columns,
    '--page-rows': rows,
    '--page-gap': `${PAGE_GAP_MM}mm`,
    '--card-w': `${CARD_WIDTH_MM}mm`,
    '--card-h': `${CARD_HEIGHT_MM}mm`,
    '--card-bleed': `${bleedMm}mm`,
  } as React.CSSProperties
}

function clampZoom(value: number) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value))
}

function PageSheet({
  cards,
  columns,
  rows,
  selectedId,
  onSelect,
  interactive,
  bleedMm,
}: {
  cards: CardData[]
  columns: number
  rows: number
  selectedId: string | null
  onSelect: (id: string) => void
  interactive: boolean
  bleedMm: number
}) {
  return (
    <div className="page-sheet" style={pageStyle(columns, rows, bleedMm)}>
      <div className="page-sheet__grid">
        {cards.map((card, index) => {
          const selected = card.id === selectedId
          const inner = (
            <div className="page-sheet__card-host">
              <Card {...cardToProps(card)} />
            </div>
          )

          if (!interactive) {
            return (
              <div key={card.id} className="page-sheet__slot">
                {inner}
              </div>
            )
          }

          return (
            <button
              key={card.id}
              type="button"
              className={`page-sheet__slot${selected ? ' page-sheet__slot--selected' : ''}${card.imageUrl ? '' : ' page-sheet__slot--empty'}`}
              onClick={() => onSelect(card.id)}
              aria-label={`Card ${index + 1}${selected ? ', selected' : ''}`}
              aria-pressed={selected}
            >
              {inner}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Fits the true-size A4 sheet to the viewport, then multiplies by user zoom.
 * Print is unaffected (separate printMode tree).
 */
function ZoomStage({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [fitScale, setFitScale] = useState(1)
  /** 1 = fit-to-view; user can zoom relative to that */
  const [userZoom, setUserZoom] = useState(1)

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef.current
    if (!viewport || !content) return

    const update = () => {
      const sw = content.offsetWidth
      const sh = content.offsetHeight
      if (sw <= 0 || sh <= 0) return
      const pad = 16
      const scale = Math.min(
        (viewport.clientWidth - pad) / sw,
        (viewport.clientHeight - pad) / sh,
        1,
      )
      const safe = Number.isFinite(scale) && scale > 0 ? scale : 1
      setFitScale(safe)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(viewport)
    ro.observe(content)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const scale = fitScale * userZoom
  const contentW = contentRef.current?.offsetWidth ?? 0
  const contentH = contentRef.current?.offsetHeight ?? 0
  const stageW = contentW * scale
  const stageH = contentH * scale
  const zoomPercent = Math.round(userZoom * 100)

  return (
    <div className="page-preview-root">
      <div className="page-zoom" role="toolbar" aria-label="Preview zoom">
        <button
          type="button"
          className="page-zoom__btn"
          onClick={() => setUserZoom((z) => clampZoom(z - ZOOM_STEP))}
          disabled={userZoom <= ZOOM_MIN}
          aria-label="Zoom out"
        >
          −
        </button>
        <input
          className="page-zoom__slider"
          type="range"
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          step={ZOOM_STEP}
          value={userZoom}
          onChange={(event) => setUserZoom(clampZoom(Number(event.target.value)))}
          aria-label="Zoom level"
        />
        <button
          type="button"
          className="page-zoom__btn"
          onClick={() => setUserZoom((z) => clampZoom(z + ZOOM_STEP))}
          disabled={userZoom >= ZOOM_MAX}
          aria-label="Zoom in"
        >
          +
        </button>
        <span className="page-zoom__label" aria-live="polite">
          {zoomPercent}%
        </span>
        <button
          type="button"
          className="page-zoom__btn page-zoom__btn--text"
          onClick={() => setUserZoom(1)}
          title="Fit page in view"
        >
          Fit
        </button>
        <button
          type="button"
          className="page-zoom__btn page-zoom__btn--text"
          onClick={() => {
            // 100% of true size relative to fit baseline:
            // userZoom such that fitScale * userZoom = 1 → userZoom = 1/fitScale
            if (fitScale > 0) setUserZoom(clampZoom(1 / fitScale))
          }}
          title="Actual size (100% of print size)"
        >
          100%
        </button>
      </div>

      <div className="page-preview" ref={viewportRef}>
        <div
          className="page-preview__stage"
          style={{
            width: stageW || undefined,
            height: stageH || undefined,
          }}
        >
          <div
            ref={contentRef}
            className="page-preview__scale"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function PagePreview({
  cards,
  columns,
  rows,
  selectedId,
  onSelect,
  printMode = false,
  bleedMm = 0,
}: PagePreviewProps) {
  const slotsPerPage = columns * rows

  if (printMode) {
    const printable = cards.filter(isPrintableCard)
    const pages: CardData[][] = []
    for (let i = 0; i < printable.length; i += slotsPerPage) {
      pages.push(printable.slice(i, i + slotsPerPage))
    }
    if (pages.length === 0) {
      return (
        <div className="page-preview page-preview--print">
          <p className="page-preview__empty-print">
            No cards with pictures to print.
          </p>
        </div>
      )
    }

    return (
      <div className="page-preview page-preview--print">
        {pages.map((pageCards, pageIndex) => (
          <PageSheet
            key={`print-page-${pageIndex}`}
            cards={pageCards}
            columns={columns}
            rows={rows}
            selectedId={null}
            onSelect={() => {}}
            interactive={false}
            bleedMm={bleedMm}
          />
        ))}
      </div>
    )
  }

  return (
    <ZoomStage>
      <PageSheet
        cards={cards}
        columns={columns}
        rows={rows}
        selectedId={selectedId}
        onSelect={onSelect}
        interactive
        bleedMm={bleedMm}
      />
    </ZoomStage>
  )
}

export default PagePreview
