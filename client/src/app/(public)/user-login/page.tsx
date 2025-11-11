"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import siginlogo from '@/assets/login.png'
export default function SigninPage() {
    const [step, setStep] = useState<"mobile" | "otp">("mobile")
    const [mobileNumber, setMobileNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)

    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}

        if (!mobileNumber.trim()) {
            newErrors.mobile = "মোবাইল নম্বর প্রয়োজন"
        } else if (!/^01[3-9]\d{8}$/.test(mobileNumber.replace(/\D/g, ""))) {
            newErrors.mobile = "বৈধ মোবাইল নম্বর প্রবেশ করুন"
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
        console.log("Signin successful with:", mobileNumber)
    }

    return (
        <div className="container min-h-[calc(100vh-220px)] mx-auto flex flex-col-reverse md:flex-row bg-cyan-50 border md:my-16 rounded-2xl pb-8 md:p-0">
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-primary mb-2">আপনার আকাউন্ট লগইন করুন।</h1>

                    <form onSubmit={step === "mobile" ? handleMobileSubmit : handleOtpSubmit} className="mt-8">
                        {step === "mobile" ? (
                            <>
                                {/* Mobile Input Step */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-teal-700 mb-2">
                                        মোবাইল / ইমেইল <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="tel"
                                        value={mobileNumber}
                                        onChange={(e) => {
                                            setMobileNumber(e.target.value)
                                            if (errors.mobile) {
                                                setErrors((prev) => {
                                                    const newErrors = { ...prev }
                                                    delete newErrors.mobile
                                                    return newErrors
                                                })
                                            }
                                        }}
                                        placeholder="01728306504"
                                        className={`border-2 ${errors.mobile ? "border-red-500" : "border-gray-200"
                                            } rounded-lg px-4 py-5 text-base focus:outline-none focus:border-teal-500`}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile}</p>}
                                </div>

                                <p className="text-xs text-gray-500 mb-6">আপনার অ্যাকাউন্টে কোনো ডেটা শেয়ার হবে না</p>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-5 rounded-lg text-base"
                                >
                                    {loading ? "প্রক্রিয়া হচ্ছে..." : "পরবর্তী ধাপ →"}
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* OTP Input Step */}
                                <div className="mb-2">
                                    <p className="text-sm text-gray-700 mb-4">
                                        আমরা <span className="font-semibold">{mobileNumber}</span> এ একটি কোড পাঠিয়েছি
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-primary mb-2">
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
                                        className={`border-2 ${errors.otp ? "border-red-500" : "border-gray-200"
                                            } rounded-lg p-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-teal-500`}
                                    />
                                    {errors.otp && <p className="text-red-500 text-sm mt-2">{errors.otp}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:primary/80 text-white font-semibold py-3 rounded-lg text-base"
                                >
                                    {loading ? "যাচাই করছি..." : "সাইন ইন করুন"}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep("mobile")
                                        setOtp("")
                                        setErrors({})
                                    }}
                                    className="w-full mt-3 text-teal-600 font-medium text-sm hover:underline"
                                >
                                    নম্বর পরিবর্তন করুন
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>

            {/* Right Section - Illustration */}
            <div className=" md:w-1/2 bg-gradient-to-b from-yellow-50 to-yellow-50 items-center justify-center p-12 ">

                <Image src={siginlogo} alt="Logo" width={500} height={200} />
            </div>
        </div>
    )
}
