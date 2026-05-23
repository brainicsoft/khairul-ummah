'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import {
  SUPPORTED_LANGUAGES,
  translationConfig,
  type LanguageCode,
} from '../lang/lang_config'
import {
  parseLanguageFromCookie,
  setGoogleTranslateLanguage,
  triggerGoogleTranslateSelect,
  waitForGoogleTranslateCombo,
} from '../lang/google-translate'

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    translationConfig.defaultLanguage
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentLanguage(parseLanguageFromCookie())

    waitForGoogleTranslateCombo().then((select) => {
      if (select) {
        const fromSelect = select.value || translationConfig.defaultLanguage
        setCurrentLanguage(fromSelect as LanguageCode)
      }
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = useCallback(async (lang: LanguageCode) => {
    if (lang === currentLanguage) {
      setIsOpen(false)
      return
    }

    setGoogleTranslateLanguage(lang)
    setCurrentLanguage(lang)
    setIsOpen(false)

    const applied = triggerGoogleTranslateSelect(lang)
    if (!applied) {
      window.location.reload()
    }
  }, [currentLanguage])

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ?? SUPPORTED_LANGUAGES[0]

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={!isReady}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 transition text-sm font-semibold disabled:opacity-60"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="ভাষা পরিবর্তন"
      >
        <span className="text-lg leading-none" aria-hidden>
          {currentLang.flag}
        </span>
        <span className="hidden sm:inline max-w-[5rem] truncate">{currentLang.name}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-[180px] bg-white border border-border rounded-lg shadow-lg z-[60] py-1 overflow-hidden"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = currentLanguage === lang.code
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => switchLanguage(lang.code)}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-xl leading-none" aria-hidden>
                    {lang.flag}
                  </span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {isActive && <Check className="w-4 h-4 shrink-0" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
