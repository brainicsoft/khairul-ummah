"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import ProjectTable from "./component/ProjectTable"
import Swal from "sweetalert2"
import { toast } from "sonner"
import ProjectDetailModal from "./component/ProjectDetailModal"
import ProjectEditModal from "./component/ProjectEditModal"
import { Button } from "@/components/ui/button"
import ProjectAddModal from "./component/ProjectAddModal"

// Dummy project data
const dummyProjects = [
    {
        id: 1,
        slug: "qurbani",
        title: "কোরবানি তহবিল",
        desc: "কোরবানির গোশত দরিদ্র পরিবারের মধ্যে বিতরণ এবং সাহায্য কর্মসূচি।",
        image: "https://res.cloudinary.com/daftymluv/image/upload/v1763195612/DSC_8408%5B1%5D-1763195606867.webp",
        color: "from-cyan-500 to-cyan-600",
        category: "special",
        benefits: [
            "কোরবানির গোশত সরাসরি বিতরণ",
            "দরিদ্র পরিবারের পুষ্টি নিশ্চিতকরণ",
            "ঈদের আনন্দ সবার সাথে ভাগ করা",
            "ঐতিহ্যবাহী সংস্কৃতি সংরক্ষণ",
        ],
        status: "pending",
        videoUrl: "https://www.youtube.com/embed/zxhiwFcf_8I?si=nGs8DdkdQesC8Wg-",
    },
    {
        id: 2,
        slug: "education",
        title: "শিক্ষা প্রকল্প",
        desc: "গ্রামের শিশুদের জন্য শিক্ষাগত সহায়তা।",
        image: "https://example.com/education.png",
        color: "from-green-500 to-green-600",
        category: "general",
        benefits: [
            "শিশুদের জন্য বই বিতরণ",
            "শিক্ষা সহায়তা প্রদান",
        ],
        status: "active",
        videoUrl: "",
    },
]

export default function ProjectManagementPage() {
    const [projects, setProjects] = useState(dummyProjects)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(25)
    const [selectedProject, setSelectedProject] = useState<any | null>(null)
    const [selectedEditProject, setSelectedEditProject] = useState<any | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const refetch = () => {
        console.log("refetch")
    }

    const filteredProjects = useMemo(() => {
        return projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [projects, searchTerm])

    const totalPages = Math.ceil(filteredProjects.length / limit)
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * limit, currentPage * limit)

    const handleViewDetails = (project: any) => {
        setSelectedProject(project)
        setIsDetailModalOpen(true)
    }

    const handleEditDetails = (project: any) => {
        setSelectedEditProject(project)
        setIsEditModalOpen(true)
    }

    const handleDeleteProject = (project: any) => {
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
                setProjects(projects.filter(p => p.id !== project.id))
                toast.success(`${project.title} deleted successfully!`)
            }
        })
    }

    return (
        <main className="flex-1 space-y-8 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight dark:text-white">Donate type Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage and view all Donate information in one place
                    </p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>Add Project</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardDescription>Total projects: {filteredProjects.length}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectTable
                        data={paginatedProjects}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        limit={limit}
                        onLimitChange={setLimit}
                        onViewDetails={handleViewDetails}
                        onEditDetails={handleEditDetails}
                        onDelete={handleDeleteProject}
                    />
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
            />

            {/* Edit Modal */}
            <ProjectEditModal
                project={selectedEditProject}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                refetch={refetch}
            />

            {/* Add Project Modal */}
            <ProjectAddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                refetch={refetch}
            />
        </main>
    )
}
