"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import ActivityForm, { IActivity } from "./ActivityForm"
import { useUpdateActivityMutation } from "@/redux/features/activites/activitesApi"

interface ActivityEditModalProps {
  activity: IActivity | null
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  setIsLoading?: (loading: boolean) => void
}

export default function ActivityEditModal({
  activity,
  isOpen,
  onClose,
  refetch,
  setIsLoading,
}: ActivityEditModalProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [updateActivity, { isLoading }] = useUpdateActivityMutation()

  useEffect(() => {
    if (activity) {
      setPhoto(null)
    }
  }, [activity])

  if (!isOpen || !activity) return null

  const handleSubmit = async (data: IActivity) => {
    const finalData = {
      title: data.title,
      category: data.category,
      description: data.description,
      content: data.content || "",
    }
    try {
      if (setIsLoading) setIsLoading(true)
      const formData = new FormData()
      if (photo) formData.append("image", photo)
      formData.append("data", JSON.stringify(finalData))

      await updateActivity({ id: activity?._id, data: formData }).unwrap()
      refetch()
      onClose()
      toast.success("কার্যক্রম সফলভাবে আপডেট হয়েছে!")
    } catch (error: any) {
      toast.error(error?.data?.message || "আপডেট করতে সমস্যা হয়েছে।")
    } finally {
      if (setIsLoading) setIsLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/50" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 border-b dark:bg-gray-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Activity</h2>
              <p className="text-sm text-foreground">Update the activity information</p>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 dark:bg-gray-600">
            <ActivityForm activity={activity} onSubmit={handleSubmit} photo={photo} setPhoto={setPhoto} />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
            <Button className="dark:bg-white bg-transparent" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="activity-form" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
