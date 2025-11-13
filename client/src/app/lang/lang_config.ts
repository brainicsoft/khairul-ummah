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
    { title: 'Arabic', name: 'ar' }
  ],
  defaultLanguage: 'bn'
}