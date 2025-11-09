"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { DonationCTA } from "@/components/donation-cta"
import { DonationFundsCarousel } from "@/components/donation-funds-carousel"
import { ProgramsPreview } from "@/components/programs-preview"
import { GallerySection } from "@/components/gallery-section"
import { BlogSection } from "@/components/blog-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showScroll, setShowScroll] = useState(false)

  // Show button when scrollY > 300
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen relative">
      <HeroSection />
      <FeaturesSection />
      <DonationCTA />
      <DonationFundsCarousel />
      <ProgramsPreview />
      <GallerySection />
      <BlogSection />
      <NewsletterSection />

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </main>
  )
}
