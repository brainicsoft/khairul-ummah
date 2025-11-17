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
  _id: string;
  image: string;
  alt: string;
  title: string;
  purpose: string;
  date: string;
}
interface GalleryGridProps {
  images: GalleryImage[];
  onEdit: (image: GalleryImage) => void;
  onDelete: (_id: string) => void;
}
export default function GalleryGrid({ images, onEdit, onDelete }: GalleryGridProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleDeleteConfirm = (id: string) => {
    onDelete(id);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
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
                  className="flex-1 dark:bg-gray-600 dark:text-white dark:hover:text-black"
                >
                  <Pencil className="w-4 h-4 dark:hover:text-black" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteConfirm(image._id)}
                  className="flex-1 dark:bg-gray-600 bg-white text-red-600 border"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
