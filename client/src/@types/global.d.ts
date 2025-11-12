export {} 

declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__?: {
      languages: { title: string; name: string }[]
      defaultLanguage: string
    }
    google?: any
    googleTranslateElementInit?: () => void
  }
}
