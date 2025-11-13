"use client"

import { useState } from "react"
import { type Volunteer, volunteerData } from "@/data/volunteerData"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VolunteerTable from "./component/Volunteer-table"

export default function VolunteerManagementPage() {
  const [volunteers] = useState<Volunteer[]>(volunteerData)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 10
  const filteredVolunteers = volunteerData.filter(
    (volunteer) =>
      volunteer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedVolunteers = filteredVolunteers.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <main className="flex-1 space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">Volunteer Management</h1>
        <p className="text-muted-foreground mt-2">Manage and view all volunteer information in one place</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteers</CardTitle>
          <CardDescription>Total volunteers: {filteredVolunteers.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <VolunteerTable
            data={paginatedVolunteers}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </main>
  )
}
