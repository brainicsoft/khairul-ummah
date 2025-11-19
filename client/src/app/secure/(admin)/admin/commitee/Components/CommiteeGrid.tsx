'use client';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div
                        key={member._id}
                        className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border"
                    >
                        <div className="relative w-full h-48 bg-muted overflow-hidden">
                            <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member._id}
                                fill
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-card-foreground mb-1 line-clamp-2">
                                {member.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-1">
                                {member.roleType}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                                {member.title}
                            </p>
                            <p className="text-xs text-muted-foreground mb-1">
                                📧 {member.email}
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">
                                📱 {member.phone}
                            </p>

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
                ))}
            </div>
        </>
    );
}
