"use client"

import { useState } from "react"
import { type Volunteer, volunteerData } from "@/data/volunteerData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VolunteerTable from "./component/Volunteer-table"

export default function VolunteerManagementPage() {
    const [volunteers] = useState<Volunteer[]>(volunteerData)

    return (
        <main className="flex-1 space-y-8 p-8">
            <div>
                <h1 className="text-3xl dark:text-white font-bold tracking-tight">Volunteer Management</h1>
                <p className="text-muted-foreground mt-2">Manage and view all volunteer information in one place</p>
            </div>

            <Card>
                <CardHeader>

                    <div className="mt-5">
                        <CardDescription className="text-xl font-semibold dark:text-white">Total volunteers: <span className="">{volunteers.length}</span></CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <VolunteerTable data={volunteers} />
                </CardContent>
            </Card>
        </main>
    )
}
