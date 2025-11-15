"use client"
import { X } from "lucide-react"

import { IVolunteer } from "@/redux/features/volunteers/volunteersApi"
import VolunteerForm from "./EditFom"

interface VolunteerEditModalProps {
  volunteer: IVolunteer | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export default function VolunteerEditModal({ volunteer, isOpen, onClose, refetch }: VolunteerEditModalProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-50 h-screen ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
        <button
          onClick={onClose}
          className="fixed top-4 right-6 text-black hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>
        <div
          className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-2">স্বেচ্ছাসেবক তথ্য সম্পাদনা</h2>
          <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">দয়া করে প্রয়োজনীয় তথ্য আপডেট করুন</p>
          <VolunteerForm volunteer={volunteer} onClose={onClose} refetch={refetch} />
        </div>
      </div>
    </>
  )
}
