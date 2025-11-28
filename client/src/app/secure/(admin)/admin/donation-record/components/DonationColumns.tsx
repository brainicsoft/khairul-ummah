"use client"
import { Eye, Trash2, Edit, MoreHorizontal } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import type { IDonation } from "./DonationTable"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "success":
      return "success"
    case "pending":
      return "pending"
    case "failed":
      return "failed"
    default:
      return status
  }
}

export const getDonationColumns = (
  onViewDetails?: (donation: IDonation) => void,
  onEditDetails?: (donation: IDonation) => void,
  onDelete?: (donation: IDonation) => void,
): ColumnDef<IDonation>[] => [
    {
      accessorKey: "name",
      header: "ডোনারের নাম",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "phone",
      header: "ফোন/ইমেইল",
      cell: ({ row }) => {
        const phone = row.original.phone
        const email = row.original.email
        return (
          <div className="text-sm">
            <div>{phone}</div>
            {email && <div className="text-gray-500">{email}</div>}
          </div>
        )
      },
    },
    {
      accessorKey: "amount",
      header: "পরিমাণ",
      cell: ({ row }) => <div className="font-medium">৳ {row.getValue("amount")}</div>,
    },
    {
      accessorKey: "paymentId",
      header: "পেমেন্ট আইডি",
      cell: ({ row }) => <div className="text-xs text-gray-600">{row.getValue("paymentId")}</div>,
    },
    {
      accessorKey: "donationType",
      header: "ডোনেশন ধরন",
      cell: ({ row }) => {
        
        const type = row.getValue("donationType") as string
        const typeLabels: { [key: string]: string } = {
          qurbani: "কুরবানী",
          general: "সাধারণ",
          emergency: "জরুরি",
        }
        return <Badge variant="outline">{typeLabels[type] || type}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "স্ট্যাটাস",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "তারিখ",
      cell: ({ row }) => <div className="text-sm">{formatDate(row.getValue("createdAt"))}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const donation = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md dark:bg-gray-800">
              <DropdownMenuLabel>অ্যাকশন</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails?.(donation)}>
                <div className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" /> বিস্তারিত দেখুন
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEditDetails?.(donation)}>
                <div className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" /> সম্পাদনা করুন
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(donation)}>
                <Trash2 className="mr-2 h-4 w-4" /> মুছে ফেলুন
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
