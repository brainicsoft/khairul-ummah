// "use client"
// import { useEffect, useState } from "react"
// import { ArrowUp } from "lucide-react"
import { HeroSection } from "@/components/homePage/HeroSection"
import { FeaturesSection } from "@/components/homePage/FeaturesSection"
import { DonationCTA } from "@/components/homePage/DonationCTA"
import { Donation } from "@/components/homePage/Donation"
import { Programs } from "@/components/homePage/Programs"
import { Gallery } from "@/components/homePage/Gallery"
import { Newsletter } from "@/components/homePage/Newsletter"
import { BlogSection } from "@/components/homePage/BlogSection"
import ScrollToTop from "@/components/ScrollToTop"

export default function Home() {
  // const [showScroll, setShowScroll] = useState(false)
  // Show button when scrollY > 300
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowScroll(window.scrollY > 300)
  //   }
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])
  // Scroll to top
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" })
  // }

  return (
    <main className="min-h-screen relative">
      <HeroSection />
      <FeaturesSection />
      <DonationCTA />
      <Donation />
      <Programs />
      <Gallery />
      <BlogSection />
      <Newsletter />

      {/* Scroll to Top Button */}
      {/* {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )} */}
      <ScrollToTop/>
    </main>
  )
}
