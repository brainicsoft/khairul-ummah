'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCreateCommiteeMutation } from '@/redux/features/commitee/commiteeApi';


interface CommitteeMember {
    email: string;
    name: string;
    phone: string;
    image: string;
    roleType: string;
    occupation: string;
    // title: string;
}

interface CommitteeCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    refetch: () => void;
}

const ROLE_TYPES = [
    { value: 'চেয়ারম্যান', label: 'চেয়ারম্যান' },
    { value: 'ভাইস-চেয়ারম্যান', label: 'ভাইস চেয়ারম্যান' },
    { value: 'সেক্রেটারি', label: 'সেক্রেটারি' },
    { value: 'কোষাধ্যক্ষ', label: 'কোষাধ্যক্ষ' },
    { value: 'সদস্য', label: 'সদস্য' },
    { value: 'উপদেষ্টা', label: 'উপদেষ্টা' },
    { value: 'পরিচালক', label: 'পরিচালক' },
];

export default function CommitteeCreateModal({ open, onOpenChange, refetch }: CommitteeCreateModalProps) {
    if (!open) return null;
    const [createCommitee, { isLoading }] = useCreateCommiteeMutation()

    const [formData, setFormData] = useState<CommitteeMember>({
        email: '',
        name: '',
        phone: '',
        image: '',
        roleType: '',
        occupation: '',
        // title: '',
    });

    const [preview, setPreview] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    // Handle Image Upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('শুধুমাত্র ছবি ফাইল আপলোড করুন');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                toast.error('ছবির সাইজ 10MB এর কম হতে হবে');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(image)
        if (!image) {
            toast.error("ছবি আপলোড করা বাধ্যতামূলক");
            return;
        }
        if (!formData.roleType) {
            toast.error("ভূমিকা নির্বাচন করা বাধ্যতামূলক!");
            return;
        }
        if (!formData.phone) {
            toast.error("ফোন নম্বর লিখুন");
            return;
        }

        const finalData = {
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            roleType: formData.roleType,
            occupation: formData.occupation,
            // title: formData.title,
        };

        const formDataToSend = new FormData();
        formDataToSend.append("image", image);
        formDataToSend.append("data", JSON.stringify(finalData));
        try {
            const response = await createCommitee(formDataToSend).unwrap()
            if (response.status === 201) {
                toast.success("সদস্য যোগ করা হয়েছে!");
            }
            refetch()
            setFormData({
                email: '',
                name: '',
                phone: '',
                image: '',
                roleType: '',
                occupation: '',
                // title: '',
            });
            setPreview("");
            setImage(null);
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error?.data?.message || "কিছু ভুল হয়েছে।");
        }
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
                <div
                    className="w-full max-w-4xl  rounded-lg shadow-lg max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-gray-600"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-600">
                        <div>
                            <h2 className="text-2xl font-bold dark:text-white">নতুন সদস্য যোগ করুন</h2>
                            <p className="text-sm text-gray-600">কমিটিতে একজন নতুন সদস্য যোগ করতে ফর্মটি পূরণ করুন।</p>
                        </div>

                        <button onClick={() => onOpenChange(false)} className="p-1 rounded-md hover:bg-gray-100">
                            <X className="h-5 w-5 dark:text-white cursor-pointer dark:hover:text-gray-800" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">

                        <div className='dark:text-white'>
                            <Label htmlFor="image-upload">ছবি</Label>
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-2"
                            />

                            {preview && (
                                <div className="mt-3 relative w-full aspect-[4/3] rounded-md overflow-hidden bg-muted">
                                    <Image
                                        src={preview || "/placeholder.svg"}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview("");
                                            setImage(null);
                                            const input = document.getElementById("image-upload") as HTMLInputElement;
                                            if (input) input.value = "";
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className='dark:text-white'>
                            <Label>নাম</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="সদস্যের নাম লিখুন"
                                className="mt-2"
                                required
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label>ইমেইল(ঐচ্ছিক)</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="ইমেইল লিখুন"
                                className="mt-2"
                                required
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label>ফোন নম্বর</Label>
                            <Input
                                type='number'
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="ফোন নম্বর লিখুন"
                                className="mt-2"
                                required
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label>ভূমিকা</Label>
                            <Select
                                value={formData.roleType}
                                onValueChange={(value) => setFormData({ ...formData, roleType: value })}
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="ভূমিকা নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {ROLE_TYPES.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='dark:text-white'>
                            <Label>পেশা</Label>
                            <Input
                                value={formData.occupation}
                                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                placeholder="পেশা লিখুন"
                                className="mt-2"
                            />
                        </div>

                        {/* <div className='dark:text-white'>
                            <Label>শিরোনাম</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="শিরোনাম লিখুন"
                                className="mt-2"
                            />
                        </div> */}
                    </form>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white dark:text-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
                        <Button className="dark:bg-white dark:text-black" variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "যোগ হচ্ছে..." : "যোগ করুন"}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
