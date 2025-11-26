"use client"
import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"
import bkash from "@/assets/bkash.png"
import sslcommerz from "@/assets/sslcommerz.png"
import { useCreateBkashMutation } from "@/redux/features/payment/paymentApi"
import { useGetDonationProjectBySlugQuery } from "@/redux/features/donationProjects/donationProjectApi"

type FormValues = {
    category: string
    amount: string
    name: string
    phone: string
    paymentMethod: "bkash" | "sslCommerz"
}

export default function AutopayPage() {
    const [autopayMode, setAutopayMode] = useState<"daily" | "monthly">("daily")

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            category: "regular",
            amount: "",
            name: "",
            phone: "",
            paymentMethod: "bkash",
        },
    })

    const amountValue = watch("amount")
    const nameValue = watch("name")
    const phoneValue = watch("phone")

    const [bkashDonation, { isLoading }] = useCreateBkashMutation()
    const data  ={
        "_id": {
          "$oid": "691d6d093a00188160765215"
        },
        "slug": "নিয়মিত-অনুদান",
        "title": " নিয়মিত অনুদান",
        "desc": "নিয়মিত অনুদান ফাউন্ডেশনকে টিকিয়ে রাখতে সবচেয়ে বেশি সাহায্য করে।",
        "image": "https://res.cloudinary.com/daftymluv/image/upload/v1763536137/general-1763536133551.webp",
        "category": "general",
        "benefits": [
          "সর্বোচ্চ প্রয়োজনের ক্ষেত্রে ব্যয়",
          "নমনীয় সহায়তা প্রোগ্রাম",
          "জরুরি পরিস্থিতিতে দ্রুত সাহায্য",
          "সম্প্রদায়ের বৃহত্তর উন্নয়ন"
        ],
        "status": "active",
        "videoUrl": "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
     
      }
    console.log(data)
    const summaryDetails = useMemo(() => {
        if (autopayMode === "daily") {
            const totalDays = 365
            const totalAmount = (Number(amountValue) || 0) * totalDays
            return {
                frequency: "প্রতিদিন",
                startDate: "আগামীকাল",
                endDate: "১ বছর পরে",
                totalPayments: totalDays,
                totalAmount,
                modeLabel: "দৈনিক",
            }
        } else {
            const totalMonths = 12
            const totalAmount = (Number(amountValue) || 0) * totalMonths
            return {
                frequency: "প্রতি মাসে একবার",
                startDate: "আগামী মাস",
                endDate: "১ বছর পরে",
                totalPayments: totalMonths,
                totalAmount,
                modeLabel: "মাসিক",
            }
        }
    }, [autopayMode, amountValue])

    if (!data)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>লোড হচ্ছে...</div>
            </div>
        )

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">তহবিল খুঁজে পাওয়া যায়নি</h1>
                    <Link href="/donate">
                        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
                            ফিরে যান
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    const onSubmit = async (formData: FormValues) => {
        try {
            const mappedData = {
                name: formData.name,
                phone: formData.phone,
                amount: Number(formData.amount),
                donationType: "regular",
                autopayMode: autopayMode,
            }

            console.log("[v0] Autopay donation:", mappedData)

            if (formData.paymentMethod === "bkash") {
                const response = await bkashDonation(mappedData).unwrap()
                window.location.href = response.data.url
            } else {
                alert("SSLCommerz নির্বাচিত! পেমেন্ট গেটওয়েতে রিডিরেক্ট করা হচ্ছে।")
            }
        } catch (error) {
            console.error(error)
            alert("দান ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")
        }
    }

    return (
        <>
            <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">আপনার স্বয়ংক্রিয় দানের যাত্রা শুরু করুন</h1>
                    <p className="mt-4 text-lg opacity-90 ">প্রতিদিন বা মাসিক একটি ছোট অবদান, হাজারো জীবনে বড় প্রভাব তৈরি করুন।</p>
                </div>
            </div>

            {/* Video & Benefits */}
            <div className="container mx-auto px-4 max-w-6xl mt-12">
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
            </div>

            <main className="py-8 md:py-12 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex gap-0 mb-8 border-b border-gray-200">
                        <button
                            onClick={() => setAutopayMode("daily")}
                            className={`px-6 py-3 font-semibold transition border-b-2 ${autopayMode === "daily"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            দৈনিক
                        </button>
                        <button
                            onClick={() => setAutopayMode("monthly")}
                            className={`px-6 py-3 font-semibold transition border-b-2 ${autopayMode === "monthly"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            মাসিক
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            আপনার নাম <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name", { required: true })}
                                            placeholder="নাম লিখুন"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs mt-1 block">নাম অবশ্যক</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            দানের পরিমাণ <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            {...register("amount", { required: true })}
                                            placeholder="৳ 20"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                        />
                                        {errors.amount && <span className="text-red-500 text-xs mt-1 block">পরিমাণ অবশ্যক</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            ফোন নম্বর <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            {...register("phone", { required: true })}
                                            placeholder="+880..."
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                        />
                                        {errors.phone && <span className="text-red-500 text-xs mt-1 block">ফোন নম্বর অবশ্যক</span>}
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <h3 className="text-base font-semibold text-gray-900 mb-3">পেমেন্ট পদ্ধতি</h3>
                                        <Controller
                                            control={control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { id: "bkash", logo: bkash, name: "বিকাশ" },
                                                        { id: "sslCommerz", logo: sslcommerz, name: "সিএসএল" },
                                                    ].map((method) => (
                                                        <label
                                                            key={method.id}
                                                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition cursor-pointer ${field.value === method.id
                                                                ? "border-primary bg-emerald-50"
                                                                : "border-gray-200 bg-white"
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                value={method.id}
                                                                checked={field.value === method.id}
                                                                onChange={() => field.onChange(method.id)}
                                                                className="accent-primary"
                                                            />
                                                            <Image
                                                                src={method.logo || "/placeholder.svg"}
                                                                alt={method.id}
                                                                width={40}
                                                                height={40}
                                                                className="object-contain"
                                                            />
                                                            <span className="text-xs font-medium text-gray-900">{method.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 pt-2">
                                        <input type="checkbox" id="consent" className="mt-1 primary" required />
                                        <label htmlFor="consent" className="text-sm text-gray-700">
                                            আমি শর্তাবলী গ্রহণ করি এবং যেকোনো সময় বাতিল করতে পারব।
                                        </label>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3 pt-4">
                                        <Link href="/donate" className="w-full">
                                            <button
                                                type="button"
                                                className="w-full px-4 py-2.5 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition"
                                            >
                                                ফিরে যান
                                            </button>
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                                        >
                                            {isLoading ? "প্রক্রিয়াকরণ..." : "দান করুন"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-primary/90 text-white rounded-lg p-6 sticky top-6 shadow-lg">
                                <h3 className="text-lg font-bold mb-4">আপনার {summaryDetails.modeLabel} দানের বিবরণ</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-emerald-100">পরিমাণ ({autopayMode === "daily" ? "দিনে" : "মাসে"}):</span>
                                        <span className="font-bold">{amountValue ? `৳ ${amountValue}` : "—"}</span>
                                    </div>
                                    <div className="border-t border-white/20"></div>

                                    <div className="flex justify-between">
                                        <span className="text-emerald-100">ফ্রিকোয়েন্সি:</span>
                                        <span className="font-bold">{summaryDetails.frequency}</span>
                                    </div>
                                    <div className="border-t border-white/20"></div>

                                    <div className="flex justify-between">
                                        <span className="text-emerald-100">শুরু:</span>
                                        <span className="font-bold">{summaryDetails.startDate}</span>
                                    </div>
                                    <div className="border-t border-white/20"></div>

                                    <div className="flex justify-between">
                                        <span className="text-emerald-100">মোট অর্থ (১২ মাস):</span>
                                        <span className="font-bold text-yellow-200">
                                            {summaryDetails.totalAmount ? `৳ ${summaryDetails.totalAmount}` : "—"}
                                        </span>
                                    </div>
                                    <div className="border-t border-white/20"></div>

                                    <div className="flex justify-between">
                                        <span className="text-emerald-100">মোট পেমেন্ট:</span>
                                        <span className="font-bold">{summaryDetails.totalPayments}টি</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
