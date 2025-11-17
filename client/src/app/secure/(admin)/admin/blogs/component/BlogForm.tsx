"use client"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PhotoUpload } from "@/components/form/photo-upload"
export interface IBlog {
  _id?: string
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string
  content?: string
  photo?: File
}
interface BlogFormProps {
  blog: IBlog | null
  onSubmit: (data: IBlog) => void
  photo: File | null
  setPhoto: (file: File | null) => void
}
export default function BlogForm({ blog, onSubmit, setPhoto, photo }: BlogFormProps) {
  const [imagePreview, setImagePreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IBlog>()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }
  useEffect(() => {
    if (blog) {
      setValue("title", blog.title || "")
      setValue("author", blog.author || "")
      setValue("category", blog.category || "")
      setValue("date", blog.date || "")
      setValue("description", blog.description || "")
      setValue("content", blog.content || "")
      setValue("image", blog.image || "")
      setImagePreview(blog.image || "")
    }
  }, [blog, setValue])
  const handleRemoveImage = () => {
    setImagePreview("")
    setPhoto(null)  // <-- clear parent photo state
    if (fileInputRef.current) fileInputRef.current.value = ""
  }
  const categories = [
    { value: "সমাজ সেবা", label: "সমাজ সেবা" },
    { value: "শিক্ষা", label: "শিক্ষা" },
    { value: "স্বাস্থ্য", label: "স্বাস্থ্য" },
    { value: "দাতব্য", label: "দাতব্য" },
    { value: "অন্যান্য", label: "অন্যান্য" },
  ]
  return (
    <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Blog Title *</Label>
        <Input
          id="title"
          placeholder="Enter blog title"
          {...register("title", { required: "Title is required" })}
          className={errors.title ? "border-red-500" : ""}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            placeholder="Author name"
            {...register("author", { required: "Author is required" })}
            className={errors.author ? "border-red-500" : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ${errors.category ? "border-red-500" : ""}`}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date *</Label>
        <Input
          id="date"
          type="date"
          {...register("date", { required: true })}
          defaultValue={blog?.date || ""}
        />

      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" rows={3} {...register("description", { required: true })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Full Content</Label>
        <Textarea id="content" rows={4} {...register("content")} />
      </div>
      <PhotoUpload
        photoTitle="ব্লগ ছবি"
        photoPreview={imagePreview}
        onPhotoUpload={handleImageChange}
        onRemovePhoto={handleRemoveImage}
        error={undefined}
      />
    </form>
  )
}
