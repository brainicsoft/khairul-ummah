"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { apiUrl } from "@/config/constants";

interface ImageItem {
  _id: string;
  image: string;
  alt?: string;
}
export default function GalleryPagination() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(1); // default limit 25
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/gallery?page=${page}&limit=${limit}`, {
        cache: "no-store",
      });
      const json = await res.json();
      setImages(json?.data || []);
      setTotalPages(json?.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(currentPage, limit);
  }, [currentPage, limit]);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((item, idx) => (
          <div
            key={item._id || idx}
            className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
          >
            <Image
              src={item.image}
              alt={item.alt || `Gallery ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          onPageChange={(page) => setCurrentPage(page)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setCurrentPage(1); // reset to first page on limit change
          }}
        />
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
    </>
  );
}
