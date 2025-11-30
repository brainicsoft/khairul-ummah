"use client"
import { MoreHorizontal, Eye, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"

interface ILifetimeDonor {
  _id: string
  email: string
  name: string
  slug: string
  phone: string
  amount: number
  profession: string
  address: string
  message: string
  termsAccepted: boolean
}

export const getLifetimeDonorColumns = (
  onViewDetails?: (donor: ILifetimeDonor) => void,
  onEditDetails?: (donor: ILifetimeDonor) => void,
  onDelete?: (donor: ILifetimeDonor) => void,
): ColumnDef<ILifetimeDonor>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.getValue("phone")}</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number
      return <span className="font-semibold text-green-600">${amount.toLocaleString()}</span>
    },
  },
  {
    accessorKey: "profession",
    header: "Profession",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
        {row.getValue("profession")}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <span className="text-sm">{row.getValue("address")}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const donor = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetails?.(donor)}>
              <Eye className="mr-2 h-4 w-4 dark:text-white" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEditDetails?.(donor)}>
              <Edit className="mr-2 h-4 w-4 dark:text-white" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete?.(donor)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4 dark:text-white" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
