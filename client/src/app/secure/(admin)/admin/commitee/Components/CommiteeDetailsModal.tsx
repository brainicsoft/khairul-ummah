'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';

interface CommitteeMember {
    _id: string;
    email: string;
    name: string;
    phone: string;
    image: string;
    roleType: string;
    occupation: string;
    title: string;
}

interface CommitteeDetailsModalProps {
  member: CommitteeMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommitteeDetailsModal({ member, isOpen, onClose }: CommitteeDetailsModalProps) {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-card">

        {/* Image section */}
        <div className="relative w-full aspect-[4/3] bg-white rounded-md overflow-hidden rounded-t-lg">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            className="object-contain w-full h-full rounded-md"
          />
        </div>

        {/* Content section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-1">
            {member.name}
          </h2>
          
          <div className="flex gap-2 mb-4">
            <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {member.roleType}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className='flex gap-2 items-center'>
              <p className="text-muted-foreground text-xs font-semibold mb-1">পদবী :</p>
              <p className="text-card-foreground font-medium">{member.title}</p>
            </div>

            <div className='flex gap-2 items-center'>
              <p className="text-muted-foreground text-xs font-semibold mb-1">পেশা</p>
              <p className="text-card-foreground font-medium">{member.occupation}</p>
            </div>

            <div className='flex gap-2 items-center'>
              <p className="text-muted-foreground text-xs font-semibold mb-1">ইমেইল</p>
              <a 
                href={`mailto:${member.email}`}
                className="text-primary hover:underline font-medium"
              >
                {member.email}
              </a>
            </div>

            <div className='flex gap-2 items-center'>
              <p className="text-muted-foreground text-xs font-semibold mb-1">ফোন</p>
              <a 
                href={`tel:${member.phone}`}
                className="text-primary hover:underline font-medium"
              >
                {member.phone}
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
