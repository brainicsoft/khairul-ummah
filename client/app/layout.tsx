import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import icon from "../assets/logo/Round Shape Logo.jpg"
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "খাইরুল উম্মাহ ফাউন্ডেশন - সমাজ সেবা ও উন্নয়ন",
  description: "খাইরুল উম্মাহ ফাউন্ডেশন - সমাজের উন্নয়ন এবং দুর্বল মানুষের সেবায় নিয়োজিত।",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn">
      <link rel="icon" href={icon.src} sizes="any" />
      <head>
        <script async src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({
                  pageLanguage: 'bn',
                  includedLanguages: 'bn,en,ar,hi,ur',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              };
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
