"use client"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormInput, FormTextarea } from "@/components/form/FormInput"
import { PhotoUpload } from "@/components/form/photo-upload"
import toast from "react-hot-toast"
import { useDonationRequestMutation } from "@/redux/features/donationProjects/donationProjectApi"

export interface ProjectFormData {
    title: string
    desc: string
    category: string
    status: string
    videoUrl?: string
    benefits: string[]
}

interface ProjectAddFormProps {
    onClose: () => void
    refetch: () => void
    setIsLoading?: (loading: boolean) => void
}
interface ApiResponse {
    status: number;
    data?: any;
    message?: string;
}

export default function AddForm({ onClose, refetch, setIsLoading }: ProjectAddFormProps) {
    const [photo, setPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState("")
    const [addingBenefit, setAddingBenefit] = useState(false)
    const [newBenefit, setNewBenefit] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [donationRequest, { isLoading }] = useDonationRequestMutation()

    const { register, handleSubmit, setValue, watch } = useForm<ProjectFormData>({
        defaultValues: { benefits: [] }
    })

    const benefits = watch("benefits") || []

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith("image/")) return toast.error("শুধুমাত্র ছবি ফাইল আপলোড করুন")
        if (file.size > 2 * 1024 * 1024) return toast.error("ছবির সাইজ 2MB এর কম হতে হবে")

        const reader = new FileReader()
        reader.onloadend = () => {
            setPhotoPreview(reader.result as string)
            setPhoto(file)
        }
        reader.readAsDataURL(file)
    }

    const handleRemovePhoto = () => {
        setPhoto(null)
        setPhotoPreview("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const addBenefit = () => {
        if (!newBenefit.trim()) return
        setValue("benefits", [...benefits, newBenefit.trim()])
        setNewBenefit("")
        setAddingBenefit(false)
    }

    const removeBenefit = (index: number) => {
        const newBenefits = benefits.filter((_, i) => i !== index)
        setValue("benefits", newBenefits)
    }

    const onSubmit = async (data: ProjectFormData) => {
        const formData = new FormData()
        console.log(photo)
        if (photo) formData.append("image", photo)
        formData.append("data", JSON.stringify(data))
        // TODO: Replace with API call
        try {
            if (setIsLoading) setIsLoading(true);
            const response = await donationRequest(formData).unwrap() as ApiResponse
            console.log(response)
            if (response.status === 201) {
                toast.success("প্রকল্প সফলভাবে যোগ হয়েছে!")
                refetch()
                onClose()
            } 

        } catch (error: any) {
            if(error.status === 409){
                toast.error(error.message)
            } else {
                toast.error(error?.data?.message || "যোগ করতে সমস্যা হয়েছে।")
            }
            
        } finally {
            if (setIsLoading) setIsLoading(false);
        }

    }

    return (
        <form id="project-add-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput label="প্রকল্প শিরোনাম" required {...register("title", { required: true })} />
            <FormTextarea label="বিবরণ" required {...register("desc", { required: true })} />

            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="ক্যাটাগরি" {...register("category")} />
                <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">স্ট্যাটাস</label>
                    <select
                        {...register("status")}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-800 dark:text-gray-100"
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        {/* add more as needed */}
                    </select>
                </div>
            </div>

            <FormInput type="url" label="ভিডিও URL" {...register("videoUrl")} />

            <PhotoUpload
                photoTitle="প্রকল্প ছবি"
                photoPreview={photoPreview}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
                error={undefined}
            />

            {/* Benefits */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">সুবিধাসমূহ</label>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    {benefits.map((b, i) => (
                        <li key={i} className="flex justify-between items-center">
                            <span>{b}</span>
                            <Button size="sm" variant="outline" type="button" onClick={() => removeBenefit(i)}>Remove</Button>
                        </li>
                    ))}
                </ul>

                {addingBenefit ? (
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={newBenefit}
                            onChange={(e) => setNewBenefit(e.target.value)}
                            className="border rounded px-2 py-1 flex-1"
                            placeholder="নতুন সুবিধা লিখুন"
                        />
                        <Button size="sm" type="button" onClick={addBenefit}>Add</Button>
                        <Button size="sm" variant="outline" type="button" onClick={() => { setAddingBenefit(false); setNewBenefit("") }}>Cancel</Button>
                    </div>
                ) : (
                    <Button size="sm" variant="outline" type="button" onClick={() => setAddingBenefit(true)}>Add Benefit</Button>
                )}
            </div>
        </form>
    )
}
