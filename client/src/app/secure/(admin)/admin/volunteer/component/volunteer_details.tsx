"use client"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Briefcase, Heart, Mail, MapPin, Phone, X } from 'lucide-react'
import Image from "next/image"
import DetailItem from "@/components/DetailItem"

interface VolunteerDetailModalProps {
  volunteer: any
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerDetailModal({ volunteer, isOpen, onClose }: VolunteerDetailModalProps) {
  if (!volunteer || !isOpen) return null

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 h-screen"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

        {/* Modal Content Box */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl modal-scrollbar relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Custom Scrollbar */}
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

          {/* HEADER AREA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-8 border-b border-gray-200 dark:border-gray-600 flex gap-4 items-start sticky top-0 z-50">

            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-700 shadow-md">
                <Image
                  src={volunteer.avatar || "/placeholder.svg?height=96&width=96&query=volunteer profile"}
                  alt={volunteer.fullName}
                  width={100}
                  height={100}
                  className="w-full h-[105px] object-cover"
                />
              </div>
            </div>

            {/* Name & Info */}
            <div className="flex-1 pt-1 pr-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Name: {volunteer.fullName}</h2>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 mt-1">
                Profession: {volunteer.currentProfession || "Volunteer"}
              </p>

              <div className="flex items-center mt-1">
                <Mail className="h-4 w-4 dark:text-white" />
                <a
                  href={`mailto:${volunteer.email}`}
                  className="text-xs dark:bg-gray-200 ml-2 text-blue-600 px-2 py-1 rounded-full transition-colors"
                >
                  {volunteer.email}
                </a>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="ml-auto text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg"
              aria-label="Close details"
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* BODY CONTENT */}
          <main className="space-y-6 p-8">

            {/* PERSONAL INFORMATION */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6 dark:text-white">
                <DetailItem label="Full Name" value={volunteer.fullName} />
                <DetailItem label="Father's Name" value={volunteer.fatherName} />
                <DetailItem label="NID Number" value={volunteer.nidNo} />
                <DetailItem label="Gender" value={volunteer.gender} />
                <DetailItem label="Age" value={volunteer.age} />
                <DetailItem label="Birth Date" value={volunteer.birthDate} />
              </div>
            </div>

            {/* CONTACT INFORMATION */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Phone className="h-4 w-4" /> Contact Information
              </h3>
              <div className="space-y-4">
                <ContactItem
                  icon={<Mail />}
                  label="Email"
                  value={volunteer.email}
                  link={`mailto:${volunteer.email}`}
                />
                <ContactItem
                  icon={<Phone />}
                  label="Mobile Number"
                  value={volunteer.mobileNumber}
                  link={`tel:${volunteer.mobileNumber}`}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Address
              </h3>
              <div className="grid md:grid-cols-2 gap-6 dark:text-white">
                <DetailItem label="Present Address" value={volunteer.presentAddress} />
                <DetailItem label="Permanent Address" value={volunteer.permanentAddress} />
              </div>
            </div>

            {/* PROFESSIONAL */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Professional
              </h3>
              <div className="space-y-4 dark:text-white">
                <DetailItem label="Current Profession" value={volunteer.currentProfession} />
                <DetailItem label="Organization" value={volunteer.organizationName} />
                <DetailItem label="Work Address" value={volunteer.workAddress} />
              </div>
            </div>

            {/* EDUCATION */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800 dark:text-white">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Education
              </h3>
              <DetailItem label="Qualification" value={volunteer.educationQualification} />
            </div>

            {/* WHY VOLUNTEER */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Heart className="h-4 w-4" /> Why Volunteer?
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {volunteer.interestReason}
              </p>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}

/* Small Reusable Components */
function ContactItem({ icon, label, value, link }: any) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-4 w-4 text-gray-400 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
        <a href={link} className="text-blue-600 hover:underline text-sm">{value}</a>
      </div>
    </div>
  )
}
