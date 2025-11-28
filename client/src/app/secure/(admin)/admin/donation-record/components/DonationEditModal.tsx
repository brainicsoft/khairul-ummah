"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import DonationEditForm from "./DonationEditForm"

interface DonationEditModalProps {
  donation: any | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (donation: any) => void
}

export default function DonationEditModal({ donation, isOpen, onClose, onUpdate }: DonationEditModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 h-screen" onClick={onClose} />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Modal Content */}
        <div
          className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">ডোনেশন সম্পাদনা করুন</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">ডোনেশনের তথ্য আপডেট করুন</p>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
              aria-label="বন্ধ করুন"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* FORM CONTENT */}
          <div className="p-6 flex-1 overflow-y-auto modal-scrollbar">
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
            <DonationEditForm donation={donation} onClose={onClose} onUpdate={onUpdate} setIsLoading={setIsLoading} />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="sticky bottom-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 p-4 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              বাতিল করুন
            </Button>
            <Button type="submit" form="donation-edit-form" disabled={isLoading}>
              {isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
