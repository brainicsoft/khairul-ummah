"use client"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { useState } from "react"

export interface DonationFormData {
  name: string
  email: string
  phone: string
  amount: number
  status: string
  donationType: string
}

interface DonationAddFormProps {
  onClose: () => void
  onAdd: (donation: any) => void
  setIsLoading?: (loading: boolean) => void
}

export default function DonationAddForm({ onClose, onAdd, setIsLoading }: DonationAddFormProps) {
  const { register, handleSubmit, reset } = useForm<DonationFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      amount: 0,
      status: "success",
      donationType: "general",
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: DonationFormData) => {
    try {
      setIsSubmitting(true)
      if (setIsLoading) setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newDonation = {
        ...data,
        paymentId: `TR${Date.now().toString().slice(-10)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onAdd(newDonation)
      reset()
      onClose()
      toast.success("ডোনেশন সফলভাবে যোগ হয়েছে!")
    } catch (error: any) {
      toast.error("যোগ করতে সমস্যা হয়েছে।")
    } finally {
      setIsSubmitting(false)
      if (setIsLoading) setIsLoading(false)
    }
  }

  return (
    <form id="donation-add-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ডোনারের নাম *</label>
        <Input required placeholder="নাম লিখুন" {...register("name", { required: true })} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ফোন নম্বর *</label>
          <Input required placeholder="ফোন নম্বর" {...register("phone", { required: true })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ইমেইল</label>
          <Input type="email" placeholder="ইমেইল (ঐচ্ছিক)" {...register("email")} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">পরিমাণ (৳) *</label>
          <Input
            type="number"
            required
            placeholder="পরিমাণ"
            {...register("amount", { required: true, valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ডোনেশন ধরন</label>
          <select
            {...register("donationType")}
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="qurbani">কুরবানী</option>
            <option value="general">সাধারণ</option>
            <option value="emergency">জরুরি</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">স্ট্যাটাস</label>
        <select
          {...register("status")}
          className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="success">সফল</option>
          <option value="pending">লম্বিত</option>
          <option value="failed">ব্যর্থ</option>
        </select>
      </div>
    </form>
  )
}
