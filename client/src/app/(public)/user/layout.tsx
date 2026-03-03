"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gift, Share2, Users, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/user", label: "প্রোফাইল লগইন" },
  { href: "/user/donations", label: "One-Time অনুদান" },
  { href: "/user/regular-donations", label: "Regular অনুদান" },
  { href: "/user/donation-dashboard", label: "ড্যাশবোর্ড" },
]

const referralStats = [
  { id: "stat-1", label: "সংরক্ষিত রশিদ", value: "১২" },
  { id: "stat-2", label: "সক্রিয় সাবস্ক্রিপশন", value: "৩" },
  { id: "stat-3", label: "শেয়ার হওয়া দাতা", value: "৮০" },
]

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="bg-background">
      <div className="bg-linear-to-r from-primary via-primary to-primary/85 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10">
          <p className="text-xs uppercase tracking-[0.5em] text-primary-foreground/80">Donor Console</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
                সাদাকা বিপদাপদ দূর করে — নিজের দান নিয়মিত করুন
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-primary-foreground/90">
                সমস্ত নিয়মিত অনুদান, সাবস্ক্রিপশন এবং রশিদের তথ্য এই পোর্টাল থেকেই দেখুন। আপনার প্রতিটি সহায়তা
                আমাদের চলমান প্রজেক্টগুলোকে দ্রুত বাস্তবায়নে সাহায্য করে।
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-base font-semibold text-secondary-foreground shadow-lg transition hover:opacity-90"
              >
                <Gift className="h-5 w-5" /> নিয়মিত অনুদান করুন
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/50 px-5 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                <Share2 className="h-5 w-5" /> শেয়ার লিংক
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl grid gap-4 px-4 pb-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-sm font-semibold text-primary-foreground/85">
              <Wallet className="h-5 w-5" /> মাসিক প্রতিশ্রুতি আপডেট
            </div>
            <p className="mt-3 text-lg font-semibold text-primary-foreground">আপনার দান সমূহ সঠিক সময়ে পৌঁছাচ্ছে কিনা যাচাই করুন।</p>
            <p className="text-sm text-primary-foreground/85">* ডেটা ডেমো হিসেবে দেখানো হয়েছে।</p>
          </div>
          <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3 text-sm font-semibold text-primary-foreground/85">
              <Users className="h-5 w-5" /> রেফারেল প্রগ্রেস
            </div>
            <p className="mt-2 text-lg font-semibold text-primary-foreground">নিজের লিংক শেয়ার করে অন্যকে উৎসাহ দিন</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-primary-foreground/85">
              {referralStats.map((stat) => (
                <div key={stat.id} className="rounded-2xl bg-primary-foreground/10 p-3">
                  <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl -mt-8 px-4 pb-12">
        <div className="rounded-3xl border border-primary/10 bg-card shadow-xl">
          <nav className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-4 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-2xl px-4 py-2 transition",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
