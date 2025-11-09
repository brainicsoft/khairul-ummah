"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
    toast.success("আপনার ইমেইল সাবস্ক্রাইব করা হয়েছে!")
  }

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">আমাদের নিউজলেটার সাবস্ক্রাইব করুন</h2>
          <p className="mb-8 opacity-90">সর্বশেষ খবর এবং আপডেট পান সরাসরি আপনার ইমেইলে।</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white px-6 py-3 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition"
            >
              সাবস্ক্রাইব করুন
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
