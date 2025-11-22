'use client';
import { useState, useEffect } from 'react';
import { X } from "lucide-react";
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useCreateGalleryMutation } from '@/redux/features/gallery/galleryApi';
import GalleryForm from './GaleeryForm';
interface GalleryImage {
    image: string;
    alt: string;
    title: string;
    purpose: string;
    date: string;
}
interface GalleryCreateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    refetch: () => void;
}
export default function GalleryCreateModal({ open, onOpenChange, refetch }: GalleryCreateModalProps) {
    if (!open) return null;
    const [createGallery, { isLoading }] = useCreateGalleryMutation();
    const [formData, setFormData] = useState<GalleryImage>({
        image: '',
        alt: '',
        title: '',
        purpose: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [preview, setPreview] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
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
        if (!image) return toast.error('ছবি আপলোড করা বাধ্যতামূলক');
        if (!formData.purpose) return toast.error('বিভাগ নির্বাচন করা বাধ্যতামূলক');
        const finalData = {
            alt: formData.alt,
            title: formData.title,
            purpose: formData.purpose,
            date: formData.date,
        };
        const fd = new FormData();
        fd.append('image', image);
        fd.append('data', JSON.stringify(finalData));
        try {
            const response = await createGallery(fd).unwrap();
            if (response.status === 201) toast.success('ছবি যোগ করা হয়েছে!');
            refetch();
            setFormData({
                image: '',
                alt: '',
                title: '',
                purpose: '',
                date: new Date().toISOString().split('T')[0],
            });
            setPreview('');
            setImage(null);
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
                    className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-600 rounded-lg shadow-lg flex flex-col overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between dark:bg-gray-600">
                        <div className='dark:text-white'>
                            <h2 className="text-2xl font-bold">নতুন ছবি যোগ করুন</h2>
                            <p className="text-sm text-gray-600 dark:text-white">গ্যালারিতে একটি নতুন ছবি যোগ করতে ফর্মটি পূরণ করুন।</p>
                        </div>
                        <button onClick={() => onOpenChange(false)} className="p-1 rounded-md hover:bg-gray-100">
                            <X className="h-5 w-5 dark:text-white cursor-pointer dark:hover:text-gray-800" />
                        </button>
                    </div>
                    {/* Form */}
                   <GalleryForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} preview={preview} setPreview={setPreview} handleImageUpload={handleImageUpload} handleRemoveImage={handleRemoveImage} />
                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
                        <Button variant="outline" className="dark:bg-white dark:text-black" onClick={() => onOpenChange(false)}>বাতিল</Button>
                        <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
