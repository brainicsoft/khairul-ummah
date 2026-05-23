declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__?: {
      languages: { name: string; title: string }[]
      defaultLanguage: string
    }
    googleTranslateElementInit?: () => void
  }
}

export const translationConfig = {
  languages: [
    { title: 'English', name: 'en' },
    { title: 'Bangla', name: 'bn' },
    { title: 'Arabic', name: 'ar' },
  ],
  defaultLanguage: 'bn',
}

export const SUPPORTED_LANGUAGES = [
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']
