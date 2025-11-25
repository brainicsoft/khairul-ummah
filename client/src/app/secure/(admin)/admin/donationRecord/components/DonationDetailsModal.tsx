"use client"
import { useEffect } from "react"
import { X, Phone, Mail, DollarSign, Receipt, Tag, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DonationDetailModalProps {
  donation: any
  isOpen: boolean
  onClose: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "success":
      return "সফল"
    case "pending":
      return "লম্বিত"
    case "failed":
      return "ব্যর্থ"
    default:
      return status
  }
}

export default function DonationDetailModal({ donation, isOpen, onClose }: DonationDetailModalProps) {
  useEffect(() => {
    if (!donation || !isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [donation, isOpen, onClose])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!donation || !isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 h-screen" onClick={onClose} />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Modal Content Box */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl modal-scrollbar relative"
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
            .modal-scrollbar::-webkit-scrollbar {
              width: 6px;
              height: 4px;
            }
            .modal-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .modal-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 3px;
            }
            .modal-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
            .dark .modal-scrollbar::-webkit-scrollbar-thumb {
              background: #475569;
            }
            .dark .modal-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #64748b;
            }
          `}</style>

          {/* HEADER */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-800 z-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{donation.name}</h2>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">ডোনেশন আইডি: {donation._id}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
              aria-label="বন্ধ করুন"
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* BODY */}
          <main className="space-y-6 p-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>মূল তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ফোন নম্বর</p>
                      <p className="font-semibold">{donation.phone}</p>
                    </div>
                  </div>
                  {donation.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ইমেইল</p>
                        <p className="font-semibold">{donation.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Donation Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>ডোনেশন বিবরণ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">পরিমাণ</p>
                      <p className="text-2xl font-bold">৳ {donation.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ডোনেশন ধরন</p>
                      <p className="font-semibold capitalize">{donation.donationType}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">পেমেন্ট আইডি</p>
                    <p className="font-mono text-sm">{donation.paymentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">স্ট্যাটাস</p>
                    <Badge className={getStatusColor(donation.status)}>{getStatusLabel(donation.status)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timestamp Card */}
            <Card>
              <CardHeader>
                <CardTitle>সময় তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">তৈরি করা হয়েছে</p>
                    <p className="text-sm">{formatDate(donation.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">আপডেট করা হয়েছে</p>
                    <p className="text-sm">{formatDate(donation.updatedAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}
