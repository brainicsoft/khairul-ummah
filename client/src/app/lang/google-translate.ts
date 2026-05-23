import Cookies from 'js-cookie'
import { DEFAULT_LANGUAGE, translationConfig, type LanguageCode } from './lang_config'

const COOKIE_NAME = 'googtrans'
const PAGE_LANG = DEFAULT_LANGUAGE

/** Read googtrans from document.cookie (covers all domain variants js-cookie may miss). */
export function getGoogTransCookieValue(): string | undefined {
  if (typeof document === 'undefined') return undefined

  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : undefined
}

/** Remove googtrans from every domain/path variant Google Translate may use. */
export function clearGoogleTranslateCookie(): void {
  if (typeof document === 'undefined') return

  const expired = 'Thu, 01 Jan 1970 00:00:00 GMT'
  const host = window.location.hostname

  const domainVariants: (string | undefined)[] = [undefined]

  if (host && host !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    domainVariants.push(host)
    const parts = host.split('.')
    if (parts.length >= 2) {
      domainVariants.push(`.${parts.slice(-2).join('.')}`)
    }
    if (host.startsWith('www.')) {
      const bare = host.slice(4)
      domainVariants.push(bare, `.${bare}`)
    }
  }

  for (const domain of domainVariants) {
    const domainAttr = domain ? `;domain=${domain}` : ''
    document.cookie = `${COOKIE_NAME}=;expires=${expired};path=/${domainAttr}`
    document.cookie = `${COOKIE_NAME}=;Max-Age=0;path=/${domainAttr}`
  }

  Cookies.remove(COOKIE_NAME, { path: '/' })
  if (host && host !== 'localhost') {
    Cookies.remove(COOKIE_NAME, { path: '/', domain: host })
    Cookies.remove(COOKIE_NAME, { path: '/', domain: `.${host}` })
  }
}

export function parseLanguageFromCookie(): LanguageCode {
  const cookieValue = getGoogTransCookieValue()
  if (!cookieValue) return PAGE_LANG

  const parts = cookieValue.split('/').filter(Boolean)
  const target = parts[parts.length - 1]

  // Same source & target, or translate-to-bangla on a bangla page = show original
  if (!target || target === PAGE_LANG) return PAGE_LANG

  const supported = translationConfig.languages.map((l) => l.name) as string[]
  if (supported.includes(target)) return target as LanguageCode

  return PAGE_LANG
}

export function setGoogleTranslateCookie(lang: LanguageCode): void {
  const cookieValue = `/${PAGE_LANG}/${lang}`
  Cookies.set(COOKIE_NAME, cookieValue, { path: '/' })
  document.cookie = `${COOKIE_NAME}=${cookieValue};path=/`
}

export function triggerGoogleTranslateSelect(lang: LanguageCode): boolean {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!select) return false

  select.value = lang === PAGE_LANG ? '' : lang
  select.dispatchEvent(new Event('change', { bubbles: true }))
  return true
}

/**
 * Apply a language change. Returning to Bangla always reloads after clearing cookies
 * so Google Translate cannot keep English from a stale googtrans cookie.
 */
export function applyLanguageChange(lang: LanguageCode): void {
  if (lang === PAGE_LANG) {
    clearGoogleTranslateCookie()
    window.location.reload()
    return
  }

  setGoogleTranslateCookie(lang)

  const applied = triggerGoogleTranslateSelect(lang)
  if (!applied) {
    window.location.reload()
  }
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
