"use client"

import Link from "next/link"
import { useState } from "react"

export function DonationCTA() {
  const [selectedAmount, setSelectedAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")

  const handleDonate = () => {
    // Redirect to donate page
    window.location.href = "/donate"
  }

  return (
    <section className="py-12 md:py-20 ">
      <div className="container mx-auto px-4">
        <div className="bg-primary/20 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">আপনার অনুদান প্রদান করুন</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">ক্যাটাগরি</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>নির্বাচন করুন</option>
                <option>শিক্ষা</option>
                <option>স্বাস্থ্য</option>
                <option>দক্ষতা উন্নয়ন</option>
                <option>দুর্যোগ ত্রাণ</option>
                <option>সাধারণ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">পেমেন্ট পদ্ধতি</label>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value="bkash" className="w-4 h-4" defaultChecked />
                  <span className="text-foreground">Bkash</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value="nagad" className="w-4 h-4" />
                  <span className="text-foreground">Nagad</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">পরিমাণ</label>
              <input
                type="number"
                placeholder="টাকার পরিমাণ"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <Link href="/donate">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
                দান করুন
              </button>
            </Link>
          </div>

          <p className="text-center text-sm text-foreground/80">
            খাইরুল উম্মাহ ফাউন্ডেশনে দান করুন এবং সমাজের উন্নয়নে অবদান রাখুন।{" "}
            <a href="#" className="text-primary hover:underline">
              বিস্তারিত জানতে ক্লিক করুন
            </a>
            ।
          </p>
        </div>
      </div>
    </section>
  )
}
