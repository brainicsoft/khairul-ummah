"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { ShieldCheck, Smartphone, Sparkles } from "lucide-react"
import siginlogo from "@/assets/login.png"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^01[3-9]\d{8}$/

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(-11)

export default function SigninPage() {
    const [step, setStep] = useState<"contact" | "otp">("contact")
    const [contactValue, setContactValue] = useState("")
    const [otp, setOtp] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const isPhoneContact = (value: string) => phoneRegex.test(normalizePhone(value))

    const isValidContact = (value: string) => {
        if (!value.trim()) return false
        return emailRegex.test(value.trim()) || isPhoneContact(value)
    }

    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}

        if (!isValidContact(contactValue)) {
            newErrors.contact = "মোবাইল নম্বর অথবা ইমেইল দিন"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        // Simulate API call to send OTP
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)
        setErrors({})
        setStep("otp")
    }

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}

        if (!otp.trim()) {
            newErrors.otp = "ওটিপি প্রয়োজন"
        } else if (!/^\d{6}$/.test(otp)) {
            newErrors.otp = "৬ সংখ্যার ওটিপি প্রবেশ করুন"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        // Simulate API call to verify OTP
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(false)
        if (typeof window !== "undefined") {
            localStorage.setItem(
                "ku_user_contact",
                JSON.stringify({
                    contact: contactValue.trim(),
                    lastLogin: new Date().toISOString(),
                    isPhone: isPhoneContact(contactValue),
                }),
            )
        }

        router.push("/user/donation-dashboard")
    }

    return (
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Section - Form */}
            <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-xl md:p-10">
                <div className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <ShieldCheck className="h-5 w-5" />
                    নিরাপদ OTP যাচাইকরণ
                </div>
                <h1 className="mt-4 text-3xl font-bold text-foreground">প্রোফাইলে ঢুকতে লগইন করুন</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    আপনার দানের তালিকা, সাবস্ক্রিপশন এবং রশিদ এক জায়গায় পেতে মোবাইল নম্বর বা ইমেইল ব্যবহার করুন।
                </p>

                <form onSubmit={step === "contact" ? handleMobileSubmit : handleOtpSubmit} className="mt-8 space-y-6">
                        {step === "contact" ? (
                            <>
                                {/* Contact Input Step */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        মোবাইল নম্বর বা ইমেইল <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        value={contactValue}
                                        onChange={(e) => {
                                            setContactValue(e.target.value)
                                            if (errors.contact) {
                                                setErrors((prev) => {
                                                    const newErrors = { ...prev }
                                                    delete newErrors.contact
                                                    return newErrors
                                                })
                                            }
                                        }}
                                        placeholder="017XXXXXXXX বা name@email.com"
                                        className={`border-2 ${errors.contact ? "border-rose-400" : "border-border"} rounded-2xl px-4 py-5 text-base focus-visible:border-primary focus-visible:ring-primary/20`}
                                    />
                                    {errors.contact && <p className="text-red-500 text-sm mt-2">{errors.contact}</p>}
                                </div>

                                <div className="rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Smartphone className="h-4 w-4" />
                                        ব্যক্তিগত তথ্য সুরক্ষিত
                                    </div>
                                    <p className="mt-1 text-primary/90">OTP শুধুমাত্র লগইনের জন্য ব্যবহার হবে, অন্য কোনো জায়গায় শেয়ার করা হবে না।</p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-2xl bg-primary py-5 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
                                >
                                    {loading ? "প্রক্রিয়া হচ্ছে..." : "পরবর্তী ধাপ →"}
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* OTP Input Step */}
                                <div>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        আমরা <span className="font-semibold">{contactValue}</span> এ একটি কোড পাঠিয়েছি
                                    </p>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">
                                        ওটিপি কোড <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => {
                                            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                            if (errors.otp) {
                                                setErrors((prev) => {
                                                    const newErrors = { ...prev }
                                                    delete newErrors.otp
                                                    return newErrors
                                                })
                                            }
                                        }}
                                        placeholder="000000"
                                        maxLength={6}
                                        className={`border-2 ${errors.otp ? "border-rose-400" : "border-border"} rounded-2xl p-3 text-center text-2xl font-bold tracking-widest focus-visible:border-primary focus-visible:ring-primary/20`}
                                    />
                                    {errors.otp && <p className="text-red-500 text-sm mt-2">{errors.otp}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-2xl bg-primary py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
                                >
                                    {loading ? "যাচাই করছি..." : "সাইন ইন করুন"}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep("contact")
                                        setOtp("")
                                        setErrors({})
                                    }}
                                    className="w-full text-sm font-medium text-primary hover:underline"
                                >
                                    নম্বর পরিবর্তন করুন
                                </button>
                            </>
                        )}
                    <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                        <Sparkles className="mb-2 h-5 w-5 text-amber-500" />
                        নিয়মিত অনুদান, রশিদ ডাউনলোড এবং সাবস্ক্রিপশন বাতিল সবই এই একাউন্ট থেকে নিয়ন্ত্রণ করতে পারবেন।
                    </div>
                </form>
            </div>

            {/* Right Section - Illustration */}
            <div className="rounded-3xl bg-linear-to-br from-primary via-primary to-primary/80 p-8 text-primary-foreground shadow-xl">
                <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 text-sm backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/85">Referral Impact</p>
                    <h3 className="mt-3 text-2xl font-semibold">রেফারেলের লিংক শেয়ার করুন</h3>
                    <p className="mt-2 text-primary-foreground/90">অন্যকে উৎসাহিত করলে আপনার সম্পৃক্ততার সওয়াবও বাড়বে।</p>
                    <div className="mt-4 rounded-2xl bg-primary-foreground/10 p-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">গ্রহণকৃত রেফারেল অনুদান</span>
                            <span className="text-lg font-bold">৮০</span>
                        </div>
                        <p className="mt-1 text-primary-foreground/80">* ডেটা ডেমোর জন্য দেখানো হয়েছে</p>
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-center">
                    <Image src={siginlogo} alt="Login Illustration" className="h-auto w-72 drop-shadow-2xl" />
                </div>
            </div>
        </div>
    )
}
