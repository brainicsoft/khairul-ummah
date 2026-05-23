import { HeroSection } from "@/components/homePage/HeroSection"
import { QuickFunds } from "@/components/homePage/QuickFunds"
import { DonationCTA } from "@/components/homePage/DonationCTA"
import { FeaturesSection } from "@/components/homePage/FeaturesSection"
import { Programs } from "@/components/homePage/Programs"
import { Gallery } from "@/components/homePage/Gallery"
import { BlogSection } from "@/components/homePage/BlogSection"
import { Newsletter } from "@/components/homePage/Newsletter"
import ScrollToTop from "@/components/ScrollToTop"

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <QuickFunds />
        <FeaturesSection />
        <Programs />
        <Gallery />
        <DonationCTA />
        <BlogSection />
        <Newsletter />
      </main>
      <ScrollToTop />
    </>
  )
}
