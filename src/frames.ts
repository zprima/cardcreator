export type FrameId = 'l' | 'full'

export type FrameOption = {
  id: FrameId
  label: string
  description: string
}

export const FRAMES: FrameOption[] = [
  {
    id: 'l',
    label: 'L corners',
    description: 'Classic L brackets at each corner',
  },
  {
    id: 'full',
    label: 'Full border',
    description: 'Continuous inset frame around the card',
  },
]

export const DEFAULT_FRAME_ID: FrameId = 'l'

export function isFrameId(value: string): value is FrameId {
  return FRAMES.some((frame) => frame.id === value)
}
