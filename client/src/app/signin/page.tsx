"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <div className="container mx-auto  flex bg-cyan-50 border my-16 rounded-2xl">
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
                    className={`border-2 ${
                      errors.mobile ? "border-red-500" : "border-gray-200"
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
                    className={`border-2 ${
                      errors.otp ? "border-red-500" : "border-gray-200"
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
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-yellow-100 to-yellow-50 items-center justify-center p-12">
        <svg viewBox="0 0 400 400" className="w-full max-w-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sky background */}
          <rect width="400" height="400" fill="#F5E6C8" />

          {/* Clouds */}
          <circle cx="280" cy="80" r="35" fill="white" opacity="0.8" />
          <circle cx="310" cy="90" r="28" fill="white" opacity="0.7" />
          <circle cx="250" cy="95" r="25" fill="white" opacity="0.7" />

          {/* Moon */}
          <circle cx="340" cy="60" r="12" fill="#FFD700" />

          {/* Palm tree trunk */}
          <rect x="100" y="140" width="20" height="120" fill="#8B6F47" />

          {/* Palm leaves */}
          <circle cx="110" cy="110" r="45" fill="#6DB84C" />
          <ellipse cx="95" cy="100" rx="25" ry="35" fill="#7EC850" transform="rotate(-30 95 100)" />
          <ellipse cx="125" cy="100" rx="25" ry="35" fill="#7EC850" transform="rotate(30 125 100)" />

          {/* Mosque dome */}
          <ellipse cx="240" cy="180" rx="55" ry="70" fill="#5B9BD5" />

          {/* Mosque minaret */}
          <rect x="300" y="120" width="18" height="100" fill="#4A7BA7" />
          <circle cx="309" cy="110" r="15" fill="#FFD700" />
          <polygon points="309,95 300,110 318,110" fill="#FFD700" />

          {/* Minaret top - decorative */}
          <circle cx="309" cy="115" r="12" fill="#5B9BD5" />

          {/* Mosque entrance */}
          <rect x="220" y="220" width="40" height="60" fill="#3D5A80" />
          <circle cx="240" cy="210" r="25" fill="#5B9BD5" opacity="0.6" />

          {/* Ground */}
          <ellipse cx="200" cy="350" rx="150" ry="40" fill="#D4A574" />

          {/* Ground plants */}
          <circle cx="150" cy="360" r="4" fill="#6DB84C" />
          <circle cx="180" cy="365" r="4" fill="#6DB84C" />
          <circle cx="220" cy="368" r="4" fill="#6DB84C" />
          <circle cx="260" cy="364" r="4" fill="#6DB84C" />

          {/* Person 1 - yellow shirt */}
          <circle cx="140" cy="250" r="12" fill="#F4A460" />
          <rect x="130" y="265" width="20" height="30" fill="#FFD700" />
          <rect x="125" y="285" width="30" height="25" fill="#6B4423" />

          {/* Person 2 - red dress */}
          <circle cx="260" cy="250" r="12" fill="#E8956F" />
          <polygon points="245,265 275,265 270,295 250,295" fill="#E74C3C" />
          <rect x="245" y="295" width="30" height="20" fill="#6B4423" />

          {/* Handshake between people */}
          <line x1="155" y1="280" x2="245" y2="280" stroke="#C0A080" strokeWidth="2" />
          <circle cx="160" cy="280" r="3" fill="#F4A460" />
          <circle cx="240" cy="280" r="3" fill="#E8956F" />

          {/* Fence sections */}
          <line x1="200" y1="320" x2="200" y2="345" stroke="#87CEEB" strokeWidth="3" />
          <line x1="220" y1="320" x2="220" y2="345" stroke="#87CEEB" strokeWidth="3" />
          <line x1="240" y1="320" x2="240" y2="345" stroke="#87CEEB" strokeWidth="3" />
          <line x1="190" y1="325" x2="250" y2="325" stroke="#87CEEB" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}
