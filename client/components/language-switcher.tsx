"use client"

import { Globe } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "bn", name: "বাংলা" },
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "ur", name: "اردو" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo")
    if (select) {
      select.value = langCode
      // Dispatch proper change event
      const event = new Event("change", { bubbles: true, cancelable: true })
      select.dispatchEvent(event)
      setIsOpen(false)
    } else {
      console.log("[v0] Google Translate not ready yet")
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        title="ভাষা পরিবর্তন করুন"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">ভাষা</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm first:rounded-t-lg last:rounded-b-lg"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
