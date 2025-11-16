'use client';

import { useState } from 'react';
import { X } from "lucide-react";
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
import { useCreateGalleryMutation } from '@/redux/features/gallery/galleryApi';

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
}
const PURPOSES = [
    { value: 'community', label: 'কমিউনিটি' },
    { value: 'flood', label: 'বন্যা ত্রাণ' },
    { value: 'meeting', label: 'সভা' },
    { value: 'gathering', label: 'সমাবেশ' },
    { value: 'relief', label: 'ত্রাণ' },
    { value: 'event', label: 'ইভেন্ট' },
    { value: 'water', label: 'জল ত্রাণ' },
];

export default function GalleryCreateModal({ open, onOpenChange }: GalleryCreateModalProps) {
    if (!open) return null;
    const [createGallery, { isLoading }] = useCreateGalleryMutation()

    const [formData, setFormData] = useState<GalleryImage>({
        image: '',
        alt: '',
        title: '',
        purpose: '',
        date: new Date().toISOString().split('T')[0],
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

        if (!image) {
            toast.error("ছবি আপলোড করা বাধ্যতামূলক");
            return;
        }
        if (!formData.purpose) {
            toast.error("বিভাগ নির্বাচন করা বাধ্যতামূলক!");
            return;
        }

        const finalData = {
            alt: formData.alt,
            title: formData.title,
            purpose: formData.purpose,
            date: formData.date,
        };
        console.log(finalData);

        const formdata = new FormData();
        formdata.append("image", image);
        formdata.append("data", JSON.stringify(finalData));

        // todo: api call

        try {
            const response = await createGallery(formdata).unwrap()
            
            console.log(response);
            if (response.status === 201) {
                toast.success("ছবি যোগ করা হয়েছে!");
            }
            setFormData({
                image: '',
                alt: '',
                title: '',
                purpose: '',
                date: new Date().toISOString().split('T')[0],
            });
            setPreview("");
            setImage(null);
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong.");
        }

        // toast.error(" need to be implemented api call");
        // setFormData({
        //     image: '',
        //     alt: '',
        //     title: '',
        //     purpose: '',
        //     date: new Date().toISOString().split('T')[0],
        // });
        // setPreview("");
        // setImage(null);
        // onOpenChange(false);
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
                            <h2 className="text-2xl font-bold dark:text-white">নতুন ছবি যোগ করুন</h2>
                            <p className="text-sm text-gray-600">গ্যালারিতে একটি নতুন ছবি যোগ করতে ফর্মটি পূরণ করুন।</p>
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
                                        src={preview}
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
                            <Label>শিরোনাম</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="শিরোনাম লিখুন"
                                className="mt-2"
                                required
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label>বিকল্প পাঠ্য</Label>
                            <Input
                                value={formData.alt}
                                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                                placeholder="ছবির বর্ণনা"
                                className="mt-2"
                                required
                            />
                        </div>

                        <div className='dark:text-white'>
                            <Label>বিভাগ</Label>
                            <Select
                                value={formData.purpose}
                                onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {PURPOSES.map((p) => (
                                        <SelectItem key={p.value} value={p.value}>
                                            {p.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='dark:text-white'>
                            <Label>তারিখ</Label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="mt-2"
                            />
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white dark:text-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
                        <Button className="dark:bg-white dark:text-black" variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
                        <Button onClick={handleSubmit}>যোগ করুন</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
