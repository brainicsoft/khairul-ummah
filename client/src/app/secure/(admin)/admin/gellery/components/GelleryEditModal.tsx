'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/FormInput';
import { PhotoUpload } from '@/components/form/photo-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';
import { useUpdateGalleryMutation } from '@/redux/features/gallery/galleryApi';

interface GalleryImage {
  _id: string;
  image: string;
  alt: string;
  title: string;
  purpose: string;
  date: string;
}

interface GalleryEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImage: GalleryImage;
  refetch: () => void;
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

export default function GalleryEditModal({ open, onOpenChange, selectedImage, refetch }: GalleryEditModalProps) {
  const [formData, setFormData] = useState<GalleryImage>(selectedImage);
  const [preview, setPreview] = useState<string>(selectedImage.image);
  const [image, setImage] = useState<File | null>(null);
  const [updateGallery, { isLoading }] = useUpdateGalleryMutation();

  useEffect(() => {
    if (selectedImage) {
      setFormData(selectedImage);
      setPreview(selectedImage.image);
      setImage(null);
    }
  }, [selectedImage]);

  // Photo upload handler
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return toast.error('শিরোনাম লিখুন');
    if (!formData.alt) return toast.error('বিকল্প পাঠ্য লিখুন');
    if (!formData.purpose) return toast.error('বিভাগ নির্বাচন করুন');

    const finalData = {
      alt: formData.alt,
      title: formData.title,
      purpose: formData.purpose,
      date: formData.date,
    };

    const formdata = new FormData();
    if (image) {
      formdata.append('image', image); // image is File, safe
    }
    formdata.append('data', JSON.stringify(finalData));

    try {
      const response = await updateGallery({ id: formData._id, data: formdata }).unwrap();
      if (response.status === 200) toast.success('ছবি আপডেট করা হয়েছে!');
      refetch();
      setPreview('');
      setImage(null);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'কিছু ভুল হয়েছে।');
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-600 rounded-lg shadow-lg overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="sticky top-0 border-b px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-600">
            <div className='dark:text-white'>
              <h2 className="text-xl font-bold">ছবি আপডেট করুন</h2>
              <p className="text-sm text-gray-600 dark:text-white">গ্যালারির ছবি আপডেট করুন</p>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-1 rounded-md hover:bg-gray-100 dark:text-white">
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <PhotoUpload
              photoPreview={preview}
              onPhotoUpload={handleImageUpload}
              onRemovePhoto={handleRemoveImage}
              photoTitle="ছবি"
            />

            <FormInput
              label="শিরোনাম"
              value={formData.title}
              placeholder="শিরোনাম লিখুন"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <FormInput
              label="বিকল্প পাঠ্য"
              value={formData.alt}
              placeholder="ছবির বর্ণনা"
              onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            />

            <div className='dark:text-white'>
              <label className="block mb-1">বিভাগ</label>
              <Select value={formData.purpose} onValueChange={(v) => setFormData({ ...formData, purpose: v })}>
                <SelectTrigger className="mt-2"><SelectValue placeholder="বিভাগ নির্বাচন করুন" /></SelectTrigger>
                <SelectContent className="bg-white">
                  {PURPOSES.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <FormInput
              label="তারিখ"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </form>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-600 border-t p-4 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>বাতিল</Button>
            <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
