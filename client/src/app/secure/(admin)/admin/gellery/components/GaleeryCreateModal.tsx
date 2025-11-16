'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  onSubmit: (image: GalleryImage) => void;
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

export default function GalleryCreateModal({
  open,
  onOpenChange,
  onSubmit,
}: GalleryCreateModalProps) {
  const [formData, setFormData] = useState<GalleryImage>({
    image: '',
    alt: '',
    title: '',
    purpose: 'community',
    date: new Date().toISOString().split('T')[0],
  });

  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, image: result });
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.image && formData.title) {
      onSubmit(formData);
      setFormData({
        image: '',
        alt: '',
        title: '',
        purpose: 'community',
        date: new Date().toISOString().split('T')[0],
      });
      setPreview('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>নতুন ছবি যোগ করুন</DialogTitle>
          <DialogDescription>গ্যালারিতে একটি নতুন ছবি যোগ করতে ফর্মটি পূরণ করুন।</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="image-upload">ছবি</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            {preview && (
              <div className="mt-3 relative w-full h-32 rounded-md overflow-hidden bg-muted">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="title">শিরোনাম</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="শিরোনাম লিখুন"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="alt">বিকল্প পাঠ্য</Label>
            <Input
              id="alt"
              value={formData.alt}
              onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
              placeholder="ছবির বর্ণনা"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="purpose">উদ্দেশ্য</Label>
            <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger id="purpose" className="mt-2">
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

          <div>
            <Label htmlFor="date">তারিখ</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              বাতিল
            </Button>
            <Button type="submit" className="flex-1">
              যোগ করুন
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
