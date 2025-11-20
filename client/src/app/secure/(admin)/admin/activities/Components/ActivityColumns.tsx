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
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface IActivity {
    _id: string
    category: string
    title: string
    description: string
    image: string
}

export const getActivityColumns = (
    onViewDetails?: (activity: IActivity) => void,
    onEditDetails?: (activity: IActivity) => void,
    onDelete?: (activity: IActivity) => void,
): ColumnDef<IActivity>[] => [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <Avatar className="h-10 w-10">
                    <AvatarImage src={row.getValue("image") || "/placeholder.svg"} alt="Activity" />
                </Avatar>
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {row.getValue("category")}
                </span>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const activity = row.original
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
                            <DropdownMenuItem onClick={() => onViewDetails?.(activity)}>
                                <Eye className="mr-2 h-4 w-4 dark:text-white" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEditDetails?.(activity)}>
                                <Edit className="mr-2 h-4 w-4 dark:text-white" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete?.(activity)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4 dark:text-white" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
