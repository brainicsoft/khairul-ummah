"use client"
import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"
import bkash from "@/assets/bkash.png"
import sslcommerz from "@/assets/sslcommerz.png"
import { useCreateBkashMutation } from "@/redux/features/payment/paymentApi"
import { useCreateAutopayMutation } from "@/redux/features/autopay/autopayApi"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

type FormValues = {
    category: string
    amount: string
    name: string
    phone: string
    email: string
    donorName: string
    paymentMethod: "bkash" | "sslCommerz"
}

type AutopayMode = "daily" | "weekly" | "monthly"

const PRESET_AMOUNTS_DAILY = [10, 20, 30, 50, 100] as const
const PRESET_AMOUNTS_WEEKLY = [50, 100, 200, 300, 500] as const
const PRESET_AMOUNTS_MONTHLY = [200, 500, 1000, 2000, 5000] as const

export default function AutopayPage() {
    const [autopayMode, setAutopayMode] = useState<AutopayMode>("daily")
    const [selectedPreset, setSelectedPreset] = useState<number | null>(20)
    const [isCustomAmount, setIsCustomAmount] = useState(false)
    const [showTermsModal, setShowTermsModal] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [donateForOther, setDonateForOther] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            category: "regular",
            amount: "20",
            name: "",
            phone: "",
            email: "",
            donorName: "",
            paymentMethod: "bkash",
        },
    })

    const amountValue = watch("amount")

    const currentPresets = autopayMode === "daily" ? PRESET_AMOUNTS_DAILY : autopayMode === "weekly" ? PRESET_AMOUNTS_WEEKLY : PRESET_AMOUNTS_MONTHLY

    const handleModeChange = useCallback((mode: AutopayMode) => {
        setAutopayMode(mode)
        const defaultAmount = mode === "daily" ? 20 : mode === "weekly" ? 50 : 200
        setSelectedPreset(defaultAmount)
        setIsCustomAmount(false)
        setValue("amount", defaultAmount.toString())
    }, [setValue])

    // use RTK endpoint for autopay creation
    const [createAutopay, { isLoading }] = useCreateAutopayMutation()
    // keep payment hook available if needed elsewhere
    const [bkashDonation] = useCreateBkashMutation()

    const data = {
        slug: "নিয়মিত-অনুদান",
        title: "নিয়মিত অনুদান",
        desc: "নিয়মিত অনুদান ফাউন্ডেশনকে টিকিয়ে রাখতে সবচেয়ে বেশি সাহায্য করে। নিয়মিত দানের অর্থই মূলত কল্যাণমুখী কার্যক্রম পরিচালিত হয়। নিয়মিত দানের জন্য কোনো একটি নির্দিষ্ট নেই, যে কোনো পরিমাণ দান করা যায়। আর যে কোনো ভালো কাজ অনিয়মিতভাবে বেশি করার চেয়ে নিয়মিতভাবে অল্প করা উত্তম।",
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
        benefits: [
            "সর্বোচ্চ প্রয়োজনের ক্ষেত্রে ব্যয়",
            "নমনীয় সহায়তা প্রোগ্রাম",
            "জরুরি পরিস্থিতিতে দ্রুত সাহায্য",
            "সম্প্রদায়ের বৃহত্তর উন্নয়ন",
        ],
        hadith: "আল্লাহর কাছে সর্বাধিক প্রিয় আমল হলো, যা সদাসর্বদা নিয়মিত করা হয়, যদিও তা অল্প হয়। (সহীহ বুখারী, হাদীস ৬৪৬৪)",
        infoText: "অনেকে নিয়মিত দান করতে চান, কিন্তু মনে থাকে না বলে দান করা হয়ে ওঠে না। এখন থেকে বিকাশ-নগদ এবং ভিসা-মাস্টারকার্ড ব্যবহারকারীরা আস-সুন্নাহ ফাউন্ডেশনের ওয়েবসাইট থেকে স্বয়ংক্রিয় পদ্ধতি চালু করে নিয়মিত দান করতে পারবেন। দৈনিক কিংবা মাসিক অপশন সিলেক্ট করে টাকার পরিমাণ সেট করে দিন। আপনার ভুলে গেলেও আপনার নির্ধারিত সময়ে নির্ধারিত পরিমাণ টাকা ফাউন্ডেশনের অ্যাকাউন্টে জমা হবে। চাইলে এই পদ্ধতিটি যেকোনো সময় বন্ধও করতে পারবেন।",
    }

    const handlePresetClick = useCallback((amount: number) => {
        setSelectedPreset(amount)
        setIsCustomAmount(false)
        setValue("amount", amount.toString())
    }, [setValue])

    const handleCustomClick = useCallback(() => {
        setSelectedPreset(null)
        setIsCustomAmount(true)
        setValue("amount", "")
    }, [setValue])

    const summaryDetails = useMemo(() => {
        const amt = Number(amountValue) || 0
        if (autopayMode === "daily") {
            return {
                frequency: "প্রতিদিন",
                startDate: "আগামীকাল",
                endDate: "১ বছর পরে",
                totalPayments: 365,
                totalAmount: amt * 365,
                modeLabel: "দৈনিক",
                perLabel: "দিনে",
            }
        } else if (autopayMode === "weekly") {
            return {
                frequency: "প্রতি সপ্তাহে",
                startDate: "আগামী সপ্তাহ",
                endDate: "১ বছর পরে",
                totalPayments: 52,
                totalAmount: amt * 52,
                modeLabel: "সাপ্তাহিক",
                perLabel: "সপ্তাহে",
            }
        } else {
            return {
                frequency: "প্রতি মাসে একবার",
                startDate: "আগামী মাস",
                endDate: "১ বছর পরে",
                totalPayments: 12,
                totalAmount: amt * 12,
                modeLabel: "মাসিক",
                perLabel: "মাসে",
            }
        }
    }, [autopayMode, amountValue])

    const handleDonateClick = () => {
        setShowTermsModal(true)
    }

    const onSubmit = async (formData: FormValues) => {
        if (!termsAccepted) {
            setShowTermsModal(true)
            return
        }
        try {
            // Collect known keys and pack any extras into `metadata`
            const knownKeys = new Set(["category", "amount", "name", "phone", "email", "donorName", "paymentMethod"])
            const extras: Record<string, any> = {}
            Object.keys(formData).forEach((k) => {
                if (!knownKeys.has(k)) extras[k] = (formData as any)[k]
            })

            const mappedData = {
                name: formData.name || undefined,
                phone: formData.phone,
                email: formData.email || undefined,
                amount: Number(formData.amount),
                donationType: "regular",
                // map frontend autopayMode to server Frequency
                frequency: autopayMode === "daily" ? "DAILY" : autopayMode === "weekly" ? "WEEKLY" : "MONTHLY",
                paymentType: "FIXED",
                payerType: "CUSTOMER",
                method: formData.paymentMethod === "bkash" ? ("bkash" as const) : ("sslcommerz" as const),
                donorName: donateForOther && formData.donorName ? formData.donorName : undefined,
                metadata: { ...(extras || {}), ...(formData.donorName ? { donorName: formData.donorName } : {}) },
            }

            if (formData.paymentMethod === "bkash") {
                const resp = await createAutopay(mappedData).unwrap()
                const redirect = resp?.redirectURL || resp?.data?.url || resp?.data?.redirectURL
                if (redirect) window.location.href = redirect
                else throw new Error('No redirect URL from gateway')
            } else {
                alert("SSLCommerz নির্বাচিত! পেমেন্ট গেটওয়েটে রিডিরেক্ট করা হচ্ছে।")
            }
        } catch (error) {
            console.error(error)
            alert("দান ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")
        }
    }

    const handleTermsAcceptAndSubmit = () => {
        setTermsAccepted(true)
        setShowTermsModal(false)
        handleSubmit(onSubmit)()
    }

    const modeButtons: { key: AutopayMode; label: string }[] = [
        { key: "daily", label: "দৈনিক" },
        { key: "weekly", label: "সাপ্তাহিক" },
        { key: "monthly", label: "মাসিক" },
    ]

    return (
        <>
            {/* Hero / Banner with email notice */}
            <div className="bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 py-3 text-center text-sm flex flex-wrap items-center justify-center gap-2">
                    <span>নিয়মিত অনুদান সংক্রান্ত যেকোনো বিষয় জানতে অসুবিধা হলে বা কোনো সমস্যা হলে, দয়া করে</span>
                    <a href="mailto:contact@khairulummahfoundation.org" className="underline font-semibold flex items-center gap-1">
                        ✉ contact@khairulummahfoundation.org
                    </a>
                    <span>- এ ইমেইল করুন</span>
                </div>
            </div>

            {/* Main content: Left info + Right form */}
            <div className="container mx-auto px-4 max-w-7xl py-8 md:py-12">
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* LEFT COLUMN: Video, Hadith, Description */}
                    <div className="space-y-8">
                        {/* Video */}
                        <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
                            <iframe
                                className="w-full h-full"
                                src={data.videoUrl}
                                title="Donation Video"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>

                        {/* Hadith quote */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                            <p className="text-lg font-semibold text-amber-900 leading-relaxed">
                                &ldquo;{data.hadith}&rdquo;
                            </p>
                        </div>

                        {/* Description text */}
                        <div className="space-y-4 text-foreground/80 leading-relaxed">
                            <p>{data.desc}</p>
                            <p>{data.infoText}</p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Donation Form Card */}
                    <div>
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden sticky top-4">
                            {/* Green header */}
                            <div className="bg-primary text-white p-6">
                                <h2 className="text-xl md:text-2xl font-bold">অংশ নিন ফাউন্ডেশনের সকল কল্যাণমূলক কাজে</h2>
                                <p className="mt-2 text-sm text-emerald-100 leading-relaxed">
                                    এই খাতে দানের মাধ্যমে ফাউন্ডেশনের সকল কল্যাণমূলক কাজের অংশীদার হতে পারবেন। কারণ এই তহবিল ফাউন্ডেশন পরিচালিত সকল কল্যাণমূলক কার্যক্রমের জন্য উন্মুক্ত থাকে।
                                </p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Daily / Weekly / Monthly Tabs */}
                                <div className="grid grid-cols-3 gap-2">
                                    {modeButtons.map((btn) => (
                                        <button
                                            key={btn.key}
                                            type="button"
                                            onClick={() => handleModeChange(btn.key)}
                                            className={`py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                                                autopayMode === btn.key
                                                    ? "bg-primary text-white shadow-md"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Preset Amount Buttons */}
                                <div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {currentPresets.map((amt) => (
                                            <button
                                                key={amt}
                                                type="button"
                                                onClick={() => handlePresetClick(amt)}
                                                className={`py-3 rounded-xl text-base font-semibold transition-all duration-200 border-2 ${
                                                    selectedPreset === amt && !isCustomAmount
                                                        ? "border-primary bg-primary text-white shadow-md"
                                                        : "border-gray-200 bg-white text-gray-800 hover:border-primary/50 hover:bg-emerald-50"
                                                }`}
                                            >
                                                ৳ {amt}
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleCustomClick}
                                            className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                                                isCustomAmount
                                                    ? "border-primary bg-primary text-white shadow-md"
                                                    : "border-gray-200 bg-white text-gray-800 hover:border-primary/50 hover:bg-emerald-50"
                                            }`}
                                        >
                                            যে কোনো পরিমাণ
                                        </button>
                                    </div>
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        handleDonateClick()
                                    }}
                                    className="space-y-4"
                                >
                                    {/* Amount input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            পরিমাণ <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">৳</span>
                                            <input
                                                type="number"
                                                {...register("amount", { required: true, min: 1 })}
                                                placeholder="20"
                                                readOnly={!isCustomAmount && selectedPreset !== null}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition ${
                                                    !isCustomAmount && selectedPreset !== null ? "bg-gray-50" : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.amount && <span className="text-red-500 text-xs mt-1 block">পরিমাণ অবশ্যক</span>}
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            আপনার নাম <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name", { required: true })}
                                            placeholder="আপনার নাম লিখুন"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs mt-1 block">নাম অবশ্যক</span>}
                                    </div>

                                    {/* Phone / Email with info tooltip */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            মোবাইল / ইমেইল <span className="text-red-500">*</span>
                                            <span
                                                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 text-[10px] text-gray-700 cursor-help"
                                                title="বিকাশের জন্য মোবাইল নম্বর দিন"
                                            >
                                                ℹ
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("phone", { required: true })}
                                            placeholder="+8801XXXXXXXXX"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                        />
                                        {errors.phone && <span className="text-red-500 text-xs mt-1 block">মোবাইল / ইমেইল অবশ্যক</span>}
                                    </div>

                                    {/* Donate for another person */}
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="donateForOther"
                                            checked={donateForOther}
                                            onChange={(e) => setDonateForOther(e.target.checked)}
                                            className="w-4 h-4 accent-primary rounded"
                                        />
                                        <label htmlFor="donateForOther" className="text-sm text-gray-700 font-medium">
                                            অন্য কারো পক্ষ থেকে দান করে থাকলে তার নাম লিখুন
                                        </label>
                                    </div>

                                    {donateForOther && (
                                        <div>
                                            <input
                                                type="text"
                                                {...register("donorName")}
                                                placeholder="যার পক্ষ থেকে দান করছেন তার নাম"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                            />
                                        </div>
                                    )}

                                    {/* Payment Method */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3">পেমেন্ট পদ্ধতি</h3>
                                        <Controller
                                            control={control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { id: "bkash" as const, logo: bkash, name: "বিকাশ" },
                                                        { id: "sslCommerz" as const, logo: sslcommerz, name: "সিএসএল কমার্জ" },
                                                    ].map((method) => (
                                                        <div
                                                            key={method.id}
                                                            onClick={() => field.onChange(method.id)}
                                                            className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                                                field.value === method.id
                                                                    ? "border-primary bg-emerald-50 shadow-sm"
                                                                    : "border-gray-200 bg-white hover:border-gray-300"
                                                            }`}
                                                        >
                                                            <Image
                                                                src={method.logo || "/placeholder.svg"}
                                                                alt={method.id}
                                                                width={120}
                                                                height={40}
                                                                className="object-contain h-[35px] w-auto"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    {/* Summary strip */}
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">{summaryDetails.modeLabel} দান:</span>
                                            <span className="font-bold text-primary text-lg">{amountValue ? `৳ ${amountValue}` : "—"}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm mt-1">
                                            <span className="text-gray-600">
                                                বছরে মোট ({summaryDetails.totalPayments} বার):
                                            </span>
                                            <span className="font-bold text-primary">
                                                {summaryDetails.totalAmount ? `৳ ${summaryDetails.totalAmount.toLocaleString("bn-BD")}` : "—"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <Link href="/donate" className="w-full">
                                            <button
                                                type="button"
                                                className="w-full px-4 py-3 border-2 border-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-50 transition"
                                            >
                                                ফিরে যান
                                            </button>
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50 shadow-md"
                                        >
                                            {isLoading ? "প্রক্রিয়াকরণ..." : "দান করুন"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms & Conditions Modal */}
            <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
                <DialogContent className="max-w-lg md:max-w-2xl" showCloseButton={true}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
                            📜 নিয়মিত দানের শর্তাবলী
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-2 text-sm text-gray-700 leading-relaxed">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="font-semibold text-amber-800 mb-2">⚠️ গুরুত্বপূর্ণ তথ্য</p>
                            <p>
                                নিয়মিত দান একটি স্বয়ংক্রিয় পদ্ধতি। আপনার অনুমোদনের পর প্রতিটি নির্ধারিত সময়ে আপনার অ্যাকাউন্ট থেকে
                                স্বয়ংক্রিয়ভাবে টাকা কেটে নেওয়া হবে।
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-bold text-gray-900">১. দানের ধরন ও পরিমাণ</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                <li>
                                    আপনি <strong>{summaryDetails.modeLabel}</strong> ভিত্তিতে{" "}
                                    <strong>৳ {amountValue || "০"}</strong> দান করতে সম্মত হচ্ছেন।
                                </li>
                                <li>
                                    প্রতি বছরে মোট <strong>{summaryDetails.totalPayments}</strong>টি পেমেন্ট হবে।
                                </li>
                                <li>
                                    বছরে মোট আনুমানিক পরিমাণ:{" "}
                                    <strong>৳ {summaryDetails.totalAmount.toLocaleString("bn-BD")}</strong>
                                </li>
                            </ul>

                            <h4 className="font-bold text-gray-900">২. স্বয়ংক্রিয় পেমেন্ট</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                <li>
                                    আপনার নির্বাচিত পেমেন্ট পদ্ধতি (বিকাশ/এসএসএলকমার্জ) অনুযায়ী প্রতিটি নির্ধারিত সময়ে স্বয়ংক্রিয়ভাবে
                                    পেমেন্ট প্রক্রিয়া হবে।
                                </li>
                                <li>পেমেন্ট সফল না হলে পুনরায় চেষ্টা করা হতে পারে।</li>
                                <li>আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স না থাকলে পেমেন্ট ব্যর্থ হবে।</li>
                            </ul>

                            <h4 className="font-bold text-gray-900">৩. বাতিল ও পরিবর্তন</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                <li>আপনি যেকোনো সময় নিয়মিত দান বাতিল করতে পারবেন।</li>
                                <li>
                                    বাতিল করতে{" "}
                                    <a href="mailto:contact@khairulummahfoundation.org" className="text-primary underline font-medium">
                                        contact@khairulummahfoundation.org
                                    </a>{" "}
                                    এ ইমেইল করুন।
                                </li>
                                <li>বাতিলের অনুরোধ প্রক্রিয়া হতে ১-৩ কর্মদিবস সময় লাগতে পারে।</li>
                                <li>দানের পরিমাণ পরিবর্তন করতে চাইলে পুরাতনটি বাতিল করে নতুন করে সেট করতে হবে।</li>
                            </ul>

                            <h4 className="font-bold text-gray-900">৪. তহবিল ব্যবহার</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                <li>আপনার দান ফাউন্ডেশনের কল্যাণমূলক কার্যক্রমে ব্যয় করা হবে।</li>
                                <li>এই তহবিল সমাজসেবা, শিক্ষা, স্বাস্থ্যসেবা ও জরুরি সাহায্যে ব্যবহৃত হয়।</li>
                                <li>তহবিলের ব্যবহার সম্পর্কে নিয়মিত প্রতিবেদন প্রকাশ করা হয়।</li>
                            </ul>

                            <h4 className="font-bold text-gray-900">৫. গোপনীয়তা</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                <li>আপনার ব্যক্তিগত তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।</li>
                                <li>পেমেন্ট সংক্রান্ত তথ্য নিরাপদ এনক্রিপশন পদ্ধতিতে সংরক্ষণ করা হয়।</li>
                                <li>তৃতীয় পক্ষের কাছে কোনো তথ্য শেয়ার করা হবে না।</li>
                            </ul>

                            <h4 className="font-bold text-gray-900">৬. রিফান্ড নীতি</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                                <li>একবার কাটা হয়ে গেলে দান ফেরতযোগ্য নয়।</li>
                                <li>ভুলবশত অতিরিক্ত পেমেন্ট হলে ইমেইলের মাধ্যমে যোগাযোগ করুন।</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-start gap-3 mb-4">
                            <input
                                type="checkbox"
                                id="termsAcceptModal"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-1 w-4 h-4 accent-primary rounded"
                            />
                            <label htmlFor="termsAcceptModal" className="text-sm text-gray-700">
                                আমি উপরোক্ত সকল শর্তাবলী পড়েছি এবং সম্মত হচ্ছি। আমি জানি যে আমি যেকোনো সময় এই নিয়মিত দান বাতিল করতে পারব।
                            </label>
                        </div>

                        <DialogFooter className="gap-3">
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                                >
                                    বাতিল
                                </button>
                            </DialogClose>
                            <button
                                type="button"
                                disabled={!termsAccepted || isLoading}
                                onClick={handleTermsAcceptAndSubmit}
                                className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                {isLoading ? "প্রক্রিয়াকরণ..." : "সম্মত হয়ে দান করুন"}
                            </button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
