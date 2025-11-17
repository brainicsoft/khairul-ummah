"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import ProjectTable from "./component/ProjectTable"
import Swal from "sweetalert2"
import ProjectDetailModal from "./component/ProjectDetailModal"
import ProjectEditModal from "./component/ProjectEditModal"
import { Button } from "@/components/ui/button"
import ProjectAddModal from "./component/ProjectAddModal"
import { useDeleteDonationProjectMutation, useGetAllDonationProjectsQuery } from "@/redux/features/donationProjects/donationProjectApi"
import { ref } from "process"
import toast from "react-hot-toast"

// Dummy project data
export default function ProjectManagementPage() {
    const [deleteDonationProject] = useDeleteDonationProjectMutation()
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(25)
    const [selectedProject, setSelectedProject] = useState<any | null>(null)
    const [selectedEditProject, setSelectedEditProject] = useState<any | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const { data, error, isLoading, refetch } = useGetAllDonationProjectsQuery({
        page: currentPage,
        searchTerm,
        limit: limit.toString()
    })
    const donateProjects = data?.data || []
    console.log(donateProjects)
    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }

    const filteredProjects = useMemo(() => {
        return donateProjects.filter(project =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [donateProjects, searchTerm])

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
                // todo: api call
                deleteDonationProject(project._id).unwrap()
                refetch()
                toast.success(`${project.title} deleted successfully!`)
            }
        })
    }
    const mappedData = donateProjects.map((proj) => ({
        ...proj,
        id: proj._id, // Add id for table row keys
    }));

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
                        data={mappedData || []}
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
