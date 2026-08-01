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
  countryCode: string | null
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
    countryCode: null,
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

/** Reset card fields while keeping its id/slot. Revokes any image URL. */
export function clearCard(card: CardData): CardData {
  if (card.imageUrl) URL.revokeObjectURL(card.imageUrl)
  return {
    id: card.id,
    name: '',
    subname: '',
    breed: '',
    sex: '',
    birthDate: '',
    cardSet: '',
    seasonId: null,
    countryCode: null,
    imageUrl: null,
    imageName: null,
  }
}

/**
 * Copy text/metadata fields from source onto target.
 * Keeps target id and does not copy image (imageUrl / imageName).
 */
export function duplicateCardData(
  target: CardData,
  source: CardData,
): CardData {
  return {
    ...target,
    name: source.name,
    subname: source.subname,
    breed: source.breed,
    sex: source.sex,
    birthDate: source.birthDate,
    cardSet: source.cardSet,
    seasonId: source.seasonId,
    countryCode: source.countryCode,
    // imageUrl + imageName intentionally left on target
  }
}
