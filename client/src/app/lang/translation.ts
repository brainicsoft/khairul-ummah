function translateInit() {
  if (!window.__GOOGLE_TRANSLATION_CONFIG__ || !window.google) {
    return
  }

  new window.google.translate.TranslateElement({
    pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
  })
}
