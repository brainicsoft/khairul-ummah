"use client"
import { useEffect } from "react"
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Briefcase, Heart, Mail, MapPin, Phone, X } from 'lucide-react'
import Image from "next/image"

interface VolunteerDetailModalProps {
  volunteer: any
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerDetailModal({ volunteer, isOpen, onClose }: VolunteerDetailModalProps) {
  if (!volunteer) return null
  if (!isOpen) return null

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <>
      <div className="fixed inset-0 z-60 bg-black/50" onClick={onClose}></div>
      
      <div className="fixed inset-0 z-61 flex items-center justify-center overflow-y-auto p-4">
        <style>{`
          .modal-scrollbar::-webkit-scrollbar {
            width: 6px;
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
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl modal-scrollbar">
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-8 border-b border-gray-200 dark:border-gray-600">
            <div className="flex gap-6 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-700 shadow-md">
                  <Image
                    src={volunteer.profileImage || "/placeholder.svg?height=96&width=96&query=volunteer profile"}
                    alt={volunteer.fullName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Name and Title */}
              <div className="flex-1 pt-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{volunteer.fullName}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {volunteer.currentProfession || "Volunteer"}
                </p>
                <div className="flex gap-3 mt-3">
                  <a
                    href={`tel:${volunteer.mobileNumber}`}
                    className="text-xs bg-white dark:bg-gray-800 text-blue-600 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    {volunteer.mobileNumber}
                  </a>
                  <a
                    href={`mailto:${volunteer.email}`}
                    className="text-xs bg-white dark:bg-gray-800 text-blue-600 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    {volunteer.email}
                  </a>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1"
                aria-label="Close details"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <main className="space-y-6 p-8">
            {/* Personal Information */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</p>
                  <p className="text-base font-semibold mt-1">{volunteer.fullName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Father's Name</p>
                  <p className="text-base font-semibold mt-1">{volunteer.fatherName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">NID Number</p>
                  <p className="text-base font-semibold mt-1">{volunteer.NidNo}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Gender</p>
                  <p className="text-base font-semibold mt-1 capitalize">{volunteer.gender}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Age</p>
                  <p className="text-base font-semibold mt-1">{volunteer.age}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Birth Date</p>
                  <p className="text-base font-semibold mt-1">{volunteer.birthDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                    <a href={`mailto:${volunteer.email}`} className="text-blue-600 hover:underline text-sm">
                      {volunteer.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mobile Number</p>
                    <a href={`tel:${volunteer.mobileNumber}`} className="text-blue-600 hover:underline text-sm">
                      {volunteer.mobileNumber}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-4 w-4" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Present Address</p>
                  <p className="text-sm mt-1">{volunteer.presentAddress}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Permanent Address</p>
                  <p className="text-sm mt-1">{volunteer.permanentAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-4 w-4" />
                  Professional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current Profession</p>
                  <p className="text-base font-semibold mt-1">{volunteer.currentProfession}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Organization</p>
                  <p className="text-base font-semibold mt-1">{volunteer.organizationName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Work Address</p>
                  <p className="text-sm mt-1">{volunteer.workAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Education Information */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-4 w-4" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Qualification</p>
                  <p className="text-base font-semibold mt-1">{volunteer.educationQualification}</p>
                </div>
              </CardContent>
            </Card>

            {/* Interest and Reason */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-4 w-4" />
                  Why Volunteer?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{volunteer.interestReason}</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}
