'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/FormInput';
import { PhotoUpload } from '@/components/form/photo-upload';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
}

interface CommitteeEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedMember: CommitteeMember;
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

export default function CommitteeEditModal({
    open,
    onOpenChange,
    selectedMember,
    refetch,
}: CommitteeEditModalProps) {
    const [formData, setFormData] = useState<CommitteeMember>({
        _id: '',
        email: '',
        name: '',
        phone: '',
        image: '',
        roleType: '',
        occupation: '',
    });
    const [preview, setPreview] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [updateCommittee, { isLoading }] = useUpdateCommiteeMutation();

    useEffect(() => {
        if (selectedMember) {
            setFormData({
                ...selectedMember,
                roleType: selectedMember.roleType?.trim() || '',
            });
            setPreview(selectedMember.image);
            setImage(null);
        }
    }, [selectedMember]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
    };

    const handleRemoveImage = () => {
        setPreview('');
        setImage(null);
        setFormData({ ...formData, image: '' });
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!formData.name) return toast.error('নাম লিখুন');
        if (!formData.phone) return toast.error('ফোন নম্বর লিখুন');
        if (!formData.roleType) return toast.error('ভূমিকা নির্বাচন করুন');

        const finalData = {
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            roleType: formData.roleType,
            occupation: formData.occupation,
        };

        const fd = new FormData();
        if (image) fd.append('image', image);
        fd.append('data', JSON.stringify(finalData));

        try {
            const response = await updateCommittee({ id: formData._id, data: fd }).unwrap();
            if (response.status === 200) toast.success('সদস্য আপডেট হয়েছে!');
            refetch();
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'কিছু ভুল হয়েছে।');
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
                        <PhotoUpload
                            photoPreview={preview}
                            onPhotoUpload={handleImageUpload}
                            onRemovePhoto={handleRemoveImage}
                            photoTitle="সদস্যের ছবি"
                        />
                        <FormInput
                            label="নাম"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <FormInput
                            label="ইমেইল (ঐচ্ছিক)"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <FormInput
                            label="ফোন নম্বর"
                            type="number"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />

                        {/* Role Select */}
                        <div className="dark:text-white">
                            <label className="text-sm font-medium text-gray-700 dark:text-white mb-2 block">
                                ভূমিকা <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={ROLE_TYPES.some(r => r.value === formData.roleType) ? formData.roleType : ''}
                                onValueChange={(value) => setFormData({ ...formData, roleType: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {ROLE_TYPES.find(r => r.value === formData.roleType)?.label || 'ভূমিকা নির্বাচন করুন'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-gray-700">
                                    {ROLE_TYPES.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <FormInput
                            label="পেশা"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        />
                    </form>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 dark:bg-white dark:text-black">
                            বাতিল
                        </Button>
                        <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
                            {isLoading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
