export type FrameId = 'l' | 'full' | 'none'

export type FrameOption = {
  id: FrameId
  label: string
  description: string
}

export const FRAMES: FrameOption[] = [
  {
    id: 'none',
    label: 'None',
    description: 'No inset frame',
  },
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
