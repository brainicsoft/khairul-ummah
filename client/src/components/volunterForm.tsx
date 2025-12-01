"use client"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { FormInput, FormTextarea } from "./form/FormInput"
import { FormSelect } from "./form/form-select"
import { PhotoUpload } from "./form/photo-upload"
import { useVolunteerRequestMutation } from "@/redux/features/volunteers/volunteersApi"

interface VolunteerFormData {
  fullName: string
  fatherName: string
  motherName: string
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
interface ApiResponse {
  status: number;
  data?: any;
}

export function VolunteerForm() {
  const [volunteerRequest, { isLoading }] = useVolunteerRequestMutation()
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VolunteerFormData>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('শুধুমাত্র ছবি ফাইল আপলোড করুন')
        return
      }
      
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('ছবির সাইজ 2MB এর কম হতে হবে')
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

  // Handle Form Submission with Redux
  const onSubmit = async (data: VolunteerFormData) => {
    if (!photo) {
      alert("ছবি আপলোড করা বাধ্যতামূলক")
      return
    }

    // Clear previous errors
    setApiError("")

    try {
      const formData = new FormData()

      // 1. Append the photo file as "avatar"
      formData.append("avatar", photo)

      // 2. Create the data object with proper field names (match backend DTO)
      const volunteerData = {
        fullName: data.fullName,
        fatherName: data.fatherName,
        // motherName: data.motherName || "",
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

      // 3. Append the JSON string as "data" field
      formData.append("data", JSON.stringify(volunteerData))
   
      // Use Redux mutation
      const response = await volunteerRequest(formData).unwrap() as ApiResponse

      // Success case
      if (response.status === 201) {
        alert("আবেদন সফলভাবে জমা হয়েছে!")
        setSubmitted(true)
        
        // Reset form
        reset()
        setPhoto(null)
        setPhotoPreview("")
        setApiError("")
      }

    } catch (error: any) {
      // Error handling
      console.error('Submission error:', error)
      
      let errorMessage = "আবেদন জমা ব্যর্থ হয়েছে"

      if (error.data) {
        // Backend returned error response
        errorMessage = error.data.message || error.data.error || errorMessage
        
        // Handle validation errors from backend
        if (error.data.errors) {
          const validationErrors = Object.values(error.data.errors).join(', ')
          errorMessage = `ভ্যালিডেশন ত্রুটি: ${validationErrors}`
        }
      } else if (error.status) {
        // HTTP error status
        switch (error.status) {
          case 400:
            errorMessage = "অনুরোধটি সঠিক নয়। দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন"
            break
          case 401:
            errorMessage = "অনুমোদন প্রয়োজন"
            break
          case 403:
            errorMessage = "আপনার এই কাজ করার অনুমতি নেই"
            break
          case 404:
            errorMessage = "সার্ভার পাওয়া যায়নি"
            break
          case 409:
            errorMessage = "এই ইমেইল বা মোবাইল নম্বর দিয়ে আগেই আবেদন করা হয়েছে"
            break
          case 413:
            errorMessage = "আপলোড করা ফাইলের সাইজ খুব বড় (সর্বোচ্চ 2MB)"
            break
          case 415:
            errorMessage = "অসমর্থিত ফাইল ফরম্যাট। শুধুমাত্র ছবি ফাইল আপলোড করুন"
            break
          case 500:
            errorMessage = "সার্ভারে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন"
            break
          default:
            errorMessage = `সার্ভার ত্রুটি (কোড: ${error.status})`
        }
      } else if (error instanceof TypeError) {
        // Network error
        errorMessage = "নেটওয়ার্ক সংযোগ সমস্যা। ইন্টারনেট সংযোগ পরীক্ষা করুন"
      }

      setApiError(errorMessage)
    }
  }

  const genderOptions = [
    { value: "male", label: "পুরুষ" },
    { value: "female", label: "মহিলা" },
    { value: "other", label: "অন্যান্য" }
  ]

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-primary text-white rounded-t-lg p-8 mb-0">
          <h2 className="text-2xl font-bold mb-2">স্বেচ্ছাসেবক আবেদন</h2>
          <p className="text-green-100 text-sm">
            দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন। আপনার প্রদত্ত তথ্য গোপনীয় থাকবে।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-b-lg shadow-lg p-8">
          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
              ⚠️ {apiError}
            </div>
          )}

          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormInput
              label="জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন নম্বর"
              error={errors.NidNo?.message}
              placeholder="জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন নম্বর"
              {...register("NidNo", {
                pattern: {
                  value: /^[0-9]{10,17}$/,
                  message: "সঠিক জাতীয় পরিচয়পত্র নম্বর দিন"
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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
          <hr className="my-8" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">পেশাগত তথ্য</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <div className="mb-6">
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

          {/* Education */}
          <hr className="my-8" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">শিক্ষাগত যোগ্যতা</h3>
          <FormInput
            label=""
            placeholder="যেমনঃ স্নাতক, উচ্চ মাধ্যমিক, এসএসসি"
            required
            error={errors.educationQualification?.message}
            {...register("educationQualification", { 
              required: "শিক্ষাগত যোগ্যতা আবশ্যক" 
            })}
          />

          {/* Interest */}
          <div className="my-8">
            <FormTextarea
              label="স্বেচ্ছাসেবক হিসেবে আগ্রহ - কেন আপনি স্বেচ্ছাসেবক হতে চান?"
              required
              error={errors.interestReason?.message}
              placeholder="আপনার আগ্রহের কারণ, অভিজ্ঞতা এবং কীভাবে আপনি অবদান রাখতে চান তা বিস্তারিত লিখুন..."
              rows={5}
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
            error={!photo ? "ছবি আপলোড করা বাধ্যতামূলক" : undefined}
          />

          {/* Privacy Notice */}
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded mb-8">
            <p className="text-sm text-red-900">
              <strong>* গুরুত্বপূর্ণ:</strong> আপনার ব্যক্তিগত তথ্য শুধুমাত্র স্বেচ্ছাসেবক প্রক্রিয়ায় ব্যবহৃত হবে।
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
              ✓ আপনার আবেদন সফলভাবে জমা হয়েছে!
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-primary text-white py-3 text-base hover:bg-primary/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "জমা হচ্ছে..." : "আবেদন করুন →"}
          </Button>
        </form>
      </div>
    </div>
  )
}