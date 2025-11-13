import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import icon from "@/assets/logo/logo-round.jpg"
import { GoogleTranslate } from "./components/GoogleTranslate"
import StoreProvider from "@/redux/StoreProvider"

// Configure Hind Siliguri with all weights and subsets
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "খাইরুল উম্মাহ ফাউন্ডেশন - সমাজ সেবা ও উন্নয়ন",
  description: "খাইরুল উম্মাহ ফাউন্ডেশন - সমাজের উন্নয়ন এবং দুর্বল মানুষের সেবায় নিয়োজিত।",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href={icon.src} sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__GOOGLE_TRANSLATION_CONFIG__ = {
                languages: [
                  { title: 'English', name: 'en' },
                  { title: 'Bangla', name: 'bn' },
                  { title: 'Arabic', name: 'ar' }
                ],
                defaultLanguage: 'bn'
              };
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>

        <GoogleTranslate />
        <StoreProvider>
          {children}
          <Analytics />
        </StoreProvider>


        {/* Load Google Translate Script */}
        <script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
          defer
        />

      </body>
    </html>
  )
}