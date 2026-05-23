"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { DonatesTypesMenue, type DonationFundOption } from "../DonatesTypesMenue"

export function HeroDonationForm() {
  const router = useRouter()
  const [funds, setFunds] = useState<DonationFundOption[]>([])
  const [fundSlug, setFundSlug] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(() => {
    DonatesTypesMenue().then((data) => {
      setFunds(data)
      if (data[0]?.slug) setFundSlug(data[0].slug)
    })
  }, [])

  const handleDonate = () => {
    if (!fundSlug) {
      toast.error("অনুগ্রহ করে তহবিল বেছে নিন")
      return
    }
    if (!amount || Number(amount) < 10) {
      toast.error("কমপক্ষে ১০ টাকা লিখুন")
      return
    }
    router.push(
      `/donate/${encodeURIComponent(fundSlug)}?amount=${encodeURIComponent(amount)}`
    )
  }

  const inputClass =
    "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <div
      id="donate"
      className="scroll-mt-28 w-full overflow-hidden rounded-2xl border-4 border-brand-light bg-white text-foreground shadow-2xl"
    >
      <div className="bg-primary px-6 py-4 text-center text-primary-foreground">
        <h2 className="text-xl font-bold md:text-2xl">দ্রুত দান করুন</h2>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-5 md:p-6 lg:p-8">
        <div>
          <label className="mb-2 block text-sm font-bold text-primary">
            তহবিল বেছে নিন
          </label>
          <select
            className={inputClass}
            value={fundSlug}
            onChange={(e) => setFundSlug(e.target.value)}
          >
            <option value="">তহবিল...</option>
            {funds.map((fund) => (
              <option key={fund._id} value={fund.slug}>
                {fund.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-primary">
            পরিমাণ (টাকা)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">
              ৳
            </span>
            <input
              type="number"
              min={10}
              placeholder="যেমন: ৫০০"
              className={`${inputClass} pl-9`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleDonate}
          className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-secondary px-8 text-lg font-bold text-secondary-foreground shadow-md transition hover:bg-secondary/90 md:min-w-[180px]"
        >
          দান করুন
        </button>
      </div>
    </div>
  )
}
