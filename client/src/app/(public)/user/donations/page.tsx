"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp } from "lucide-react"

interface DonationRecord {
  id: string
  title: string
  transactionId: string
  amount: number
  method: string
  date: string
  project: string
  message: string
}

const donationHistoryMock: DonationRecord[] = [
  {
    id: "don-1",
    title: "শীতবস্ত্র বিতরণ",
    transactionId: "TRX240225001",
    amount: 5000,
    method: "বিকাশ",
    date: "২৫ ফেব্রুয়ারি ২০২৬",
    project: "কুষ্টিয়া",
    message: "শীতার্ত পরিবারের জন্য দোয়া রইলো",
  },
  {
    id: "don-2",
    title: "রিলিফ জরুরি",
    transactionId: "TRX240210019",
    amount: 3200,
    method: "ব্যাংক",
    date: "১০ ফেব্রুয়ারি ২০২৬",
    project: "সুনামগঞ্জ",
    message: "জরুরি ত্রাণ ফান্ডে সহায়তা",
  },
  {
    id: "don-3",
    title: "কুরবানী শেয়ার",
    transactionId: "TRX250130044",
    amount: 8400,
    method: "কার্ড",
    date: "৩০ জানুয়ারি ২০২৬",
    project: "কক্সবাজার",
    message: "কুরবানীর অংশগ্রহণ",
  },
  {
    id: "don-4",
    title: "তহবিল সহায়তা",
    transactionId: "TRX250118110",
    amount: 1500,
    method: "নগদ",
    date: "১৮ জানুয়ারি ২০২৬",
    project: "ঢাকা",
    message: "সামান্য অনুদান গ্রহণ করুন",
  },
]

const formatAmount = (amount: number) => `৳${amount.toLocaleString("bn-BD")}`

export default function UserDonationsPage() {
  const summary = useMemo(() => {
    const totalOneTime = donationHistoryMock.reduce((sum, donation) => sum + donation.amount, 0)
    const latest = donationHistoryMock[0]

    return {
      totalOneTime,
      donationsCount: donationHistoryMock.length,
      latestDate: latest?.date ?? "-",
    }
  }, [])

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-primary/15 bg-linear-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">One Time Donations</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">এককালীন অনুদান তালিকা</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          এখানে শুধু one-time donation গুলো রাখা হয়েছে, যাতে আপনার history এক নজরে পরিষ্কারভাবে দেখা যায়।
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <TrendingUp className="mb-2 h-6 w-6 text-primary" />
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">মোট এককালীন</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{formatAmount(summary.totalOneTime)}</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">মোট ট্রানজেকশন</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{summary.donationsCount} টি</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">সর্বশেষ অনুদান</p>
            <p className="mt-2 text-xl font-semibold text-foreground">{summary.latestDate}</p>
          </div>
        </div>

        <div className="mt-6">
          <Button className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" /> রশিদ ডাউনলোড
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Donation List</p>
            <h2 className="text-2xl font-semibold text-foreground">one-time donations (date, amount, method, message)</h2>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-primary/5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">তারিখ</th>
                <th className="px-4 py-3">পরিমাণ</th>
                <th className="px-4 py-3">মেথড</th>
                <th className="px-4 py-3">মেসেজ</th>
                <th className="px-4 py-3">ডিটেইলস</th>
              </tr>
            </thead>
            <tbody>
              {donationHistoryMock.map((donation) => (
                <tr key={donation.id} className="border-t border-border text-foreground">
                  <td className="px-4 py-4">{donation.date}</td>
                  <td className="px-4 py-4 font-semibold text-primary">{formatAmount(donation.amount)}</td>
                  <td className="px-4 py-4">{donation.method}</td>
                  <td className="px-4 py-4 text-muted-foreground">{donation.message}</td>
                  <td className="px-4 py-4">
                    <p className="font-medium">{donation.title}</p>
                    <p className="text-xs text-muted-foreground">{donation.project} · {donation.transactionId}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
