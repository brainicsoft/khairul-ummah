"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import VolunteerTable from "./component/Volunteer_table"
import { IVolunteer, useDeleteVolunteerMutation, useGetAllVolunteersQuery } from "@/redux/features/volunteers/volunteersApi"
import VolunteerDetailModal from "./component/volunteer_details"
import Swal from "sweetalert2"
import { toast } from "sonner"
import VolunteerEditModal from "./component/VolunteerEditModal"
export default function VolunteerManagementPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteVolunteer] = useDeleteVolunteerMutation()
  const [limit, setLimit] = useState(25);
  // Modal state
  const [selectedVolunteer, setSelectedVolunteer] = useState<IVolunteer | null>(null)
  const [selectedEditVolunteer, setSelectedEditVolunteer] = useState<IVolunteer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { data: volunteers, error, isLoading, refetch } = useGetAllVolunteersQuery({
    page: currentPage,
    searchTerm,
    limit: limit.toString()
  })
  console.log(volunteers?.meta)
  const totalPages = volunteers?.meta?.totalPage || 1
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // new search
  }
  // Function to open modal
  const handleViewDetails = (volunteer: IVolunteer) => {
    setSelectedVolunteer(volunteer)
    setIsModalOpen(true)
  }
  const handleEditDetails = (volunteer: IVolunteer) => {
    setSelectedEditVolunteer(volunteer)
    setIsEditModalOpen(true)
  }
  const handleDeleteVolunteer = (volunteer: IVolunteer) => {
    if (!volunteer?._id) {
      toast.error("Volunteer ID not found!")
      return
    }
    // console.log(volunteer._id)
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
          await deleteVolunteer(volunteer._id).unwrap()
          refetch()
          Swal.fire({
            title: "Deleted!",
            text: "Volunteer has been deleted.",
            icon: "success",
          })

        } catch (error: any) {
          toast.error(error?.data?.message || "Something went wrong.")
        }
      }
    })
  }
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading volunteers.</p>
  return (
    <main className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">Volunteer Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all volunteer information in one place
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>
            Total volunteers: {volunteers?.meta?.total || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VolunteerTable

            data={volunteers?.data || []}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onEditDetails={handleEditDetails}
            onDelete={handleDeleteVolunteer}
            limit={limit}
            onLimitChange={(newLimit) => {
              setLimit(newLimit)
              setCurrentPage(1) // reset page when limit changes
            }}
          />
        </CardContent>
      </Card>
      {/* Modal */}
      <VolunteerDetailModal
        volunteer={selectedVolunteer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <VolunteerEditModal
        volunteer={selectedEditVolunteer}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refetch={refetch}
      />
    </main>
  )
}
