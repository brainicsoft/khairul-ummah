'use client';

import { useState, useEffect } from 'react';
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
import { useUpdateCommiteeMutation } from '@/redux/features/commitee/commiteeApi';


interface CommitteeMember {
    _id: string;
    email: string;
    name: string;
    phone: string;
    image: string;
    roleType: string;
    occupation: string;
    title: string;
}

interface CommitteeEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedMember: CommitteeMember;
    refetch: () => void;
}

const ROLE_TYPES = [
    { value: 'chairman', label: 'চেয়ারম্যান' },
    { value: 'vice-chairman', label: 'ভাইস চেয়ারম্যান' },
    { value: 'secretary', label: 'সেক্রেটারি' },
    { value: 'treasurer', label: 'কোষাধ্যক্ষ' },
    { value: 'member', label: 'সদস্য' },
    { value: 'adviser', label: 'উপদেষ্টা' },
];

export default function CommitteeEditModal({
    open,
    onOpenChange,
    selectedMember,
    refetch
}: CommitteeEditModalProps) {
    const [formData, setFormData] = useState<CommitteeMember>(selectedMember);
    const [preview, setPreview] = useState<string>(selectedMember.image);
    const [image, setImage] = useState<File | null>(null);
    const [updateCommittee, { isLoading }] = useUpdateCommiteeMutation()

    useEffect(() => {
        setFormData(selectedMember);
        setPreview(selectedMember.image);
    }, [selectedMember]);

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

        const finalData = {
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            roleType: formData.roleType,
            occupation: formData.occupation,
            title: formData.title,
        };

        const formDataToSend = new FormData();
        if (image) {
            formDataToSend.append("image", image);
        }
        formDataToSend.append("data", JSON.stringify(finalData));

        try {
            const response = await updateCommittee({ id: formData._id, data: formDataToSend }).unwrap();
            if (response.status === 200) {
                toast.success("সদস্য আপডেট করা হয়েছে!");
            }
            refetch()
            setPreview("");
            setImage(null);
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error?.data?.message || "কিছু ভুল হয়েছে।");
        }
    };

    if (!open) return null;
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/50"
                onClick={() => onOpenChange(false)}
            />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-600 rounded-lg shadow-lg overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 border-b bg-white dark:bg-gray-600 px-6 py-4 flex items-center justify-between z-10">
                        <div className='dark:text-white'>
                            <h2 className="text-xl font-bold">সদস্য আপডেট করুন</h2>
                            <p className="text-sm text-gray-600 dark:text-white">কমিটির সদস্য আপডেট করুন</p>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-full hover:bg-gray-100 p-1 cursor-pointer dark:text-white dark:hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className='dark:text-white'>
                            <Label htmlFor="image-upload-edit">ছবি</Label>
                            <Input
                                id="image-upload-edit"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-2"
                            />
                            {preview && (
                                <div className="mt-3 relative w-full aspect-[4/3] rounded-md overflow-hidden bg-muted">
                                    <Image
                                        src={preview || '/placeholder.svg'}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview('');
                                            setFormData({ ...formData, image: '' });
                                            const input = document.getElementById(
                                                'image-upload-edit'
                                            ) as HTMLInputElement;
                                            if (input) input.value = '';
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className='dark:text-white'>
                            <Label htmlFor="name-edit">নাম</Label>
                            <Input
                                id="name-edit"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="সদস্যের নাম লিখুন"
                                className="mt-2"
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label htmlFor="email-edit">ইমেইল</Label>
                            <Input
                                id="email-edit"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                placeholder="ইমেইল লিখুন"
                                className="mt-2"
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label htmlFor="phone-edit">ফোন নম্বর</Label>
                            <Input
                                id="phone-edit"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                placeholder="ফোন নম্বর লিখুন"
                                className="mt-2"
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
                            <Label htmlFor="occupation-edit">পেশা</Label>
                            <Input
                                id="occupation-edit"
                                value={formData.occupation}
                                onChange={(e) =>
                                    setFormData({ ...formData, occupation: e.target.value })
                                }
                                placeholder="পেশা লিখুন"
                                className="mt-2"
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label htmlFor="title-edit">শিরোনাম</Label>
                            <Input
                                id="title-edit"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                placeholder="শিরোনাম লিখুন"
                                className="mt-2"
                            />
                        </div>
                    </form>

                    {/* Footer */}
                    <div className=" pt-4 sticky bottom-0 bg-white dark:text-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 dark:bg-white dark:text-black"
                        >
                            বাতিল
                        </Button>
                        <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>{isLoading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
