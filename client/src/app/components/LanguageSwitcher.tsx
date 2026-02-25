'use client'

import { useEffect, useState, useRef } from 'react'
import Cookies from 'js-cookie'

const COOKIE_NAME = 'googtrans'

const LANGUAGES = [
  { code: 'bn', label: 'বাং', name: 'বাংলা' },
  { code: 'en', label: 'EN', name: 'English' },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<string>('bn')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get current language from cookie on mount
  useEffect(() => {
    const cookieValue = Cookies.get(COOKIE_NAME)
    if (cookieValue) {
      const parts = cookieValue.split('/')
      if (parts.length > 2) {
        setCurrentLanguage(parts[2])
      }
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (lang: string) => {
    if (lang === currentLanguage) {
      setIsOpen(false)
      return
    }

    // Set cookies for Google Translate (both root and domain-level)
    Cookies.set(COOKIE_NAME, `/auto/${lang}`, { path: '/' })
    // Also set without domain for compatibility
    document.cookie = `${COOKIE_NAME}=/auto/${lang};path=/`

    setCurrentLanguage(lang)
    setIsOpen(false)

    // Try to trigger via Google Translate select element
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
    if (select) {
      select.value = lang
      select.dispatchEvent(new Event('change', { bubbles: true }))
    } else {
      // Reload as fallback if Google Translate widget not ready
      setTimeout(() => window.location.reload(), 100)
    }
  }

  const currentLang = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0]

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-1">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`px-3 py-1.5 cursor-pointer text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              currentLanguage === lang.code
                ? 'bg-primary text-white'
                : 'border border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}