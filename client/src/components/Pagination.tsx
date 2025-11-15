"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const limitOptions = [25, 30, 40, 50];

  return (
    <div className="flex items-center justify-between mt-4 max-w-sm gap-2">
      {/* Prev */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>

      {/* Page Info */}
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages || 1}
      </span>

      {/* Next */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Limit Selector */}
      <Select
        value={limit.toString()}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 shadow-md rounded-md">
          {limitOptions.map((num) => (
            <SelectItem key={num} value={num.toString()} className="hover:bg-gray-600">
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
