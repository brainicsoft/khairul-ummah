"use client"
import { ArrowUpDown, MoreHorizontal, Eye, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface IBlog {
  _id: string
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string
}

export const getBlogColumns = (
  onViewDetails?: (blog: IBlog) => void,
  onEditDetails?: (blog: IBlog) => void,
  onDelete?: (blog: IBlog) => void
): ColumnDef<IBlog>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Avatar className="h-10 w-10">
        <AvatarImage src={row.getValue("image") || "/placeholder.svg"} alt="Blog" />
      </Avatar>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => <span>{row.getValue("author")}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
        {row.getValue("category")}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{row.getValue("date")}</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const blog = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='bg-white shadow-md rounded-md'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetails?.(blog)}>
              <Eye className="mr-2 h-4 w-4 dark:text-white" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEditDetails?.(blog)}>
              <Edit className="mr-2 h-4 w-4 dark:text-white" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete?.(blog)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4 dark:text-white" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
