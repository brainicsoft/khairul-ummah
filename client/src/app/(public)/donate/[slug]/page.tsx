"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { useForm, Controller } from "react-hook-form"
import { ChevronDown } from "lucide-react"
import { DONATION_TYPES } from "@/data/donationData"
import bkash from "@/assets/bkash.png"
import sslcommerz from "@/assets/sslcommerz.png"
import { useCreateBkashMutation } from "@/redux/features/payment/paymentApi"

export type DonationType = {
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

type FormValues = {
  category: string
  amount: string
  name: string
  email?: string
  phone: string
  paymentMethod: "bkash" | "sslCommerz"
}

export default function DonateTypePage() {
  const params = useParams()
  const slug = params.slug as string

  const data = DONATION_TYPES.find((type) => type.slug === slug)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<string>("")

  const [bkashDonation, { isLoading }] = useCreateBkashMutation()

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      category: "",
      amount: "",
      name: "",
      email: "",
      phone: "",
      paymentMethod: "bkash",
    }
  })

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">তহবিল খুঁজে পাওয়া যায়নি</h1>
          <Link href="/donate">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
              ফিরে যান
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const faqItems = [
    { q: "আমার দান কোথায় ব্যয় হয়?", a: "আপনার দান সরাসরি আমাদের শিক্ষা, স্বাস্থ্য এবং দক্ষতা উন্নয়ন কর্মসূচিতে ব্যয় করা হয়।" },
    { q: "আমি নিয়মিত দান করতে পারি কি?", a: "হ্যাঁ, আপনি মাসিক বা বার্ষিক ভিত্তিতে নিয়মিত দান করতে পারেন।" },
    { q: "আমার ব্যক্তিগত তথ্য কি সুরক্ষিত থাকবে?", a: "সম্পূর্ণভাবে সুরক্ষিত। আমরা আন্তর্জাতিক নিরাপত্তা মান অনুসরণ করি।" },
  ]

  const amountOptions = ["50", "100", "200", "500"]

  const onSubmit = async (formData: FormValues) => {
    try {
      // Map to simplified formData
      const mappedData = {
        name: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        amount: Number(formData.amount),
        donationType: data.slug
      }

      console.log("Submitting donation:", mappedData)

      if (formData.paymentMethod === "bkash") {
        const response = await bkashDonation(mappedData).unwrap()
       window.location.href= response.data.url
      } else {
        alert("SSLCommerz selected! Redirect to payment gateway.")
      }
    } catch (error) {
      console.error(error)
      alert("Donation failed. Please try again.")
    }
  }

  const amountValue = watch("amount") // Sync buttons and input

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fillRule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fillOpacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">{data.title}</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">{data.desc}</p>
        </div>
      </div>

      <div className="bg-muted py-3 text-center text-sm text-muted-foreground">
        <p>সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন ✉️ contact@khayrulummah.org</p>
      </div>

      <main className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Video & Benefits */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="flex flex-col justify-center">
              <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={data.videoUrl}
                  title="Donation Video"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-secondary/20 rounded-xl p-8 border-l-4 border-secondary shadow-inner">
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

          {/* Description */}
          <div className="bg-card rounded-xl p-8 mb-16 border border-border shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4">আমাদের কাজে অবদান রাখুন</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              খাইরুল উম্মাহ ফাউন্ডেশন সমাজের সুবিধাবঞ্চিত মানুষের উন্নয়নে নিবেদিত। আপনার প্রতিটি অনুদান সরাসরি আমাদের বিভিন্ন কর্মসূচিতে ব্যয় করা হয় এবং প্রকৃত প্রভাব তৈরি করে।
            </p>
            <p className="text-foreground/80 leading-relaxed">
              এই ধরনের অনুদানের মাধ্যমে আপনি সুনির্দিষ্টভাবে আপনার লক্ষ্য অর্জনে সাহায্য করতে পারেন এবং একটি উন্নত ভবিষ্যৎ নির্মাণে অংশীদার হন।
            </p>
          </div>

          {/* Donation Form */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">দান করুন</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      ক্যাটাগরি <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("category", { required: true })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="education">শিক্ষা</option>
                      <option value="health">স্বাস্থ্য</option>
                      <option value="skill">দক্ষতা উন্নয়ন</option>
                      <option value="relief">দুর্যোগ ত্রাণ</option>
                      <option value="general">সাধারণ</option>
                    </select>
                    {errors.category && <span className="text-red-500 text-sm">ক্যাটাগরি অবশ্যক</span>}
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      পরিমাণ (টাকা) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {amountOptions.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setValue("amount", amount)
                            setSelectedAmount(amount)
                          }}
                          className={`py-2 px-3 rounded-xl font-semibold transition transform hover:scale-105
                          ${amountValue === amount ? "bg-primary text-primary-foreground shadow-lg" : "border border-primary text-primary hover:bg-primary/10"}`}
                        >
                          ৳{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      {...register("amount", { required: true, min: 50 })}
                      placeholder="কাস্টম পরিমাণ"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setSelectedAmount("")} // deselect buttons on input
                    />
                    {errors.amount && <span className="text-red-500 text-sm">সঠিক পরিমাণ দিন</span>}
                  </div>

                  {/* Donor Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="আপনার নাম"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.name && <span className="text-red-500 text-sm">নাম অবশ্যক</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        ফোন নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: true })}
                        placeholder="+880..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.phone && <span className="text-red-500 text-sm">ফোন নম্বর অবশ্যক</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      পেমেন্ট পদ্ধতি <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[{ id: "bkash", logo: bkash }, { id: "sslCommerz", logo: sslcommerz }].map((method) => (
                            <label
                              key={method.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition cursor-pointer hover:shadow-lg
                              ${field.value === method.id ? "border-primary bg-primary/10" : "border-border bg-background"}`}
                            >
                              <input
                                type="radio"
                                value={method.id}
                                checked={field.value === method.id}
                                onChange={() => field.onChange(method.id)}
                                className="accent-primary"
                              />
                              <Image src={method.logo} alt={method.id} width={45} height={45} className="object-contain" />
                            </label>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition transform hover:scale-105"
                  >
                    {isLoading ? "Processing..." : "এখনই দান করুন"}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <div className="bg-secondary/15 rounded-xl p-6 border-l-4 border-secondary shadow-md">
                <h3 className="text-lg font-bold text-primary mb-3">কেন দান করবেন?</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  প্রতিটি টাকা সরাসরি সমাজের কল্যাণে ব্যয় হয়। আপনার দান হতে পারে কোনো শিশুর স্বপ্ন পূরণের চাবিকাঠি।
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600 shadow-md">
                <h3 className="text-lg font-bold text-green-700 mb-3">🔒 নিরাপদ পেমেন্ট</h3>
                <p className="text-sm text-green-700">আপনার সকল লেনদেন সম্পূর্ণ এনক্রিপ্টেড এবং নিরাপদ।</p>
              </div>

              <Link href="/donate">
                <button className="w-full bg-muted text-foreground py-3 rounded-xl font-semibold hover:bg-muted/80 transition shadow-md">
                  ফিরে যান
                </button>
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">প্রায়শ জিজ্ঞাসিত প্রশ্ন</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border border-border rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted transition text-left"
                  >
                    <span className="font-semibold text-foreground">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-primary transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {expandedFaq === idx && <div className="px-4 py-3 bg-muted border-t border-border text-foreground/80">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
