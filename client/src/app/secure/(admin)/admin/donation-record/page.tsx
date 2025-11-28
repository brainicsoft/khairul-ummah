"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import SummaryCards from "./components/SummaryCards"
import DonationTable from "./components/DonationTable"
import DonationDetailModal from "./components/DonationDetailsModal"
import DonationEditModal from "./components/DonationEditModal"
import DonationAddModal from "./components/DonationAddModal"
import { useGetAllPaymentRecordsQuery, useGetPaymentSummaryQuery } from "@/redux/features/payment/paymentApi"

export default function DonationRecordsPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterDonationType, setFilterDonationType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(25)

  const [selectedDonation, setSelectedDonation] = useState(null)
  const [selectedEditDonation, setSelectedEditDonation] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data: paymentSummary } = useGetPaymentSummaryQuery()

  // ⛔ NO FRONTEND FILTERING — BACKEND CONTROLS EVERYTHING
  const { data: donationsRecords, isLoading, refetch }:any = useGetAllPaymentRecordsQuery({
    page: currentPage,
    limit: limit.toString(),
    status: filterStatus,
    donationType: filterDonationType,
    searchTerm,
  } as any)

  const donations = donationsRecords?.data || [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleViewDetails = (donation: any) => {
    setSelectedDonation(donation)
    setIsDetailModalOpen(true)
  }

  const handleEditDetails = (donation: any) => {
    setSelectedEditDonation(donation)
    setIsEditModalOpen(true)
  }

  const handleDeleteDonation = (donation: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.success("Donation record deleted!")
        refetch()
      }
    })
  }

  const mappedData = donations.map((d) => ({
    ...d,
    id: d._id,
  }))

  return (
    <main className="flex-1 space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">ডোনেশন ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-2">সমস্ত ডোনেশন রেকর্ড এক জায়গায় পরিচালনা করুন</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>নতুন ডোনেশন যোগ করুন</Button>
      </div>

      <SummaryCards summary={paymentSummary?.data} />

      <Card>
        <CardHeader>
          <CardDescription>মোট ডোনেশন: {donationsRecords?.meta.total}</CardDescription>
        </CardHeader>

        <CardContent>
          <DonationTable
            data={mappedData}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterDonationType={filterDonationType}
            onFilterDonationTypeChange={setFilterDonationType}
            currentPage={currentPage}
            totalPages={donationsRecords?.meta.totalPage || 1} 
            onPageChange={setCurrentPage}
            limit={limit}
            onLimitChange={(newLimit) => {
              setLimit(newLimit)
              setCurrentPage(1)
            }}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onEditDetails={handleEditDetails}
            onDelete={handleDeleteDonation}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <DonationEditModal
        donation={selectedEditDonation}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={refetch}
      />

      <DonationAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={refetch}
      />
    </main>
  )
}
