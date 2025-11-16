'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface GalleryImage {
  id: number;
  image: string;
  alt: string;
  title: string;
  purpose: string;
  date: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: number) => void;
}

export default function GalleryGrid({ images, onEdit, onDelete }: GalleryGridProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border"
          >
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              <Image
                src={image.image || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                {image.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                আপডেট: {formatDate(image.date)}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(image)}
                  className="flex-1 dark:bg-gray-600 dark:text-white"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setDeleteId(image.id)}
                  className="flex-1 dark:bg-gray-600 bg-white text-red-600 border"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>ছবি মুছে ফেলুন?</AlertDialogTitle>
          <AlertDialogDescription>
            এই ক্রিয়া অপরিবর্তনীয়। এই ছবিটি চিরস্থায়ীভাবে মুছে দেওয়া হবে।
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-red-600">
              মুছে ফেলুন
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
