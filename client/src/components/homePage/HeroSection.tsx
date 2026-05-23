import Image from "next/image"
import bannerimg from "@/assets/banner.png"
import { FaGraduationCap, FaHandsHelping, FaMosque } from "react-icons/fa"
import Link from "next/link"
import { HeroDonationForm } from "./HeroDonationForm"

export function HeroSection() {
  const heroCards = [
    {
      id: 1,
      title: "শিক্ষার অগ্রাধিকার",
      desc: "শিক্ষাকে সর্বোচ্চ গুরুত্ব দিয়ে উন্নত ও নৈতিক সমাজ গঠন",
      icon: <FaGraduationCap size={40} className="text-primary" />,
    },
    {
      id: 2,
      title: "সেবার নির্ভরতা",
      desc: "দরিদ্র ও অসহায়দের পাশে থেকে সেবামূলক কার্যক্রম পরিচালনা",
      icon: <FaHandsHelping size={40} className="text-primary" />,
    },
    {
      id: 3,
      title: "দাওয়ায় সর্বত্র",
      desc: "ইসলামের সৎ বার্তা মানুষের দোরগোড়ায় পৌঁছে দেওয়া",
      icon: <FaMosque size={40} className="text-primary" />,
    },
  ]

  return (
    <>
      {/* Hero content only */}
      <section className="relative min-h-[500px] bg-gradient-to-r from-primary to-primary/80 py-16 text-white md:min-h-[540px] md:py-24 lg:min-h-[580px] lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <Image src={bannerimg} alt="" fill className="object-cover" priority />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">খাইরুল উম্মাহ ফাউন্ডেশন</h1>
            <p className="mb-8 text-lg opacity-90 md:text-xl">
              শিক্ষার অগ্রাধিকার, সেবার নির্ভরতা ও ইসলামের দাওয়ায় সর্বত্র—এই
              মূলনীতিতে আমরা সমাজ সেবায় কাজ করি।
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/about">
                <button className="rounded-lg bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition hover:bg-secondary/90">
                  আরও জানুন
                </button>
              </Link>
              <Link href="/contact">
                <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10">
                  যোগাযোগ করুন
                </button>
              </Link>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-8 pb-6 sm:grid-cols-3 md:pb-8 lg:pb-10">
              {heroCards.map((card) => (
                <div
                  key={card.id}
                  className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-black shadow-lg transition hover:scale-105"
                >
                  <div>{card.icon}</div>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="text-center text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate form — separate section, pulled up with margin, clear gap below */}
      <section
        aria-label="দ্রুত দান"
        className="relative z-20 -mt-18 mb-6 md:-mt-20 md:mb-8 lg:mb-10"
      >
        <div className="container mx-auto max-w-5xl px-4">
          <HeroDonationForm />
        </div>
      </section>
    </>
  )
}
