"use client"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormInput, FormTextarea } from "@/components/form/FormInput"
import { FormSelect } from "@/components/form/form-select"
import { PhotoUpload } from "@/components/form/photo-upload"
import { IVolunteer, useUpdateVolunteerMutation } from "@/redux/features/volunteers/volunteersApi"
import toast from "react-hot-toast"


export interface VolunteerFormData {
    fullName: string
    fatherName: string
    motherName?: string
    NidNo: string
    mobileNumber: string
    email: string
    birthDate: string
    gender: string
    age: string
    presentAddress: string
    permanentAddress: string
    currentProfession: string
    organizationName: string
    workAddress: string
    educationQualification: string
    interestReason: string
}

interface VolunteerFormProps {
    volunteer: IVolunteer | null
    onClose: () => void
    refetch: () => void
}

export default function VolunteerForm({ volunteer, onClose, refetch }: VolunteerFormProps) {
    const [updateVolunteer, { isLoading }] = useUpdateVolunteerMutation()
    const [photo, setPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VolunteerFormData>()

    useEffect(() => {
        if (volunteer) {
            setValue("fullName", volunteer.fullName || "")
            setValue("fatherName", volunteer.fatherName || "")
            setValue("NidNo", volunteer.nidNo || "")
            setValue("mobileNumber", volunteer.mobileNumber || "")
            setValue("email", volunteer.email || "")
            setValue("birthDate", volunteer.birthDate?.split('T')[0] || "")
            setValue("gender", volunteer.gender || "")
            setValue("age", volunteer.age?.toString() || "")
            setValue("presentAddress", volunteer.presentAddress || "")
            setValue("permanentAddress", volunteer.permanentAddress || "")
            setValue("currentProfession", volunteer.currentProfession || "")
            setValue("organizationName", volunteer.organizationName || "")
            setValue("workAddress", volunteer.workAddress || "")
            setValue("educationQualification", volunteer.educationQualification || "")
            setValue("interestReason", volunteer.interestReason || "")

            if (volunteer.avatar) setPhotoPreview(volunteer.avatar)
        }
    }, [volunteer, setValue])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) return toast.error('শুধুমাত্র ছবি ফাইল আপলোড করুন')
        if (file.size > 2 * 1024 * 1024) return toast.error('ছবির সাইজ 2MB এর কম হতে হবে')

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

    const onSubmit = async (data: VolunteerFormData) => {
        if (!volunteer?._id) return toast.error("Volunteer ID not found!")

        try {
            const formData = new FormData()
            if (photo) formData.append("avatar", photo)

            const volunteerData = {
                fullName: data.fullName,
                fatherName: data.fatherName,
                motherName: data.motherName || "",
                nidNo: data.NidNo,
                mobileNumber: data.mobileNumber,
                email: data.email,
                birthDate: data.birthDate,
                gender: data.gender,
                age: data.age ? parseInt(data.age) : null,
                presentAddress: data.presentAddress,
                permanentAddress: data.permanentAddress,
                currentProfession: data.currentProfession,
                organizationName: data.organizationName,
                workAddress: data.workAddress,
                educationQualification: data.educationQualification,
                interestReason: data.interestReason,
            }

            formData.append("data", JSON.stringify(volunteerData))

            await updateVolunteer({ id: volunteer._id, data: formData }).unwrap()
            refetch()
            onClose()
            toast.success("তথ্য সফলভাবে আপডেট হয়েছে!")
        } catch (error: any) {
            toast.error(error?.data?.message || "আপডেট করতে সমস্যা হয়েছে।")
        }
    }

    const genderOptions = [
        { value: "male", label: "পুরুষ" },
        { value: "female", label: "মহিলা" },
        { value: "other", label: "অন্যান্য" }
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="সম্পূর্ণ নাম" required {...register("fullName", { required: true })} />
                <FormInput label="পিতার নাম" required {...register("fatherName", { required: true })} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="জাতীয় পরিচয়পত্র" {...register("NidNo")} />
                <FormInput label="মোবাইল নম্বর" {...register("mobileNumber")} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="ইমেইল" {...register("email")} />
                <FormInput label="জন্মতারিখ" type="date" {...register("birthDate")} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <FormSelect label="লিঙ্গ" options={genderOptions} {...register("gender")} />
                <FormInput label="বয়স" type="number" {...register("age")} />
            </div>
            {/* Address */}
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="বর্তমান ঠিকানা" {...register("presentAddress")} />
                <FormInput label="স্থায়ী ঠিকানা" {...register("permanentAddress")} />
            </div>
            {/* Profession */}
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="বর্তমান পেশা" {...register("currentProfession")} />
                <FormInput label="প্রতিষ্ঠানের নাম" {...register("organizationName")} />
            </div>
            <FormInput label="কর্মস্থলের ঠিকানা" {...register("workAddress")} />
            {/* Education */}
            <FormInput label="শিক্ষাগত যোগ্যতা" {...register("educationQualification")} />
            {/* Interest */}
            <FormTextarea label="স্বেচ্ছাসেবক হিসেবে আগ্রহ" {...register("interestReason")} />
            {/* Photo */}
            <PhotoUpload photoPreview={photoPreview} onPhotoUpload={handlePhotoUpload} onRemovePhoto={handleRemovePhoto} error={undefined} />
            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
                <Button variant="outline" onClick={onClose} disabled={isLoading}>বাতিল করুন</Button>
                <Button type="submit" disabled={isLoading}>{isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}</Button>
            </div>
        </form>
    )
}
