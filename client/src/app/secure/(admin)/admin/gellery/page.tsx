'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import GalleryGrid from './components/GalleryGrid';

import GalleryEditModal from './components/GalleryEditModal';
import { useDeleteGalleryMutation, useGetGalleryQuery } from '@/redux/features/gallery/galleryApi';
import GalleryCreateModal from './components/GaleeryCreateModal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface GalleryImage {
    _id: string;
    image: string;
    alt: string;
    title: string;
    purpose: string;
    date: string;
}

export default function GalleryPage() {
    const { data: galleryData, error, isLoading, refetch } = useGetGalleryQuery();
    const [deleteGallery] = useDeleteGalleryMutation()
    // API ডাটা ম্যাপ করে GalleryImage টাইপে ফিক্স করা
    const galleryImages: GalleryImage[] = galleryData?.data.map((img: any) => ({
        _id: img._id,
        image: img.image || '/placeholder.svg',
        alt: img.alt || 'ছবির বিবরণ নেই',
        title: img.title || 'বিবরণ নেই',
        purpose: img.purpose || 'অন্যান্য',
        date: img.date || new Date().toISOString(),
    })) || [];

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const handleDelete = (_id: string) => {
        // ডিলিট ফাংশন
        // setImages(images.filter(img => img._id !== _id));
        console.log(_id)
        if (!_id) {
            toast.error("Volunteer ID not found!")
            return
        }
        // console.log(volunteer._id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteGallery(_id).unwrap()
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Volunteer has been deleted.",
                        icon: "success",
                    })

                } catch (error: any) {
                    toast.error(error?.data?.message || "Something went wrong.")
                }
            }
        })
    };
    const handleEditOpen = (image: GalleryImage) => {
        setSelectedImage(image);
        setIsEditOpen(true);
    };
    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold dark:text-white">গ্যালারি ব্যবস্থাপনা</h1>
                    <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        নতুন ছবি যোগ করুন
                    </Button>
                </div>
                <GalleryGrid
                    images={galleryImages}
                    onEdit={handleEditOpen}
                    onDelete={handleDelete}
                />
            </div>
            <GalleryCreateModal
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                refetch={refetch}
            />

            {selectedImage && (
                <GalleryEditModal
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    selectedImage={selectedImage}
                    refetch={refetch}
                />
            )}
        </main>
    );
}
