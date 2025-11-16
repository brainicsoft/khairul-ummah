'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import GalleryGrid from './components/GalleryGrid';
import GalleryCreateModal from './components/GaleeryCreateModal';
import GalleryEditModal from './components/GalleryEditModal';

interface GalleryImage {
    id: number;
    image: string;
    alt: string;
    title: string;
    purpose: string;
    date: string;
}
const MOCK_GALLERY_DATA: GalleryImage[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
        alt: 'Community event',
        title: 'প্রতিবেদন',
        purpose: 'community',
        date: '2025-06-12',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
        alt: 'Food distribution during flood',
        title: 'স্টোমান বৃক্ষরোপণ',
        purpose: 'flood',
        date: '2025-06-17',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
        alt: 'Team meeting',
        title: 'স্টোমান মাসার',
        purpose: 'meeting',
        date: '2025-06-17',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
        alt: 'Community gathering',
        title: 'প্রকার্য সদার রামবায়াইয়া মিটিং',
        purpose: 'gathering',
        date: '2025-06-17',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=400&fit=crop',
        alt: 'Relief work',
        title: 'প্রকার্য সদার রামবায়াইয়া',
        purpose: 'relief',
        date: '2025-06-17',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
        alt: 'Flood relief',
        title: 'রামবায়াইয়া সময়ের',
        purpose: 'flood',
        date: '2025-06-17',
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=400&fit=crop',
        alt: 'Team event',
        title: 'রামবায়াইয়া সময়ের',
        purpose: 'event',
        date: '2025-06-17',
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=400&fit=crop',
        alt: 'Water relief',
        title: 'প্রাণ বিদ্রোহ',
        purpose: 'water',
        date: '2025-06-17',
    },
];
export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>(MOCK_GALLERY_DATA);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
    const purposes = Array.from(new Set(images.map(img => img.purpose))).sort();
    const filteredImages = selectedPurpose
        ? images.filter(img => img.purpose === selectedPurpose)
        : images;

    const handleDelete = (id: number) => {
        setImages(images.filter(img => img.id !== id));
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

                <div className="mb-6 flex flex-wrap gap-2 dark:text-white">
                    <Button
                        variant={selectedPurpose === null ? "default" : "outline"}
                        onClick={() => setSelectedPurpose(null)}
                        className="rounded-full"
                    >
                        All
                    </Button>
                    {purposes.map((purpose) => (
                        <Button
                            key={purpose}
                            variant={selectedPurpose === purpose ? "default" : "outline"}
                            onClick={() => setSelectedPurpose(purpose)}
                            className="rounded-full capitalize"
                        >
                            {purpose}
                        </Button>
                    ))}
                </div>

                <GalleryGrid
                    images={filteredImages}
                    onEdit={handleEditOpen}
                    onDelete={handleDelete}
                />
            </div>

            <GalleryCreateModal
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
            />

            {selectedImage && (
                <GalleryEditModal
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    selectedImage={selectedImage}
                />
            )}
        </main>
    );
}
