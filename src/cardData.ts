import type { SeasonId } from './seasons'

export type CardData = {
  id: string
  name: string
  subname: string
  breed: string
  sex: string
  birthDate: string
  cardSet: string
  seasonId: SeasonId | null
  imageUrl: string | null
  imageName: string | null
}

let cardIdCounter = 0

export function createEmptyCard(): CardData {
  cardIdCounter += 1
  return {
    id: `card-${cardIdCounter}-${Date.now()}`,
    name: '',
    subname: '',
    breed: '',
    sex: '',
    birthDate: '',
    cardSet: '',
    seasonId: null,
    imageUrl: null,
    imageName: null,
  }
}

export function createCardGrid(count: number): CardData[] {
  return Array.from({ length: count }, () => createEmptyCard())
}

export function resizeCardGrid(
  cards: CardData[],
  count: number,
): CardData[] {
  if (cards.length === count) return cards
  if (cards.length > count) {
    const kept = cards.slice(0, count)
    const removed = cards.slice(count)
    for (const card of removed) {
      if (card.imageUrl) URL.revokeObjectURL(card.imageUrl)
    }
    return kept
  }
  return [...cards, ...createCardGrid(count - cards.length)]
}

export function isPrintableCard(card: CardData): boolean {
  return Boolean(card.imageUrl)
}
