'use client';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import CommitteeDetailsModal from './CommiteeDetailsModal';
import { useState } from 'react';

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

interface CommitteeGridProps {
    members: CommitteeMember[];
    onEdit: (member: CommitteeMember) => void;
    onDelete: (_id: string) => void;
}

export default function CommitteeGrid({ members, onEdit, onDelete }: CommitteeGridProps) {
    const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const handleViewDetails = (member: CommitteeMember) => {
        setSelectedMember(member);
        setIsDetailsOpen(true);
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((member) => (
                    <>
                        <div
                            key={member._id}
                            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border"
                        >



                            <div
                                onClick={() => handleViewDetails(member)}
                                className="relative w-full bg-white overflow-hidden aspect-square cursor-pointer group"
                            >
                                <Image
                                    src={member.image || "/placeholder.svg"}
                                    alt={member._id}
                                    fill
                                    className="object-fill w-full hover:scale-105 transition-transform duration-300"
                                />

                                {/* Eye Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                            </div>


                            <div className="p-4">
                                <h3 className="text-xl font-bold text-card-foreground mb-1 line-clamp-2">
                                    {member.name}
                                </h3>
                                <p className="text-md text-muted-foreground">
                                    {member.roleType}
                                </p>
                                <p className="text-md text-muted-foreground mb-2">
                                    {member.title}
                                </p>
                                {/* <p className="text-xs text-muted-foreground mb-1">
                                    📧 {member.email}
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">
                                    📱 {member.phone}
                                </p> */}

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => onEdit(member)}
                                        className="flex-1 dark:bg-gray-600 dark:text-white dark:hover:text-black"
                                    >
                                        <Pencil className="w-4 h-4 dark:hover:text-black" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => onDelete(member._id)}
                                        className="flex-1 dark:bg-gray-600 bg-white text-red-600 border"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </>
                ))}
            </div>
            <CommitteeDetailsModal
                member={selectedMember}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
            />
        </>
    );
}
