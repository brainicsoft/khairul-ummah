"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useDeleteLifetimeDonorMutation, useGetLifetimeDonorsQuery } from "@/redux/features/lifetimeDonor/lifetimedonorApi"
import LifetimeDonorTable from "./components/LifetimeDonorTable"
import LifetimeDonorDetailModal from "./components/LifetimeDonorDetails"
import LifetimeDonorCreateModal from "./components/CreateModal"
import LifetimeDonorEditModal from "./components/LifetimeDonorEditModal"

interface ILifetimeDonor {

    _id: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
    profession: string;
    address: string;
    message: string;
    slug?: string;
    termsAccepted: boolean;
}

export default function LifetimeDonorManagementPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [limit, setLimit] = useState(25)
   
    // Modal state
    const [selectedDonor, setSelectedDonor] = useState<ILifetimeDonor | null>(null)
    const [selectedEditDonor, setSelectedEditDonor] = useState<ILifetimeDonor | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const {
        data: donorsData,
        isLoading,
        error,
        refetch,
    } = useGetLifetimeDonorsQuery({
        page: currentPage,
        limit: limit.toString(),
        searchTerm: searchTerm || undefined,
    })

    const [deleteLifetimeDonor] = useDeleteLifetimeDonorMutation()

    const donors = donorsData?.data || []
    const totalPages = Math.ceil(donorsData?.meta?.totalPage || 1)

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const handleViewDetails = (donor: ILifetimeDonor) => {
        setSelectedDonor(donor)
        setIsModalOpen(true)
    }

    const handleEditDetails = (donor: ILifetimeDonor) => {
        setSelectedEditDonor(donor)
        setIsEditModalOpen(true)

        
    }

    const handleDeleteDonor = (donor: ILifetimeDonor) => {
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
                    await deleteLifetimeDonor(donor?._id || "").unwrap()
                    refetch()
                    toast.success(`${donor.name} deleted successfully!`)
                } catch (error: any) {
                    toast.error(error?.message || "Failed to delete donor")
                }
            }
        })
    }

    const handleAddDonor = () => {
        setIsCreateModalOpen(true)
    }

    const mappedData = donors.map((donor: any) => ({
        ...donor,
        id: donor._id,
        _id:donor._id,
    }));

    return (
        <div className="p-6 space-y-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Lifetime Donor Management</h1>
                    <CardDescription>Manage and view all lifetime donors in one place</CardDescription>
                </div>
                <Button onClick={handleAddDonor}>Add New Donor</Button>
            </CardHeader>
            <Card>
                <CardContent>
                    <CardHeader className="text-sm text-gray-600">
                        <CardDescription>Total donors: {donorsData?.meta?.total || 0}</CardDescription>
                    </CardHeader>
                    {isLoading ? (
                        <div className="text-center py-8">Loading donors...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-600">Error loading donors</div>
                    ) : (
                        <LifetimeDonorTable
                            data={mappedData}
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            onViewDetails={handleViewDetails}
                            onEditDetails={handleEditDetails}
                            onDelete={handleDeleteDonor}
                            limit={limit}
                            onLimitChange={(newLimit) => {
                                setLimit(newLimit)
                                setCurrentPage(1)
                            }}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <LifetimeDonorDetailModal donor={selectedDonor} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Create Modal */}
            <LifetimeDonorCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false)
                    refetch()
                }}
                onAdd={() => {
                    refetch()
                }}
            />

            {/* Edit Modal */}
            <LifetimeDonorEditModal
                donor={selectedEditDonor}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    refetch()
                }}
                onUpdate={() => {
                    refetch()
                }}
            />
        </div>
    )
}
