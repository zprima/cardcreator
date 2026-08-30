import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ART_ADJUST_DEFAULT } from './artAdjust.ts'
import {
  clearCard,
  createEmptyCard,
  duplicateCardData,
} from './cardData.ts'

test('createEmptyCard starts art adjustments at 100%', () => {
  const card = createEmptyCard()
  assert.equal(card.brightness, ART_ADJUST_DEFAULT)
  assert.equal(card.saturation, ART_ADJUST_DEFAULT)
  assert.equal(card.contrast, ART_ADJUST_DEFAULT)
})

test('clearCard resets art adjustments to 100%', () => {
  const card = {
    ...createEmptyCard(),
    brightness: 80,
    saturation: 140,
    contrast: 60,
  }
  const cleared = clearCard(card)
  assert.equal(cleared.brightness, ART_ADJUST_DEFAULT)
  assert.equal(cleared.saturation, ART_ADJUST_DEFAULT)
  assert.equal(cleared.contrast, ART_ADJUST_DEFAULT)
})

test('duplicateCardData does not copy art adjustments', () => {
  const target = {
    ...createEmptyCard(),
    brightness: 90,
    saturation: 90,
    contrast: 90,
  }
  const source = {
    ...createEmptyCard(),
    name: 'Blisk',
    brightness: 40,
    saturation: 160,
    contrast: 120,
  }
  const copied = duplicateCardData(target, source)
  assert.equal(copied.name, 'Blisk')
  assert.equal(copied.brightness, 90)
  assert.equal(copied.saturation, 90)
  assert.equal(copied.contrast, 90)
})
