"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

export interface DonationFormData {
  name: string
  email: string
  phone: string
  amount: number
  status: string
  donationType: string
}

interface DonationEditFormProps {
  donation: any | null
  onClose: () => void
  onUpdate: (donation: any) => void
  setIsLoading?: (loading: boolean) => void
}

export default function DonationEditForm({ donation, onClose, onUpdate, setIsLoading }: DonationEditFormProps) {
  const { register, handleSubmit, setValue } = useForm<DonationFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      amount: 0,
      status: "pending",
      donationType: "general",
    },
  })

  useEffect(() => {
    if (donation) {
      setValue("name", donation.name || "")
      setValue("email", donation.email || "")
      setValue("phone", donation.phone || "")
      setValue("amount", donation.amount || 0)
      setValue("status", donation.status || "pending")
      setValue("donationType", donation.donationType || "general")
    }
  }, [donation, setValue])

  const onSubmit = async (data: DonationFormData) => {
    try {
      if (setIsLoading) setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const updatedDonation = {
        ...donation,
        ...data,
        updatedAt: new Date().toISOString(),
      }
      onUpdate(updatedDonation)
      onClose()
      toast.success("ডোনেশন সফলভাবে আপডেট হয়েছে!")
    } catch (error: any) {
      toast.error("আপডেট করতে সমস্যা হয়েছে।")
    } finally {
      if (setIsLoading) setIsLoading(false)
    }
  }

  return (
    <form id="donation-edit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ডোনারের নাম</label>
        <Input required placeholder="নাম লিখুন" {...register("name", { required: true })} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ফোন নম্বর</label>
          <Input required placeholder="ফোন নম্বর" {...register("phone", { required: true })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">ইমেইল</label>
          <Input type="email" placeholder="ইমেইল (ঐচ্ছিক)" {...register("email")} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">পরিমাণ (৳)</label>
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
