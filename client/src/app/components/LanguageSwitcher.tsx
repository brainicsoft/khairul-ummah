'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const COOKIE_NAME = 'googtrans'

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<string>('bn')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Get current language from cookie
    const cookieValue = Cookies.get(COOKIE_NAME)
    let languageValue = 'bn' // default

    if (cookieValue) {
      const parts = cookieValue.split('/')
      if (parts.length > 2) {
        languageValue = parts[2]
      }
    }

    setCurrentLanguage(languageValue)
    setIsInitialized(true)
  }, [])

  const switchLanguage = (lang: string) => {
    if (!isInitialized) return

    // Set the Google Translate cookie
    Cookies.set(COOKIE_NAME, `/auto/${lang}`, { 
      path: '/',
      expires: 365 // 1 year
    })

    setCurrentLanguage(lang)

    // Force Google Translate to change language
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
    if (select) {
      select.value = lang
      select.dispatchEvent(new Event('change'))
    } else {
      // If select not found, reload the page
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'bn' ? 'en' : 'bn'
    switchLanguage(newLang)
  }

  if (!isInitialized) {
    return (
      <button className="px-4 py-2 border border-primary text-primary rounded-lg opacity-50">
        Loading...
      </button>
    )
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 text-sm font-semibold border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition whitespace-nowrap"
    >
      {currentLanguage === 'bn' ? 'English' : 'বাংলা'}
    </button>
  )
}