"use client"
import { X } from "lucide-react"
import BlogForm, { IBlog } from "./BlogForm"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState, useEffect } from "react"

interface BlogEditModalProps {
  blog: IBlog | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export default function BlogEditModal({ blog, isOpen, onClose, refetch }: BlogEditModalProps) {
  const [photo, setPhoto] = useState<File | null>(null)

  useEffect(() => {
    if (blog) {
      setPhoto(null)
    }
  }, [blog])

  if (!isOpen || !blog) return null

  const handleSubmit = (data: IBlog) => {
    const finalData = {
      title: data.title,
      author: data.author,
      category: data.category,
      date: data.date,
      description: data.description,
      content: data.content || "",
    }
    const formData = new FormData()
    if (photo) formData.append("image", photo)
    formData.append("data", JSON.stringify(finalData))
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // TODO: API call
    refetch()
    toast.success("Blog updated successfully!")
    // onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 border-b bg-white px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Edit Blog Post</h2>
              <p className="text-sm text-gray-600">Update the blog post information</p>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Form */}
          <div className="p-6">
            <BlogForm
              blog={blog}
              onSubmit={handleSubmit}
              photo={photo}
              setPhoto={setPhoto}
            />
          </div>
          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" form="blog-form">Update</Button>
          </div>
        </div>
      </div>
    </>
  )
}
