"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import Swal from "sweetalert2"

import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import SummaryCards from "../donationRecord/components/SummaryCards"
import DonationTable from "../donationRecord/components/DonationTable"
import DonationDetailModal from "../donationRecord/components/DonationDetailsModal"
import DonationEditModal from "../donationRecord/components/DonationEditModal"
import DonationAddModal from "../donationRecord/components/DonationAddModal"
import { useGetAllPaymentRecordsQuery, useGetPaymentSummaryQuery } from "@/redux/features/payment/paymentApi"


// TODO: Replace with actual API calls

export default function DonationRecordsPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterDonationType, setFilterDonationType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null)
  const [selectedEditDonation, setSelectedEditDonation] = useState<any | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { data:paymentSummary } = useGetPaymentSummaryQuery();

  // get all donation records
  const { data: donationsRecords, isLoading, refetch } = useGetAllPaymentRecordsQuery({
    page: currentPage,
    limit: limit.toString(),
    status: filterStatus,
    donationType: filterDonationType,
  });
  console.log(donationsRecords)
  const [donations, setDonations] = useState(donationsRecords?.data || []);
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.phone.includes(searchTerm)

      const matchesStatus = !filterStatus || donation.status === filterStatus
      const matchesDonationType = !filterDonationType || donation.donationType === filterDonationType

      return matchesSearch && matchesStatus && matchesDonationType
    })
  }, [donations, searchTerm, filterStatus, filterDonationType])

  const totalPages = Math.ceil(filteredDonations.length / limit)
  const paginatedDonations = filteredDonations.slice((currentPage - 1) * limit, currentPage * limit)

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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDonations(donations.filter((d) => d._id !== donation._id))
        toast.success("ডোনেশন রেকর্ড সফলভাবে মুছে ফেলা হয়েছে!")
      }
    })
  }

  const handleAddDonation = (newDonation: any) => {
    setDonations([...donations, { ...newDonation, _id: Date.now().toString() }])
    toast.success("ডোনেশন রেকর্ড সফলভাবে যোগ হয়েছে!")
  }

  const handleUpdateDonation = (updatedDonation: any) => {
    setDonations(donations.map((d) => (d._id === updatedDonation._id ? updatedDonation : d)))
    toast.success("ডোনেশন রেকর্ড সফলভাবে আপডেট হয়েছে!")
  }

  const mappedData = paginatedDonations.map((donation) => ({
    ...donation,
    id: donation._id,
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

      {/* Summary Cards */}
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
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            limit={limit}
            onLimitChange={setLimit}
            onViewDetails={handleViewDetails}
            onEditDetails={handleEditDetails}
            onDelete={handleDeleteDonation}
          />
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <DonationDetailModal
        donation={selectedDonation}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Edit Modal */}
      <DonationEditModal
        donation={selectedEditDonation}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateDonation}
      />

      {/* Add Modal */}
      <DonationAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddDonation} />
    </main>
  )
}
