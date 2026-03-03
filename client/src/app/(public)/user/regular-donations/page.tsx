"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendarClock, PauseCircle, RefreshCcw } from "lucide-react"

interface RegularPlan {
  id: string
  title: string
  amount: number
  frequency: "monthly" | "weekly"
  nextDebit: string
  status: "active" | "paused"
}

interface DailyDonation {
  id: string
  day: string
  title: string
  amount: number
  status: "processed" | "pending"
}

const regularPlanMock: RegularPlan[] = [
  {
    id: "plan-1",
    title: "শিক্ষা সহায়তা",
    amount: 2500,
    frequency: "monthly",
    nextDebit: "১২ মার্চ ২০২৬",
    status: "active",
  },
  {
    id: "plan-2",
    title: "দৈনিক ইফতার",
    amount: 220,
    frequency: "weekly",
    nextDebit: "০৬ মার্চ ২০২৬",
    status: "active",
  },
  {
    id: "plan-3",
    title: "স্বাস্থ্য তহবিল",
    amount: 1800,
    frequency: "monthly",
    nextDebit: "২০ মার্চ ২০২৬",
    status: "paused",
  },
]

const dailyDonationsMock: DailyDonation[] = [
  {
    id: "daily-1",
    day: "আজ · ২ মার্চ",
    title: "সকাল ইফতার প্যাকেজ",
    amount: 420,
    status: "processed",
  },
  {
    id: "daily-2",
    day: "গতকাল",
    title: "গরীব খাদ্য সহায়তা",
    amount: 320,
    status: "processed",
  },
  {
    id: "daily-3",
    day: "শুক্রবার",
    title: "দৈনিক সাদকা",
    amount: 150,
    status: "pending",
  },
]

const formatAmount = (amount: number) => `৳${amount.toLocaleString("bn-BD")}`

export default function UserRegularDonationsPage() {
  const [regularPlans, setRegularPlans] = useState<RegularPlan[]>(regularPlanMock)
  const [selectedPlan, setSelectedPlan] = useState<RegularPlan | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const summary = useMemo(() => {
    const activePlans = regularPlans.filter((plan) => plan.status === "active")
    const monthlyCommitment = activePlans
      .filter((plan) => plan.frequency === "monthly")
      .reduce((sum, plan) => sum + plan.amount, 0)

    return {
      activeCount: activePlans.length,
      monthlyCommitment,
    }
  }, [regularPlans])

  const handleCancelClick = (plan: RegularPlan) => {
    setSelectedPlan(plan)
    setDialogOpen(true)
  }

  const confirmCancellation = () => {
    if (!selectedPlan) return
    setRegularPlans((prev) =>
      prev.map((plan) =>
        plan.id === selectedPlan.id
          ? {
              ...plan,
              status: "paused",
            }
          : plan,
      ),
    )
    setDialogOpen(false)
  }

  const handleReactivate = (planId: string) => {
    setRegularPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: "active",
            }
          : plan,
      ),
    )
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-primary/15 bg-linear-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Subscription Center</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">নিয়মিত অনুদান</h1>
        <p className="mt-2 text-sm text-muted-foreground">Subscription এবং daily commitments এর জন্য clean overview.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">সক্রিয় সাবস্ক্রিপশন</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{summary.activeCount} টি</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-card p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">মাসিক কমিটমেন্ট</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{formatAmount(summary.monthlyCommitment)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Plans</p>
              <h2 className="text-2xl font-semibold text-foreground">সাবস্ক্রিপশন তালিকা</h2>
            </div>
            <CalendarClock className="h-8 w-8 text-primary" />
          </div>

          <div className="mt-5 space-y-3">
            {regularPlans.map((plan) => (
              <div key={plan.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
                    {plan.frequency === "monthly" ? "মাসিক" : "সাপ্তাহিক"}
                  </p>
                  <p className="text-lg font-semibold text-foreground">{plan.title}</p>
                  <p className="text-xs text-muted-foreground">পরবর্তী চার্জ: {plan.nextDebit}</p>
                </div>

                <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-3">
                  <span className="text-lg font-semibold text-foreground">{formatAmount(plan.amount)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      plan.status === "active" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {plan.status === "active" ? "চলমান" : "স্থগিত"}
                  </span>

                  {plan.status === "active" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-rose-600 hover:bg-rose-50"
                      onClick={() => handleCancelClick(plan)}
                    >
                      <PauseCircle className="mr-1.5 h-4 w-4" /> বিরতি
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleReactivate(plan.id)}>
                      <RefreshCcw className="mr-1.5 h-4 w-4" /> চালু
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-card p-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Daily Donations</p>
            <h2 className="text-2xl font-semibold text-foreground">দৈনিক দান তালিকা</h2>
          </div>

          <div className="mt-4 divide-y divide-border">
            {dailyDonationsMock.map((day) => (
              <div key={day.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">{day.day}</p>
                  <p className="text-lg font-semibold text-foreground">{day.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-foreground">{formatAmount(day.amount)}</p>
                  <p className="text-xs text-muted-foreground">{day.status === "processed" ? "সম্পন্ন" : "অপেক্ষমান"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg rounded-3xl border-primary/20 bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">সাবস্ক্রিপশন বিরতি নিশ্চিত করুন</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedPlan?.title} পরিকল্পনাটি আপাতত বন্ধ করা হবে।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="rounded-2xl" onClick={() => setDialogOpen(false)}>
              ফিরে যান
            </Button>
            <Button className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90" onClick={confirmCancellation}>
              নিশ্চিত করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
