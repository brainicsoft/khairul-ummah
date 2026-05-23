import { DEFAULT_LANGUAGE } from './lang_config'

/** Runs in <head> before Google Translate — clears invalid googtrans cookies on refresh. */
export const GOOGLE_TRANSLATE_BOOTSTRAP_SCRIPT = `
(function () {
  var PAGE_LANG = '${DEFAULT_LANGUAGE}';
  var match = document.cookie.match(/(?:^|;\\s*)googtrans=([^;]*)/);
  if (!match) return;
  var value = decodeURIComponent(match[1]);
  var parts = value.split('/').filter(Boolean);
  var target = parts[parts.length - 1];
  if (!target || target === PAGE_LANG) {
    var exp = 'Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'googtrans=;expires=' + exp + ';path=/';
    var h = location.hostname;
    if (h && h !== 'localhost' && !/^\\d+\\.\\d+\\.\\d+\\.\\d+$/.test(h)) {
      document.cookie = 'googtrans=;expires=' + exp + ';path=/;domain=' + h;
      document.cookie = 'googtrans=;expires=' + exp + ';path=/;domain=.' + h;
      var p = h.split('.');
      if (p.length >= 2) {
        document.cookie = 'googtrans=;expires=' + exp + ';path=/;domain=.' + p.slice(-2).join('.');
      }
    }
  }
})();
`
