'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { ChevronDown, Check, Languages } from 'lucide-react'
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../lang/lang_config'
import {
  applyLanguageChange,
  parseLanguageFromCookie,
  waitForGoogleTranslateCombo,
} from '../lang/google-translate'

type LanguageSwitcherProps = {
  /** Use on primary-colored top bar */
  tone?: 'light' | 'default'
}

export function LanguageSwitcher({ tone = 'default' }: LanguageSwitcherProps) {
  const isLight = tone === 'light'
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE)
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentLanguage(parseLanguageFromCookie())

    waitForGoogleTranslateCombo().then((select) => {
      if (select) {
        const fromSelect = select.value || DEFAULT_LANGUAGE
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

  const switchLanguage = useCallback(
    (lang: LanguageCode) => {
      if (lang === currentLanguage) {
        setIsOpen(false)
        return
      }
      setIsOpen(false)
      setCurrentLanguage(lang)
      applyLanguageChange(lang)
    },
    [currentLanguage]
  )

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ?? SUPPORTED_LANGUAGES[0]

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={!isReady}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="ভাষা পরিবর্তন"
        className={
          isLight
            ? `flex items-center gap-2 rounded-lg border-2 border-white bg-white px-3 py-2 text-sm font-bold text-primary shadow-md transition hover:bg-white/95 disabled:opacity-60`
            : `flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/5 px-3 py-2 text-sm font-bold text-primary transition hover:bg-primary/10 disabled:opacity-60`
        }
      >
        <Languages className="h-4 w-4 shrink-0" aria-hidden />
        <span className="text-lg leading-none" aria-hidden>
          {currentLang.flag}
        </span>
        <span className="whitespace-nowrap">{currentLang.name}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-[70] mt-2 min-w-[200px] overflow-hidden rounded-xl border border-border bg-white py-1 shadow-xl"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = currentLanguage === lang.code
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => switchLanguage(lang.code)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition ${
                    isActive
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-xl leading-none" aria-hidden>
                    {lang.flag}
                  </span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {isActive && <Check className="h-4 w-4 shrink-0 text-primary" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
