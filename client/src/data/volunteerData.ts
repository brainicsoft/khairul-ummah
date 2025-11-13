export interface Volunteer {
    fullName: string
    fatherName: string
    motherName: string
    NidNo: string
    mobileNumber: string
    email: string
    birthDate: string
    gender: string
    age: string
    presentAddress: string
    permanentAddress: string
    currentProfession: string
    organizationName: string
    workAddress: string
    educationQualification: string
    interestReason: string
    photo: string
  }
  
  export const volunteerData: Volunteer[] = [
    {
      fullName: "Abu Bakar Siddique",
      fatherName: "Md. Rahmat Ullah",
      motherName: "Mst. Rokeya Begum",
      NidNo: "19986543210987654",
      mobileNumber: "01712345678",
      email: "abubakar@example.com",
      birthDate: "1998-05-12",
      gender: "male",
      age: "27",
      presentAddress: "Brahmanbaria Sadar, Brahmanbaria",
      permanentAddress: "Brahmanbaria, Bangladesh",
      currentProfession: "Frontend Developer",
      organizationName: "UtechHub Agency",
      workAddress: "Dhaka, Bangladesh",
      educationQualification: "Bachelor of Science in Computer Science",
      interestReason:
        "I want to serve my community through volunteer work and make a positive impact.",
      photo: "https://example.com/uploads/abubakar.jpg",
    },
    {
      fullName: "Saiful Islam",
      fatherName: "Md. Jalal Uddin",
      motherName: "Mst. Kohinoor Begum",
      NidNo: "20003456789012345",
      mobileNumber: "01834567890",
      email: "saifulislam@example.com",
      birthDate: "1995-09-25",
      gender: "male",
      age: "30",
      presentAddress: "Cumilla, Bangladesh",
      permanentAddress: "Cumilla, Bangladesh",
      currentProfession: "Trainer & Instructor",
      organizationName: "Skill Development Center",
      workAddress: "Cumilla City, Bangladesh",
      educationQualification: "Bachelor in Business Administration",
      interestReason:
        "I love teaching and want to contribute to social awareness and education projects.",
      photo: "https://example.com/uploads/saiful.jpg",
    },
    {
      fullName: "Anubha Noor",
      fatherName: "Md. Mofiz Uddin",
      motherName: "Mst. Rahima Begum",
      NidNo: "20127654321098765",
      mobileNumber: "01987654321",
      email: "anubhanoor@example.com",
      birthDate: "2000-03-14",
      gender: "female",
      age: "25",
      presentAddress: "Chattogram, Bangladesh",
      permanentAddress: "Chattogram, Bangladesh",
      currentProfession: "Frontend Developer",
      organizationName: "Programming Hero",
      workAddress: "Dhaka, Bangladesh",
      educationQualification: "Bachelor of Science in Information Technology",
      interestReason:
        "I want to use my technical skills to support humanitarian and social causes.",
      photo: "https://example.com/uploads/anubha.jpg",
    },
  ]
  