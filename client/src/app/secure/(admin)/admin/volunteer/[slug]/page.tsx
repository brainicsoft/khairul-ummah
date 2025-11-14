import { notFound } from "next/navigation"
import Link from "next/link"
import { volunteerData } from "@/data/volunteerData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, BookOpen, Heart } from "lucide-react"

interface VolunteerDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function VolunteerDetailPage({ params }: VolunteerDetailPageProps) {
    const { slug } = await params
    const volunteer = volunteerData.find((v) => v.slug === slug)

    if (!volunteer) {
        notFound()
    }

    return (
        <main className="flex-1 space-y-8 p-8">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight dark:text-white">{volunteer.fullName}</h1>
                    <p className="text-muted-foreground mt-1">{volunteer.currentProfession}</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Basic details about the volunteer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                <p className="text-lg font-semibold">{volunteer.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Father's Name</p>
                                <p className="text-lg font-semibold">{volunteer.fatherName}</p>
                            </div>
                            {/* <div>
                                <p className="text-sm font-medium text-muted-foreground">Mother's Name</p>
                                <p className="text-lg font-semibold">{volunteer.motherName}</p>
                            </div> */}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">NID Number</p>
                                <p className="text-lg font-semibold">{volunteer.NidNo}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Gender</p>
                                <p className="text-lg font-semibold capitalize">{volunteer.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Age</p>
                                <p className="text-lg font-semibold">{volunteer.age}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Birth Date</p>
                                <p className="text-lg font-semibold">{volunteer.birthDate}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <a href={`mailto:${volunteer.email}`} className="text-blue-600 hover:underline">
                                    {volunteer.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Mobile Number</p>
                                <a href={`tel:${volunteer.mobileNumber}`} className="text-blue-600 hover:underline">
                                    {volunteer.mobileNumber}
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Address Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Present Address</p>
                            <p className="text-lg font-semibold">{volunteer.presentAddress}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Permanent Address</p>
                            <p className="text-lg font-semibold">{volunteer.permanentAddress}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Professional Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Professional Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Current Profession</p>
                                <p className="text-lg font-semibold">{volunteer.currentProfession}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Organization Name</p>
                                <p className="text-lg font-semibold">{volunteer.organizationName}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-muted-foreground">Work Address</p>
                                <p className="text-lg font-semibold">{volunteer.workAddress}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Education Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Education Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Education Qualification</p>
                            <p className="text-lg font-semibold">{volunteer.educationQualification}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Interest and Reason */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Interest & Reason
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Why Volunteer?</p>
                            <p className="text-base mt-2">{volunteer.interestReason}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
