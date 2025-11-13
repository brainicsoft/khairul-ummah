"use client"

import type { Volunteer } from "@/data/volunteerData"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface VolunteerDetailModalProps {
  volunteer: Volunteer
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerDetailModal({ volunteer, isOpen, onClose }: VolunteerDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{volunteer.fullName}</DialogTitle>
          <DialogDescription>Volunteer Details</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{volunteer.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NID Number</p>
                  <p className="font-medium">{volunteer.NidNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Father's Name</p>
                  <p className="font-medium">{volunteer.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mother's Name</p>
                  <p className="font-medium">{volunteer.motherName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {volunteer.gender}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{volunteer.age} years</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Birth Date</p>
                  <p className="font-medium">{volunteer.birthDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{volunteer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile Number</p>
                <p className="font-medium">{volunteer.mobileNumber}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Address Information</h3>
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Present Address</p>
                <p className="font-medium">{volunteer.presentAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Permanent Address</p>
                <p className="font-medium">{volunteer.permanentAddress}</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Professional Information</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Profession</p>
                  <p className="font-medium">{volunteer.currentProfession}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">{volunteer.organizationName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Work Address</p>
                <p className="font-medium">{volunteer.workAddress}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Education Qualification</p>
                <p className="font-medium">{volunteer.educationQualification}</p>
              </div>
            </div>
          </div>

          {/* Volunteer Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Volunteer Information</h3>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Reason for Interest</p>
              <p className="font-medium">{volunteer.interestReason}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
