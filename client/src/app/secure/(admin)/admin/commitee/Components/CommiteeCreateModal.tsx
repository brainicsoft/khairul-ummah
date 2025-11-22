'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useCreateCommiteeMutation } from '@/redux/features/commitee/commiteeApi';
import CommiteeForm from './CommiteeForm';
interface CommitteeMember {
    email: string;
    name: string;
    phone: string;
    image: string;
    roleType: string;
    occupation: string;
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
    const [createCommitee, { isLoading }] = useCreateCommiteeMutation();
    const [formData, setFormData] = useState<CommitteeMember>({
        email: '',
        name: '',
        phone: '',
        image: '',
        roleType: '',
        occupation: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    // Handle Image Upload
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
        setImage(null);
        setPreview('');
    };
    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!image) return toast.error('ছবি আপলোড করা বাধ্যতামূলক');
        if (!formData.roleType) return toast.error('ভূমিকা নির্বাচন করা বাধ্যতামূলক!');
        if (!formData.phone) return toast.error('ফোন নম্বর লিখুন');
        const finalData = {
            roleType: formData.roleType,
            occupation: formData.occupation,
            phone: formData.phone,
            email: formData.email,
            name: formData.name,
        };
        // const payload = { ...formData };
        const fd = new FormData();
        fd.append('image', image);
        fd.append('data', JSON.stringify(finalData));
        try {
            const response = await createCommitee(fd).unwrap();
            if (response.status === 201) {
                toast.success('সদস্য যোগ করা হয়েছে!');
            }
            refetch();
            setFormData({
                email: '',
                name: '',
                phone: '',
                image: '',
                roleType: '',
                occupation: '',
            });
            setImage(null);
            setPreview('');
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'কিছু ভুল হয়েছে।');
        }
    };
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="w-full max-w-4xl rounded-lg shadow-lg max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-gray-600"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-gray-600 border-b px-6 py-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold dark:text-white">নতুন সদস্য যোগ করুন</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                কমিটিতে একজন নতুন সদস্য যোগ করতে ফর্মটি পূরণ করুন।
                            </p>
                        </div>
                        <button onClick={() => onOpenChange(false)} className="p-1 rounded-md hover:bg-gray-100">
                            <X className="h-5 w-5 dark:text-white cursor-pointer" />
                        </button>
                    </div>
                    {/* Body */}
                    <CommiteeForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} preview={preview} setPreview={setPreview} handleImageUpload={handleImageUpload} handleRemoveImage={handleRemoveImage} />
                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            বাতিল
                        </Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
