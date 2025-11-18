"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

const LIMIT_OPTIONS = [6, 12, 18, 24];

export function LimitSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [limit, setLimit] = useState("12");

  useEffect(() => {
    const currentLimit = searchParams.get("limit");
    if (currentLimit) {
      setLimit(currentLimit);
    }
  }, [searchParams]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    setLimit(newLimit);

    // Build query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1"); // Reset to page 1 when limit changes

    router.push(`/gallery?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="limit-select" className="text-sm font-medium text-foreground">
        Items per page:
      </label>
      <select
        id="limit-select"
        value={limit}
        onChange={handleLimitChange}
        className="px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm font-medium transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {LIMIT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
