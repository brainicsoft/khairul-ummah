"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import toast from "react-hot-toast"
import { useCreateActivityMutation } from "@/redux/features/activites/activitesApi"
import ActivityForm, { IActivity } from "./ActivityForm"
interface ActivityCreateModalProps {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}
interface ApiResponse {
  status: number
  data?: any
  message?: string
}

export default function ActivityCreateModal({ isOpen, onClose, refetch }: ActivityCreateModalProps) {
  const [createActivity, { isLoading }] = useCreateActivityMutation()
  const [photo, setPhoto] = useState<File | null>(null)
  const handleSubmit = async (data: IActivity) => {
    const finalData = {
      title: data.title,
      category: data.category,
      description: data.description,
      content: data.content || "",
    }
    try {
      const formData = new FormData()
      if (photo) formData.append("image", photo)
      formData.append("data", JSON.stringify(finalData))
      const response = await createActivity(formData).unwrap() as ApiResponse

      if (response.status === 201) {
        toast.success("সফলভাবে যোগ হয়েছে!")
        refetch()
        onClose()
      }
    } catch (error: any) {
      if (error.status === 409) {
        toast.error(error.message)
      } else {
        toast.error(error?.data?.message || "যোগ করতে সমস্যা হয়েছে।")
      }
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 h-screen bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-600 px-6 py-4 flex items-center justify-between">
            <div className="dark:text-white">
              <h2 className="text-xl font-bold">Add New Activity</h2>
              <p className="text-sm text-gray-600 dark:text-white">Create a new activity</p>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* FORM */}
          <div className="p-6 dark:bg-gray-600">
            <ActivityForm activity={null} onSubmit={handleSubmit} photo={photo} setPhoto={setPhoto} />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
            <Button className="dark:bg-white bg-transparent" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="activity-form" disabled={isLoading}>
              {isLoading ? "creating..." : "create"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
