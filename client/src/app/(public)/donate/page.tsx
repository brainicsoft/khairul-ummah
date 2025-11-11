"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DONATION_TYPES } from "@/data/donationData"
import Image, { StaticImageData } from "next/image"
import DonationType from "@/assets/donateTypeImg/donate.jpg"
type DonationType = {
  id: number
  slug: string
  title: string
  desc: string
  benefits: string[]
  videoUrl: string
  image: string | StaticImageData
  color: string
  category: "regular" | "special" | "donor-type"
}
export default function DonationTypesPage() {
  const getDonationTypesArray = (): DonationType[] => {
    return DONATION_TYPES
  }
  const donationTypes = getDonationTypesArray()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const benefitsList = [
    "খাইরুল উম্মাহ ফাউন্ডেশনের সাথে সমাজ সেবায় অংশীদার হন",
    "স্বচ্ছতার সাথে আপনার অবদানের হিসাব পান",
    "বিশেষ সুবিধা এবং সার্টিফিকেট পান",
    "আপনার পরিবার এবং প্রিয়জনদের জন্য দোয়া পান",
    "নিয়মিত অগ্রগতি প্রতিবেদন সহ আপডেট পান",
  ]

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fillRule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fillOpacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">অনুদান করুন</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            আপনার পছন্দের তহবিলে অবদান রাখুন এবং সমাজ সেবায় অংশীদার হন
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">অনুদানের তহবিল নির্বাচন করুন</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              আপনার প্রয়োজন এবং সামর্থ্য অনুযায়ী সঠিক তহবিলে অবদান রাখুন এবং সমাজের উন্নয়নে সাহায্য করুন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {donationTypes.map((type) => (
              <Link key={type.id} href={`/donate/${type.slug}`} className="group">
                <div
                  className={`rounded-xl  h-full transform transition  hover:shadow-sm cursor-pointer border flex flex-col`}
                >
                  {/* Top content */}
                  <div className="flex items-start justify-between mb-6">
                    <Image
                      className="w-full h-[250px] rounded-t-sm"
                      src={type.image} alt={type.title} width={500} height={300}
                    />
                    {/* <div className="text-5xl">{type.icon}</div> */}
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1 text-black" />
                  </div>

                  <div className="px-6 pb-6">
                    <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                    <p className=" leading-relaxed flex-grow">{type.desc}</p>

                    {/* Button always at bottom */}
                    <button className="mt-6 text-xl bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition w-full">
                      দান করুন
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-card rounded-xl border border-border p-8 md:p-12">
            <h2 className="text-2xl font-bold text-primary mb-6">কেন আমাদের সাথে দান করবেন?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "স্বচ্ছতা",
                  desc: "আপনার দান কোথায় ব্যয় হয় তা সম্পূর্ণ স্বচ্ছতার সাথে জানুন",
                  icon: "👁️",
                },
                {
                  title: "নিরাপত্তা",
                  desc: "সর্বোচ্চ মানের এনক্রিপশন দিয়ে আপনার লেনদেন সুরক্ষিত",
                  icon: "🔒",
                },
                {
                  title: "প্রভাব",
                  desc: "সরাসরি হাজার হাজার মানুষের জীবনে ইতিবাচক পরিবর্তন আনুন",
                  icon: "⭐",
                },
                {
                  title: "সম্প্রদায়",
                  desc: "একটি বৈশ্বিক সম্প্রদায়ের অংশ হন যারা সমাজ পরিবর্তনে বিশ্বাস করে",
                  icon: "🫂",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
