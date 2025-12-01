"use client"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, DollarSign, Briefcase, X } from "lucide-react"

interface ILifetimeDonor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
    profession: string;
    address: string;
    message: string;
    termsAccepted: boolean;
    slug?: string;
    __v?: number;
}

interface LifetimeDonorDetailModalProps {
    donor: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        amount: number;
        profession: string;
        address: string;
        message: string;
        termsAccepted: boolean;
        slug?: string;
        __v?: number;
    } | null
    isOpen: boolean
    onClose: () => void
  }
export default function LifetimeDonorDetailModal({ donor, isOpen, onClose }: LifetimeDonorDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!donor || !isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Content Box */}
        <Card
          className="modal-scrollbar w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
          `}</style>

          <CardHeader className="sticky top-0 z-10 flex flex-row items-start justify-between border-b bg-white dark:text-white dark:bg-gray-800">
            <div className="flex-1">
              <CardTitle className="text-2xl">{donor.name}</CardTitle>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1 cursor-pointer">
              <X className="h-5 w-5 dark:text-white dark:hover:text-gray-800" />
            </button>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Donation Amount */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Donation Amount</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${donor.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{donor.email}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{donor.phone}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Profession</p>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="font-medium capitalize">{donor.profession}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-sm">{donor.address}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            {donor.message && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Message</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{donor.message}</p>
              </div>
            )}

            {/* Terms Status */}
            <div className="flex items-center gap-2 pt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Terms Accepted:</span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  donor.termsAccepted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {donor.termsAccepted ? "Yes" : "No"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
