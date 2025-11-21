"use client"
import { Eye, Trash2, Edit, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { IProject } from "./ProjectTable" // import the type
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const getProjectColumns = (
  onViewDetails?: (project: IProject) => void,
  onEditDetails?: (project: IProject) => void,
  onDelete?: (project: IProject) => void
): ColumnDef<IProject>[] => [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => <div className="font-medium">
        <Avatar className="h-12 w-12">
          <AvatarImage src={row.getValue("image") || "/placeholder.svg"} alt="Blog" />
        </Avatar>
      </div>,
    },
    {
      accessorKey: "title",
      header: "Donate Title",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div className="capitalize">{row.getValue("category")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails?.(project)}>
                <div className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEditDetails?.(project)}>
                <div className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(project)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
