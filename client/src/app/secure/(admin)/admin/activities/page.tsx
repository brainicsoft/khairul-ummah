"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
// import { useDeleteActivityMutation, useGetAllActivitiesQuery } from "@/redux/features/activities/activityApi"
import ActivityTable from "./Components/ActivityTable"
import ActivityDetailModal from "./Components/ActivityDetailsModal"
import ActivityCreateModal from "./Components/ActivityCreateModal"
import ActivityEditModal from "./Components/ActivityEditModal"
import { useDeleteActivityMutation, useGetAllActivitiesQuery } from "@/redux/features/activites/activitesApi"

interface IActivity {
    _id: string;
    // slug: string;
    title: string;
    description: string;
    category: string;
    image: string;
    content?: string;
    date?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function ActivityManagementPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [limit, setLimit] = useState(25)
  const [deleteActivity] = useDeleteActivityMutation()

  // Modal state
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [selectedEditActivity, setSelectedEditActivity] = useState<IActivity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { data, error, isLoading, refetch } = useGetAllActivitiesQuery({
    page: currentPage,
    searchTerm,
    limit: limit.toString(),
  })

  const allActivities = data?.data || []
  const filteredActivities = allActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedActivities = filteredActivities.slice((currentPage - 1) * limit, currentPage * limit)

  const totalPages = Math.ceil(filteredActivities.length / limit)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleViewDetails = (activity: IActivity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  const handleEditDetails = (activity: IActivity) => {
    setSelectedEditActivity(activity)
    setIsEditModalOpen(true)
  }

  const handleDeleteActivity = (activity: IActivity) => {
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
        deleteActivity(activity._id).unwrap()
        refetch()
        toast.success(`${activity.title} deleted successfully!`)
      }
    })
  }

  const handleAddActivity = () => {
    setIsCreateModalOpen(true)
  }

  const mappedData = allActivities.map((activity) => ({
    ...activity,
    id: activity._id,
  }))

  return (
    <div className="p-6 space-y-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Activities Management</h1>
          <CardDescription>Manage and view all activities in one place</CardDescription>
        </div>
        <Button onClick={handleAddActivity}>Add New Activity</Button>
      </CardHeader>

      <Card>
        <CardContent>
          <CardHeader className="text-sm text-gray-600">
            <CardDescription>Total activities: {filteredActivities.length}</CardDescription>
          </CardHeader>
          <ActivityTable
            data={mappedData}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onViewDetails={handleViewDetails}
            onEditDetails={handleEditDetails}
            onDelete={handleDeleteActivity}
            limit={limit}
            onLimitChange={(newLimit) => {
              setLimit(newLimit)
              setCurrentPage(1)
            }}
          />
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <ActivityDetailModal activity={selectedActivity} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <ActivityCreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} refetch={refetch} />

      {/* Edit Modal */}
      <ActivityEditModal
        activity={selectedEditActivity}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refetch={refetch}
      />
    </div>
  )
}
