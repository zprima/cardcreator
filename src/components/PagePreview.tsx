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

type PagePreviewProps = {
  cards: CardData[]
  columns: number
  rows: number
  selectedId: string | null
  onSelect: (id: string) => void
  /** When true, only render printable cards packed into pages */
  printMode?: boolean
}

function cardToProps(card: CardData) {
  const parsed = parseDateInput(card.birthDate)
  return {
    imageUrl: card.imageUrl,
    birthDateLabel: parsed ? formatCardDate(parsed) : null,
    season: card.seasonId ? SEASONS[card.seasonId] : null,
    name: card.name,
    subname: card.subname,
    cardSet: card.cardSet,
    breed: card.breed,
    sex: card.sex,
  }
}

function pageStyle(columns: number, rows: number): React.CSSProperties {
  return {
    '--page-cols': columns,
    '--page-rows': rows,
    '--page-gap': `${PAGE_GAP_MM}mm`,
    '--card-w': `${CARD_WIDTH_MM}mm`,
    '--card-h': `${CARD_HEIGHT_MM}mm`,
  } as React.CSSProperties
}

function PageSheet({
  cards,
  columns,
  rows,
  selectedId,
  onSelect,
  interactive,
}: {
  cards: CardData[]
  columns: number
  rows: number
  selectedId: string | null
  onSelect: (id: string) => void
  interactive: boolean
}) {
  return (
    <div className="page-sheet" style={pageStyle(columns, rows)}>
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

/** Scales the true-size A4 sheet uniformly so preview matches print proportions. */
function FitStage({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState({ scale: 1, width: 0, height: 0 })

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
      setFit({ scale: safe, width: sw * safe, height: sh * safe })
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

  return (
    <div className="page-preview" ref={viewportRef}>
      <div
        className="page-preview__stage"
        style={{ width: fit.width || undefined, height: fit.height || undefined }}
      >
        <div
          ref={contentRef}
          className="page-preview__scale"
          style={{
            transform: `scale(${fit.scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
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
          />
        ))}
      </div>
    )
  }

  return (
    <FitStage>
      <PageSheet
        cards={cards}
        columns={columns}
        rows={rows}
        selectedId={selectedId}
        onSelect={onSelect}
        interactive
      />
    </FitStage>
  )
}

export default PagePreview
