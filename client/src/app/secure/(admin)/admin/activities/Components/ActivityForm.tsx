"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PhotoUpload } from "@/components/form/photo-upload"

export interface IActivity {
  _id?: string
  category: string
  title: string
  description: string
  image: string
  content?: string
  photo?: File
}

interface ActivityFormProps {
  activity: IActivity | null
  onSubmit: (data: IActivity) => void
  photo: File | null
  setPhoto: (file: File | null) => void
}

export default function ActivityForm({ activity, onSubmit, setPhoto, photo }: ActivityFormProps) {
  const [imagePreview, setImagePreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IActivity>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (activity) {
      setValue("title", activity.title || "")
      setValue("category", activity.category || "")
      setValue("description", activity.description || "")
      setValue("content", activity.content || "")
      setValue("image", activity.image || "")
      setImagePreview(activity.image || "")
    }
  }, [activity, setValue])

  const handleRemoveImage = () => {
    setImagePreview("")
    setPhoto(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const categories = [
    { value: "শিক্ষা কর্যক্রম", label: "শিক্ষা কর্যক্রম" },
    { value: "স্বাস্থ্য কর্যক্রম", label: "স্বাস্থ্য কর্যক্রম" },
    { value: "সমাজ সেবা", label: "সমাজ সেবা" },
    { value: "দাতব্য কর্যক্রম", label: "দাতব্য কর্যক্রম" },
    { value: "অন্যান্য", label: "অন্যান্য" },
  ]

  return (
    <form id="activity-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark:bg-gray-600">
      <div className="space-y-2">
        <Label htmlFor="title">Activity Title *</Label>
        <Input
          id="title"
          placeholder="Enter activity title"
          {...register("title", { required: "Title is required" })}
          className={errors.title ? "border-red-500" : ""}
        />
      </div>



      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" rows={4} {...register("description", { required: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Full Content</Label>
        <Textarea id="content" rows={4} {...register("content")} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`flex text-foreground h-10 w-full rounded-md border border-input dark:bg-input/30 px-3 py-2 text-base ${errors.category ? "border-red-500" : ""}`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <PhotoUpload
        photoTitle="কার্যক্রম ছবি"
        photoPreview={imagePreview}
        onPhotoUpload={handleImageChange}
        onRemovePhoto={handleRemoveImage}
        error={undefined}
      />
    </form>
  )
}
