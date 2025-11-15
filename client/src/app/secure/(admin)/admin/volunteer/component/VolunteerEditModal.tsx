"use client"
import { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormInput, FormTextarea } from "@/components/form/FormInput"
import { FormSelect } from "@/components/form/form-select"
import { PhotoUpload } from "@/components/form/photo-upload"
import { IVolunteer, useGetAllVolunteersQuery, useUpdateVolunteerMutation } from "@/redux/features/volunteers/volunteersApi"
import { X } from 'lucide-react'
import toast from "react-hot-toast"

interface VolunteerFormData {
  fullName: string
  fatherName: string
  motherName?: string
  NidNo: string
  mobileNumber: string
  email: string
  birthDate: string
  gender: string
  age: string
  presentAddress: string
  permanentAddress: string
  currentProfession: string
  organizationName: string
  workAddress: string
  educationQualification: string
  interestReason: string
}
interface VolunteerEditModalProps {
  volunteer: IVolunteer | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}
export default function VolunteerEditModal({ volunteer, isOpen, onClose,refetch }: VolunteerEditModalProps) {
  const [updateVolunteer, { isLoading }] = useUpdateVolunteerMutation()
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [apiError, setApiError] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<VolunteerFormData>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (volunteer && isOpen) {
      setValue("fullName", volunteer.fullName || "")
      setValue("fatherName", volunteer.fatherName || "")
      // setValue("motherName", volunteer.motherName || "")
      setValue("NidNo", volunteer.nidNo || "")
      setValue("mobileNumber", volunteer.mobileNumber || "")
      setValue("email", volunteer.email || "")
      setValue("birthDate", volunteer.birthDate?.split('T')[0] || "")
      setValue("gender", volunteer.gender || "")
      setValue("age", volunteer.age?.toString() || "")
      setValue("presentAddress", volunteer.presentAddress || "")
      setValue("permanentAddress", volunteer.permanentAddress || "")
      setValue("currentProfession", volunteer.currentProfession || "")
      setValue("organizationName", volunteer.organizationName || "")
      setValue("workAddress", volunteer.workAddress || "")
      setValue("educationQualification", volunteer.educationQualification || "")
      setValue("interestReason", volunteer.interestReason || "")

      // Set existing photo preview if available
      if (volunteer.avatar) {
        setPhotoPreview(volunteer.avatar)
      }
    }
  }, [volunteer, isOpen, setValue])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('শুধুমাত্র ছবি ফাইল আপলোড করুন')
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('ছবির সাইজ 2MB এর কম হতে হবে')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setPhoto(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setPhotoPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = async (data: VolunteerFormData) => {
    if (!volunteer?._id) {
      toast.error("Volunteer ID not found!")
      return
    }

    setApiError("")

    try {
      const formData = new FormData()

      // Append photo only if a new one was selected
      if (photo) {
        formData.append("avatar", photo)
      }

      // Create the data object with proper field names
      const volunteerData = {
        fullName: data.fullName,
        fatherName: data.fatherName,
        motherName: data.motherName || "",
        nidNo: data.NidNo || "",
        mobileNumber: data.mobileNumber,
        email: data.email,
        birthDate: data.birthDate || "",
        gender: data.gender || "",
        age: data.age ? parseInt(data.age) : null,
        presentAddress: data.presentAddress || "",
        permanentAddress: data.permanentAddress || "",
        currentProfession: data.currentProfession,
        organizationName: data.organizationName,
        workAddress: data.workAddress,
        educationQualification: data.educationQualification,
        interestReason: data.interestReason || "",
      }

      formData.append("data", JSON.stringify(volunteerData))

      // Call update mutation with volunteer ID
      await updateVolunteer({
        id: volunteer._id,
        data: formData
      }).unwrap()

     await refetch()
      onClose()
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!")
    } catch (error: any) {
      console.error('Update error:', error)
    }
  }

  const genderOptions = [
    { value: "male", label: "পুরুষ" },
    { value: "female", label: "মহিলা" },
    { value: "other", label: "অন্যান্য" }
  ]

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
          aria-label="Close modal z-50px"
        >
          <X className="w-6 h-6 cursor-pointer text-black" />
        </button>

        <div
          className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative modal-scrollbar"
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
          <div className="p-6 pr-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">স্বেচ্ছাসেবক তথ্য সম্পাদনা</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              দয়া করে প্রয়োজনীয় তথ্য আপডেট করুন
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* API Error Message */}
              {apiError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
                  ⚠️ {apiError}
                </div>
              )}

              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
               
                <FormInput
                  label="সম্পূর্ণ নাম"
                  required
                  error={errors.fullName?.message}
                  {...register("fullName", {
                    required: "সম্পূর্ণ নাম আবশ্যক",
                    minLength: {
                      value: 2,
                      message: "কমপক্ষে ২টি অক্ষর প্রয়োজন"
                    }
                  })}
                />
                <FormInput
                  label="পিতার নাম"
                  required
                  error={errors.fatherName?.message}
                  {...register("fatherName", {
                    required: "পিতার নাম আবশ্যক",
                    minLength: {
                      value: 2,
                      message: "কমপক্ষে ২টি অক্ষর প্রয়োজন"
                    }
                  })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন নম্বর"
                  error={errors.NidNo?.message}
                  placeholder="জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন নম্বর"
                  {...register("NidNo", {
                    pattern: {
                      value: /^[0-9]{10,17}$/,
                      message: "সঠিক জাতীয় পরিচয়পত্র নম্বর দিন"
                    }
                  })}
                />
                <FormInput
                  label="মোবাইল নম্বর"
                  type="tel"
                  required
                  error={errors.mobileNumber?.message}
                  placeholder="01XXXXXXXXX"
                  {...register("mobileNumber", {
                    required: "মোবাইল নম্বর আবশ্যক",
                    pattern: {
                      value: /^(?:\+88|01)?\d{11}$/,
                      message: "সঠিক মোবাইল নম্বর দিন"
                    }
                  })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="ইমেইল"
                  type="email"
                  required
                  error={errors.email?.message}
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "ইমেইল আবশ্যক",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "সঠিক ইমেইল দিন"
                    }
                  })}
                />
                <FormInput
                  label="জন্মতারিখ"
                  type="date"
                  error={errors.birthDate?.message}
                  {...register("birthDate")}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormSelect
                  label="লিঙ্গ"
                  options={genderOptions}
                  error={errors.gender?.message}
                  {...register("gender")}
                />
                <FormInput
                  label="বয়স"
                  type="number"
                  error={errors.age?.message}
                  placeholder="১৮"
                  {...register("age", {
                    min: {
                      value: 18,
                      message: "বয়স কমপক্ষে ১৮ বছর হতে হবে"
                    },
                    max: {
                      value: 100,
                      message: "সঠিক বয়স দিন"
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "শুধুমাত্র সংখ্যা দিন"
                    }
                  })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="বর্তমান ঠিকানা"
                  error={errors.presentAddress?.message}
                  placeholder="বর্তমান ঠিকানা"
                  {...register("presentAddress")}
                />
                <FormInput
                  label="স্থায়ী ঠিকানা"
                  error={errors.permanentAddress?.message}
                  placeholder="স্থায়ী ঠিকানা"
                  {...register("permanentAddress")}
                />
              </div>

              {/* Profession */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">পেশাগত তথ্য</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="বর্তমান পেশা"
                    required
                    error={errors.currentProfession?.message}
                    placeholder="আপনার বর্তমান পেশা"
                    {...register("currentProfession", {
                      required: "বর্তমান পেশা আবশ্যক"
                    })}
                  />
                  <FormInput
                    label="প্রতিষ্ঠানের নাম"
                    required
                    error={errors.organizationName?.message}
                    placeholder="প্রতিষ্ঠানের নাম"
                    {...register("organizationName", {
                      required: "প্রতিষ্ঠানের নাম আবশ্যক"
                    })}
                  />
                </div>

                <div className="mt-6">
                  <FormInput
                    label="কর্মস্থলের ঠিকানা"
                    required
                    error={errors.workAddress?.message}
                    placeholder="কর্মস্থলের সম্পূর্ণ ঠিকানা"
                    {...register("workAddress", {
                      required: "কর্মস্থলের ঠিকানা আবশ্যক"
                    })}
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">শিক্ষাগত যোগ্যতা</h3>
                <FormInput
                  label=""
                  placeholder="যেমনঃ স্নাতক, উচ্চ মাধ্যমিক, এসএসসি"
                  required
                  error={errors.educationQualification?.message}
                  {...register("educationQualification", {
                    required: "শিক্ষাগত যোগ্যতা আবশ্যক"
                  })}
                />
              </div>

              {/* Interest */}
              <div>
                <FormTextarea
                  label="স্বেচ্ছাসেবক হিসেবে আগ্রহ - কেন আপনি স্বেচ্ছাসেবক হতে চান?"
                  required
                  error={errors.interestReason?.message}
                  placeholder="আপনার আগ্রহের কারণ, অভিজ্ঞতা এবং কীভাবে আপনি অবদান রাখতে চান তা বিস্তারিত লিখুন..."
                  rows={4}
                  {...register("interestReason", {
                    required: "আগ্রহের কারণ আবশ্যক",
                    minLength: {
                      value: 20,
                      message: "কমপক্ষে ২০টি অক্ষর লিখুন"
                    },
                    maxLength: {
                      value: 1000,
                      message: "১০০০টি অক্ষরের বেশি লিখতে পারবেন না"
                    }
                  })}
                />
              </div>

              {/* Photo Upload */}
              <PhotoUpload
                photoPreview={photoPreview}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
                error={undefined}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  বাতিল করুন
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
