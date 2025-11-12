'use client'

import { useEffect } from 'react'
import { translationConfig } from '../lang/lang_config'

export function GoogleTranslate() {
  useEffect(() => {
    // Function to remove Google Translate tooltips only
    const removeGoogleTooltips = () => {
      // Remove the main tooltip element
      const tooltip = document.getElementById('goog-gt-tt')
      if (tooltip) {
        tooltip.remove()
      }
      
      // Remove any other tooltip elements
      const tooltips = document.querySelectorAll('.goog-tooltip, [id*="goog-gt"]')
      tooltips.forEach(tooltip => {
        tooltip.remove()
      })
      
      // Remove tooltip iframes
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach(iframe => {
        if (iframe.src?.includes('translate.google') || 
            iframe.title?.includes('translate') ||
            iframe.className?.includes('goog')) {
          iframe.remove()
        }
      })
    }

    // Function to remove Google Translate banner (your existing code)
    const removeGoogleBanner = () => {
      // Remove the banner frame
      const banner = document.querySelector('.goog-te-banner-frame')
      if (banner) {
        banner.remove()
      }
      
      // Remove the top bar
      const topBar:any = document.querySelector('.goog-te-banner-frame')
      if (topBar) {
        topBar.style.display = 'none'
      }
      
      // Reset body position
      document.body.style.top = '0px'
      
      // Remove the skiptranslate class
      document.body.classList.remove('skiptranslate')
    }

    // Set config globally
    window.__GOOGLE_TRANSLATION_CONFIG__ = translationConfig

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: translationConfig.defaultLanguage,
          includedLanguages: 'en,bn,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element')
        
        // Remove banner after initialization
        setTimeout(removeGoogleBanner, 100)
        // Remove tooltips after initialization
        setTimeout(removeGoogleTooltips, 150)
      }
    }

    // If Google Translate is already loaded, initialize immediately
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit()
    }

    // Continuously check and remove the banner AND tooltips
    const interval = setInterval(() => {
      removeGoogleBanner()
      removeGoogleTooltips()
    }, 500)
    
    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  return <div id="google_translate_element" style={{ display: 'none' }}></div>
}