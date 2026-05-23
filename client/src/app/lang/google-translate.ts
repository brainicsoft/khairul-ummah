import Cookies from 'js-cookie'
import { translationConfig, type LanguageCode } from './lang_config'

const COOKIE_NAME = 'googtrans'
const PAGE_LANG = translationConfig.defaultLanguage

export function parseLanguageFromCookie(): LanguageCode {
  const cookieValue = Cookies.get(COOKIE_NAME)
  if (!cookieValue) return PAGE_LANG

  const parts = cookieValue.split('/').filter(Boolean)
  const target = parts[parts.length - 1]

  if (!target || target === PAGE_LANG) return PAGE_LANG

  const supported = translationConfig.languages.map((l) => l.name) as string[]
  if (supported.includes(target)) return target as LanguageCode

  return PAGE_LANG
}

export function setGoogleTranslateLanguage(lang: LanguageCode): void {
  const isDefault = lang === PAGE_LANG

  if (isDefault) {
    Cookies.remove(COOKIE_NAME, { path: '/' })
    document.cookie = `${COOKIE_NAME}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`
  } else {
    const cookieValue = `/${PAGE_LANG}/${lang}`
    Cookies.set(COOKIE_NAME, cookieValue, { path: '/' })
    document.cookie = `${COOKIE_NAME}=${cookieValue};path=/`
  }
}

export function triggerGoogleTranslateSelect(lang: LanguageCode): boolean {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!select) return false

  select.value = lang === PAGE_LANG ? '' : lang
  select.dispatchEvent(new Event('change', { bubbles: true }))
  return true
}

export function waitForGoogleTranslateCombo(
  maxAttempts = 40,
  intervalMs = 250
): Promise<HTMLSelectElement | null> {
  return new Promise((resolve) => {
    let attempts = 0

    const check = () => {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
      if (select) {
        resolve(select)
        return
      }

      attempts += 1
      if (attempts >= maxAttempts) {
        resolve(null)
        return
      }

      setTimeout(check, intervalMs)
    }

    check()
  })
}
