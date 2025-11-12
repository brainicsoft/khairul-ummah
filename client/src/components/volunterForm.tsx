"use client"

import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Upload } from "lucide-react"

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    NidNo: "",
    mobileNumber: "",
    email: "",
    birthDate: "",
    gender: "",
    age: "",
    presentAddress: "",
    permanentAddress: "",
    currentProfession: "",
    organizationName: "",
    workAddress: "",
    educationQualification: "",
    interestReason: "",
  })

  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  // ✅ Handle Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ✅ Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
    // ✅ Reset the input value so same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  // ✅ Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) {
      alert("image is required")
      return
    }


    // Combine all data
    const finalData = {
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      NidNo: formData.NidNo,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      birthDate: formData.birthDate,
      gender: formData.gender,
      age: formData.age,
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      currentProfession: formData.currentProfession,
      organizationName: formData.organizationName,
      workAddress: formData.workAddress,
      educationQualification: formData.educationQualification,
      interestReason: formData.interestReason,
    }
    console.log(finalData)

    const submissionData = new FormData()
    if (photo) {
      submissionData.append("photo", photo as Blob)
    }
    submissionData.append("data", JSON.stringify(finalData))
    // for consol final data
    // for (const pair of submissionData.entries()) {
    //   console.log(pair[0], pair[1])
    // }
    try {
      const response = await fetch("http://localhost:3000/api/volunteer", {
        method: "POST",
        body: submissionData,
      })

      if (response?.ok) {
        alert("Form submitted successfully")

      } else {
        alert("Form submission failed")

      }
    } catch (error) {
      alert("Form submission failed")
      console.error(error)

    } finally {

    }
    // Clear form
    // setFormData({
    //   fullName: "",
    //   fatherName: "",
    //   motherName: "",
    //   NidNo: "",
    //   mobileNumber: "",
    //   email: "",
    //   birthDate: "",
    //   gender: "",
    //   age: "",
    //   presentAddress: "",
    //   permanentAddress: "",
    //   currentProfession: "",
    //   organizationName: "",
    //   workAddress: "",
    //   educationQualification: "",
    //   interestReason: "",
    // })
    // setProfilePhoto(null)
  }

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
        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-lg p-8">
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">সম্পূর্ণ নাম <span className="text-red-500">*</span></label>
              <Input
                className="shadow-sm" name="fullName" value={formData.fullName} onChange={handleInputChange}
                required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">পিতার নাম <span className="text-red-500">*</span></label>
              <Input className="shadow-sm" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন নম্বর
              </label>
              <Input className="shadow-sm" name="NidNo" value={formData.NidNo} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">মোবাইল নম্বর <span className="text-red-500">*</span></label>
              <Input
                className="shadow-sm"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">ইমেইল <span className="text-red-500">*</span></label>
              <Input
                className="shadow-sm"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">জন্মতারিখ</label>
              <Input className="shadow-sm" type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">লিঙ্গ</label>
              <select

                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">বয়স</label>
              <Input className="shadow-sm" name="age" value={formData.age} onChange={handleInputChange} type="number" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">বর্তমান ঠিকানা</label>
              <Input className="shadow-sm" name="presentAddress" value={formData.presentAddress} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">স্থায়ী ঠিকানা</label>
              <Input className="shadow-sm" name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} />
            </div>
          </div>

          {/* Profession */}
          <hr className="my-8" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">পেশাগত তথ্য</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">বর্তমান পেশা <span className="text-red-500">*</span></label>
              <Input
                className="shadow-sm"
                name="currentProfession"
                value={formData.currentProfession}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">প্রতিষ্ঠানের নাম <span className="text-red-500">*</span></label>
              <Input
                className="shadow-sm"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">কর্মস্থলের ঠিকানা <span className="text-red-500">*</span></label>
            <Input
              className="shadow-sm"
              name="workAddress"
              value={formData.workAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Education */}
          <hr className="my-8" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">শিক্ষাগত যোগ্যতা</h3>
          <Input
            className="shadow-sm"
            name="educationQualification"
            value={formData.educationQualification}
            onChange={handleInputChange}
            placeholder="যেমনঃ স্নাতক, উচ্চ মাধ্যমিক"
            required
          />

          {/* Interest */}
          <div className="my-8">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              স্বেচ্ছাসেবক হিসেবে আগ্রহ - কেন আপনি স্বেচ্ছাসেবক হতে চান?
            </label>
            <textarea
              name="interestReason"
              value={formData.interestReason}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows={4}
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <label className="text-sm font-medium text-gray-700 mb-4 block">আপনার ছবি</label>
            {photoPreview && (
              <div className="mt-4 flex flex-col items-start">
                <div className="relative w-24 h-24">
                  <img
                    src={photoPreview}
                    alt="ছবির প্রিভিউ"
                    className="w-24 h-24 rounded-full border-2 border-primary object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">প্রোফাইল ছবি প্রিভিউ</p>
              </div>
            )}

            <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90">
              <Upload className="w-4 h-4" />
              <span>ছবি আপলোড করুন</span>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

          </div>

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

          <Button type="submit" className="w-full bg-primary text-white py-3 text-base">
            আবেদন করুন →
          </Button>
        </form>
      </div>
    </div>
  )
}
