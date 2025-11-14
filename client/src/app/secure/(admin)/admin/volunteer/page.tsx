"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import VolunteerTable from "./component/Volunteer-table"
import { IVolunteer, useGetAllVolunteersQuery } from "@/redux/features/volunteers/volunteersApi"
import VolunteerDetailModal from "./component/volunteer-details"

export default function VolunteerManagementPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")


   const [selectedVolunteer, setSelectedVolunteer] = useState<IVolunteer | null>(null)
   const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: volunteers, error, isLoading } = useGetAllVolunteersQuery({
    page: currentPage,
    searchTerm, 
    limit:"25"
  })

  const totalPages = volunteers?.meta?.totalPage || 1

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // new search করলে সবসময় প্রথম পেজে যাবে
  }


  const handleViewDetails = (volunteer: IVolunteer) => {
    setSelectedVolunteer(volunteer)
    setIsModalOpen(true)
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
          />
        </CardContent>
      </Card>
      {/* Modal */}
      <VolunteerDetailModal
        volunteer={selectedVolunteer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  )
}
