import Link from "next/link";

// components/SSRLoadMoreData.tsx
interface SSRLoadMoreDataProps<T> {
  apiUrl: string;                    // API endpoint
  searchParams?: Promise<{ limit?: string }>;
  defaultLimit?: number;
  page?: number;
  children: (items: T[]) => React.ReactNode; // parent will render items
}

export default async function SSRLoadMoreData<T>({
  apiUrl,
  searchParams,
  defaultLimit = 10,
  page = 1,
  children,
}: SSRLoadMoreDataProps<T>) {
  const params = await searchParams;
  const currentLimit = parseInt(params?.limit || String(defaultLimit));
  const nextLimit = currentLimit + defaultLimit;

  let items: T[] = [];
  let totalCount = 0;

  try {
    const res = await fetch(`${apiUrl}?page=${page}&limit=${currentLimit}`, { cache: "no-store" });
    const json = await res.json();
    items = json?.data || [];
    totalCount = json?.meta?.total || 0;
  } catch (err) {
    console.error("Failed to fetch data:", err);
  }

  return (
    <div className="px-4 py-8 container mx-auto">
      {children(items)}

      <div className="flex justify-between items-center">
      <p className="mt-4 text-center text-sm text-gray-500">
          Showing {items.length} of {totalCount} items
        </p>

        {/* Load More button */}
        {items.length < totalCount && (
          <div className="mt-8 flex justify-center">
            <Link
              href={`?limit=${nextLimit}`}
              className="px-2 py-1 bg-primary text-white rounded hover:bg-primary/80 transition"
            >
              Load More
            </Link>
          </div>
        )}

        
      </div>
    </div>
  );
}
