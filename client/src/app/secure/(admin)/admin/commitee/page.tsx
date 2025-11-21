'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import CommitteeGrid from './Components/CommiteeGrid';
import CommitteeEditModal from './Components/CommiteeEditModal';
import CommitteeCreateModal from './Components/CommiteeCreateModal';
import { useDeleteCommiteeMutation, useGetAllCommiteesQuery } from '@/redux/features/commitee/commiteeApi';
import { MemberRoleData } from '@/components/MemberRoleData';

interface CommitteeMember {
    _id: string;
    email: string;
    name: string;
    phone: string;
    image: string;
    roleType: string;
    occupation: string;
    // title: string;
}

export default function CommitteePage() {
    const [selectedRole, setSelectedRole] = useState('All');
    const { data: committeeData, error, isLoading, refetch } = useGetAllCommiteesQuery({
        page: 1,
        limit: "50",
        roleType: selectedRole !== 'All' ? selectedRole : undefined,
    });
    const [deleteCommittee] = useDeleteCommiteeMutation()

    // API ডাটা ম্যাপ করে CommitteeMember টাইপে ফিক্স করা
    const committeeMembers: CommitteeMember[] = committeeData?.data.map((member: any) => ({
        _id: member._id,
        email: member.email || '',
        name: member.name || 'নাম নেই',
        phone: member.phone || 'ফোন নেই',
        image: member.image || '/placeholder.svg',
        roleType: member.roleType || 'অন্যান্য',
        occupation: member.occupation || 'পেশা নেই',
        // title: member.title || 'শিরোনাম নেই',
    })) || [];

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

    const handleDelete = (_id: string) => {
        if (!_id) {
            toast.error("সদস্য আইডি খুঁজে পাওয়া যায়নি!")
            return
        }
        Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "আপনি এটি পূর্বাবস্থায় ফিরাতে পারবেন না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, মুছে দিন!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCommittee(_id).unwrap()
                    refetch()
                    Swal.fire({
                        title: "মুছে ফেলা হয়েছে!",
                        text: "সদস্য সফলভাবে মুছে ফেলা হয়েছে।",
                        icon: "success",
                    })

                } catch (error: any) {
                    toast.error(error?.data?.message || "কিছু ভুল হয়েছে।")
                }
            }
        })
    };

    const handleEditOpen = (member: CommitteeMember) => {
        setSelectedMember(member);
        setIsEditOpen(true);
    };
    const commiteeRoleTypes = MemberRoleData()
    const rolesWithAll = ['All', ...commiteeRoleTypes];
 

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold dark:text-white">কমিটি ব্যবস্থাপনা</h1>
                    <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        নতুন সদস্য যোগ করুন
                    </Button>
                </div>
                {/* Filter Dropdown */}
                <div className="mb-8 flex items-center">
                    <label className="mr-2 dark:text-white font-medium">Filter by Role:</label>

                    <Select
                        value={selectedRole}
                        onValueChange={(value) => setSelectedRole(value)}
                    >
                        <SelectTrigger className="w-52 border rounded dark:bg-gray-600 dark:text-white">
                            <SelectValue placeholder="Select role" className='dark:bg-white' />
                        </SelectTrigger>
                        <SelectContent className='dark:bg-white'>
                            {rolesWithAll.map((role) => (
                                <SelectItem key={role} value={role} className='dark:bg-white'>
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <CommitteeGrid
                    members={committeeMembers}
                    onEdit={handleEditOpen}
                    onDelete={handleDelete}
                />
            </div>
            <CommitteeCreateModal
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                refetch={refetch}
            />

            {selectedMember && (
                <CommitteeEditModal
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    selectedMember={selectedMember}
                    refetch={refetch}
                />
            )}

            {/* if data is not available */}
            {committeeMembers.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No data available members
                </div>
            )}
        </main>
    );
}
