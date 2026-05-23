declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__?: {
      languages: { name: string; title: string }[]
      defaultLanguage: string
    }
    googleTranslateElementInit?: () => void
  }
}

/** Site default: original page language (Bangla). Not translated. */
export const DEFAULT_LANGUAGE = 'bn' as const

export type LanguageCode = typeof DEFAULT_LANGUAGE | 'en' | 'ar'

export const SUPPORTED_LANGUAGES: {
  code: LanguageCode
  name: string
  flag: string
  isDefault?: boolean
}[] = [
  { code: DEFAULT_LANGUAGE, name: 'বাংলা', flag: '🇧🇩', isDefault: true },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export const translationConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  languages: [
    { title: 'Bangla', name: DEFAULT_LANGUAGE },
    { title: 'English', name: 'en' },
    { title: 'Arabic', name: 'ar' },
  ],
}
