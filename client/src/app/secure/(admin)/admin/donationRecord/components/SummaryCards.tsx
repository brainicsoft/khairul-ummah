"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Gift, CheckCircle, AlertCircle } from "lucide-react"

interface SummaryCardsProps {
  donations: any[]
}

export default function SummaryCards({ donations }: SummaryCardsProps) {
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
  const uniqueDonors = new Set(donations.map((d) => d.email || d.phone)).size
  const uniqueTypes = new Set(donations.map((d) => d.donationType)).size
  const successfulDonations = donations.filter((d) => d.status === "success").length
  const pendingDonations = donations.filter((d) => d.status === "pending").length

  const stats = [
    {
      title: "মোট ডোনেশন",
      value: `৳ ${totalAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "মোট ডোনার",
      value: uniqueDonors.toString(),
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "ডোনেশন প্রকার",
      value: uniqueTypes.toString(),
      icon: Gift,
      color: "bg-purple-500",
    },
    {
      title: "সফল ডোনেশন",
      value: successfulDonations.toString(),
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      title: "লম্বিত ডোনেশন",
      value: pendingDonations.toString(),
      icon: AlertCircle,
      color: "bg-yellow-500",
    },
  ]
  return (
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
  )
}
