/** Official Magic: The Gathering / poker card size */
export const CARD_WIDTH_MM = 63
export const CARD_HEIGHT_MM = 88

/** ISO A4 */
export const PAGE_WIDTH_MM = 210
export const PAGE_HEIGHT_MM = 297

/** Gap between cards on the page */
export const PAGE_GAP_MM = 2

/** Base black card border (inside the 63×88 mm trim) */
export const CARD_BORDER_BASE_MM = 0.4

/** Default extra bleed added outside the trim */
export const DEFAULT_BLEED_MM = 1

/** Max outward bleed that still fits a 3×3 grid on A4 with gaps */
export const MAX_BLEED_MM = 2

/**
 * Largest grid that fits true-size MTG cards on A4 with gap.
 * width:  3×63 + 2×2 = 193mm  (< 210)
 * height: 3×88 + 2×2 = 268mm  (< 297)
 */
export const MAX_COLUMNS = 3
export const MAX_ROWS = 3
