"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export interface ILifetimeDonor {
  email: string
  name: string
  slug?: string
  phone: string
  amount: number
  profession: string
  address: string
  message: string
  termsAccepted: boolean
  __v?: number
}

interface LifetimeDonorFormProps {
  donor: ILifetimeDonor | null
  onSubmit: (data: ILifetimeDonor) => void
}

export default function LifetimeDonorForm({ donor, onSubmit }: LifetimeDonorFormProps) {
  const [formData, setFormData] = useState<ILifetimeDonor>({
    email: "",
    name: "",
    phone: "",
    amount: 0,
    profession: "other",
    address: "",
    message: "",
    termsAccepted: false,
  })

  useEffect(() => {
    if (donor) {
      setFormData(donor)
    }
  }, [donor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }))
  }
 
  const handleCheckChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form id="donor-form" onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount ($)
          </label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="profession" className="block text-sm font-medium">
            Profession
          </label>
          <Input
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profession"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium">
          Address
        </label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message (optional)"
          className="min-h-24"
        />
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Checkbox id="terms" checked={formData.termsAccepted} onCheckedChange={handleCheckChange} />
        <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
          I accept the terms and conditions
        </label>
      </div>
    </form>
  )
}
