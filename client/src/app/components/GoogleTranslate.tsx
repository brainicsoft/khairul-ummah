'use client'

import { useEffect } from 'react'
import { translationConfig } from '../lang/lang_config'

export function GoogleTranslate() {
  useEffect(() => {
    // Function to remove Google Translate banner
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
      }
    }

    // If Google Translate is already loaded, initialize immediately
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit()
    }

    // Continuously check and remove the banner
    const interval = setInterval(removeGoogleBanner, 500)
    
    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  return <div id="google_translate_element" style={{ display: 'none' }}></div>
}