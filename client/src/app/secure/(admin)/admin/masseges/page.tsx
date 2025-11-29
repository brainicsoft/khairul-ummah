"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import Swal from "sweetalert2"
import { toast } from "sonner"
import MassegeTable from "./components/MassegeTable"
import MassegeDetailModal from "./components/MassegeDetails"
import { useDeleteMessageMutation, useGetAllMessagesQuery } from "@/redux/features/contacts/massegeApi"


interface IMessage {
    _id: string
    email: string
    name: string
    phone: string
    subject: string
    message: string
}



export default function MessageManagementPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [limit, setLimit] = useState(25)
    const [deleteMessage] = useDeleteMessageMutation()
    // Modal state
    const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data, error, isLoading, refetch } = useGetAllMessagesQuery({
        page: currentPage,
        searchTerm,
        limit: limit.toString(),
    })
    console.log(data)
    const allMessages = data?.data || []

    const filteredMessages = Array.isArray(allMessages)
        ? allMessages.filter(
            (message) =>
                message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (message.subject ?? "").toLowerCase().includes(searchTerm.toLowerCase())
        )
        : []

    const paginatedMessages = filteredMessages.slice((currentPage - 1) * limit, currentPage * limit)

    const totalPages = Math.ceil(filteredMessages.length / limit)

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const handleViewDetails = (message: IMessage) => {
        setSelectedMessage(message)
        setIsModalOpen(true)
    }

    // const handleDeleteMessage = (message: IMessage) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deleteMessage(message._id)
    //                 .then(() => {
    //                     refetch()
    //                     toast.success(`Message from ${message.name} deleted successfully!`)
    //                 })
    //                 .catch((error) => {
    //                     toast.error(`Failed to delete message: ${error.message}`)
    //                 })
    //         }
    //     })
    // }

    const handleDeleteMessage = (message: IMessage) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(result => {
            if (result.isConfirmed) {
                // todo: api call
                deleteMessage(message._id)
                refetch()
                toast.success(`${message.subject} deleted successfully!`)
            }
        })
    }
    const mappedData = allMessages
        .filter((msg): msg is IMessage => !!msg._id) // Ensure _id is defined
        .map((msg) => ({
            ...msg,
            id: msg._id,
        }))

    return (
        <div className="p-6 space-y-6">
            <CardHeader>
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Message Management</h1>
                    <CardDescription>View and manage all messages in one place</CardDescription>
                </div>
            </CardHeader>

            <Card>
                <CardContent>
                    <CardHeader className="text-sm text-gray-600">
                        <CardDescription>Total messages: {filteredMessages.length}</CardDescription>
                    </CardHeader>
                    <MassegeTable
                        data={mappedData}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onViewDetails={handleViewDetails}
                        onDelete={handleDeleteMessage}
                        limit={limit}
                        onLimitChange={(newLimit) => {
                            setLimit(newLimit)
                            setCurrentPage(1)
                        }}
                    />
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <MassegeDetailModal message={selectedMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
