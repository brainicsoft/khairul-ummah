"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import LifetimeDonorForm, { ILifetimeDonor } from "./LifeTimeDonorForm"
import { useUpdateLifetimeDonorMutation } from "@/redux/features/lifetimeDonor/lifetimedonorApi"

interface LifetimeDonorEditModalProps {
    donor: ILifetimeDonor | null
    isOpen: boolean
    onClose: () => void
    onUpdate: (donor: ILifetimeDonor) => void
}

export default function LifetimeDonorEditModal({ donor, isOpen, onClose, onUpdate }: LifetimeDonorEditModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [updateLifetimeDonor] = useUpdateLifetimeDonorMutation()
    if (!isOpen || !donor) return null
    const donorID = donor._id || ""
    const handleSubmit = async (data: ILifetimeDonor) => {
        const finalData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            amount: data.amount,
            profession: data.profession,
            address: data.address,
            message: data.message,
            termsAccepted: data.termsAccepted,
        }
        console.log(finalData)
        try {
            setIsLoading(true)
            // Simulate API call
            await updateLifetimeDonor({ id:donorID, data: finalData }).unwrap()
            // refetch()
            // onClose()
            toast.success("Donor updated successfully!")
        } catch (error: any) {
            toast.error(error?.message || "Failed to update donor")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-50 h-screen bg-black/50" onClick={onClose} />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto dark:bg-gray-800"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 border-b dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Edit Lifetime Donor</h2>
                            <p className="text-sm text-foreground">Update the donor information</p>
                        </div>
                        <button onClick={onClose} className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 p-1">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    {/* Form */}
                    <div className="p-6 dark:bg-gray-800">
                        <LifetimeDonorForm donor={donor} onSubmit={handleSubmit} />
                    </div>
                    {/* Footer */}
                    <div className="sticky bottom-0 dark:bg-gray-800 border-t p-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" form="donor-form" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
