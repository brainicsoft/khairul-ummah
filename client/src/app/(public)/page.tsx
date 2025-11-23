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
      <ScrollToTop/>
    </main>
  )
}
