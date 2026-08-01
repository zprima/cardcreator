import {
  formatCardDate,
  parseDateInput,
  SEASONS,
} from '../seasons'
import type { CardData } from '../cardData'
import { isPrintableCard } from '../cardData'
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
          <div
            key={`print-page-${pageIndex}`}
            className="page-sheet"
            style={
              {
                '--page-cols': columns,
                '--page-rows': rows,
              } as React.CSSProperties
            }
          >
            <div className="page-sheet__grid">
              {pageCards.map((card) => (
                <div key={card.id} className="page-sheet__slot">
                  <div className="page-sheet__card-scale">
                    <Card {...cardToProps(card)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="page-preview">
      <div
        className="page-sheet"
        style={
          {
            '--page-cols': columns,
            '--page-rows': rows,
          } as React.CSSProperties
        }
      >
        <div className="page-sheet__grid">
          {cards.map((card, index) => {
            const selected = card.id === selectedId
            return (
              <button
                key={card.id}
                type="button"
                className={`page-sheet__slot${selected ? ' page-sheet__slot--selected' : ''}${card.imageUrl ? '' : ' page-sheet__slot--empty'}`}
                onClick={() => onSelect(card.id)}
                aria-label={`Card ${index + 1}${selected ? ', selected' : ''}`}
                aria-pressed={selected}
              >
                <div className="page-sheet__card-scale">
                  <Card {...cardToProps(card)} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PagePreview
