"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Gift, CheckCircle, AlertCircle, ChevronDown } from "lucide-react"
import { useState } from "react"

interface SummaryCardsProps {
  summary: any
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const [open, setOpen] = useState(false)
  const totalAmount = summary?.totalAmount || 0
  const donationTypeTotals = summary?.donationTypeTotals || []
  const status = summary?.status || {}

  const stats = [
    {
      title: "মোট ডোনেশন",
      value: `৳ ${totalAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "ডোনেশন প্রকার",
      value: donationTypeTotals.length.toString(),
      icon: Gift,
      color: "bg-purple-500",
    },
    {
      title: "সফল ডোনেশন",
      value: status.success?.toString() || "0",
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      title: "লম্বিত ডোনেশন",
      value: status.pending?.toString() || "0",
      icon: AlertCircle,
      color: "bg-yellow-500",
    },
    {
      title: "বাতিল ডোনেশন",
      value: status.failed?.toString() || "0",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-6">

      {/* -------- Summary Top Cards -------- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color} p-0.5 rounded text-white`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* -------- Donation Type Breakdown -------- */}
      <Card>
      <CardHeader 
        onClick={() => setOpen(!open)}
        className="flex flex-row items-center justify-between cursor-pointer select-none"
      >
        <CardTitle className="text-lg font-semibold">
          ডোনেশন টাইপ অনুযায়ী হিসাব
        </CardTitle>

        <ChevronDown 
          className={`h-6 w-6 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} 
        />
      </CardHeader>

      {open && (
        <CardContent>
          <div className="space-y-3">
            {donationTypeTotals.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 dark:text-white dark:bg-gray-700 p-3 rounded-lg"
              >
                <span className="font-medium">{item._id}</span>
                <span className="font-semibold ">
                  ৳ {item.totalAmount} ( {item.count} টি )
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>

    </div>
  );
}
