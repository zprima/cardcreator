export const ICONS = {
  flower: 'Flower',
  sun: 'Sun',
  leaf: 'Leaf',
  snowflake: 'Snowflake',
  wings: 'Wings',
  heart: 'Heart',
  star: 'Star',
  paw: 'Paw',
} as const

export type IconId = keyof typeof ICONS
