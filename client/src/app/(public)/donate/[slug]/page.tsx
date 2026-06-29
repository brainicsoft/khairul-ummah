"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { useForm, Controller } from "react-hook-form"
import bkash from "@/assets/bkash.png"
import sslcommerz from "@/assets/sslcommerz.png"
import { useCreateBkashMutation, useCreatePaymentMutation } from "@/redux/features/payment/paymentApi"
import { apiUrl } from "@/config/constants"
import { useGetDonationProjectBySlugQuery } from "@/redux/features/donationProjects/donationProjectApi"
import FAQ from "@/components/FAQ"
import { DonatesTypesMenue } from "@/components/DonatesTypesMenue"
import toast from "react-hot-toast"
import { siteContact } from "@/config/site"
import { savePendingDonorProfile } from "@/lib/pendingDonorProfile"
import { Check } from "lucide-react"

const labelClass = "mb-1.5 block text-sm font-semibold text-foreground"
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"

const PAYMENT_METHODS = [
  { id: "bkash" as const, logo: bkash, label: "bKash" },
  { id: "sslcommerz" as const, logo: sslcommerz, label: "SSLCommerz" },
]

export type DonationType = {
  _id: number
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
  paymentMethod: "bkash" | "sslcommerz" // lowercase
}

export default function DonateTypePage() {
  // state for donation types
  const [donationTypes, setDonationTypes] = useState<any[]>([]);
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = decodeURIComponent(params.slug as string)
  const { data, isLoading: donatTypesLoding } = useGetDonationProjectBySlugQuery({ slug });
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      category: slug,
      amount: "",
      name: "",
      email: "",
      phone: "",
      paymentMethod: "bkash",
    },
  })
  const [selectedAmount, setSelectedAmount] = useState<string>("")

  useEffect(() => {
    async function fetchDonationTypes() {
      const types = await DonatesTypesMenue()
      setDonationTypes(types)
    }
    fetchDonationTypes()
  }, [])

  // Category + amount — set after fund list loads (fixes empty select on arrival)
  useEffect(() => {
    if (slug) {
      setValue("category", slug, { shouldDirty: true, shouldValidate: true })
    }

    const amountFromUrl = searchParams.get("amount")
    if (amountFromUrl && !Number.isNaN(Number(amountFromUrl))) {
      setValue("amount", amountFromUrl, { shouldDirty: true })
      setSelectedAmount(amountFromUrl)
    }
  }, [slug, donationTypes, searchParams, setValue])

  const [bkashDonation, { isLoading }] = useCreateBkashMutation()
  const [createPayment] = useCreatePaymentMutation()

  if (donatTypesLoding) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

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



  const amountOptions = ["50", "100", "200", "500"]

  const onSubmit = async (formData: FormValues) => {
    try {
      // Map to simplified formData
      const mappedData = {
        name: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        amount: Number(formData.amount),
        donationType: data.slug,
        method: formData.paymentMethod, // include method
        
      }

      if (formData.paymentMethod === "bkash") {
        const response = await bkashDonation(mappedData).unwrap()
        savePendingDonorProfile({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
        })
        window.location.href = response.data.url
      } else {
        const response = await createPayment(mappedData).unwrap()
        savePendingDonorProfile({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
        })
        window.location.href = response.data.url
        toast.success("SSLCommerz selected! Redirect to payment gateway.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Donation failed. Please try again.")
    }
  }
  const amountValue = watch("amount") // Sync buttons and input
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fillRule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fillOpacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">{data.title}</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">{data.desc}</p>
        </div>
      </div>

      <div className="bg-muted py-3 text-center text-sm text-muted-foreground">
        <p>
          সহায়তার জন্য যোগাযোগ:{" "}
          <a href={`mailto:${siteContact.email}`} className="underline">
            {siteContact.email}
          </a>
        </p>
      </div>
      <main className="py-12 md:py-16 bg-background">

        <div className="container mx-auto px-4 max-w-6xl">
            {/* Donation Form */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                <div className="border-b border-primary/20 bg-primary px-5 py-3.5">
                  <h2 className="text-base font-bold text-primary-foreground md:text-lg">
                    দান করুন
                  </h2>
                  <p className="mt-0.5 text-xs text-primary-foreground/85">
                    তথ্য পূরণ করে নিরাপদে পেমেন্ট সম্পন্ন করুন
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 md:p-7">
                  <div>
                    <label className={labelClass}>
                      ক্যাটাগরি <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="category"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select
                          {...field}
                          value={field.value || slug}
                          className={inputClass}
                        >
                          <option value="">নির্বাচন করুন</option>
                          {donationTypes.map((type) => (
                            <option key={type._id} value={type.slug}>
                              {type.title || type.slug}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.category && (
                      <span className="text-sm text-red-500">ক্যাটাগরি অবশ্যক</span>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      পরিমাণ (টাকা) <span className="text-red-500">*</span>
                    </label>
                    <div className="mb-2.5 grid grid-cols-4 gap-2.5">
                      {amountOptions.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setValue("amount", amount)
                            setSelectedAmount(amount)
                          }}
                          className={`rounded-xl px-2 py-2 text-sm font-semibold transition ${
                            amountValue === amount
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "border border-primary text-primary hover:bg-primary/10"
                          }`}
                        >
                          ৳{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      {...register("amount", { required: true, min: 2 })}
                      placeholder="কাস্টম পরিমাণ"
                      className={inputClass}
                      onChange={() => setSelectedAmount("")}
                    />
                    {errors.amount?.type === "min" && (
                      <p className="text-sm text-red-500">ন্যূনতম পরিমাণ ২ টাকা হতে হবে</p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="আপনার নাম"
                        className={inputClass}
                      />
                      {errors.name && (
                        <span className="text-sm text-red-500">নাম অবশ্যক</span>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        ফোন নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: true })}
                        placeholder="+880..."
                        className={inputClass}
                      />
                      {errors.phone && (
                        <span className="text-sm text-red-500">ফোন নম্বর অবশ্যক</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      পেমেন্ট পদ্ধতি <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <div className="grid grid-cols-2 gap-3">
                          {PAYMENT_METHODS.map((method) => {
                            const selected = field.value === method.id
                            return (
                              <label
                                key={method.id}
                                className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 bg-white px-4 py-3 transition-all duration-200 sm:py-4 ${
                                  selected
                                    ? "border-primary shadow-md ring-2 ring-primary/20"
                                    : "border-border hover:border-primary/40 hover:shadow-sm"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={method.id}
                                  checked={selected}
                                  onChange={() => field.onChange(method.id)}
                                  className="sr-only"
                                />
                                {selected && (
                                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                                    <Check className="h-4 w-4" strokeWidth={3} />
                                  </span>
                                )}
                                <div className="flex h-10 w-full items-center justify-center sm:h-11">
                                  <Image
                                    src={method.logo}
                                    alt={method.label}
                                    width={160}
                                    height={48}
                                    className="h-9 w-auto max-w-[85%] object-contain sm:h-10"
                                  />
                                </div>
                              </label>
                            )
                          })}
                        </div>
                      )}
                    />
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                  >
                    {isLoading ? "Processing..." : "এখনই দান করুন"}
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                <div className="border-b border-border bg-muted/40 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    নির্বাচিত তহবিল
                  </p>
                  <h3 className="mt-0.5 text-sm font-bold leading-snug text-foreground">
                    {data.title}
                  </h3>
                </div>
                <ul className="space-y-2.5 p-4 text-xs text-muted-foreground">
                  <li className="flex gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      ১
                    </span>
                    <span>তহবিল ও পরিমাণ নির্বাচন করুন</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      ২
                    </span>
                    <span>নাম ও মোবাইল লিখুন</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      ৩
                    </span>
                    <span>bKash বা SSLCommerz এ পেমেন্ট করুন</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-l-4 border-secondary bg-secondary/15 p-5 shadow-md md:p-6">
                <h3 className="mb-2 text-base font-bold text-primary">কেন দান করবেন?</h3>
                <p className="text-sm leading-relaxed text-foreground/80">
                  প্রতিটি টাকা সরাসরি সমাজের কল্যাণে ব্যয় হয়। আপনার দান হতে পারে কোনো
                  শিশুর স্বপ্ন পূরণের চাবিকাঠি।
                </p>
              </div>

              <div className="rounded-xl border-l-4 border-green-600 bg-green-50 p-5 shadow-md md:p-6">
                <h3 className="mb-2 text-base font-bold text-green-700">🔒 নিরাপদ পেমেন্ট</h3>
                <p className="text-sm text-green-700">
                  আপনার সকল লেনদেন সম্পূর্ণ এনক্রিপ্টেড এবং নিরাপদ।
                </p>
              </div>

              <Link href="/donate">
                <button
                  type="button"
                  className="w-full rounded-xl bg-muted py-2.5 text-sm font-semibold text-foreground shadow-md transition hover:bg-muted/80"
                >
                  ফিরে যান
                </button>
              </Link>
            </div>
          </div>

          {/* Video & Benefits */}
          <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 mb-16">
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
                  {data?.benefits?.map((benefit: string, idx: number) => (
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

        
          {/* FAQ */}
          <FAQ />
        </div>
      </main>
    </>
  )
}
