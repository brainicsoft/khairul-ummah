"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useParams } from "next/navigation"

export default function DonateTypePage() {
  const params = useParams()
  const donationType = params.type as string

  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    name: "",
    email: "",
    phone: "",
    paymentMethod: "nagad",
  })

  const donationTypeData: Record<
    string,
    {
      title: string
      desc: string
      benefits: string[]
      videoUrl: string
      icon: string
    }
  > = {
    regular: {
      title: "নিয়মিত অনুদান পরিকল্পনা",
      desc: "প্রতি মাসে বা বছরে নিয়মিত অবদান দিয়ে দীর্ঘমেয়াদী প্রভাব তৈরি করুন এবং সমাজের স্থায়ী পরিবর্তন নিশ্চিত করুন।",
      benefits: ["নিয়মিত আপডেট এবং প্রতিবেদন পান", "বিশেষ সুবিধা এবং সার্টিফিকেট", "সম্প্রদায়ের অংশ হন", "ট্যাক্স সুবিধা পান"],
      videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
      icon: "📅",
    },
    emergency: {
      title: "জরুরি অনুদান",
      desc: "দুর্যোগকালীন পরিস্থিতিতে তাৎক্ষণিক সাহায্য প্রদান করুন এবং সংকটে পড়া মানুষদের জীবন রক্ষা করুন।",
      benefits: ["তাৎক্ষণিক পরিত্রাণ কার্যক্রম", "সরাসরি প্রভাব দেখুন", "সম্প্রদায়ের সাথে সহায়তা করুন", "প্রকৃত পরিবর্তন আনুন"],
      videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
      icon: "🆘",
    },
    special: {
      title: "বিশেষ অনুদান",
      desc: "শিক্ষা, স্বাস্থ্য বা অন্য কোনো নির্দিষ্ট প্রকল্পে সরাসরি অবদান রাখুন এবং আপনার লক্ষ্য অনুযায়ী কাজ করুন।",
      benefits: [
        "নির্দিষ্ট প্রকল্প নির্বাচন করুন",
        "ফলাফল সম্পর্কে বিস্তারিত জানুন",
        "আপনার মূল্যবোধ অনুযায়ী দান করুন",
        "টেকসই উন্নয়নে অবদান রাখুন",
      ],
      videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
      icon: "⭐",
    },
    corporate: {
      title: "কর্পোরেট অনুদান",
      desc: "আপনার প্রতিষ্ঠানের সামাজিক দায়বদ্ধতা কর্মসূচির অংশ হিসেবে আমাদের সাথে যুক্ত হন এবং সমাজে প্রকৃত পার্থক্য তৈরি করুন।",
      benefits: [
        "কর্পোরেট স্বীকৃতি পান",
        "ব্র্যান্ড মূল্যবোধ প্রদর্শন করুন",
        "কর্মচারী এনগেজমেন্ট বৃদ্ধি করুন",
        "দীর্ঘমেয়াদী অংশীদারিত্ব তৈরি করুন",
      ],
      videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
      icon: "🏢",
    },
  }

  const data = donationTypeData[donationType] || donationTypeData.regular

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount)
    setFormData((prev) => ({ ...prev, amount }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation submitted:", { ...formData, type: donationType })
    alert("দান করুন - ফর্ম সাবমিট করা হয়েছে!")
  }

  const faqItems = [
    {
      q: "আমার দান কোথায় ব্যয় হয়?",
      a: "আপনার দান সরাসরি আমাদের শিক্ষা, স্বাস্থ্য এবং দক্ষতা উন্নয়ন কর্মসূচিতে ব্যয় করা হয়।",
    },
    {
      q: "আমি নিয়মিত দান করতে পারি কি?",
      a: "হ্যাঁ, আপনি মাসিক বা বার্ষিক ভিত্তিতে নিয়মিত দান করতে পারেন।",
    },
    {
      q: "আমার ব্যক্তিগত তথ্য কি সুরক্ষিত থাকবে?",
      a: "সম্পূর্ণভাবে সুরক্ষিত। আমরা আন্তর্জাতিক নিরাপত্তা মান অনুসরণ করি।",
    },
  ]

  const amountOptions = ["50", "100", "200", "500"]

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fillRule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fillOpacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-5xl mb-4">{data.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">{data.title}</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">{data.desc}</p>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="bg-muted py-3 text-center text-sm text-muted-foreground">
        <p>সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন ✉️ contact@khayrulummah.org</p>
      </div>

      {/* Main Content */}
      <main className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Video & Content Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Video */}
            <div className="flex flex-col justify-center">
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                <iframe
                  className="w-full h-full"
                  src={data.videoUrl}
                  title="Donation Video"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="flex flex-col justify-center">
              <div className="bg-secondary/20 rounded-xl p-8 border-l-4 border-secondary">
                <h2 className="text-2xl font-bold text-primary mb-4">আপনি কী পাবেন?</h2>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  আপনার অবদান সরাসরি এই ধরনের অনুদানের মাধ্যমে সমাজে দৃশ্যমান প্রভাব ফেলে।
                </p>
                <ul className="space-y-3">
                  {data.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-lg mt-1">✓</span>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-card rounded-lg p-8 mb-16 border border-border">
            <h2 className="text-2xl font-bold text-primary mb-4">আমাদের কাজে অবদান রাখুন</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              খাইরুল উম্মাহ ফাউন্ডেশন সমাজের সুবিধাবঞ্চিত মানুষের উন্নয়নে নিবেদিত। আপনার প্রতিটি অনুদান সরাসরি আমাদের বিভিন্ন কর্মসূচিতে ব্যয়
              করা হয় এবং প্রকৃত প্রভাব তৈরি করে।
            </p>
            <p className="text-foreground/80 leading-relaxed">
              এই ধরনের অনুদানের মাধ্যমে আপনি সুনির্দিষ্টভাবে আপনার লক্ষ্য অর্জনে সাহায্য করতে পারেন এবং একটি উন্নত ভবিষ্যৎ নির্মাণে অংশীদার
              হন।
            </p>
          </div>

          {/* Donation Form & Info Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg p-8 border border-border">
                <h2 className="text-2xl font-bold text-primary mb-6">দান করুন</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      ক্যাটাগরি <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="education">শিক্ষা</option>
                      <option value="health">স্বাস্থ্য</option>
                      <option value="skill">দক্ষতা উন্নয়ন</option>
                      <option value="relief">দুর্যোগ ত্রাণ</option>
                      <option value="general">সাধারণ</option>
                    </select>
                  </div>

                  {/* Amount Section */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      পরিমাণ (টাকা) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {amountOptions.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountClick(amount)}
                          className={`py-2 px-3 rounded-lg border-2 font-semibold transition ${
                            selectedAmount === amount
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-primary text-primary hover:bg-primary/10"
                          }`}
                        >
                          ৳{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="কাস্টম পরিমাণ"
                      min="50"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Donor Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="আপনার নাম"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        ফোন নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880..."
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">ইমেইল</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="আপনার ইমেইল"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      পেমেন্ট পদ্ধতি <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: "nagad", label: "Nagad" },
                        { id: "bkash", label: "bKash" },
                        { id: "rocket", label: "Rocket" },
                        { id: "card", label: "Card" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-border hover:bg-card transition"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-medium text-foreground">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    এখনই দান করুন
                  </button>
                </form>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Why Donate Box */}
              <div className="bg-secondary/15 rounded-lg p-6 border-l-4 border-secondary">
                <h3 className="text-lg font-bold text-primary mb-3">কেন দান করবেন?</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  প্রতিটি টাকা সরাসরি সমাজের কল্যাণে ব্যয় হয়। আপনার দান হতে পারে কোনো শিশুর স্বপ্ন পূরণের চাবিকাঠি।
                </p>
              </div>

              {/* Safe Payment Box */}
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="text-lg font-bold text-green-700 mb-3">🔒 নিরাপদ পেমেন্ট</h3>
                <p className="text-sm text-green-700">আপনার সকল লেনদেন সম্পূর্ণ এনক্রিপ্টেড এবং নিরাপদ।</p>
              </div>

              {/* Back Button */}
              <Link href="/donate">
                <button className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-muted/80 transition">
                  ফিরে যান
                </button>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">প্রায়শ জিজ্ঞাসিত প্রশ্ন</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted transition text-left"
                  >
                    <span className="font-semibold text-foreground">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-4 py-3 bg-muted border-t border-border text-foreground/80">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
