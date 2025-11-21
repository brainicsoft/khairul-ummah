'use client';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogClose,
} from '@/components/ui/dialog';

interface galleryItem {
    _id: string;
    alt: string;
    image: string;
    title: string;
    purpose: string;
    date: string;
}

interface galleryItemDetailsModalProps {
    galleryItem: galleryItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function GelleryDetialsModal({ galleryItem, isOpen, onClose }: galleryItemDetailsModalProps) {
    if (!galleryItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 gap-0 bg-card">

                {/* Image section */}
                <div className="relative w-full aspect-[4/3] bg-white rounded-md overflow-hidden rounded-t-lg">
                    <Image
                        src={galleryItem.image || "/placeholder.svg"}
                        alt={galleryItem.alt}
                        fill
                        className="object-contain w-full h-full rounded-md"
                    />
                </div>

                {/* Content section */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-card-foreground mb-1">
                        {galleryItem.title}
                    </h2>

                    <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {galleryItem.purpose}
                        </span>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className='flex gap-2 items-center'>
                            <p className="text-card-foreground font-medium">{galleryItem.date}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
