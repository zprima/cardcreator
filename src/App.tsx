import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearCard,
  createCardGrid,
  duplicateCardData,
  resizeCardGrid,
  type CardData,
} from './cardData'
import Controls from './components/Controls'
import LayoutPanel from './components/LayoutPanel'
import PagePreview from './components/PagePreview'
import { MAX_COLUMNS, MAX_ROWS } from './dimensions'
import type { SeasonId } from './seasons'
import './App.css'

const PAGE_SIZE = 'A4'
const DEFAULT_COLUMNS = 3
const DEFAULT_ROWS = 3

function App() {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS)
  const [rows, setRows] = useState(DEFAULT_ROWS)
  const [cards, setCards] = useState<CardData[]>(() =>
    createCardGrid(DEFAULT_COLUMNS * DEFAULT_ROWS),
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Keep selection valid when cards array changes
  useEffect(() => {
    if (cards.length === 0) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !cards.some((c) => c.id === selectedId)) {
      setSelectedId(cards[0].id)
    }
  }, [cards, selectedId])

  const selectedCard = useMemo(
    () => cards.find((c) => c.id === selectedId) ?? null,
    [cards, selectedId],
  )

  const updateSelected = useCallback(
    (patch: Partial<CardData> | ((card: CardData) => CardData)) => {
      if (!selectedId) return
      setCards((prev) =>
        prev.map((card) => {
          if (card.id !== selectedId) return card
          return typeof patch === 'function' ? patch(card) : { ...card, ...patch }
        }),
      )
    },
    [selectedId],
  )

  const handleColumnsChange = (next: number) => {
    const cols = Math.min(MAX_COLUMNS, Math.max(1, Math.floor(next)))
    setColumns(cols)
    setCards((prev) => resizeCardGrid(prev, cols * rows))
  }

  const handleRowsChange = (next: number) => {
    const r = Math.min(MAX_ROWS, Math.max(1, Math.floor(next)))
    setRows(r)
    setCards((prev) => resizeCardGrid(prev, columns * r))
  }

  const handleImageChange = (file: File | null) => {
    updateSelected((card) => {
      if (card.imageUrl) URL.revokeObjectURL(card.imageUrl)
      if (!file) {
        return { ...card, imageUrl: null, imageName: null }
      }
      return {
        ...card,
        imageUrl: URL.createObjectURL(file),
        imageName: file.name,
      }
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleClearCard = () => {
    updateSelected((card) => clearCard(card))
  }

  const handleDuplicateFrom = (sourceId: string) => {
    if (!selectedId || sourceId === selectedId) return
    const source = cards.find((c) => c.id === sourceId)
    if (!source) return
    updateSelected((card) => duplicateCardData(card, source))
  }

  const duplicateSources = useMemo(
    () =>
      cards
        .map((card, index) => ({
          id: card.id,
          label: card.name.trim()
            ? `Card ${index + 1} — ${card.name.trim()}`
            : `Card ${index + 1}`,
        }))
        .filter((item) => item.id !== selectedId),
    [cards, selectedId],
  )

  return (
    <main className="app">
      <aside className="app__layout" aria-label="Layout settings">
        <LayoutPanel
          pageSize={PAGE_SIZE}
          columns={columns}
          rows={rows}
          onColumnsChange={handleColumnsChange}
          onRowsChange={handleRowsChange}
          onPrint={handlePrint}
        />
      </aside>

      <section className="app__preview" aria-label="Page preview">
        <PagePreview
          cards={cards}
          columns={columns}
          rows={rows}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        {/* Print-only sheets: cards with pictures only */}
        <PagePreview
          cards={cards}
          columns={columns}
          rows={rows}
          selectedId={null}
          onSelect={() => {}}
          printMode
        />
      </section>

      <section className="app__controls" aria-label="Card controls">
        {selectedCard ? (
          <Controls
            selectedIndex={
              cards.findIndex((c) => c.id === selectedCard.id) + 1
            }
            totalCards={cards.length}
            fileName={selectedCard.imageName}
            onImageChange={handleImageChange}
            birthDate={selectedCard.birthDate}
            onBirthDateChange={(birthDate) => updateSelected({ birthDate })}
            seasonId={selectedCard.seasonId}
            onSeasonChange={(seasonId: SeasonId) =>
              updateSelected({ seasonId })
            }
            countryCode={selectedCard.countryCode ?? ''}
            onCountryChange={(code) =>
              updateSelected({ countryCode: code || null })
            }
            sex={selectedCard.sex}
            onSexChange={(sex) => updateSelected({ sex })}
            breed={selectedCard.breed}
            onBreedChange={(breed) => updateSelected({ breed })}
            name={selectedCard.name}
            onNameChange={(name) => updateSelected({ name })}
            subname={selectedCard.subname}
            onSubnameChange={(subname) => updateSelected({ subname })}
            cardSet={selectedCard.cardSet}
            onCardSetChange={(cardSet) => updateSelected({ cardSet })}
            onClear={handleClearCard}
            duplicateSources={duplicateSources}
            onDuplicateFrom={handleDuplicateFrom}
          />
        ) : (
          <div className="app__controls-empty">Select a card to edit</div>
        )}
      </section>
    </main>
  )
}

export default App
