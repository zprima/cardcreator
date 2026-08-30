export const ART_ADJUST_MIN = 0
export const ART_ADJUST_MAX = 200
export const ART_ADJUST_DEFAULT = 100

export type ArtAdjust = {
  brightness: number
  saturation: number
  contrast: number
}

export function defaultArtAdjust(): ArtAdjust {
  return {
    brightness: ART_ADJUST_DEFAULT,
    saturation: ART_ADJUST_DEFAULT,
    contrast: ART_ADJUST_DEFAULT,
  }
}

export function clampArtAdjust(value: number): number {
  if (!Number.isFinite(value)) return ART_ADJUST_DEFAULT
  return Math.min(ART_ADJUST_MAX, Math.max(ART_ADJUST_MIN, Math.round(value)))
}

export function artFilterCss(adjust: ArtAdjust): string {
  const brightness = clampArtAdjust(adjust.brightness) / 100
  const saturation = clampArtAdjust(adjust.saturation) / 100
  const contrast = clampArtAdjust(adjust.contrast) / 100
  return `brightness(${brightness}) saturate(${saturation}) contrast(${contrast})`
}
