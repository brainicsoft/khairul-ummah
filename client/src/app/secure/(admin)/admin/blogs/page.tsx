"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import BlogCreateModal from "./component/BlogCreateModal"
import BlogTable from "./component/BlogTable"
import BlogDetailModal from "./component/BlogDetailsModal"
import BlogEditModal from "./component/BlogEditModal"

interface IBlog {
    id: number
    slug: string
    title: string
    description: string
    date: string
    author: string
    category: string
    image: string
    content?: string
}

export default function BlogManagementPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [limit, setLimit] = useState(25)

    // Modal state
    const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null)
    const [selectedEditBlog, setSelectedEditBlog] = useState<IBlog | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const refetch = () => {
        console.log("refetch")
    }
    // Mock data - Replace with API call
    const mockBlogs: IBlog[] = [
        {
            id: 1,
            slug: "সমাজ-সেবা",
            title: "সমাজের উন্নয়নে আমাদের ভূমিকা",
            description: "খাইরুল উম্মাহ ফাউন্ডেশন সমাজের বিভিন্ন ক্ষেত্রে ইতিবাচক পরিবর্তন আনতে কাজ করে থাকে।",
            date: "2023-01-01",
            author: "ফাউন্ডেশন টিম",
            category: "সমাজ সেবা",
            image: "https://res.cloudinary.com/daftymluv/image/upload/v1763195612/DSC_8408%5B1%5D-1763195606867.webp",
            content: "খাইরুল উম্মাহ ফাউন্ডেশন সমাজের বিভিন্ন ক্ষেত্রে ইতিবাচক পরিবর্তন আনতে কাজ করে থাকে। আমরা বিশ্বাস করি, শিক্ষার প্রসার, মসজিদ ও কমিউনিটি সেন্টার নির্মাণ, স্বাস্থ্য সচেতনতা এবং দরিদ্র মানুষের পাশে দাঁড়ানো আমাদের মূল লক্ষ্য।"
        }
    ]

    const filteredBlogs = mockBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const paginatedBlogs = filteredBlogs.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    )

    const totalPages = Math.ceil(filteredBlogs.length / limit)

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const handleViewDetails = (blog: IBlog) => {
        setSelectedBlog(blog)
        setIsModalOpen(true)
    }

    const handleEditDetails = (blog: IBlog) => {
        setSelectedEditBlog(blog)
        setIsEditModalOpen(true)
    }

    const handleDeleteBlog = (blog: IBlog) => {
        const blogId = blog.id
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("Blog deleted successfully!")
                // Add delete API call here
            }
        })
    }

    const handleAddBlog = () => {
        setIsCreateModalOpen(true)
    }

    return (
        <div className="p-6 space-y-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Blog Management</h1>
                    <CardDescription>Manage and view all blog posts in one place</CardDescription>
                </div>
                <Button onClick={handleAddBlog}>
                    Add New Blog
                </Button>
            </CardHeader>
            <Card>


                <CardContent>

                    <CardHeader className="text-sm text-gray-600">
                        <CardDescription>Total blogs: {filteredBlogs.length}</CardDescription>
                    </CardHeader>

                    <BlogTable
                        data={paginatedBlogs}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onViewDetails={handleViewDetails}
                        onEditDetails={handleEditDetails}
                        onDelete={handleDeleteBlog}
                        limit={limit}
                        onLimitChange={(newLimit) => {
                            setLimit(newLimit)
                            setCurrentPage(1)
                        }}
                    />

                </CardContent>
            </Card>

            {/* Detail Modal */}
            <BlogDetailModal
                blog={selectedBlog}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <BlogCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                refetch={refetch}
            />

            {/* Edit Modal */}
            <BlogEditModal
                blog={selectedEditBlog}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                refetch={refetch}
            />
        </div>
    )
}
