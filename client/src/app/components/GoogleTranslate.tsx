'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { translationConfig } from '../lang/lang_config'

export function GoogleTranslate() {
  useEffect(() => {
    // Function to remove Google Translate tooltips only
    const removeGoogleTooltips = () => {
      const tooltip = document.getElementById('goog-gt-tt')
      if (tooltip) tooltip.remove()

      const tooltips = document.querySelectorAll('.goog-tooltip, [id*="goog-gt"]')
      tooltips.forEach((el) => el.remove())

      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        if (
          iframe.src?.includes('translate.google') ||
          iframe.title?.includes('translate') ||
          iframe.className?.includes('goog')
        ) {
          iframe.remove()
        }
      })
    }

    // Function to remove Google Translate banner
    const removeGoogleBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame')
      if (banner) banner.remove()

      const topBar: any = document.querySelector('.goog-te-banner-frame')
      if (topBar) topBar.style.display = 'none'

      document.body.style.top = '0px'
      document.body.classList.remove('skiptranslate')
    }

    // Set config globally
    window.__GOOGLE_TRANSLATION_CONFIG__ = translationConfig

    // Initialize Google Translate
    window.googleTranslateElementInit = function () {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: translationConfig.defaultLanguage,
            includedLanguages: 'en,bn,ar',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        )

        setTimeout(removeGoogleBanner, 100)
        setTimeout(removeGoogleTooltips, 150)
      }
    }

    // If Google already loaded somehow.
    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit()
    }

    // Continuous cleanup
    const interval = setInterval(() => {
      removeGoogleBanner()
      removeGoogleTooltips()
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Google Translate Script Load */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Hidden translate container */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </>
  )
}
