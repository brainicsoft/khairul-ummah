// volunteer.model.ts
export interface IVolunteer extends Document {
  fullName: string
  fatherName: string
  NidNo: string
  mobileNumber: string
  email: string
  birthDate: Date
  gender: 'male' | 'female' | 'other'
  age: number
  presentAddress: string
  permanentAddress: string
  currentProfession: string
  organizationName?: string
  workAddress?: string
  educationQualification: string
  interestReason: string
  createdAt?: Date
  updatedAt?: Date
}

  