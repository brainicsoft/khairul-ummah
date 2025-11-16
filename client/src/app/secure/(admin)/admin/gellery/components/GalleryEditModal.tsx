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

interface GalleryImage {
  id: number;
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

export default function GalleryEditModal({
  open,
  onOpenChange,
  selectedImage,
}: GalleryEditModalProps) {
  const [formData, setFormData] = useState<GalleryImage>(selectedImage);
  const [preview, setPreview] = useState<string>(selectedImage.image);
  const [image, setImage] = useState<File | null>(null);
  
  useEffect(() => {
    setFormData(selectedImage);
    setPreview(selectedImage.image);
  }, [selectedImage]);

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
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("ছবি আপলোড করা বাধ্যতামূলক");
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
    // const response= await updateGallery({ id: formData.id, data: formdata }).unwrap();
    

    // try {
    //     const response = await galleryRequest(formdata).unwrap();
    //     if (response.status === 200) {
    //         toast.success("ছবি আপডেট করা হয়েছে!");
    //     }
    //     
    //     setPreview("");
    //     setImage(null);
    //     onOpenChange(false);
    // } catch (error: any) {
    //     toast.error(error?.data?.message || "Something went wrong.");
    // }

    toast.error(" need to be implemented api call");
    setPreview("");
    setImage(null);
    onOpenChange(false);
   
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
              <h2 className="text-xl font-bold">ছবি আপডেট করুন</h2>
              <p className="text-sm text-gray-600 dark:text-white">গ্যালারির ছবি আপডেট করুন</p>
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

            <div className='dark:text-white'>
              <Label htmlFor="alt-edit">বিকল্প পাঠ্য</Label>
              <Input
                id="alt-edit"
                value={formData.alt}
                onChange={(e) =>
                  setFormData({ ...formData, alt: e.target.value })
                }
                placeholder="ছবির বর্ণনা"
                className="mt-2"
              />
            </div>

            <div className='dark:text-white'>
              <Label htmlFor="purpose-edit">উদ্দেশ্য</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value) =>
                  setFormData({ ...formData, purpose: value })
                }
              >
                <SelectTrigger id="purpose-edit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PURPOSES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='dark:text-white'>
              <Label htmlFor="date-edit">তারিখ</Label>
              <Input
                id="date-edit"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="mt-2"
              />
            </div>


          </form>
          <div className=" pt-4 sticky bottom-0 bg-white dark:text-white dark:bg-gray-600 border-t p-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 dark:bg-white"
            >
              বাতিল
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              সংরক্ষণ করুন
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
