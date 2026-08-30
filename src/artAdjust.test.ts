import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  ART_ADJUST_DEFAULT,
  ART_ADJUST_MAX,
  ART_ADJUST_MIN,
  artFilterCss,
  clampArtAdjust,
  defaultArtAdjust,
} from './artAdjust.ts'

test('default art adjust is 100% for brightness, saturation, and contrast', () => {
  assert.deepEqual(defaultArtAdjust(), {
    brightness: 100,
    saturation: 100,
    contrast: 100,
  })
})

test('artFilterCss maps percents to CSS filter multipliers', () => {
  assert.equal(
    artFilterCss({ brightness: 100, saturation: 100, contrast: 100 }),
    'brightness(1) saturate(1) contrast(1)',
  )
  assert.equal(
    artFilterCss({ brightness: 80, saturation: 150, contrast: 110 }),
    'brightness(0.8) saturate(1.5) contrast(1.1)',
  )
})

test('clampArtAdjust keeps values in 0–200 and rounds', () => {
  assert.equal(clampArtAdjust(100), 100)
  assert.equal(clampArtAdjust(-10), ART_ADJUST_MIN)
  assert.equal(clampArtAdjust(999), ART_ADJUST_MAX)
  assert.equal(clampArtAdjust(80.6), 81)
  assert.equal(clampArtAdjust(Number.NaN), ART_ADJUST_DEFAULT)
})
