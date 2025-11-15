"use client"
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Trash2,

} from "lucide-react"
import type { IVolunteer } from "@/redux/features/volunteers/volunteersApi"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"


export const getColumns = (
    onViewDetails?: (volunteer: IVolunteer) => void,
    onDelete?: (volunteer: IVolunteer) => void
  ): ColumnDef<IVolunteer>[] => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "fullName",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("fullName")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
      },
      {
        accessorKey: "mobileNumber",
        header: "Mobile",
        cell: ({ row }) => <div>{row.getValue("mobileNumber")}</div>,
      },
      {
        accessorKey: "currentProfession",
        header: "Profession",
        cell: ({ row }) => <div>{row.getValue("currentProfession")}</div>,
      },
      {
        accessorKey: "organizationName",
        header: "Organization",
        cell: ({ row }) => <div>{row.getValue("organizationName")}</div>,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div className="capitalize">{row.getValue("gender")}</div>,
      },
  
      // ACTIONS MENU
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const volunteer = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-gray-100">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4 text-black dark:text-gray-100" />
                </Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="end"
                className="bg-white shadow-md rounded-md"
              >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
  
                <DropdownMenuItem onClick={() => onViewDetails?.(volunteer)}>
                  <div className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </div>
                </DropdownMenuItem>
  
  
                <DropdownMenuSeparator />
  
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete?.(volunteer)}
                >
                  <Trash2 className="mr-2 h-4 w-4 hover:text-white" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]