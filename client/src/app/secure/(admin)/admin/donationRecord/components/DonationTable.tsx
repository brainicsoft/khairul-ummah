"use client"
import * as React from "react"
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/Pagination"
import { getDonationColumns } from "./DonationColumns"

export interface IDonation {
  _id: string
  name: string
  email: string
  phone: string
  amount: number
  paymentId: string
  status: string
  donationType: string
  createdAt: string
  updatedAt: string
}

interface DonationTableProps {
  data: IDonation[]
  searchTerm: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterStatusChange: (value: string) => void
  filterDonationType: string
  onFilterDonationTypeChange: (value: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  limit: number
  onLimitChange: (limit: number) => void
  isLoading?: boolean
  onViewDetails?: (donation: IDonation) => void
  onEditDetails?: (donation: IDonation) => void
  onDelete?: (donation: IDonation) => void
}

export default function DonationTable({
  data,
  limit,
  onLimitChange,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterDonationType,
  onFilterDonationTypeChange,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  onViewDetails,
  onEditDetails,
  onDelete,
}: DonationTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo(
    () => getDonationColumns(onViewDetails, onEditDetails, onDelete),
    [onViewDetails, onEditDetails, onDelete],
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="নাম, ইমেইল বা ফোন দ্বারা খুঁজুন..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => onFilterStatusChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">সকল স্ট্যাটাস</option>
            <option value="success">সফল</option>
            <option value="pending">লম্বিত</option>
            <option value="failed">ব্যর্থ</option>
          </select>

          <select
            value={filterDonationType}
            onChange={(e) => onFilterDonationTypeChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">সকল ধরন</option>
            <option value="qurbani">কুরবানী</option>
            <option value="general">সাধারণ</option>
            <option value="emergency">জরুরি</option>
          </select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hover:text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
              >
                কলাম <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-700 shadow-md rounded-md">
              {table.getAllColumns().map(
                (column) =>
                  column.getCanHide() && (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  লোড হচ্ছে…
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  কোন ফলাফল খুঁজে পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  )
}
