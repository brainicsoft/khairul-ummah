"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
// import LifetimeDonorForm, { type ILifetimeDonor } from "./LifetimeDonorForm"
import { useCreateLifetimeDonorMutation } from "@/redux/features/lifetimeDonor/lifetimedonorApi"
import LifetimeDonorForm from "./LifeTimeDonorForm"
// import LifetimeDonorForm, { ILifetimeDonor } from "./LifetimeDonorForm"


interface LifetimeDonorCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export default function LifetimeDonorCreateModal({ isOpen, onClose, onAdd }: LifetimeDonorCreateModalProps) {
  const [createLifetimeDonor, { isLoading }] = useCreateLifetimeDonorMutation()

  if (!isOpen) return null

  const handleSubmit = async (data:any) => {
    try {
      await createLifetimeDonor(data).unwrap()
      onAdd()
      onClose()
      toast.success("Donor added successfully!")
    } catch (error: any) {
      toast.error(error?.message || "Failed to add donor")
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 h-screen bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="sticky top-0 border-b bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="dark:text-white">
              <h2 className="text-xl font-bold">Add New Lifetime Donor</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Register a new lifetime donor</p>
            </div>
            <button onClick={onClose} className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* FORM */}
          <div className="p-6 dark:bg-gray-800">
            <LifetimeDonorForm donor={null} onSubmit={handleSubmit} />
          </div>

          {/* FOOTER BUTTONS */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t p-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="donor-form" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
