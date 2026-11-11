import { Platform } from 'react-native';

export type ArabicFontKey = 'uthmanic' | 'lpmq' | 'scheherazade' | 'amiri';

export interface ArabicFontOption {
  key: ArabicFontKey;
  label: string;
  description: string;
  previewSample: string;
  regularFamily: string;
  boldFamily: string;
  webFallbackStack: string;
}

export const DEFAULT_ARABIC_FONT: ArabicFontKey = 'uthmanic';

export const ARABIC_FONT_OPTIONS: ArabicFontOption[] = [
  {
    key: 'uthmanic',
    label: 'Utsmani Madinah',
    description: 'KFGQPC HAFS',
    previewSample: 'الصَّلَوَاتُ الْفَاتِحُ',
    regularFamily: 'UthmanicHafs',
    boldFamily: 'UthmanicHafs',
    webFallbackStack: '"UthmanicHafs", "Amiri-Regular", "ScheherazadeNew-Regular", serif',
  },
  {
    key: 'lpmq',
    label: 'LPMQ Kemenag',
    description: 'Isep Misbah (Mushaf RI)',
    previewSample: 'الصَّلَوَاتُ الْفَاتِحُ',
    regularFamily: 'LPMQ-IsepMisbah',
    boldFamily: 'LPMQ-IsepMisbah',
    webFallbackStack: '"LPMQ-IsepMisbah", "UthmanicHafs", "Amiri-Regular", serif',
  },
  {
    key: 'scheherazade',
    label: 'Scheherazade',
    description: 'Naskh Klasik',
    previewSample: 'الصَّلَوَاتُ الْفَاتِحُ',
    regularFamily: 'ScheherazadeNew-Regular',
    boldFamily: 'ScheherazadeNew-Bold',
    webFallbackStack: '"ScheherazadeNew-Regular", "Amiri-Regular", serif',
  },
  {
    key: 'amiri',
    label: 'Amiri',
    description: 'Kitab Klasik',
    previewSample: 'الصَّلَوَاتُ الْفَاتِحُ',
    regularFamily: 'Amiri-Regular',
    boldFamily: 'Amiri-Bold',
    webFallbackStack: '"Amiri-Regular", "ScheherazadeNew-Regular", serif',
  },
];

const FONT_MAP = Object.fromEntries(
  ARABIC_FONT_OPTIONS.map((item) => [item.key, item])
) as Record<ArabicFontKey, ArabicFontOption>;

export function isArabicFontKey(value: unknown): value is ArabicFontKey {
  return value === 'uthmanic' || value === 'lpmq' || value === 'scheherazade' || value === 'amiri';
}

/** Resolves the selected Arabic font family across native and web platforms. */
export function getArabicFontFamily(
  fontKey: ArabicFontKey,
  weight: 'regular' | 'bold' = 'regular'
): string {
  const option = FONT_MAP[fontKey] ?? FONT_MAP[DEFAULT_ARABIC_FONT];
  const primaryFamily = weight === 'bold' ? option.boldFamily : option.regularFamily;
  if (Platform.OS === 'web') {
    if (weight === 'bold' && primaryFamily !== option.regularFamily) {
      return `"${primaryFamily}", ${option.webFallbackStack}`;
    }
    return option.webFallbackStack;
  }
  return primaryFamily;
}

