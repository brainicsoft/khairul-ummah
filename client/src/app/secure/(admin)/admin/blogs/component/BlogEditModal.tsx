"use client"
import { X } from "lucide-react"
import BlogForm, { IBlog } from "./BlogForm"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useUpdateBlogMutation } from "@/redux/features/blogs/blogApi"
import toast from "react-hot-toast"

interface BlogEditModalProps {
  blog: IBlog | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  setIsLoading?: (loading: boolean) => void
}

export default function BlogEditModal({ blog, isOpen, onClose, refetch, setIsLoading }: BlogEditModalProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [updateBlog, { isLoading }] = useUpdateBlogMutation()
  useEffect(() => {
    if (blog) {
      setPhoto(null)
    }
  }, [blog])

  if (!isOpen || !blog) return null

  const handleSubmit = async(data: IBlog) => {
    const finalData = {
      title: data.title,
      author: data.author,
      category: data.category,
      date: data.date,
      description: data.description,
      content: data.content || "",
    }
    try {
      if (setIsLoading) setIsLoading(true);
      const formData = new FormData()
    if (photo) formData.append("image", photo)
    formData.append("data", JSON.stringify(finalData))

      // Replace with your API call
      await updateBlog({ id: blog?._id, data: formData }).unwrap()
      refetch()
      onClose()
      toast.success("প্রকল্প সফলভাবে আপডেট হয়েছে!")
    } catch (error: any) {
      toast.error(error?.data?.message || "আপডেট করতে সমস্যা হয়েছে।")
    } finally {
      if (setIsLoading) setIsLoading(false);
    }
  }
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/50" onClick={onClose} />
      {/* Modal */}
      <div className="fixed  inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 border-b dark:bg-gray-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Blog Post</h2>
              <p className="text-sm text-foreground">Update the blog post information</p>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Form */}
          <div className="p-6 dark:bg-gray-600">
            <BlogForm
              blog={blog}
              onSubmit={handleSubmit}
              photo={photo}
              setPhoto={setPhoto}
            />
          </div>
          {/* Footer */}
          <div className="sticky bottom-0 dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
            <Button className="dark:bg-white" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" form="blog-form"  disabled={isLoading}>{isLoading ? "Updateing..." : "Update"}</Button>
          </div>
        </div>
      </div>
    </>
  )
}
