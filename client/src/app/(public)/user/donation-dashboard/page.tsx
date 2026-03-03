"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Download,
  FileSpreadsheet,
  Flame,
  HeartHandshake,
  PauseCircle,
  Repeat,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

interface RegularPlan {
  id: string
  title: string
  amount: number
  nextDebit: string
  status: "active" | "paused"
  category: "regular" | "weekly"
}

interface OneTimeDonation {
  id: string
  title: string
  amount: number
  date: string
  impact: string
}

interface DailySubscription {
  id: string
  title: string
  amount: number
  active: boolean
  startedOn: string
  streakInDays: number
}

interface DonationRecord {
  id: string
  title: string
  transactionId: string
  amount: number
  method: string
  date: string
  status: "completed" | "pending" | "refunded"
}

interface CancellationStep {
  id: string
  title: string
  detail: string
  status: "done" | "current" | "upcoming"
}

const regularPlans: RegularPlan[] = [
  {
    id: "regular-1",
    title: "মাসিক শিক্ষা সহায়তা",
    amount: 2500,
    nextDebit: "০৭ মার্চ ২০২৬",
    status: "active",
    category: "regular",
  },
  {
    id: "regular-2",
    title: "স্বাস্থ্য সেবা তহবিল",
    amount: 1800,
    nextDebit: "১২ মার্চ ২০২৬",
    status: "active",
    category: "regular",
  },
  {
    id: "weekly-1",
    title: "শুক্রবারের খাদ্য বিতরণ",
    amount: 1200,
    nextDebit: "০৬ মার্চ ২০২৬",
    status: "active",
    category: "weekly",
  },
]

const oneTimeDonations: OneTimeDonation[] = [
  {
    id: "ot-1",
    title: "শীতবস্ত্র বিতরণ",
    amount: 5000,
    date: "১৫ জানুয়ারি ২০২৬",
    impact: "৩৫ পরিবার",
  },
  {
    id: "ot-2",
    title: "রিলিফ ক্যাম্প",
    amount: 3200,
    date: "১০ ফেব্রুয়ারি ২০২৬",
    impact: "৫৮ উপকারভোগী",
  },
]

const recentActivities = [
  {
    id: "timeline-1",
    label: "নিয়মিত অনুদান",
    detail: "মাসিক শিক্ষা সহায়তার অর্থ কেটে নেওয়া হয়েছে",
    date: "০৩ মার্চ ২০২৬",
  },
  {
    id: "timeline-2",
    label: "সাপ্তাহিক অনুদান",
    detail: "খাদ্য বিতরণ অভিযান সম্পন্ন",
    date: "০১ মার্চ ২০২৬",
  },
  {
    id: "timeline-3",
    label: "এককালীন অনুদান",
    detail: "রিলিফ ক্যাম্পের অনুদান প্রাপ্ত",
    date: "১০ ফেব্রুয়ারি ২০২৬",
  },
]

const initialDailySubscription: DailySubscription = {
  id: "daily-iftar",
  title: "দৈনিক ইফতার সহায়তা",
  amount: 220,
  active: true,
  startedOn: "১৪ ফেব্রুয়ারি ২০২৬",
  streakInDays: 18,
}

const donationHistory: DonationRecord[] = [
  {
    id: "don-1",
    title: "সর্বশেষ অনুদান",
    transactionId: "TRX240225001",
    amount: 1500,
    method: "বিকাশ",
    date: "২৫ ফেব্রুয়ারি ২০২৬ · ১২:৪৫ PM",
    status: "completed",
  },
  {
    id: "don-2",
    title: "স্বাস্থ্য সেবা",
    transactionId: "TRX240210019",
    amount: 2200,
    method: "ব্যাংক",
    date: "১০ ফেব্রুয়ারি ২০২৬ · ০৯:৩০ AM",
    status: "completed",
  },
  {
    id: "don-3",
    title: "শীতবস্ত্র তহবিল",
    transactionId: "TRX250130044",
    amount: 5000,
    method: "নগদ",
    date: "৩০ জানুয়ারি ২০২৬ · ০৬:২০ PM",
    status: "completed",
  },
  {
    id: "don-4",
    title: "রিলিফ জরুরি",
    transactionId: "TRX250118110",
    amount: 3200,
    method: "কার্ড",
    date: "১৮ জানুয়ারি ২০২৬ · ০৪:১৫ PM",
    status: "pending",
  },
]

const cancellationJourneySteps: CancellationStep[] = [
  {
    id: "step-1",
    title: "অনুরোধ পাঠান",
    detail: "OTP দিয়ে নিশ্চিত হয়ে বাতিলের কারণ উল্লেখ করুন।",
    status: "done",
  },
  {
    id: "step-2",
    title: "টিম রিভিউ",
    detail: "২৪ ঘণ্টার মধ্যে সাপোর্ট টিম রিভিউ সম্পন্ন করবে।",
    status: "current",
  },
  {
    id: "step-3",
    title: "স্ট্যাটাস আপডেট",
    detail: "SMS এবং ইমেইলে নিশ্চিতকরণ পাঠানো হবে।",
    status: "upcoming",
  },
]

const formatAmount = (amount: number) => `৳${amount.toLocaleString("bn-BD")}`

export default function DonationDashboardPage() {
  const [userContact, setUserContact] = useState("অতিথি দাতা")
  const [lastLogin, setLastLogin] = useState<string | null>(null)
  const [dailySubscription, setDailySubscription] = useState(initialDailySubscription)
  const handleDownloadReceipts = () => {
    console.log("download receipts")
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = localStorage.getItem("ku_user_contact")
      if (!stored) return
      const parsed = JSON.parse(stored)
      if (parsed?.contact) setUserContact(parsed.contact)
      if (parsed?.lastLogin) setLastLogin(parsed.lastLogin)
    } catch {
      // ignore corrupted data
    }
  }, [])

  const summaryMetrics = useMemo(() => {
    const monthlyRegular = regularPlans
      .filter((plan) => plan.category === "regular")
      .reduce((sum, plan) => sum + plan.amount, 0)
    const weeklyCommitment = regularPlans
      .filter((plan) => plan.category === "weekly")
      .reduce((sum, plan) => sum + plan.amount, 0)
    const oneTimeTotal = oneTimeDonations.reduce((sum, donation) => sum + donation.amount, 0)

    return [
      {
        id: "metric-1",
        label: "মাসিক প্রতিশ্রুতি",
        value: formatAmount(monthlyRegular),
        subtext: "নিয়মিত অনুদান",
        icon: TrendingUp,
        accent: "from-orange-200/70 to-amber-100",
      },
      {
        id: "metric-2",
        label: "সাপ্তাহিক অনুদান",
        value: formatAmount(weeklyCommitment),
        subtext: "প্রতি শুক্রবার",
        icon: Repeat,
        accent: "from-sky-200/60 to-blue-100",
      },
      {
        id: "metric-3",
        label: "এককালীন মোট",
        value: formatAmount(oneTimeTotal),
        subtext: "বর্তমান বছরের",
        icon: HeartHandshake,
        accent: "from-emerald-200/60 to-green-100",
      },
    ]
  }, [])

  const handleToggleSubscription = () => {
    setDailySubscription((prev) => ({
      ...prev,
      active: !prev.active,
    }))
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-emerald-50 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 md:p-10">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Donation Access</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
                স্বাগতম, <span className="text-primary">{userContact}</span>
              </h1>
              <p className="text-sm text-slate-500">
                সর্বশেষ লগইন: {lastLogin ? new Date(lastLogin).toLocaleString("bn-BD") : "এইমাত্র"}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="rounded-xl border border-slate-200/70 bg-white/60 px-4 py-2 text-slate-600 shadow-sm">
                <span className="font-semibold text-slate-900">OTP</span> যাচাইকৃত
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-white/60 px-4 py-2 text-slate-600 shadow-sm">
                আইডি: KU-{userContact.slice(-4).padStart(4, "0")}
              </div>
            </div>
          </header>

        <div className="grid gap-5 md:grid-cols-3">
          {summaryMetrics.map((metric) => (
            <div
              key={metric.id}
              className={`rounded-2xl border border-white/70 bg-gradient-to-b ${metric.accent} p-6 shadow-inner`}
            >
              <metric.icon className="mb-4 h-8 w-8 text-slate-800" />
              <p className="text-sm uppercase tracking-wider text-slate-600">{metric.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
              <p className="text-sm text-slate-600">{metric.subtext}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-100 bg-white/70 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">নিয়মিত + সাপ্তাহিক</p>
                  <h2 className="text-2xl font-semibold text-slate-900">অনুদান পরিকল্পনা</h2>
                </div>
                <ShieldCheck className="h-9 w-9 text-emerald-500" />
              </div>
              <div className="mt-6 space-y-4">
                {regularPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 shadow-sm"
                  >
                    <div className="flex-1 min-w-[180px]">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {plan.category === "regular" ? "নিয়মিত" : "সাপ্তাহিক"}
                      </p>
                      <p className="text-lg font-semibold text-slate-900">{plan.title}</p>
                      <p className="text-sm text-slate-500">পরবর্তী কেটে নেওয়া: {plan.nextDebit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-slate-900">{formatAmount(plan.amount)}</p>
                      <span className="text-xs uppercase tracking-wide text-emerald-600">{plan.status === "active" ? "চলমান" : "বিরত"}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white"
                    >
                      পরিবর্তন করুন
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Daily Subscription</p>
                    <h3 className="text-xl font-semibold text-slate-900">{dailySubscription.title}</h3>
                    <p className="text-sm text-slate-500">সক্রিয় দিনের ধারাবাহিকতা: {dailySubscription.streakInDays} দিন</p>
                  </div>
                  <Flame className={`h-8 w-8 ${dailySubscription.active ? "text-amber-500" : "text-slate-300"}`} />
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-500">প্রতিদিন</p>
                    <p className="text-2xl font-semibold text-slate-900">{formatAmount(dailySubscription.amount)}</p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <p>শুরুর দিন</p>
                    <p className="font-semibold text-slate-800">{dailySubscription.startedOn}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleToggleSubscription}
                  className={`${dailySubscription.active ? "bg-rose-500 hover:bg-rose-600" : "bg-emerald-500 hover:bg-emerald-600"} mt-4 w-full text-white`}
                >
                  {dailySubscription.active ? "সাবস্ক্রিপশন বাতিল করুন" : "পুনরায় সক্রিয় করুন"}
                </Button>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Recent Signals</p>
                    <h3 className="text-xl font-semibold text-slate-900">সময়সূচী ও রিমাইন্ডার</h3>
                  </div>
                  <Clock3 className="h-7 w-7 text-slate-400" />
                </div>
                <div className="mt-4 space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-semibold text-slate-800">{activity.label}</p>
                      <p className="text-sm text-slate-500">{activity.detail}</p>
                      <p className="text-xs uppercase tracking-widest text-slate-400">{activity.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-100 bg-white/85 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">এককালীন অনুদান</p>
                <h2 className="text-2xl font-semibold text-slate-900">সাম্প্রতিক সহায়তা</h2>
              </div>
              <CalendarClock className="h-8 w-8 text-slate-400" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {oneTimeDonations.map((donation) => (
                <div key={donation.id} className="rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{donation.title}</p>
                      <p className="text-sm text-slate-500">তারিখ: {donation.date}</p>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-semibold text-slate-900">{formatAmount(donation.amount)}</p>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      প্রভাব: {donation.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Support</p>
                  <h3 className="text-xl font-semibold text-slate-900">সহজ সহায়তা</h3>
                </div>
                <ShieldCheck className="h-7 w-7 text-emerald-500" />
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• অনুদান পরিবর্তন বা বিরতি নিলে সাথে সাথে নোটিফিকেশন পাবেন।</li>
                <li>• সাবস্ক্রিপশন বাতিলের পর আবার চালু করলে পূর্বের ইতিহাস সংরক্ষিত থাকবে।</li>
                <li>• যেকোন সময় রশিদ পেতে "সহায়তা" বোতাম ব্যবহার করুন।</li>
              </ul>
              <Button type="button" variant="outline" className="mt-5 border-slate-200 text-slate-700">
                সহায়তা টিমে বার্তা পাঠান
              </Button>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Reminder</p>
                  <h3 className="text-xl font-semibold text-slate-900">আগামী কার্যক্রম</h3>
                </div>
                <Repeat className="h-7 w-7 text-slate-400" />
              </div>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <p className="font-semibold text-slate-900">০৬ মার্চ · সাপ্তাহিক অনুদান</p>
                  <p>খাদ্য বিতরণ তহবিল সংগ্রহ হবে।</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <p className="font-semibold text-slate-900">১২ মার্চ · নিয়মিত অনুদান</p>
                  <p>স্বাস্থ্য সেবা ফান্ড এর কিস্তির দিন।</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <p className="font-semibold text-slate-900">১৪ মার্চ · দৈনিক সাবস্ক্রিপশন</p>
                  <p>দিনের শেষ কেটে নেওয়া পাচ্ছেন কিনা যাচাই করুন।</p>
                </div>
              </div>
            </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">আপনার অনুদানসমূহ</p>
                <h3 className="text-2xl font-semibold text-slate-900">০১ জানুয়ারি থেকে ০১ মার্চ পর্যন্ত</h3>
                <p className="text-sm text-slate-500">সমস্ত ট্রানজেকশনের বিবরণ ও রশিদ এখানে পাবেন</p>
              </div>
              <div className="flex gap-3 text-sm">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  সর্বশেষ আগে
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReceipts}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
                >
                  <Download className="h-4 w-4" /> ডাউনলোড করুন
                </button>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-600">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <th className="pb-3">অনুদানের শিরোনাম</th>
                    <th className="pb-3">সময়</th>
                    <th className="pb-3 text-right">পরিমাণ</th>
                    <th className="pb-3 text-center">স্ট্যাটাস</th>
                    <th className="pb-3 text-center">রশিদ</th>
                  </tr>
                </thead>
                <tbody>
                  {donationHistory.map((donation) => (
                    <tr key={donation.id} className="border-t border-slate-100 text-sm">
                      <td className="py-4">
                        <p className="font-semibold text-slate-900">{donation.title}</p>
                        <p className="text-xs text-slate-500">{donation.transactionId} · {donation.method}</p>
                      </td>
                      <td className="py-4 text-slate-600">{donation.date}</td>
                      <td className="py-4 text-right text-lg font-semibold text-slate-900">{formatAmount(donation.amount)}</td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            donation.status === "completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : donation.status === "pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {donation.status === "completed" ? "সফল" : donation.status === "pending" ? "বিচারাধীন" : "ফেরত"}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          <FileSpreadsheet className="h-3.5 w-3.5" /> রশিদ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 p-4 text-sm text-slate-600">
              * ডেমো ডেটা দেখানো হয়েছে। বাস্তবে আপনার বাস্তব অনুদানগুলো প্রদর্শিত হবে।
            </div>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white/85 p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rose-500">সাবস্ক্রিপশন বাতিলের যাত্রা</p>
                <h3 className="text-2xl font-semibold text-slate-900">চাইলে যেকোন সময় বাতিল করুন</h3>
                <p className="text-sm text-slate-500">শুধু OTP যাচাই হলেই সাথে সাথে অনুরোধ গৃহীত হবে।</p>
              </div>
              <AlertTriangle className="h-7 w-7 text-rose-400" />
            </div>
            <div className="mt-6 space-y-4">
              {cancellationJourneySteps.map((step, index) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        step.status === "done"
                          ? "bg-emerald-100 text-emerald-700"
                          : step.status === "current"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < cancellationJourneySteps.length - 1 && <span className="h-6 w-px bg-slate-200" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="text-sm text-slate-500">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-sm text-rose-600">
              <p className="font-semibold">অটোমেশন</p>
              <p>আপনি বাতিল করলে একই দিনে দৈনিক কেটে নেওয়া বন্ধ হয়ে যাবে। পুনরায় চালু করতে মাত্র একটি ক্লিকই যথেষ্ট।</p>
            </div>
            <Button
              type="button"
              className="mt-5 w-full rounded-2xl bg-rose-500 py-4 text-white hover:bg-rose-600"
            >
              <PauseCircle className="mr-2 h-5 w-5" /> বর্তমান সাবস্ক্রিপশন বাতিল করুন
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
